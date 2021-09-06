import { Typography } from "@material-ui/core";
import { usePaging } from "../../frontendHelpers";
import { QuestionAnswerDTO } from "../../models/shared_models/QuestionAnswerDTO";
import { QuestionDTO } from "../../models/shared_models/QuestionDTO";
import { LinearProgressWithLabel } from "../signup/ProgressIndicator";
import { SignupRadioGroup } from "../signup/SignupRadioGroup";
import { SignupWrapper } from "../signup/SignupWrapper";

export const ExamQuestionSlides = (props: {
    saveAnswer: (questionAnswer: QuestionAnswerDTO) => Promise<void>,
    refetchData: () => Promise<void>,
    onPrevoiusOverNavigation?: () => void,
    onNextOverNavigation?: () => void,
    questions: QuestionDTO[],
    questionAnswers: QuestionAnswerDTO[]
}) => {

    const {
        onNextOverNavigation,
        onPrevoiusOverNavigation,
        saveAnswer,
        refetchData,
        questionAnswers,
        questions
    } = props;

    // questionnaire 
    const questionnaireState = usePaging(questions, onPrevoiusOverNavigation, onNextOverNavigation);
    const currentQuestion = questionnaireState.currentItem;
    const questionnaireProgressbarValue = (questionnaireState.currentIndex / questions.length) * 100;
    const questionnaireProgressLabel = `${questionnaireState.currentIndex + 1}/${questions.length}`;

    // question answers
    const currentQuestionSelectedAnswerId = questionAnswers
        .filter(x => x.questionId == currentQuestion.questionId)[0]?.answerId as number | null;

    const handleAnswerSelectedAsync = async (answerId: number) => {

        // save answer 
        await saveAnswer({ answerId, questionId: currentQuestion.questionId } as QuestionAnswerDTO);

        // refetch data
        await refetchData();

        // go to next question
        questionnaireState.next();
    }

    return <SignupWrapper
        title={currentQuestion.questionText}
        nextButtonTitle="Kovetkezo"
        onNavPrevious={() => questionnaireState.previous()}
        onNext={currentQuestionSelectedAnswerId ? questionnaireState.next : undefined}
        currentImage={currentQuestion.imageUrl!}
        bottomComponent={<LinearProgressWithLabel value={questionnaireProgressbarValue} />}
        upperComponent={<Typography>{questionnaireProgressLabel}</Typography>}>
        <SignupRadioGroup
            answers={currentQuestion.answers}
            onAnswerSelected={x => handleAnswerSelectedAsync(x)}
            selectedAnswerId={currentQuestionSelectedAnswerId} />
    </SignupWrapper>
}