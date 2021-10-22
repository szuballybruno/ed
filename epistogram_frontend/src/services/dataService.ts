import Cookies from "universal-cookie";
import { hasValue, useReactQuery } from "../frontendHelpers";
import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { AnswerResultDTO } from "../models/shared_models/AnswerResultDTO";
import { JobTitleDTO } from "../models/shared_models/JobTitleDTO";
import { OverviewPageDTO } from "../models/shared_models/OverviewPageDTO";
import { PersonalityAssessmentDTO } from "../models/shared_models/PersonalityAssessmentDTO";
import { QuestionDTO } from "../models/shared_models/QuestionDTO";
import { apiRoutes } from "../models/shared_models/types/apiRoutes";
import { UserDTO } from "../models/shared_models/UserDTO";
import { httpGetAsync, usePostData, usePostDataUnsafe } from "./httpClient";

export const useSaveUserData = () => {

    const postDataResult = usePostDataUnsafe<UserDTO, void>("/misc/save-user-data");

    const saveUserData = (firstName: string, lastName: string, phoneNumber: string) => {

        return postDataResult.postDataAsync({
            firstName: firstName,
            lastName,
            phoneNumber
        } as UserDTO);
    }

    return {
        saveUserDataState: postDataResult.state,
        saveUserData
    }
}

export const useSetNewPassword = () => {

    const postDataResult = usePostDataUnsafe("/misc/set-new-password");

    const setNewPassword = (password: string, passwordCompare: string, passwordResetToken: string) => {

        return postDataResult
            .postDataAsync({
                password,
                passwordCompare,
                passwordResetToken
            });
    }

    return {
        setNewPasswordState: postDataResult.state,
        setNewPassword
    }
}

export const useRequestChangePassword = () => {

    const postDataResult = usePostDataUnsafe("/misc/request-change-password");

    const requestChangePasswordAsync = (oldPassword: string) => {

        return postDataResult
            .postDataAsync({ oldPassword: oldPassword });
    }

    return {
        requestChangePasswordState: postDataResult.state,
        requestChangePasswordAsync
    }
}

export const useAnswerPractiseQuestion = () => {

    const postDataQuery = usePostData<AnswerQuestionDTO, AnswerResultDTO>("questions/answer-practise-question");

    const answerQuestionAsync = (answerId: number, questionId: number) => {

        const dto = {
            answerId,
            questionId
        } as AnswerQuestionDTO;

        return postDataQuery.postDataAsync(dto);
    }

    return {
        answerResults: postDataQuery.result,
        answerQuestionError: postDataQuery.error,
        answerQuestionState: postDataQuery.state,
        answerQuestionAsync,
        clearAnswerResults: postDataQuery.clearCache
    }
}

export const useCurrentCourseItemCode = () => {

    const qr = useReactQuery(
        ["getCurrentCourseItemCode"],
        () => httpGetAsync("/get-current-course-item-code"));

    return hasValue(qr.data) ? qr.data as string : null;
}

export const usePractiseQuestion = () => {

    const url = "/misc/get-practise-question";

    const qr = useReactQuery<QuestionDTO>(
        ["usePractiseQuestion"],
        () => httpGetAsync(url));

    return {
        practiseQuestion: qr.data,
        practiseQuestionState: qr.status,
        practiseQuestionError: qr.error,
        refetchPractiseQuestion: qr.refetch,
    };
}

export const usePersonalityData = () => {

    const qr = useReactQuery<PersonalityAssessmentDTO>(
        ["usePersonalityData"],
        () => httpGetAsync(apiRoutes.signup.getUserPersonalityData));

    return {
        personalityData: qr.data,
        personalityDataState: qr.status,
        personalityDataError: qr.error
    };
}

export const useLogout = () => {

    const qr = usePostDataUnsafe<void, void>(apiRoutes.misc.logoutUser);

    return {
        logoutUserState: qr.state,
        logoutUserAsync: qr.postDataAsync
    }
}

export const useUserId = () => {

    const cookies = new Cookies();
    const userId = cookies.get("userId");

    return userId ? userId as number : null;
}

export const useJobTitles = () => {

    const queryRes = useReactQuery<JobTitleDTO[]>(
        ["jobTitlesQuery"],
        () => httpGetAsync(apiRoutes.misc.getJobTitles));

    return {
        jobTitles: queryRes.data ?? [],
        jobTitlesStatus: queryRes.status,
        jobTitlesError: queryRes.error
    }
}

export const useOverviewPageDTO = () => {

    const queryRes = useReactQuery<OverviewPageDTO>(
        ["overviewPageDTOQuery"],
        () => httpGetAsync("data/get-overview-page-dto"));

    return {
        pageDTO: queryRes.data,
        status: queryRes.status,
        error: queryRes.error
    }
}