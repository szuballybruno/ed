import { UploadedFile } from 'express-fileupload';
import { StorageFile } from '../models/entity/StorageFile';
import { User } from '../models/entity/User';
import { VerboseError } from '../shared/types/VerboseError';
import { Id } from '../shared/types/versionId';
import { fileCodes, FileCodesType } from '../static/FileCodes';
import { PrincipalId } from '../utilities/ActionParams';
import { StringKeyof } from '../utilities/misc';
import { ClassType } from './misc/advancedTypes/ClassType';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { StorageService } from './StorageService';
import { UserService } from './UserService';
import { EntityType } from './XORM/XORMTypes';

export class FileService {

    private _userService: UserService;
    private _storageService: StorageService;
    private _ormService: ORMConnectionService;

    constructor(
        userService: UserService,
        storageService: StorageService,
        ormService: ORMConnectionService) {

        this._userService = userService;
        this._storageService = storageService;
        this._ormService = ormService;
    }

    uploadAvatarFileAsync = async (principalId: PrincipalId, file: UploadedFile) => {

        const userId = Id.create<'User'>(principalId.toSQLValue());

        //TODO: Create a validation function
        if (!['image/png', 'image/jpeg'].includes(file.mimetype))
            throw new VerboseError('File upload failed: Only jpeg or png', 'bad request');

        await this.uploadAssigendFileAsync<User>(
            this.getFilePath('user_avatar', userId),
            () => this._userService.getUserById(userId),
            (fileId) => this._userService.setUserAvatarFileId(userId, fileId),
            (entity) => entity.avatarFileId,
            file.data);
    };

    async uploadAssigendFile2Async<TField extends StringKeyof<T>, T extends EntityType>({
        entitySignature,
        fileBuffer,
        fileCode,
        storageFileIdField,
        entityId
    }: {
        entityId: Id<any>,
        fileCode: FileCodesType,
        entitySignature: ClassType<T>,
        storageFileIdField: TField,
        fileBuffer: Buffer,
    }) {

        // path
        const path = this.getFilePath(fileCode, entityId);

        // crate pending storage file
        const newStorageFileEntityId = await this
            ._insertFileEntityAsync(path);

        // get entity
        const entity = await this._ormService
            .query(entitySignature, { entityId })
            .where('id', '=', 'entityId')
            .getSingle();

        // get old file id 
        const oldStorageFileId = entity[storageFileIdField] as any as Id<any> | null;

        // delete previous file, and file entity
        if (oldStorageFileId) {

            const oldFileEntity = await this.getFileEntityAsync(oldStorageFileId);
            await this.deleteFileEntityAsync(oldStorageFileId);

            await this._storageService
                .deleteStorageFileAsync(oldFileEntity.filePath);
        }

        // save entity
        const saveData = { id: entityId } as T;
        (saveData as any)[storageFileIdField] = newStorageFileEntityId;
        await this._ormService
            .save(entitySignature, saveData);

        // upload to storage
        await this._storageService
            .uploadBufferToStorageAsync(fileBuffer, fileCode);
    };

    /**
     * @deprecated 
     */
    uploadAssigendFileAsync = async <T>(
        filePath: string,
        getEntityAsync: () => Promise<T>,
        assignFileToEntity: (fileId: Id<'StorageFile'>) => Promise<any>,
        getFileEntityId: (entity: T) => Id<any> | null,
        fileBuffer: Buffer) => {

        // crate pending storage file
        const newStorageFileEntityId = await this._insertFileEntityAsync(filePath);

        // get entity
        const entity = await getEntityAsync();

        // assing to entity
        await assignFileToEntity(newStorageFileEntityId);

        // delete previous file, and file entity
        const oldFileEntityId = getFileEntityId(entity);
        if (oldFileEntityId) {

            const oldFileEntity = await this.getFileEntityAsync(oldFileEntityId);
            await this.deleteFileEntityAsync(oldFileEntityId);

            await this._storageService
                .deleteStorageFileAsync(oldFileEntity.filePath);
        }

        // upload to storage
        await this._storageService
            .uploadBufferToStorageAsync(fileBuffer, filePath);
    };

    getFilePath = (fileType: FileCodesType, entityId: Id<any>) => {

        const extension = fileCodes[fileType][0];

        return `${fileType}_container/${fileType}_${entityId}_${Date.now()}.${extension}`;
    };

    deleteFileEntityAsync = async (id: Id<'any'>) => {

        await this._ormService
            .hardDelete(StorageFile, [id]);
    };

    private async _insertFileEntityAsync(path: string) {

        return await this._ormService
            .createAsync(StorageFile, {
                filePath: path
            });
    };

    getFileEntityAsync = (id: Id<any>) => {

        return this._ormService
            .getSingleById(StorageFile, id);
    };
}