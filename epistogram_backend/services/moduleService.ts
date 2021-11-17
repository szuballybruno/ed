import { CourseModule } from "../models/entity/CourseModule";
import { Exam } from "../models/entity/Exam";
import { Video } from "../models/entity/Video";
import { ModuleAdminEditDTO } from "../models/shared_models/ModuleAdminEditDTO";
import { ModuleCreateDTO } from "../models/shared_models/ModuleCreateDTO";
import { staticProvider } from "../staticProvider";
import { deleteExamsAsync } from "./examService";
import { deleteVideosAsync } from "./videoService";

export const deleteModulesAsync = async (moduleIds: number[]) => {

    // delete videos 
    const videos = await staticProvider
        .ormConnection
        .getRepository(Video)
        .createQueryBuilder("v")
        .where('"v"."moduleId" IN (:...moduleIds)', { moduleIds })
        .getMany();

    await deleteVideosAsync(videos.map(x => x.id), false);

    // delete exams 
    const exams = await staticProvider
        .ormConnection
        .getRepository(Exam)
        .createQueryBuilder("e")
        .where('"e"."moduleId" IN (:...moduleIds)', { moduleIds })
        .getMany();

    await deleteExamsAsync(exams.map(x => x.id), false);

    // delete modules
    await staticProvider
        .ormConnection
        .getRepository(CourseModule)
        .delete(moduleIds);
}

export const createModuleAsync = async (dto: ModuleCreateDTO) => {

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

export const getModuleEditDataAsync = async (moduleId: number) => {

    const module = await staticProvider
        .ormConnection
        .getRepository(CourseModule)
        .findOneOrFail(moduleId);

    return staticProvider.mapperService.useMapperFunction(CourseModule, ModuleAdminEditDTO, module);
}

export const saveModuleAsync = async (dto: ModuleAdminEditDTO) => {

    await staticProvider
        .ormConnection
        .getRepository(CourseModule)
        .save({
            id: dto.id,
            name: dto.name,
            description: dto.description
        });
}