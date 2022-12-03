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
                upperTitle={'Személyes tanulási stílus felmérése'}
                nextButtonTitle="Következő"
                onNext={selectedAnswerVersionId ? handleNextQuestion : undefined}
                currentImage={currentQuestion?.imageUrl ?? ''}
                onNavPrevious={questionPaging.previous}
                bottomComponent={(
                    <LinearProgressWithLabel
                        value={questionnaireProgressbarValue} />
                )}
                upperComponent={(
                    <EpistoFlex2
                        alignItems={'center'}
                        justifyContent={'flex-end'}
                        width={'30%'}>
                        <EpistoFont>
                            {questionnaireProgressLabel}
                        </EpistoFont>
                    </EpistoFlex2>
                )}>

                <MUI.RadioGroup
                    id="answers"
                    style={{ marginBottom: '30px' }}
                    name="radioGroup1"
                    onChange={(e) => {

                        const selectedAnswerVersionId = Id.create<'AnswerVersion'>(parseInt(e.currentTarget.value));
                        handleAnswerSelectedAsync(selectedAnswerVersionId);
                    }}>
                    {(currentQuestion?.answers ?? [])
                        .map((answer, index) => (
                            <MUI.FormControlLabel
                                key={`${currentQuestionIndex}-${index}`}
                                data-test-id={`survey-option-qi:${currentQuestionIndex}-ai:${index}`}
                                value={answer.answerVersionId}
                                style={{
                                    margin: '5px 0px 0px 0px',
                                    backgroundColor: answer.answerVersionId === selectedAnswerVersionId ? '#7CC0C24F' : 'white',
                                    padding: '5px 10px',
                                    border: '1px solid var(--mildGrey)',
                                    borderRadius: '6px'
                                }}
                                control={<MUI.Radio
                                    checked={answer.answerVersionId === selectedAnswerVersionId} />}
                                label={answer.answerText} />
                        ))}
                </MUI.RadioGroup>
            </SurveyWrapper>
        </>
    );
};
