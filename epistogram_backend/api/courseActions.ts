import { Course } from "../models/entity/Course";
import { CourseModule } from "../models/entity/CourseModule";
import { Exam } from "../models/entity/Exam";
import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { Video } from "../models/entity/Video";
import { CourseEditDataDTO as CourseEditDataDTO } from "../models/shared_models/CourseEditDataDTO";
import { CreateCourseDTO } from "../models/shared_models/CreateCourseDTO";
import { IdResultDTO } from "../models/shared_models/IdResultDTO";
import { ModuleCreateDTO } from "../models/shared_models/ModuleCreateDTO";
import { ModuleDTO } from "../models/shared_models/ModuleDTO";
import { CourseModeType } from "../models/shared_models/types/sharedTypes";
import { getAdminCoursesAsync, getAvailableCoursesAsync, getCourseEditDataAsync, getCourseProgressDataAsync, setCourseTypeAsync, startCourseAsync } from "../services/courseService";
import { deleteExamsAsync } from "../services/examService";
import { toCourseDetailsDTO } from "../services/mappings";
import { deleteVideosAsync } from "../services/videoService";
import { staticProvider } from "../staticProvider";
import { ActionParamsType, withValueOrBadRequest } from "../utilities/helpers";

export const startCourseAction = async (params: ActionParamsType) => {

    const courseId = withValueOrBadRequest<IdResultDTO>(params.req.body).id;

    return startCourseAsync(params.userId, courseId);
};

export const getAvailableCoursesAction = async (params: ActionParamsType) => {

    return getAvailableCoursesAsync(params.userId);
};

export const getCourseEditDataAction = async (params: ActionParamsType) => {

    const courseId = withValueOrBadRequest<number>(params.req?.query?.courseId, "number");

    return await getCourseEditDataAsync(courseId);
};

export const getAdminCourseListAction = (params: ActionParamsType) => {

    return getAdminCoursesAsync();
}

export const getCourseDetailsAction = async (params: ActionParamsType) => {

    const courseId = withValueOrBadRequest<number>(params.req.query.courseId, "number");

    const course = await staticProvider
        .ormConnection
        .getRepository(Course)
        .createQueryBuilder("c")
        .leftJoinAndSelect("c.category", "cat")
        .leftJoinAndSelect("c.subCategory", "scat")
        .where("c.id = :courseId", { courseId })
        .getOneOrFail();

    return toCourseDetailsDTO(course);
}

export const addModuleAction = async (params: ActionParamsType) => {

    const dto = withValueOrBadRequest<ModuleCreateDTO>(params.req?.body);

    await staticProvider
        .ormConnection
        .getRepository(CourseModule)
        .insert({
            courseId: dto.courseId,
            name: dto.name,
            orderIndex: dto.orderIndex
        });
}

export const saveCourseAction = async (params: ActionParamsType) => {

    const dto = withValueOrBadRequest<CourseEditDataDTO>(params.req?.body);

    // save basic info
    await staticProvider
        .ormConnection
        .getRepository(Course)
        .save({
            id: dto.courseId,
            title: dto.title,
            categoryId: dto.category.id,
            subCategoryId: dto.subCategory.id
        });

    // save module order index 
    await staticProvider
        .ormConnection
        .getRepository(CourseModule)
        .save(dto
            .modules
            .map(x => ({
                id: x.id,
                orderIndex: x.orderIndex
            } as CourseModule)));

    // save video orders
    await staticProvider
        .ormConnection
        .getRepository(Video)
        .save(dto
            .modules
            .flatMap(x => x.items)
            .filter(x => x.type === "video")
            .map(x => ({
                id: x.id,
                orderIndex: x.orderIndex,
                moduleId: x.moduleId
            } as Video)));

    // save exam orders
    await staticProvider
        .ormConnection
        .getRepository(Exam)
        .save(dto
            .modules
            .flatMap(x => x.items)
            .filter(x => x.type === "exam")
            .map(x => ({
                id: x.id,
                orderIndex: x.orderIndex,
                moduleId: x.moduleId
            } as Video)));
};

export const deleteCourseAction = async (params: ActionParamsType) => {

    const courseId = withValueOrBadRequest<IdResultDTO>(params.req.body).id;

    // delete course bridges
    await staticProvider
        .ormConnection
        .createQueryBuilder()
        .delete()
        .from(UserCourseBridge)
        .where("courseId = :courseId", { courseId })
        .execute();

    // delete videos 
    const videos = await staticProvider
        .ormConnection
        .getRepository(Video)
        .find({
            where: {
                courseId
            }
        });

    await deleteVideosAsync(videos.map(x => x.id), false);

    // delete exams 
    const exams = await staticProvider
        .ormConnection
        .getRepository(Exam)
        .find({
            where: {
                courseId
            }
        });

    await deleteExamsAsync(exams.map(x => x.id), false);

    // delete course 
    await staticProvider
        .ormConnection
        .getRepository(Course)
        .delete(courseId);
}

export const createCourseAction = async (params: ActionParamsType) => {

    const dto = withValueOrBadRequest<CreateCourseDTO>(params.req.body);

    await staticProvider
        .ormConnection
        .getRepository(Course)
        .insert({
            title: dto.title,
            teacherId: 1,
            categoryId: 1,
            subCategoryId: 1,
        });
}

export const setCourseTypeAction = async (params: ActionParamsType) => {

    const courseId = withValueOrBadRequest<number>(params.req.query.courseId, "number");
    const modeType = withValueOrBadRequest<CourseModeType>(params.req.query.mode);

    return setCourseTypeAsync(params.userId, courseId, modeType);
};

export const getCourseProgressDataAction = async (params: ActionParamsType) => {

    return getCourseProgressDataAsync(params.userId);
};