import { getAssetUrl, usePaging } from "../../frontendHelpers";
import { ExamDTO } from "../../models/shared_models/ExamDTO";
import { ExamResults } from "../exam/ExamResults";
import { ExamQuestions } from "../ExamQuestions";
import { SignupWrapper } from "../signup/SignupWrapper";
import { SlidesDisplay } from "../universal/SlidesDisplay";

export const ExamPlayer = (props: {
    exam: ExamDTO,
    answerSessionId: number,
    setIsExamInProgress: (isExamStarted: boolean) => void
}) => {

    const {
        exam,
        setIsExamInProgress,
        answerSessionId,
    } = props;

    const slidesState = usePaging([1, 2, 3, 4]);

    const handleExamFinished = () => {

        setIsExamInProgress(false);
        slidesState.next();
    }

    const GreetSlide = () => <SignupWrapper
        title={exam.title}
        upperTitle="Üdv!"
        currentImage={getAssetUrl("/images/examCover.jpg")}
        description={"A következő kérdéssorozat segítségével felmérjük tanulási stílusodat, hogy a lehető leghatékonyabban tudd használni az Epistogramot"}
        onNext={() => {

            setIsExamInProgress(true);
            slidesState.next();
        }}
        nextButtonTitle="Kezdés">
    </SignupWrapper>

    const QuestionnaireSlide = () => <ExamQuestions
        answerSessionId={answerSessionId}
        questions={exam.questions}
        onExamFinished={handleExamFinished} />

    const ResultsSlide = () =>
        <ExamResults
            examTitle={exam.title}
            answerSessionId={answerSessionId}></ExamResults>

    const slides = [
        GreetSlide,
        QuestionnaireSlide,
        ResultsSlide
    ];

    return (

        <SlidesDisplay
            flex="1"
            height="100%"
            slides={slides}
            index={slidesState.currentIndex} />
    );
}