import { Id } from '@episto/commontypes';
import { AnswerSignupQuestionDTO } from '@episto/communication';
import { useEffect, useMemo } from 'react';
import { EMPTY_ARRAY } from '../../helpers/emptyArray';
import { SurveyApiService } from '../../services/api/SurveyApiService';
import { useShowErrorDialog } from '../../services/core/notifications';
import { usePaging } from '../../static/frontendHelpers';
import { MUI } from '../controls/MUIControls';
import { LinearProgressWithLabel } from './ProgressIndicator';
import { SurveyWrapper } from './SurveyWrapper';

export const SurveyQuestions = ({
    onNextOverNavigation,
    onPrevoiusOverNavigation,
    onJumpToResults
}: {
    onPrevoiusOverNavigation: () => void,
    onNextOverNavigation: () => void,
    onJumpToResults: () => void
}) => {

    const { surveyData, refetchSurveyData, surveyDataError, surveyDataStatus } = SurveyApiService
        .useSurveyData();

    const { postSurveyAnswerAsync, postSurveyAnswerStatus } = SurveyApiService
        .useAnswerSurveyQuestion();

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

    const questionnaireProgressbarValue = (currentQuestionIndex / questions.length) * 100;
    const questionnaireProgressLabel = `${currentQuestionIndex + 1}/${questions.length}`;

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

    return (
        <>
            <SurveyWrapper
                title={currentQuestion?.questionText ?? ''}
                nextButtonTitle="Következő"
                onNext={selectedAnswerVersionId ? handleNextQuestion : undefined}
                currentImage={currentQuestion?.imageUrl ?? ''}
                onNavPrevious={questionPaging.previous}
                bottomComponent={(
                    <LinearProgressWithLabel
                        value={questionnaireProgressbarValue} />
                )}>

                <MUI.RadioGroup
                    id="answers"
                    style={{ marginBottom: '30px' }}
                    name="radioGroup1">

                    {(currentQuestion?.answers ?? [])
                        .map((answer, index) => {

                            const isSelected = answer.answerVersionId === selectedAnswerVersionId;

                            return (
                                <MUI.FormControlLabel
                                    key={`${currentQuestionIndex}-${index}`}
                                    onClick={() => isSelected
                                        ? handleNextQuestion()
                                        : handleAnswerSelectedAsync(answer.answerVersionId)}
                                    data-test-id={`survey-option-qi:${currentQuestionIndex}-ai:${index}`}
                                    value={answer.answerVersionId}
                                    style={{
                                        margin: '5px 0px 0px 0px',
                                        backgroundColor: isSelected ? '#7CC0C24F' : 'white',
                                        padding: '5px 10px',
                                        border: '1px solid var(--mildGrey)',
                                        borderRadius: '6px'
                                    }}
                                    control={<MUI.Radio
                                        checked={isSelected} />}
                                    label={answer.answerText} />
                            );
                        })}
                </MUI.RadioGroup>
            </SurveyWrapper>
        </>
    );
};
