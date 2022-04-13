import { UploadedFile } from 'express-fileupload';
import { Course } from '../models/entity/Course';
import { CourseModule } from '../models/entity/CourseModule';
import { Exam } from '../models/entity/Exam';
import { Video } from '../models/entity/Video';
import { ModuleView } from '../models/views/ModuleView';
import { AdminModuleShortDTO } from '../shared/dtos/AdminModuleShortDTO';
import { ModuleAdminEditDTO } from '../shared/dtos/ModuleAdminEditDTO';
import { ModuleCreateDTO } from '../shared/dtos/ModuleCreateDTO';
import { ModuleDetailedDTO } from '../shared/dtos/ModuleDetailedDTO';
import { ModuleListEditDataDTO } from '../shared/dtos/ModuleListEditDataDTO';
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
     * @return {ModuleDetailedDTO} holds valuable information about the module.
     */
    getModuleDetailedDTOAsync = async (moduleId: number) => {

        const module = await this._ormService
            .getRepository(CourseModule)
            .createQueryBuilder('mo')
            .where('mo.id = :moduleId', { moduleId })
            .leftJoinAndSelect('mo.imageFile', 'if')
            .getOneOrFail();

        return this._mapperService
            .map(CourseModule, ModuleDetailedDTO, module);
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
            .softDelete(CourseModule, moduleIds);
    };

    createModuleAsync = async (dto: ModuleCreateDTO) => {

        await this._ormService
            .getRepository(CourseModule)
            .insert({
                courseId: dto.courseId,
                name: dto.name,
                orderIndex: dto.orderIndex,
                description: ''
            });
    };

    getModuleEditDataAsync = async (moduleId: number) => {

        const module = await this._ormService
            .getRepository(CourseModule)
            .createQueryBuilder('mo')
            .where('mo.id = :moduleId', { moduleId })
            .leftJoinAndSelect('mo.imageFile', 'if')
            .getOneOrFail();

        return this._mapperService
            .map(CourseModule, ModuleAdminEditDTO, module);
    };

    saveModuleAsync = async (dto: ModuleAdminEditDTO, file?: UploadedFile) => {

        const moduleId = dto.id;

        await this._ormService
            .getRepository(CourseModule)
            .save({
                id: dto.id,
                name: dto.name,
                description: dto.description
            });

        // save file 
        if (file) {

            const getModuleAsync = () => this._ormService
                .getSingleById(CourseModule, moduleId);

            const setModuleThumbnailIdAsync = (fileId: number) => this._ormService
                .getRepository(CourseModule)
                .save({
                    id: moduleId,
                    imageFileId: fileId
                });

            await this._fileService
                .uploadAssigendFileAsync<CourseModule>(
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
            .getSingleById(Course, courseId);

        const moduleDTOs = this._mapperService
            .mapMany(ModuleView, AdminModuleShortDTO, modules);

        return {
            courseName: course.title,
            modules: moduleDTOs
        } as ModuleListEditDataDTO;
    };
}