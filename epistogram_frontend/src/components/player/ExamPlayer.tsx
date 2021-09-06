import { getStaticAssetUrl, usePaging } from "../../frontendHelpers";
import { LoadingFrame } from "../../HOC/LoadingFrame";
import { ExamDTO } from "../../models/shared_models/ExamDTO";
import { QuestionAnswerDTO } from "../../models/shared_models/QuestionAnswerDTO";
import { useSaveExamAnswer } from "../../services/examService";
import { ExamQuestionSlides } from "../exam/ExamQuestionSlides";
import { SignupWrapper } from "../signup/SignupWrapper";
import { SlidesDisplay } from "../universal/SlidesDisplay";

export const ExamPlayer = (props: {
    exam: ExamDTO,
    setIsExamStarted: (isExamStarted: boolean) => void,
    refetchData: () => Promise<void>
}) => {

    const { exam, refetchData, setIsExamStarted } = props;
    const { questions, questionAnswers } = exam;
    const slidesState = usePaging([1, 2, 3, 4]);
    const { saveExamAnswer, saveExamAnswerError, saveExamAnswerState } = useSaveExamAnswer();

    const handleSaveSelectedAnswerAsync = async (questionAnswer: QuestionAnswerDTO) => {

        await saveExamAnswer(questionAnswer);
    }

    const GreetSlide = () => <SignupWrapper
        title={exam.title}
        upperTitle="Üdv!"
        currentImage={getStaticAssetUrl("/images/examCover.jpg")}
        description={"A következő kérdéssorozat segítségével felmérjük tanulási stílusodat, hogy a lehető leghatékonyabban tudd használni az Epistogramot"}
        onNext={() => {

            setIsExamStarted(true);
            slidesState.next();
        }}
        nextButtonTitle="Kezdés">
    </SignupWrapper>

    const QuestionnaireSlide = () => <ExamQuestionSlides
        saveAnswer={handleSaveSelectedAnswerAsync}
        refetchData={refetchData}
        onNextOverNavigation={slidesState.previous}
        onPrevoiusOverNavigation={slidesState.next}
        questionAnswers={questionAnswers}
        questions={questions} />

    const ResultsSlide = () => <SignupWrapper
        title={"A bal oldalon a saját egyedi tanulási stílusod vizualizációja látható"}
        description={"Már csak egy-két adatra van szükségünk, hogy elkezdhesd a rendszer használatát"}
        upperTitle="Összegzés"
        nextButtonTitle="Folytatás"
        onNavPrevious={() => slidesState.previous()}
        onNext={() => slidesState.next()}
        currentImage={getStaticAssetUrl("/images/asd")}>
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