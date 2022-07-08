import { UploadedFile } from 'express-fileupload';
import { ModuleData } from '../models/entity/module/ModuleData';
import { StorageFile } from '../models/entity/StorageFile';
import { ModuleView } from '../models/views/ModuleView';
import { ModuleCreateDTO } from '../shared/dtos/ModuleCreateDTO';
import { ModuleDetailedDTO } from '../shared/dtos/ModuleDetailedDTO';
import { ModuleEditDTO } from '../shared/dtos/ModuleEditDTO';
import { throwNotImplemented } from '../utilities/helpers';
import { ExamService } from './ExamService';
import { FileService } from './FileService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { VideoService } from './VideoService';

export class ModuleService {

    private _examService: ExamService;
    private _videoService: VideoService;
    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _fileService: FileService;

    constructor(
        examService: ExamService,
        videoService: VideoService,
        ormService: ORMConnectionService,
        mapperService: MapperService,
        fileService: FileService) {

        this._fileService = fileService;
        this._examService = examService;
        this._videoService = videoService;
        this._ormService = ormService;
        this._mapperService = mapperService;
    }

    /**
     * Gets a detailed module dto.
     */
    getModuleDetailedDTOAsync = async (moduleId: number): Promise<ModuleDetailedDTO> => {

        console.log('moduleId: ' + moduleId)

        const moduleData = await this._ormService
            .withResType<ModuleData>()
            .query(ModuleView, { moduleId })
            .select(ModuleData)
            .leftJoin(ModuleData, x => x
                .on('id', '=', 'moduleDataId', ModuleView))
            .where('moduleId', '=', 'moduleId')
            .getOneOrNull();

        if (!moduleData)
            throw new Error('Module not found')

        const moduleImage = await this._ormService
            .withResType<StorageFile>()
            .query(ModuleData, { moduleDataId: moduleData.id })
            .select(StorageFile)
            .leftJoin(StorageFile, x => x
                .on('id', '=', 'imageFileId', ModuleData))
            .where('id', '=', 'moduleDataId')
            .getOneOrNull();

        return this._mapperService
            .mapTo(ModuleDetailedDTO, [moduleData, moduleImage?.filePath]);
    };

    /**
     * get module edit dtos 
     * for module admin
     */
    getModuleEditDTOsAsync = async (courseId: number) => {

        const modules = await this._ormService
            .query(ModuleView, { courseId })
            .where('courseId', '=', 'courseId')
            .getMany();

        return this._mapperService
            .mapTo(ModuleEditDTO, [modules]);
    };

    // saveModuleAsync = async (dto: ModuleEditDTO, file?: UploadedFile) => {

    //     const moduleId = dto.versionId;

    //     await this._ormService
    //         .save(ModuleData, {
    //             id: dto.versionId,
    //             name: dto.name,
    //             description: dto.description
    //         });

    //     // save file 
    //     if (file) {

    //         const getModuleAsync = () => this._ormService
    //             .getSingleById(ModuleData, moduleId);

    //         const setModuleThumbnailIdAsync = (fileId: number) => this._ormService
    //             .save(ModuleData, {
    //                 id: moduleId,
    //                 imageFileId: fileId
    //             });

    //         await this._fileService
    //             .uploadAssigendFileAsync<ModuleData>(
    //                 this._fileService.getFilePath('module_images', 'module_image', dto.versionId, 'jpg'),
    //                 getModuleAsync,
    //                 setModuleThumbnailIdAsync,
    //                 module => module.imageFileId,
    //                 file.data);
    //     }
    // };
}