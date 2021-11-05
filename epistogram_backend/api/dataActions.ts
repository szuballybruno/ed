import { UploadedFile } from "express-fileupload";
import { Course } from "../models/entity/Course";
import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { CourseBriefData } from "../models/shared_models/CourseBriefData";
import { RegisterInvitedUserDTO } from "../models/shared_models/RegisterInvitedUser";
import { RegisterUserDTO } from "../models/shared_models/RegisterUserDTO";
import { setAuthCookies } from "../services/authenticationService";
import { getCourseItemCode } from "../services/courseService";
import { getOrganizationsAsync, getOverviewPageDTOAsync, registerInvitedUserAsync, registerUserAsync } from "../services/dataService";
import { getFilePath, uploadAssigendFileAsync } from "../services/fileService";
import { answerPractiseQuestionAsync } from "../services/practiseQuestionsService";
import { staticProvider } from "../staticProvider";
import { ActionParamsType, withValueOrBadRequest } from "../utilities/helpers";

export const registerUserAction = async (params: ActionParamsType) => {

    const dto = withValueOrBadRequest<RegisterUserDTO>(params.req.body);

    const { accessToken, refreshToken } = await registerUserAsync(dto);

    setAuthCookies(params.res, accessToken, refreshToken);
};

export const registerInvitedUserAction = async (params: ActionParamsType) => {

    const dto = withValueOrBadRequest<RegisterInvitedUserDTO>(params.req.body);

    const { accessToken, refreshToken } = await registerInvitedUserAsync(dto);

    setAuthCookies(params.res, accessToken, refreshToken);
};

export const answerPractiseQuestionAction = async (params: ActionParamsType) => {

    const dto = withValueOrBadRequest<AnswerQuestionDTO>(params.req.body);

    return answerPractiseQuestionAsync(params.userId, dto);
};

export const getCurrentCourseItemCodeAction = async (parms: ActionParamsType) => {

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

    return getCourseItemCode(currentBridge.currentVideoId, currentBridge.currentExamId);
};

export const saveCourseThumbnailAction = async (params: ActionParamsType) => {

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

export const getCourseBriefDataAction = async (params: ActionParamsType) => {

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

export const getOverviewPageDTOAction = async (params: ActionParamsType) => {

    return getOverviewPageDTOAsync(params.userId);
}

export const getOrganizationsAction = (params: ActionParamsType) => {

    return getOrganizationsAsync(params.userId);
}