import { UploadedFile } from 'express-fileupload';
import { StorageFile } from '../models/tables/StorageFile';
import { User } from '../models/tables/User';
import { ErrorWithCode } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { fileCodes, FileCodesType } from '../static/FileCodes';
import { StringKeyof } from '../utilities/misc';
import { PrincipalId } from '@thinkhub/x-core';
import { ClassType } from '../models/misc/ClassType';
import { log } from './misc/logger';
import { ORMConnectionService } from './ORMConnectionService';
import { StorageService } from './StorageService';
import { EntityType } from '@thinkhub/x-orm';

export type UploadFileRelatedEntityIdType = { id: Id<any>, file: UploadedFile };

export class FileService {

    constructor(
        private _storageService: StorageService,
        private _ormService: ORMConnectionService) {
    }

    async uploadAvatarFileAsync(principalId: PrincipalId, file: UploadedFile) {

        const userId = principalId.getId();

        //TODO: Create a validation function
        if (!['image/png', 'image/jpeg'].includes(file.mimetype))
            throw new ErrorWithCode('File upload failed: Only jpeg or png', 'bad request');

        await this
            .uploadAssigendFileAsync({
                entityId: userId,
                entitySignature: User,
                fileBuffer: file.data,
                fileCode: 'user_avatar',
                storageFileIdField: 'avatarFileId'
            });
    }

    /**
     * Upload multiple assigned files 
     */
    async uploadMultipleAssignedFilesAsync({
        entitySignature,
        fileCode,
        files,
        relationField
    }: {
        entitySignature: ClassType<any>,
        relationField: string,
        fileCode: FileCodesType,
        files: UploadFileRelatedEntityIdType[]
    }) {

        const { uploadResult, deleteUploadedFilesAsync } = await this
            ._uploadFilesBatchAsync(fileCode, files.map(x => x.file));

        /**
         * Try inserting things to db
         */
        try {

            const insertResult = await this
                ._insertStorageFileEntitesBatchAsync(uploadResult);

            await this
                ._attachStorageFilesToEntities(
                    entitySignature,
                    relationField,
                    files.map(x => x.id),
                    insertResult.map(x => x.id));
        }

        /**
         * Delete CDN files in case of faliure 
         */
        catch (e) {

            await deleteUploadedFilesAsync();
            throw e;
        }
    }

    /**
     * Attach storage files to entities
     */
    private async _attachStorageFilesToEntities(
        signature: ClassType<any>,
        relationField: string,
        entityIds: Id<any>[],
        storageFileIds: Id<any>[]) {

        const updates = entityIds
            .map((id, index) => ({
                id,
                [relationField]: storageFileIds[index]
            }));

        await this
            ._ormService
            .save(signature, updates);
    }

    /**
     * Insert file entities 
     */
    private async _insertStorageFileEntitesBatchAsync(uploadResult: ({ cdnPath: string })[]) {

        const fileEntiteis = uploadResult
            .map(({ cdnPath }) => ({
                filePath: cdnPath
            } as StorageFile));

        const insertedFileEntities = await this
            ._ormService
            .createManyAsync(StorageFile, fileEntiteis);

        return insertedFileEntities;
    }

    /**
     * Batch upload files 
     */
    private async _uploadFilesBatchAsync(fileCode: FileCodesType, files: UploadedFile[]) {

        const filesWithPaths = files
            .map((file, index) => ({ file, cdnPath: this._getCDNFilePath(fileCode, index.toString()) }));

        /**
         * Create rollback function
         */
        const deleteUploadedFilesAsync = async () => {

            const deletePromises = filesWithPaths
                .map(({ cdnPath }) => this
                    ._storageService
                    .deleteStorageFileAsync(cdnPath));

            await Promise
                .all(deletePromises);
        }

        /**
         * Upload to CDN
         */
        try {

            const uploadPromises = filesWithPaths
                .map(({ file, cdnPath }) => this
                    ._storageService
                    .uploadBufferToStorageAsync(file.data, cdnPath));

            await Promise
                .all(uploadPromises);
        }

        /**
         * Failure, delete all files in transaction
         */
        catch (e) {

            await deleteUploadedFilesAsync();
            throw e;
        }

        return {
            uploadResult: filesWithPaths,
            deleteUploadedFilesAsync
        };
    }

