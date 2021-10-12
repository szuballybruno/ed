import { Request, Response } from "express";
import { AdminPageEditCourseDTO } from "../models/shared_models/AdminPageEditCourseDTO";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { RegisterUserDTO } from "../models/shared_models/RegisterUserDTO";
import { SaveQuestionAnswerDTO } from "../models/shared_models/SaveQuestionAnswerDTO";
import { UserDTO } from "../models/shared_models/UserDTO";
import { getAdminPageUsersList } from "../services/adminService";
import { getUserIdFromRequest, requestChangePasswordAsync, setAuthCookies } from "../services/authenticationService";
import { getEditedCourseAsync, getEditedVideoAsync, updateCourseAsync } from "../services/courseManagementService";
import { getCourseItemsAsync, getCurrentCourseItemDescriptorCodeAsync } from "../services/courseService";
import { getOrganizationsAsync, getOverviewPageDTOAsync, registerUserAsync, saveUserDataAsync } from "../services/dataService";
import { getUserPersonalityAssessmentDTOAsync } from "../services/personalityAssessmentService";
import { answerPractiseQuestionAsync, getPractiseQuestionAsync } from "../services/practiseQuestionsService";
import { getSignupDataAsync, answerSignupQuestionAsync } from "../services/signupService";
import { createRegistrationToken } from "../services/tokenService";
import { getUserById } from "../services/userService";
import { staticProvider } from "../staticProvider";
import { getAsyncActionHandler, withValueOrBadRequest } from "../utilities/helpers";

export const getPractiseQuestionAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);

    return await getPractiseQuestionAsync(userId);
});

export const registerUserAction = getAsyncActionHandler(async (req: Request, res: Response) => {

    const dto = withValueOrBadRequest(req.body) as RegisterUserDTO;

    const { accessToken, refreshToken } = await registerUserAsync(dto);

    setAuthCookies(res, accessToken, refreshToken);
});

export const getRegistrationLinkAction = getAsyncActionHandler(async (req: Request) => {

    return Promise.resolve(`${staticProvider.globalConfig.misc.frontendUrl}/registration?token=${createRegistrationToken()}`);
});

export const requestChangePasswordAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const dto = withValueOrBadRequest(req.body);
    const oldPassword = withValueOrBadRequest(dto.oldPassword);

    return await requestChangePasswordAsync(userId, oldPassword);
})

export const answerPractiseQuestionAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const dto = withValueOrBadRequest(req.body) as QuestionAnswerDTO;

    return answerPractiseQuestionAsync(userId, dto);
});

export const saveUserDataAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const dto = withValueOrBadRequest(req.body) as UserDTO;

    return saveUserDataAsync(userId, dto);
});

export const getCurrentCourseItemCode = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const code = await getCurrentCourseItemDescriptorCodeAsync(userId);

    return code;
});

export const getCourseItemsAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const code = await getCurrentCourseItemDescriptorCodeAsync(userId);
    const currentCourseId = (await getUserById(userId)).currentCourseId!;

    return getCourseItemsAsync(userId, currentCourseId, code!);
});

export const getEditedVideoAction = async (req: Request) => {

    const videoId = req.body.videoId

    return await getEditedVideoAsync(videoId);
};

export const getEditedCourseAction = async (req: Request) => {

    const courseId = req.body.courseId

    return await getEditedCourseAsync(courseId);
};

export const setEditedCourseAction = (req: Request) => {

    const adminPageEditCourseDTO = withValueOrBadRequest(req.body) as AdminPageEditCourseDTO;

    return updateCourseAsync(adminPageEditCourseDTO);
};

export const getOverviewPageDTOAction = async (req: Request) => {

    const userId = getUserIdFromRequest(req);

    return getOverviewPageDTOAsync(userId);
}

export const getUsersAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const adminPageUserDTOs = await getAdminPageUsersList(userId, (req.query.searchData as string) ?? "");

    return adminPageUserDTOs;
});

export const getUserPersonalityDataAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);

    return getUserPersonalityAssessmentDTOAsync(userId);
});

export const getOrganizationsAction = (req: Request) => {

    const userId = getUserIdFromRequest(req);

    return getOrganizationsAsync(userId);
}

export const getSignupDataAction = getAsyncActionHandler((req: Request) => {

    const token = withValueOrBadRequest(req.body.token);
    const isRegistration = withValueOrBadRequest(req.body.isRegistration);

    return getSignupDataAsync(token, isRegistration);
});

export const answerSignupQuestionAction = getAsyncActionHandler(async (req: Request) => {

    const dto = withValueOrBadRequest(req.body) as SaveQuestionAnswerDTO;
    const token = withValueOrBadRequest(dto.invitationToken);
    const questionAnswer = withValueOrBadRequest(dto.questionAnswer);

    await answerSignupQuestionAsync(token, questionAnswer);
});