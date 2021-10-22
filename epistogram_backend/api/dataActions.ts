import { Request, Response } from "express";
import { EditCourseDataDTO } from "../models/shared_models/AdminPageEditCourseDTO";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { RegisterInvitedUserDTO } from "../models/shared_models/RegisterInvitedUser";
import { RegisterUserDTO } from "../models/shared_models/RegisterUserDTO";
import { SaveQuestionAnswerDTO } from "../models/shared_models/SaveQuestionAnswerDTO";
import { UserDTO } from "../models/shared_models/UserDTO";
import { getAdminPageUsersList } from "../services/adminService";
import { getUserIdFromRequest, requestChangePasswordAsync, setAuthCookies } from "../services/authenticationService";
import { getEditedCourseAsync, getEditedVideoAsync, updateCourseAsync } from "../services/courseManagementService";
import { getCourseItemsAsync, getCurrentCourseItemDescriptorCodeAsync } from "../services/courseService";
import { getOrganizationsAsync, getOverviewPageDTOAsync, registerInvitedUserAsync, registerUserAsync, saveUserDataAsync } from "../services/dataService";
import { getUserPersonalityAssessmentDTOAsync } from "../services/personalityAssessmentService";
import { answerPractiseQuestionAsync, getPractiseQuestionAsync } from "../services/practiseQuestionsService";
import { getSignupDataAsync, answerSignupQuestionAsync } from "../services/signupService";
import { createRegistrationToken } from "../services/tokenService";
import { getUserById } from "../services/userService";
import { staticProvider } from "../staticProvider";
import { ActionParamsType, getAsyncActionHandler, withValueOrBadRequest } from "../utilities/helpers";
import { log } from "../services/misc/logger";
import { Course } from "../models/entity/Course";
import { CourseBriefData } from "../models/shared_models/CourseBriefData";
import { Video } from "../models/entity/Video";
import { Exam } from "../models/entity/Exam";
import { UploadedFile } from "express-fileupload";
import { getFilePath, uploadAssigendFileAsync } from "../services/fileService";

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
    const dto = withValueOrBadRequest<QuestionAnswerDTO>(req.body);

    return answerPractiseQuestionAsync(userId, dto);
});

export const saveUserDataAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const dto = withValueOrBadRequest<UserDTO>(req.body);

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

export const getEditedCourseAction = async (params: ActionParamsType) => {

    const courseId = withValueOrBadRequest<number>(params.req?.query?.courseId, "number");

    return await getEditedCourseAsync(courseId);
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
        file);
}

export const saveCourseDataAction = async (params: ActionParamsType) => {

    const dto = withValueOrBadRequest<EditCourseDataDTO>(params.req?.body);

    // save basic info
    await staticProvider
        .ormConnection
        .getRepository(Course)
        .save({
            id: dto.courseId,
            title: dto.title,
            category: dto.category,
            courseGroup: dto.courseGroup
        });

    // const course = await staticProvider
    //     .ormConnection
    //     .getRepository(Course)
    //     .createQueryBuilder("c")
    //     .leftJoinAndSelect("c.videos", "v")
    //     .leftJoinAndSelect("c.exams", "e")
    //     .getOneOrFail();

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

export const setEditedCourseAction = (req: Request) => {

    const adminPageEditCourseDTO = withValueOrBadRequest<EditCourseDataDTO>(req.body);

    return updateCourseAsync(adminPageEditCourseDTO);
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
