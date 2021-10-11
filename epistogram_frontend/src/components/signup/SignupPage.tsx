import React from 'react';
import { globalConfig } from "../../configuration/config";
import { getQueryParam, usePaging } from "../../frontendHelpers";
import { LoadingFrame } from "../HOC/LoadingFrame";
import { ContentWrapper, MainWrapper } from "../HOC/MainPanels";
import FinalizeUserRegistrationDTO from "../../models/shared_models/FinalizeUserRegistrationDTO";
import { QuestionAnswerDTO } from "../../models/shared_models/QuestionAnswerDTO";
import { SaveQuestionAnswerDTO } from "../../models/shared_models/SaveQuestionAnswerDTO";
import { useNavigation } from "../../services/navigatior";
import { showNotification } from "../../services/notifications";
import { useAnswerSignupQuestion, useSignupData } from "../../services/signupService";
import { finalizeUserRegistartionAsync } from "../../services/userManagementService";
import { QuestionSlides } from "../exam/QuestionSlides";
import Navbar from "../navbar/Navbar";
import { SlidesDisplay } from "../universal/SlidesDisplay";
import { SignupForm } from "./SignupForm";
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
    const invitaionToken = getQueryParam("token");
    const { signupData, signupDataError, signupDataStatus, refetchSignupData } = useSignupData(invitaionToken);
    const questions = signupData?.questions ?? [];
    const questionAnswers = signupData?.questionAnswers ?? [];

    // util
    const { navigate } = useNavigation();
    const regFormState = useRegistrationFinalizationFormState();

    // slides
    const summaryImageUrl = images[6];
    const gereetImageUrl = images[0];
    const finalizeImageUrl = images[7];
    const slidesState = usePaging([1, 2, 3, 4]);

    // save questionnaire answers
    const { saveAnswersAsync, saveAnswersError, saveAnswersStatus } = useAnswerSignupQuestion();

    const submitFinalizationRequestAsync = async () => {

        const dto = new FinalizeUserRegistrationDTO(
            regFormState.phoneNumber,
            regFormState.password,
            regFormState.passwordControl,
            invitaionToken);

        try {

            await finalizeUserRegistartionAsync(dto);

            showNotification("Sikeres regisztracio!")
        }
        catch (error) {

            showNotification("Felhasználó frissítése sikertelen ")
        }
    }

    const handleSaveSelectedAnswerAsync = async (questionAnswer: QuestionAnswerDTO) => {

        const dto = {
            invitationToken: invitaionToken,
            questionAnswer: questionAnswer
        } as SaveQuestionAnswerDTO;

        // save answers 
        await saveAnswersAsync(dto);
        await refetchSignupData();
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
        nextButtonTitle="Kezdés">
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
    </SignupWrapper>

    const FinalizeFormSlide = () => <SignupWrapper
        title={"Személyes adatok és jelszó megadása"}
        upperTitle="Utolsó simítások"
        nextButtonTitle="Regisztráció befejezése"
        onNavPrevious={() => slidesState.previous()}
        onNext={() => submitFinalizationRequestAsync()}
        currentImage={finalizeImageUrl}>
        <SignupForm regFormState={regFormState} />
    </SignupWrapper>

    const slides = [
        GreetSlide,
        QuestionnaireSlide,
        SummarySlide,
        FinalizeFormSlide
    ];

    return (

        <MainWrapper>

            {/* navbar */}
            <Navbar hideLinks={true} />

            <ContentWrapper>
                <LoadingFrame loadingState={[signupDataStatus, saveAnswersStatus]} flex="1">
                    <SlidesDisplay
                        flex="1"
                        slides={slides}
                        index={slidesState.currentIndex} />
                </LoadingFrame>
            </ContentWrapper>
        </MainWrapper >
    );
};

// updateActivity(
//     invitaionToken,
//     "answerSignupSurvey",
//     "" + window.location.href,
//     "Signup-PersonalitySurvey-SelectAnswer",
//     e.currentTarget.name,
//     "collBasedActive",
//     "A felhasználó válaszol a kezdeti felmérés egyik kérdésére",
//     true,
//     localState.currentItemIndex.get() < questions.length ? questions[localState.currentItemIndex.get() - 1].title : "ActionValueOverreached",
//     e.currentTarget.value,
//     "exams",
//     "_id",
//     "kitöltendő",
//     undefined,
//     undefined,
//     "newQuestion",
//     localState.currentItemIndex.get() < questions.length ? questions[localState.currentItemIndex.get()].title : "SummaryPage"
// )