    /**
     * Upload assigned file
     */
    async uploadAssigendFileAsync<TField extends StringKeyof<TEntity>, TEntity extends EntityType & { [K in TField]: Id<'StorageFile'> | null }>({
        entitySignature,
        fileBuffer,
        fileCode,
        storageFileIdField,
        entityId
    }: {
        entityId: Id<any>,
        fileCode: FileCodesType,
        entitySignature: ClassType<TEntity>,
        storageFileIdField: TField,
        fileBuffer: Buffer,
    }) {

        // path
        const newCDNFilePath = this._getCDNFilePath(fileCode, '0');

        // upload to storage
        await this._storageService
            .uploadBufferToStorageAsync(fileBuffer, newCDNFilePath);

        /**
         * All operations after uploading file 
         * to CDN are in a try block, because if there's a failure,
         * we have to revert the upload manually.
         * DB operations will be reverted automatically, 
         * since we are in a global transaction scope.
         */
        try {

            // crate pending storage file
            const { id: newStorageFileEntityId } = await this
                ._insertFileEntityAsync(newCDNFilePath);

            // get entity
            const entity = await this._ormService
                .query(entitySignature, { entityId })
                .where('id', '=', 'entityId')
                .getSingle();

            // get old file id 
            const oldStorageFileId = entity[storageFileIdField];

            // save entity
            await this._ormService
                .save(entitySignature, {
                    id: entityId,
                    [storageFileIdField]: newStorageFileEntityId
                } as any);

            // delete previous file, and file entity
            if (oldStorageFileId) {

                const oldFileEntity = await this.getFileEntityAsync(oldStorageFileId);

                try {

                    // TODO delete temporarily disabled
                    // since while testing, we don't want to lose 
                    // files from the dev bucket 

                    // await this.deleteFileEntityAsync(oldStorageFileId);
                    // await this._storageService
                    //     .deleteStorageFileAsync(oldFileEntity.filePath);
                }
                catch (e) {

                    log(e, { entryType: 'warning' });
                }
            }

            return { newCDNFilePath };
        }
        catch (e) {

            /**
             * In case of any failure, 
             * delete file from storage bucket
             */
            await this._storageService
                .deleteStorageFileAsync(newCDNFilePath);

            /**
             * Than throw the error.
             */
            throw e;
        }
    }

    async uploadStorageFileAsync<TField extends StringKeyof<TEntity>, TEntity extends EntityType & { [K in TField]: Id<'StorageFile'> | null }>({
        entitySignature,
        fileBuffer,
        fileCode,
        storageFileIdField,
        entityId
    }: {
        entityId: Id<any>,
        fileCode: FileCodesType,
        entitySignature: ClassType<TEntity>,
        storageFileIdField: TField,
        fileBuffer: Buffer,
    }) {

        // path
        const newCDNFilePath = this._getCDNFilePath(fileCode, '0');

        // upload to storage
        await this._storageService
            .uploadBufferToStorageAsync(fileBuffer, newCDNFilePath);

        /**
         * All operations after uploading file 
         * to CDN are in a try block, because if there's a failure,
         * we have to revert the upload manually.
         * DB operations will be reverted automatically, 
         * since we are in a global transaction scope.
         */
        try {

            // crate pending storage file
            const { id: newStorageFileEntityId } = await this
                ._insertFileEntityAsync(newCDNFilePath);

            // get entity
            const entity = await this._ormService
                .query(entitySignature, { entityId })
                .where('id', '=', 'entityId')
                .getSingle();

            // get old file id 
            const oldStorageFileId = entity[storageFileIdField];

            // delete previous file, and file entity
            if (oldStorageFileId) {

                const oldFileEntity = await this.getFileEntityAsync(oldStorageFileId);

                try {

                    // TODO delete temporarily disabled
                    // since while testing, we don't want to lose 
                    // files from the dev bucket 

                    // await this.deleteFileEntityAsync(oldStorageFileId);
                    // await this._storageService
                    //     .deleteStorageFileAsync(oldFileEntity.filePath);
                }
                catch (e) {

                    log(e, { entryType: 'warning' });
                }
            }

            return { newCDNFilePath, newStorageFileEntityId };
        }
        catch (e) {

            /**
             * In case of any failure, 
             * delete file from storage bucket
        */
            await this._storageService
                .deleteStorageFileAsync(newCDNFilePath);

            /**
             * Than throw the error.
        */
            throw e;
        }
    }

    /**
     * Get CDN file path 
     */
    private _getCDNFilePath(fileType: FileCodesType, uniqueIndex: string) {

        const extension = fileCodes[fileType][0];
        return `${fileType}_container/${fileType}_${uniqueIndex}_${Date.now()}.${extension}`;
    }

    deleteFileEntityAsync = async (id: Id<'any'>) => {

        await this._ormService
            .hardDelete(StorageFile, [id]);
    };

    getFileEntityAsync = (id: Id<any>) => {

        return this._ormService
            .getSingleById(StorageFile, id);
    };

    /**
     * Insert file to DB
     */
    private async _insertFileEntityAsync(path: string) {

        return await this._ormService
            .createAsync(StorageFile, {
                filePath: path
            });
    }
}