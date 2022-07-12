import { UploadedFile } from 'express-fileupload';
import { StorageFile } from '../models/entity/StorageFile';
import { User } from '../models/entity/User';
import { VerboseError } from '../shared/types/VerboseError';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/ActionParams';
import { replaceAll } from '../utilities/helpers';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { StorageService } from './StorageService';
import { UserService } from './UserService';

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
            this.getFilePath('userAvatars', 'user_avatar', userId, 'png'),
            () => this._userService.getUserById(userId),
            (fileId) => this._userService.setUserAvatarFileId(userId, fileId),
            (entity) => entity.avatarFileId,
            file.data);
    };

    uploadAssigendFileAsync = async <T>(
        filePath: string,
        getEntityAsync: () => Promise<T>,
        assignFileToEntity: (fileId: Id<'StorageFile'>) => Promise<any>,
        getFileEntityId: (entity: T) => Id<any> | null,
        fileBuffer: Buffer) => {

        // crate pending storage file
        const newStorageFileEntity = await this.insertFileEntityAsync(filePath);

        // get entity
        const entity = await getEntityAsync();

        // assing to entity
        await assignFileToEntity(newStorageFileEntity.id);

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

    getFilePath = (folderPath: string, fileType: string, fileId: Id<any>, extension: string) => {

        extension = replaceAll(extension, '.', '');

        return `${folderPath}/${fileType}_${fileId}_${Date.now()}.${extension}`;
    };

    deleteFileEntityAsync = async (id: Id<'any'>) => {

        await this._ormService
            .hardDelete(StorageFile, [id]);
    };

    insertFileEntityAsync = async (path: string) => {

        const file = {
            filePath: path
        } as StorageFile;

        await this._ormService
            .createAsync(StorageFile, file);

        return file;
    };

    getFileEntityAsync = (id: Id<any>) => {

        return this._ormService
            .getSingleById(StorageFile, id);
    };
}