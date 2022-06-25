import { UploadedFile } from 'express-fileupload';
import { CourseData } from '../models/entity/course/CourseData';
import { ModuleData } from '../models/entity/module/ModuleData';
import { StorageFile } from '../models/entity/StorageFile';
import { ModuleView } from '../models/views/ModuleView';
import { AdminModuleShortDTO } from '../shared/dtos/AdminModuleShortDTO';
import { ModuleAdminEditDTO } from '../shared/dtos/ModuleAdminEditDTO';
import { ModuleCreateDTO } from '../shared/dtos/ModuleCreateDTO';
import { ModuleDetailedDTO } from '../shared/dtos/ModuleDetailedDTO';
import { ModuleListEditDataDTO } from '../shared/dtos/ModuleListEditDataDTO';
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
     *
     * @param {number} userId userId.
     * @param {number} moduleId moduleId.
     * @returns {Promise<ModuleDetailedDTO>} holds valuable information about the module.
     */
    getModuleDetailedDTOAsync = async (moduleId: number): Promise<ModuleDetailedDTO> => {

        console.log('moduleId: ' + moduleId)

        const module = await this._ormService
            .withResType<ModuleData>()
            .query(ModuleView, { moduleId })
            .select(ModuleData)
            .leftJoin(ModuleData, x => x
                .on('id', '=', 'moduleDataId', ModuleView))
            .leftJoin(StorageFile, x => x
                .on('id', '=', 'imageFileId', ModuleData))
            .where('moduleId', '=', 'moduleId')
            .getOneOrNull();

        return this._mapperService
            .map(ModuleData, ModuleDetailedDTO, module);
    };

    deleteModulesAsync = async (moduleIds: number[]) => {

        // // delete videos 
        // const videos = await this._ormService
        //     .getRepository(Video)
        //     .createQueryBuilder('v')
        //     .where('"v"."module_id" IN (:...moduleIds)', { moduleIds })
        //     .getMany();

        // // await this._videoService.deleteVideosAsync(videos.map(x => x.id), false);

        // // delete exams 
        // const exams = await this._ormService
        //     .getRepository(Exam)
        //     .createQueryBuilder('e')
        //     .where('"e"."module_id" IN (:...moduleIds)', { moduleIds })
        //     .getMany();

        // await this._examService
        //     .softDeleteExamsAsync(exams.map(x => x.id), false);

        // delete modules
        await this._ormService
            .softDelete(ModuleData, moduleIds);
    };

    createModuleAsync = async (dto: ModuleCreateDTO) => {

        throwNotImplemented();
        // await this._ormService
        //     .getRepository(ModuleData)
        //     .insert({
        //         courseId: dto.courseId,
        //         name: dto.name,
        //         orderIndex: dto.orderIndex,
        //         description: ''
        //     });
    };

    getModuleEditDataAsync = async (moduleId: number) => {

        const module = await this._ormService
            .withResType<ModuleData>()
            .query(ModuleView, { moduleId })
            .select(ModuleData)
            .where('moduleId', '=', 'moduleId')
            .leftJoin(ModuleData, x => x
                .on('id', '=', 'moduleDataId', ModuleView))
            .leftJoin(StorageFile, x => x
                .on('id', '=', 'imageFileId', ModuleData))
            .getOneOrNull();

        return this._mapperService
            .map(ModuleData, ModuleAdminEditDTO, module);
    };

    saveModuleAsync = async (dto: ModuleAdminEditDTO, file?: UploadedFile) => {

        const moduleId = dto.id;

        await this._ormService
            .save(ModuleData, {
                id: dto.id,
                name: dto.name,
                description: dto.description
            });

        // save file 
        if (file) {

            const getModuleAsync = () => this._ormService
                .getSingleById(ModuleData, moduleId);

            const setModuleThumbnailIdAsync = (fileId: number) => this._ormService
                .save(ModuleData, {
                    id: moduleId,
                    imageFileId: fileId
                });

            await this._fileService
                .uploadAssigendFileAsync<ModuleData>(
                    this._fileService.getFilePath('module_images', 'module_image', dto.id, 'jpg'),
                    getModuleAsync,
                    setModuleThumbnailIdAsync,
                    module => module.imageFileId,
                    file.data);
        }
    };

    getModuleListEditDataAsync = async (courseId: number) => {

        const modules = await this._ormService
            .query(ModuleView, { courseId })
            .where('courseId', '=', 'courseId')
            .getMany();

        const course = await this._ormService
            .getSingleById(CourseData, courseId);

        const moduleDTOs = this._mapperService
            .mapMany(ModuleView, AdminModuleShortDTO, modules);

        return {
            courseName: course.title,
            modules: moduleDTOs
        } as ModuleListEditDataDTO;
    };
}