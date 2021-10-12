import React from 'react';
import { globalConfig } from "../../configuration/config";
import { usePaging } from "../../frontendHelpers";
import { QuestionAnswerDTO } from "../../models/shared_models/QuestionAnswerDTO";
import { SaveQuestionAnswerDTO } from "../../models/shared_models/SaveQuestionAnswerDTO";
import { useNavigation } from "../../services/navigatior";
import { useShowErrorDialog } from "../../services/notifications";
import { useSignupData } from '../../services/openEndpointService';
import { useAnswerSignupQuestion } from "../../services/signupService";
import { QuestionSlides } from "../exam/QuestionSlides";
import { LoadingFrame } from "../HOC/LoadingFrame";
import { ContentWrapper, MainWrapper } from "../HOC/MainPanels";
import Navbar from "../navbar/Navbar";
import { EpistoButton } from '../universal/EpistoButton';
import { SlidesDisplay } from "../universal/SlidesDisplay";
import { useRegistrationFinalizationFormState } from "./SignupFormLogic";
import { SignupWrapper } from "./SignupWrapper";

const images = [
    globalConfig.assetStorageUrl + "/application/indulo.svg",
    globalConfig.assetStorageUrl + "/application/kerdes1.png",
    globalConfig.assetStorageUrl + "/application/kerdes2.png",
    globalConfig.assetStorageUrl + "/application/kerdes3.png",
    globalConfig.assetStorageUrl + "/application/kerdes4.png",
    globalConfig.assetStorageUrl + "/application/kerdes5.png",
    globalConfig.assetStorageUrl + "/application/tanulasi_stilus.png",
    globalConfig.assetStorageUrl + "/application/szemelyes_adatok.png",
]

export const SignupPage = () => {

    // input
    const { signupData, signupDataError, signupDataStatus, refetchSignupData } = useSignupData();
    const questions = signupData?.questions ?? [];
    const questionAnswers = signupData?.questionAnswers ?? [];

    // util
    const { navigate } = useNavigation();
    const showErrorDialog = useShowErrorDialog();
    const regFormState = useRegistrationFinalizationFormState();

    // slides
    const summaryImageUrl = images[6];
    const gereetImageUrl = images[0];
    const slidesState = usePaging([1, 2, 3, 4]);

    // save questionnaire answers
    const { saveAnswersAsync, saveAnswersStatus } = useAnswerSignupQuestion();

    const handleSaveSelectedAnswerAsync = async (questionAnswer: QuestionAnswerDTO) => {

        const dto = {
            questionAnswer: questionAnswer
        } as SaveQuestionAnswerDTO;

        try {
            await saveAnswersAsync(dto);
            await refetchSignupData();
        }
        catch (e) {

            showErrorDialog(e);
        }
    }

    const getSelectedAnswerId = (questionId: number) => {

        const currentQuestionSelectedAnswer = questionAnswers
            .filter(x => x.questionId == questionId)[0];

        return currentQuestionSelectedAnswer?.answerId as number | null;
    }

    const GreetSlide = () => <SignupWrapper
        title="Regisztráció"
        upperTitle="Üdv a fedélzeten!"
        currentImage={gereetImageUrl}
        description={"A következő kérdéssorozat segítségével felmérjük tanulási stílusodat, hogy a lehető leghatékonyabban tudd használni az Epistogramot"}
        onNext={() => slidesState.next()}
        nextButtonTitle="Tovabb">
    </SignupWrapper>

    const QuestionnaireSlide = () => <QuestionSlides
        onAnswerSelected={handleSaveSelectedAnswerAsync}
        onNextOverNavigation={slidesState.next}
        onPrevoiusOverNavigation={slidesState.previous}
        getSelectedAnswerId={getSelectedAnswerId}
        questions={questions} />

    const SummarySlide = () => <SignupWrapper
        title={"A bal oldalon a saját egyedi tanulási stílusod vizualizációja látható"}
        description={"Már csak egy-két adatra van szükségünk, hogy elkezdhesd a rendszer használatát"}
        upperTitle="Összegzés"
        nextButtonTitle="Folytatás"
        onNavPrevious={() => slidesState.previous()}
        onNext={() => slidesState.next()}
        currentImage={summaryImageUrl}>
        <EpistoButton>continuer to app</EpistoButton>
    </SignupWrapper>

    const slides = [
        GreetSlide,
        QuestionnaireSlide,
        SummarySlide
    ];

    return (

        <MainWrapper>

            {/* navbar */}
            <Navbar hideLinks={true} />

            <ContentWrapper>
                <LoadingFrame loadingState={[signupDataStatus, saveAnswersStatus]} error={signupDataError} flex="1">
                    <SlidesDisplay
                        flex="1"
                        slides={slides}
                        index={slidesState.currentIndex} />
                </LoadingFrame>
            </ContentWrapper>
        </MainWrapper >
    );
};