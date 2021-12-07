import { UploadedFile } from "express-fileupload";
import { Course } from "../models/entity/Course";
import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { CourseBriefData } from "../models/shared_models/CourseBriefData";
import { getOrganizationsAsync, getOverviewPageDTOAsync } from "../services/dataService";
import { getFilePath, uploadAssigendFileAsync } from "../services/fileService";
import { answerPractiseQuestionAsync } from "../services/practiseQuestionsService";
import { staticProvider } from "../staticProvider";
import { ActionParams, withValueOrBadRequest } from "../utilities/helpers";

export const answerPractiseQuestionAction = async (params: ActionParams) => {

    const dto = withValueOrBadRequest<AnswerQuestionDTO>(params.req.body);

    return answerPractiseQuestionAsync(params.userId, dto);
};

export const getCurrentCourseItemCodeAction = async (parms: ActionParams) => {

    const currentBridge = await staticProvider
        .ormConnection
        .getRepository(UserCourseBridge)
        .findOne({
            where: {
                isCurrent: true,
                userId: parms.userId
            }
        });

    if (!currentBridge)
        return null;

    return currentBridge.currentItemCode;
};

export const saveCourseThumbnailAction = async (params: ActionParams) => {

    const file = withValueOrBadRequest<UploadedFile>(params.req.files?.file);
    const courseId = withValueOrBadRequest<number>(params.req.body.courseId, "number");

    const getCourseAsync = () => staticProvider
        .ormConnection
        .getRepository(Course)
        .findOneOrFail(courseId);

    const setCourseThumbnailIdAsync = (thumbnailFileId: number) => staticProvider
        .ormConnection
        .getRepository(Course)
        .save({
            id: courseId,
            coverFileId: thumbnailFileId
        });

    return uploadAssigendFileAsync<Course>(
        getFilePath("courseCoverImages", "courseCoverImage", courseId, ".jpg"),
        getCourseAsync,
        setCourseThumbnailIdAsync,
        course => course.coverFileId,
        file.data);
}

export const getCourseBriefDataAction = async (params: ActionParams) => {

    const courseId = withValueOrBadRequest<number>(params.req?.query?.courseId, "number");

    const course = await staticProvider
        .ormConnection
        .getRepository(Course)
        .findOneOrFail(courseId);

    return {
        id: course.id,
        title: course.title
    } as CourseBriefData;
};

export const getOverviewPageDTOAction = async (params: ActionParams) => {

    return getOverviewPageDTOAsync(params.userId);
}

export const getOrganizationsAction = (params: ActionParams) => {

    return getOrganizationsAsync(params.userId);
}