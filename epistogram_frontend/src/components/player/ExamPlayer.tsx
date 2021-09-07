import { useState } from "react";
import { getStaticAssetUrl, usePaging } from "../../frontendHelpers";
import { LoadingFrame } from "../../HOC/LoadingFrame";
import { ExamDTO } from "../../models/shared_models/ExamDTO";
import { QuestionAnswerDTO } from "../../models/shared_models/QuestionAnswerDTO";
import { useSaveExamAnswer } from "../../services/examService";
import { ExamResultsTable } from "../exam/ExamResultsTable";
import { QuestionSlides } from "../exam/QuestionSlides";
import { SignupWrapper } from "../signup/SignupWrapper";
import { SlidesDisplay } from "../universal/SlidesDisplay";

export const ExamPlayer = (props: {
    exam: ExamDTO,
    answerSessionId: number,
    setIsExamInProgress: (isExamStarted: boolean) => void
}) => {

    const { exam, setIsExamInProgress, answerSessionId } = props;
    const { questions } = exam;
    const slidesState = usePaging([1, 2, 3, 4]);
    const {
        saveExamAnswer,
        saveExamAnswerError,
        saveExamAnswerState,
        correctExamAnswerId,
        clearExamAnswerCache
    } = useSaveExamAnswer();
    const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);

    const handleSaveSelectedAnswerAsync = async (questionAnswer: QuestionAnswerDTO) => {

        setSelectedAnswerId(questionAnswer.answerId);
        await saveExamAnswer({
            answerSessionId: answerSessionId,
            answerId: questionAnswer.answerId,
            questionId: questionAnswer.questionId
        });
    }

    const clearAnswerCache = () => {

        clearExamAnswerCache();
        setSelectedAnswerId(null);
    }

    const finishExam = () => {

        setIsExamInProgress(false);
        slidesState.next();
    }

    const GreetSlide = () => <SignupWrapper
        title={exam.title}
        upperTitle="Üdv!"
        currentImage={getStaticAssetUrl("/images/examCover.jpg")}
        description={"A következő kérdéssorozat segítségével felmérjük tanulási stílusodat, hogy a lehető leghatékonyabban tudd használni az Epistogramot"}
        onNext={() => {

            setIsExamInProgress(true);
            slidesState.next();
        }}
        nextButtonTitle="Kezdés">
    </SignupWrapper>

    const QuestionnaireSlide = () => <QuestionSlides
        clearAnswerCache={clearAnswerCache}
        upperTitle={exam.title}
        onAnswerSelected={handleSaveSelectedAnswerAsync}
        onNextOverNavigation={finishExam}
        getSelectedAnswerId={() => selectedAnswerId}
        getCorrectAnswerId={() => correctExamAnswerId}
        questions={questions} />

    const ResultsSlide = () => <SignupWrapper
        title={exam.title}
        description={"Sikeresen elvegezve!"}
        upperTitle="Összegzés">
        <ExamResultsTable></ExamResultsTable>
    </SignupWrapper>

    const slides = [
        GreetSlide,
        QuestionnaireSlide,
        ResultsSlide
    ];

    return (
        <LoadingFrame
            loadingState={saveExamAnswerState}
            error={saveExamAnswerError}
            flex="1">

            <SlidesDisplay
                flex="1"
                height="100%"
                slides={slides}
                index={slidesState.currentIndex} />
        </LoadingFrame>
    );
}