import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { Course } from "../models/entity/Course";
import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { CourseBriefData } from "../models/shared_models/CourseBriefData";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { RegisterInvitedUserDTO } from "../models/shared_models/RegisterInvitedUser";
import { RegisterUserDTO } from "../models/shared_models/RegisterUserDTO";
import { SaveQuestionAnswerDTO } from "../models/shared_models/SaveQuestionAnswerDTO";
import { UserDTO } from "../models/shared_models/UserDTO";
import { getUserIdFromRequest, requestChangePasswordAsync, setAuthCookies } from "../services/authenticationService";
import { getCourseItemCode, getCurrentCourseItemsAsync } from "../services/courseService";
import { getOrganizationsAsync, getOverviewPageDTOAsync, registerInvitedUserAsync, registerUserAsync, saveUserDataAsync } from "../services/dataService";
import { getFilePath, uploadAssigendFileAsync } from "../services/fileService";
import { getUserPersonalityAssessmentDTOAsync } from "../services/personalityAssessmentService";
import { answerPractiseQuestionAsync, getPractiseQuestionAsync } from "../services/practiseQuestionsService";
import { answerSignupQuestionAsync, getSignupDataAsync } from "../services/signupService";
import { createRegistrationToken } from "../services/tokenService";
import { staticProvider } from "../staticProvider";
import { ActionParamsType, getAsyncActionHandler, withValueOrBadRequest } from "../utilities/helpers";

export const getPractiseQuestionAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);

    return await getPractiseQuestionAsync(userId);
});

export const registerUserAction = getAsyncActionHandler(async (req: Request, res: Response) => {

    const dto = withValueOrBadRequest<RegisterUserDTO>(req.body);

    const { accessToken, refreshToken } = await registerUserAsync(dto);

    setAuthCookies(res, accessToken, refreshToken);
});

export const registerInvitedUserAction = getAsyncActionHandler(async (req: Request, res: Response) => {

    const dto = withValueOrBadRequest<RegisterInvitedUserDTO>(req.body);

    const { accessToken, refreshToken } = await registerInvitedUserAsync(dto);

    setAuthCookies(res, accessToken, refreshToken);
});

export const getRegistrationLinkAction = getAsyncActionHandler(async (req: Request) => {

    return Promise.resolve(`${staticProvider.globalConfig.misc.frontendUrl}/registration?token=${createRegistrationToken()}`);
});

export const requestChangePasswordAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const dto = withValueOrBadRequest<any>(req.body);
    const oldPassword = withValueOrBadRequest<string>(dto.oldPassword);

    return await requestChangePasswordAsync(userId, oldPassword);
})

export const answerPractiseQuestionAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const dto = withValueOrBadRequest<AnswerQuestionDTO>(req.body);

    return answerPractiseQuestionAsync(userId, dto);
});

export const saveUserDataAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const dto = withValueOrBadRequest<UserDTO>(req.body);

    return saveUserDataAsync(userId, dto);
});

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

export const getCourseItemsAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);

    return getCurrentCourseItemsAsync(userId);
});

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

export const getOverviewPageDTOAction = async (req: Request) => {

    const userId = getUserIdFromRequest(req);

    return getOverviewPageDTOAsync(userId);
}

export const getUserPersonalityDataAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);

    return getUserPersonalityAssessmentDTOAsync(userId);
});

export const getOrganizationsAction = (req: Request) => {

    const userId = getUserIdFromRequest(req);

    return getOrganizationsAsync(userId);
}

export const getSignupDataAction = getAsyncActionHandler((req: Request) => {

    const userId = getUserIdFromRequest(req);

    return getSignupDataAsync(userId);
});

export const answerSignupQuestionAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const dto = withValueOrBadRequest<SaveQuestionAnswerDTO>(req.body);
    const questionAnswer = withValueOrBadRequest<QuestionAnswerDTO>(dto.questionAnswer);

    await answerSignupQuestionAsync(userId, questionAnswer);
});
