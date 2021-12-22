import { UploadedFile } from "express-fileupload";
import { StorageFile } from "../models/entity/StorageFile";
import { User } from "../models/entity/User";
import { staticProvider } from "../staticProvider";
import { StorageService } from "./StorageService2";
import { UserService } from "./UserService2";

export class FileService {

    private _userService: UserService;
    private _storageService: StorageService;

    constructor(userService: UserService, storageService: StorageService) {

        this._userService = userService;
        this._storageService = storageService;
    }

    uploadAvatarFileAsync = async (userId: number, file: UploadedFile) => {
        // upload new avatar
        await this.uploadAssigendFileAsync<User>(
            this.getFilePath("userAvatars", "user_avatar", userId, "png"),
            () => this._userService.getUserById(userId),
            (fileId) => this._userService.setUserAvatarFileId(userId, fileId),
            (entity) => entity.avatarFileId,
            file.data);
    };

    uploadAssigendFileAsync = async <T>(
        filePath: string,
        getEntityAsync: () => Promise<T>,
        assignFileToEntity: (fileId: number) => Promise<any>,
        getFileEntityId: (entity: T) => number | null,
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

            const oldFileEntity = await this.getFileEntityAsync(oldFileEntityId)
            await this.deleteFileEntityAsync(oldFileEntityId);

            await this._storageService
                .deleteStorageFileAsync(oldFileEntity.filePath);
        }

        // upload to storage
        await this._storageService
            .uploadBufferToStorageAsync(fileBuffer, filePath);
    }

    getFilePath = (folderPath: string, fileType: string, fileId: number, extension: string) => {

        return `${folderPath}/${fileType}_${fileId}_${Date.now()}.${extension}`
    }

    deleteFileEntityAsync = async (id: number) => {

        await staticProvider
            .ormConnection
            .getRepository(StorageFile)
            .delete(id);
    }

    insertFileEntityAsync = async (path: string) => {

        const file = {
            filePath: path
        } as StorageFile;

        await staticProvider
            .ormConnection
            .getRepository(StorageFile)
            .insert(file);

        return file;
    }

    getFileEntityAsync = (id: number) => {

        return staticProvider
            .ormConnection
            .getRepository(StorageFile)
            .findOneOrFail(id);
    }
}