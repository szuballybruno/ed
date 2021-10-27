import { Request } from "express";
import { Course } from "../models/entity/Course";
import { Exam } from "../models/entity/Exam";
import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { Video } from "../models/entity/Video";
import { CourseEditDataDTO as CourseEditDataDTO } from "../models/shared_models/CourseEditDataDTO";
import { CreateCourseDTO } from "../models/shared_models/CreateCourseDTO";
import { IdResultDTO } from "../models/shared_models/IdResultDTO";
import { CourseModeType } from "../models/shared_models/types/sharedTypes";
import { getUserIdFromRequest } from "../services/authenticationService";
import { getAdminCoursesAsync, getAvailableCoursesAsync, getCourseEditDataAsync, getUserCoursesDataAsync, setCourseTypeAsync, startCourseAsync } from "../services/courseService"
import { deleteExamsAsync } from "../services/examService";
import { deleteVideosAsync } from "../services/videoService";
import { staticProvider } from "../staticProvider";
import { ActionParamsType, getAsyncActionHandler, withValueOrBadRequest } from "../utilities/helpers";

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

    // save video orders
    await staticProvider
        .ormConnection
        .getRepository(Video)
        .save(dto
            .courseItems
            .filter(x => x.type === "video")
            .map(x => ({
                id: x.id,
                orderIndex: x.orderIndex
            } as Video)));

    // save exam orders
    await staticProvider
        .ormConnection
        .getRepository(Exam)
        .save(dto
            .courseItems
            .filter(x => x.type === "exam")
            .map(x => ({
                id: x.id,
                orderIndex: x.orderIndex
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

export const setCourseTypeAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const courseId = withValueOrBadRequest<number>(req.query.courseId, "number");
    const modeType = withValueOrBadRequest<CourseModeType>(req.query.mode);

    return setCourseTypeAsync(userId, courseId, modeType);
});

export const getUserCoursesDataAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);

    return getUserCoursesDataAsync(userId);
});