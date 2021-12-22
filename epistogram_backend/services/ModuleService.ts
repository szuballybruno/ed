import { CourseModule } from "../models/entity/CourseModule";
import { Exam } from "../models/entity/Exam";
import { Video } from "../models/entity/Video";
import { ModuleAdminEditDTO } from "../models/shared_models/ModuleAdminEditDTO";
import { ModuleCreateDTO } from "../models/shared_models/ModuleCreateDTO";
import { ModuleDetailedDTO } from "../models/shared_models/ModuleDetailedDTO";
import { ExamService } from "./ExamService";
import { MapperService } from "./MapperService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";
import { VideoService } from "./VideoService";

export class ModuleService {

    private _examService: ExamService;
    private _videoService: VideoService;
    private _ormSerice: ORMConnectionService;
    private _mapperService: MapperService;

    constructor(
        examService: ExamService,
        videoService: VideoService,
        ormService: ORMConnectionService,
        mapperService: MapperService) {

        this._examService = examService;
        this._videoService = videoService;
        this._ormSerice = ormService;
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

        const module = await this._ormSerice
            .getRepository(CourseModule)
            .findOneOrFail(moduleId);

        return this._mapperService
            .map(CourseModule, ModuleDetailedDTO, module);
    }

    deleteModulesAsync = async (moduleIds: number[]) => {

        // delete videos 
        const videos = await this._ormSerice
            .getRepository(Video)
            .createQueryBuilder("v")
            .where('"v"."module_id" IN (:...moduleIds)', { moduleIds })
            .getMany();

        await this._videoService.deleteVideosAsync(videos.map(x => x.id), false);

        // delete exams 
        const exams = await this._ormSerice
            .getRepository(Exam)
            .createQueryBuilder("e")
            .where('"e"."module_id" IN (:...moduleIds)', { moduleIds })
            .getMany();

        await this._examService
            .deleteExamsAsync(exams.map(x => x.id), false);

        // delete modules
        await this._ormSerice
            .getRepository(CourseModule)
            .delete(moduleIds);
    }

    createModuleAsync = async (dto: ModuleCreateDTO) => {

        await this._ormSerice
            .getRepository(CourseModule)
            .insert({
                courseId: dto.courseId,
                name: dto.name,
                orderIndex: dto.orderIndex,
                description: ""
            });
    }

    getModuleEditDataAsync = async (moduleId: number) => {

        const module = await this._ormSerice
            .getRepository(CourseModule)
            .findOneOrFail(moduleId);

        return this._mapperService
            .map(CourseModule, ModuleAdminEditDTO, module);
    }

    saveModuleAsync = async (dto: ModuleAdminEditDTO) => {

        await this._ormSerice
            .getRepository(CourseModule)
            .save({
                id: dto.id,
                name: dto.name,
                description: dto.description
            });
    }
}