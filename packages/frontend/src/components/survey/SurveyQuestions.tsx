import { Id } from '@episto/commontypes';
import { AnswerSignupQuestionDTO } from '@episto/communication';
import { useEffect, useMemo } from 'react';
import { EMPTY_ARRAY } from '../../helpers/emptyArray';
import { SurveyApiService } from '../../services/api/SurveyApiService';
import { useShowErrorDialog } from '../../services/core/notifications';
import { usePaging } from '../../static/frontendHelpers';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { MUI } from '../controls/MUIControls';
import { LinearProgressWithLabel } from './ProgressIndicator';
import { SurveyWrapper } from './SurveyWrapper';

export const SurveyQuestions = ({
    onNextOverNavigation,
    onPrevoiusOverNavigation,
    onJumpToResults,
    isSomethingLoading
}: {
    onPrevoiusOverNavigation: () => void,
    onNextOverNavigation: () => void,
    onJumpToResults: () => void,
    isSomethingLoading: boolean
}) => {

    const { surveyData, refetchSurveyData, surveyDataError, surveyDataStatus } = SurveyApiService
        .useSurveyData();

    const { postSurveyAnswerAsync, postSurveyAnswerStatus } = SurveyApiService
        .useAnswerSurveyQuestion();

    const isSomethingLoadingLocal = isSomethingLoading || surveyDataStatus === 'loading' || postSurveyAnswerStatus === 'loading';

    const showError = useShowErrorDialog();

    const questions = useMemo(() => surveyData?.questions ?? EMPTY_ARRAY, [surveyData]);

    // questionnaire
    const questionPaging = usePaging({
        items: questions,
        onPreviousOverNavigation: onPrevoiusOverNavigation,
        onNextOverNavigation
    });

    const {
        currentIndex: currentQuestionIndex,
        currentItem: currentQuestion
    } = questionPaging;

    const questionnaireProgressbarValue = questions.length === 0
        ? 0
        : (currentQuestionIndex / questions.length) * 100;

    /**
     * Handle next question 
     */
    const handleNextQuestion = () => {

        questionPaging.next();
    };

    /**
     * Answer selected 
     */
    const handleAnswerSelectedAsync = async (answerVersionId: Id<'AnswerVersion'>) => {

        try {

            const dto = {
                answerVersionId,
                questionVersionId: currentQuestion!.questionVersionId
            } as AnswerSignupQuestionDTO;

            await postSurveyAnswerAsync(dto);
            await refetchSurveyData();

            handleNextQuestion();
        } catch (e) {

            showError(e);
        }
    };

    /**
     * navigate to next page if survey is completed
     */
    useEffect(() => {

        if (surveyData?.isCompleted)
            onJumpToResults();

    }, [surveyData, onJumpToResults]);

    const selectedAnswerVersionId = (currentQuestion?.answers ?? [])
        .filter(x => x.isGiven)[0]?.answerVersionId as null | Id<'AnswerVersion'>;

    const answers = useMemo(() => currentQuestion?.answers ?? EMPTY_ARRAY, [currentQuestion]);

    return (
        <>
            <SurveyWrapper
                testid="question-slides"
                title={currentQuestion?.questionText ?? ''}
                nextButtonTitle="Következő"
                onNext={selectedAnswerVersionId ? handleNextQuestion : undefined}
                currentImage={currentQuestion?.imageUrl ?? ''}
                onNavPrevious={questionPaging.previous}
                bottomComponent={(
                    <LinearProgressWithLabel
                        value={questionnaireProgressbarValue} />
                )}>

                {answers
                    .map((answer, index) => {

                        const isSelected = answer.answerVersionId === selectedAnswerVersionId;
                        const isDisabled = isSomethingLoadingLocal;
                        const answerAsync = () => handleAnswerSelectedAsync(answer.answerVersionId);
                        const onClickHandler = isSelected
                            ? handleNextQuestion
                            : answerAsync;

                        return (
                            <EpistoFlex2
                                key={`${currentQuestionIndex}-${index}`}
                                data-test-id={`survey-option-qi:${currentQuestionIndex}-ai:${index}`}
                                pointerEvents={isDisabled ? 'none' : undefined}
                                cursor={isDisabled ? undefined : 'pointer'}
                                onClick={onClickHandler}
                                align="center"
                                style={{
                                    margin: '5px 0px 0px 0px',
                                    backgroundColor: isSelected ? '#7CC0C24F' : 'white',
                                    padding: '5px 10px',
                                    border: '1px solid var(--mildGrey)',
                                    borderRadius: '6px'
                                }}>

                                <MUI.Radio
                                    checked={isSelected} />

                                <EpistoFont
                                    style={{
                                        userSelect: 'none'
                                    }}>
                                    {answer.answerText}
                                </EpistoFont>
                            </EpistoFlex2>
                        );
                    })}
            </SurveyWrapper>
        </>
    );
};
