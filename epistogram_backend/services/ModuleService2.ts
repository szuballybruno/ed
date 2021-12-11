import { CourseModule } from "../models/entity/CourseModule";
import { Exam } from "../models/entity/Exam";
import { Video } from "../models/entity/Video";
import { ModuleAdminEditDTO } from "../models/shared_models/ModuleAdminEditDTO";
import { ModuleCreateDTO } from "../models/shared_models/ModuleCreateDTO";
import { ModuleDetailedDTO } from "../models/shared_models/ModuleDetailedDTO";
import { staticProvider } from "../staticProvider";
import { ExamService } from "./ExamService2";
import { VideoService } from "./VideoService2";

export class ModuleService {

    private _examService: ExamService;
    private _videoService: VideoService;

    constructor(examService: ExamService, videoService: VideoService) {

        this._examService = examService;
        this._videoService = videoService;
    }

    /**
     * Gets a detailed module dto.
     *
     * @param {number} userId userId.
     * @param {number} moduleId moduleId.
     * @return {ModuleDetailedDTO} holds valuable information about the module.
     */
    getModuleDetailedDTOAsync = async (moduleId: number) => {

        const module = await staticProvider
            .ormConnection
            .getRepository(CourseModule)
            .findOneOrFail(moduleId);

        return staticProvider
            .services
            .mapperService
            .map(CourseModule, ModuleDetailedDTO, module);
    }

    deleteModulesAsync = async (moduleIds: number[]) => {

        // delete videos 
        const videos = await staticProvider
            .ormConnection
            .getRepository(Video)
            .createQueryBuilder("v")
            .where('"v"."module_id" IN (:...moduleIds)', { moduleIds })
            .getMany();

        await this._videoService.deleteVideosAsync(videos.map(x => x.id), false);

        // delete exams 
        const exams = await staticProvider
            .ormConnection
            .getRepository(Exam)
            .createQueryBuilder("e")
            .where('"e"."module_id" IN (:...moduleIds)', { moduleIds })
            .getMany();

        await this._examService
            .deleteExamsAsync(exams.map(x => x.id), false);

        // delete modules
        await staticProvider
            .ormConnection
            .getRepository(CourseModule)
            .delete(moduleIds);
    }

    createModuleAsync = async (dto: ModuleCreateDTO) => {

        await staticProvider
            .ormConnection
            .getRepository(CourseModule)
            .insert({
                courseId: dto.courseId,
                name: dto.name,
                orderIndex: dto.orderIndex,
                description: ""
            });
    }

    getModuleEditDataAsync = async (moduleId: number) => {

        const module = await staticProvider
            .ormConnection
            .getRepository(CourseModule)
            .findOneOrFail(moduleId);

        return staticProvider
            .services
            .mapperService
            .map(CourseModule, ModuleAdminEditDTO, module);
    }

    saveModuleAsync = async (dto: ModuleAdminEditDTO) => {

        await staticProvider
            .ormConnection
            .getRepository(CourseModule)
            .save({
                id: dto.id,
                name: dto.name,
                description: dto.description
            });
    }
}