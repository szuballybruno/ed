import { useEffect } from 'react';
import { SurveyApiService } from '../../services/api/SurveyApiService';
import { AnswerSignupQuestionDTO } from '../../shared/dtos/AnswerSignupQuestionDTO';
import { Id } from '../../shared/types/versionId';
import { SingupQuestionSlides, useSignupQuestionsState } from '../exam/SingupQuestionSlides';

export const SurveyQuestions = (props: {
    onPrevoiusOverNavigation: () => void,
    onNextOverNavigation: () => void,
    onJumpToResults: () => void
}) => {

    const {
        onNextOverNavigation,
        onPrevoiusOverNavigation,
        onJumpToResults
    } = props;

    const { surveyData, refetchSurveyData, surveyDataError, surveyDataStatus } = SurveyApiService.useSurveyData();
    const { correctAnswerId, postSurveyAnswerAsync, postSurveyAnswerStatus } = SurveyApiService.useAnswerSurveyQuestion();

    const questions = surveyData?.questions ?? [];

    const handleSaveSelectedAnswerAsync = async (answerVersionId: Id<'AnswerVersion'>, questionVersionId: Id<'QuestionVersion'>) => {

        const dto = {
            answerVersionId,
            questionVersionId
        } as AnswerSignupQuestionDTO;

        await postSurveyAnswerAsync(dto);
        await refetchSurveyData();
    };

    const state = useSignupQuestionsState({
        questions: questions,
        answerQuestionAsync: handleSaveSelectedAnswerAsync,
        upperTitle: 'Személyes tanulási stílus felmérése',
        onPrevoiusOverNavigation: onPrevoiusOverNavigation,
        onNextOverNavigation: onNextOverNavigation,
        allowQuickNext: true
    });

    // navigate to next page if survey is completed
    useEffect(() => {

        if (surveyData?.isCompleted)
            onJumpToResults();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [surveyData?.isCompleted]);

    return (
        <SingupQuestionSlides
            state={state} />
    );
};
