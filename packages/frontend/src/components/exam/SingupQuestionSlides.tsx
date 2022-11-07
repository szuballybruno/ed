import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useShowErrorDialog } from '../../services/core/notifications';
import { SignupQuestionDTO } from '../../shared/dtos/SignupQuestionDTO';
import { Id } from '../../shared/types/versionId';
import { usePaging } from '../../static/frontendHelpers';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { LinearProgressWithLabel } from '../survey/ProgressIndicator';
import { SurveyWrapper } from '../survey/SurveyWrapper';

export const useSignupQuestionsState = (options: {
    questions: SignupQuestionDTO[],
    answerQuestionAsync: (answerVersionId: Id<'AnswerVersion'>, questionVersionId: Id<'QuestionVersion'>) => Promise<void>,
    upperTitle?: string,
    onPrevoiusOverNavigation?: () => void,
    onNextOverNavigation?: () => void,
    clearAnswerCache?: () => void,
    allowQuickNext?: boolean
}) => {

    const {
        questions,
        answerQuestionAsync,
        upperTitle,
        onPrevoiusOverNavigation,
        onNextOverNavigation,
        clearAnswerCache,
        allowQuickNext
    } = options;

    // questionnaire
    const questionnaireState = usePaging({
        items: questions,
        onPreviousOverNavigation: onPrevoiusOverNavigation,
        onNextOverNavigation
    });
    const currentQuestion = questionnaireState.currentItem;
    const questionnaireProgressbarValue = (questionnaireState.currentIndex / questions.length) * 100;
    const questionnaireProgressLabel = `${questionnaireState.currentIndex + 1}/${questions.length}`;

    const handleNext = () => {

        if (clearAnswerCache)
            clearAnswerCache();

        questionnaireState.next();
    };

    return {
        currentQuestion,
        upperTitle,
        handleNext,
        questionnaireState,
        questionnaireProgressLabel,
        questionnaireProgressbarValue,
        answerQuestionAsync,
        allowQuickNext
    };
};

export type SignupQuestionsStateType = ReturnType<typeof useSignupQuestionsState>;

export const SingupQuestionSlides = (props: { state: SignupQuestionsStateType }) => {

    const state = props.state;
    const showError = useShowErrorDialog();

    const {
        currentQuestion,
        upperTitle,
        handleNext,
        questionnaireState,
        questionnaireProgressLabel,
        questionnaireProgressbarValue,
        answerQuestionAsync,
        allowQuickNext
    } = state;

    const handleAnswerSelectedAsync = async (answerVersionId: Id<'AnswerVersion'>) => {

        try {

            await answerQuestionAsync(answerVersionId, currentQuestion!.questionVersionId);

            if (allowQuickNext)
                handleNext();
        } catch (e) {

            showError(e);
        }
    };

    {/*const Testasd = () => {
        return <FlexFloat
            alignItems={"center"}
            borderRadius={7}
            minWidth={150}
            cursor={onClick ? "pointer" : undefined}
            onClick={onClick ? () => onClick(!isSelected) : undefined}
            style={{
                backgroundColor: getBgColor(),
                padding: "10px",
                border: "1px solid var(--mildGrey)"
            }}
            {...css}>

            <Checkbox
                checked={isSelected}
                size="small"
                value="advanced" />

            <EpistoFont fontSize="fontNormal14">
                {answerText}
            </EpistoFont>
        </FlexFloat>
    }*/}

    const selectedAnswerVersionId = (currentQuestion?.answers ?? [])
        .filter(x => x.isGiven)[0]?.answerVersionId as null | Id<'AnswerVersion'>;

    return <>
        {currentQuestion && <SurveyWrapper
            title={currentQuestion!.questionText}
            upperTitle={upperTitle}
            nextButtonTitle="Következő"
            onNext={selectedAnswerVersionId ? handleNext : undefined}
            currentImage={currentQuestion!.imageUrl!}
            onNavPrevious={questionnaireState.previous}
            bottomComponent={<LinearProgressWithLabel value={questionnaireProgressbarValue} />}
            upperComponent={<EpistoFlex2 alignItems={'center'}
                justifyContent={'flex-end'}
                width={'30%'}><EpistoFont>{questionnaireProgressLabel}</EpistoFont></EpistoFlex2>}>

            <RadioGroup
                id="answers"
                style={{ marginBottom: '30px' }}
                name="radioGroup1"
                onChange={(e) => {

                    const selectedAnswerVersionId = Id.create<'AnswerVersion'>(parseInt(e.currentTarget.value));
                    handleAnswerSelectedAsync(selectedAnswerVersionId);
                }}>
                {currentQuestion!
                    .answers
                    .map((answer) => <FormControlLabel
                        key={Id.read(answer.answerVersionId)}
                        value={answer.answerVersionId}
                        style={{
                            margin: '5px 0px 0px 0px',
                            backgroundColor: answer.answerVersionId === selectedAnswerVersionId ? '#7CC0C24F' : 'white',
                            padding: '5px 10px',
                            border: '1px solid var(--mildGrey)',
                            borderRadius: '6px'

                        }}
                        control={<Radio checked={answer.answerVersionId === selectedAnswerVersionId} />}
                        label={answer.answerText} />)}
            </RadioGroup>
        </SurveyWrapper>}
    </>;
};
