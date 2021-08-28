import { Box, Flex } from "@chakra-ui/react";
import { Typography } from "@material-ui/core";
import React, { useState } from 'react';
import { useEffect } from "react";
import { globalConfig } from "../../configuration/config";
import { getQueryParam, hasValue, usePaging } from "../../frontendHelpers";
import { LoadingFrame } from "../../HOC/loading_frame/LoadingFrame";
import FinalizeUserRegistrationDTO from "../../models/shared_models/FinalizeUserRegistrationDTO";
import { QuestionAnswerDTO } from "../../models/shared_models/QuestionAnswerDTO";
import { useNavigation } from "../../services/navigatior";
import { useShowNotification } from "../../services/notifications";
import { useSaveSignupQuestionnaireAnswers, useSignupData } from "../../services/signupService";
import { finalizeUserRegistartionAsync } from "../../services/userManagementService";
import AllNavbar from "../universal/navigation/navbar/AllNavbar";
import { SlidesDisplay } from "../universal/SlidesDisplay";
import { LinearProgressWithLabel } from "./ProgressIndicator";
import { SignupForm } from "./SignupForm";
import { useRegistrationFinalizationFormState } from "./SignupFormLogic";
import { SignupRadioGroup } from "./SignupRadioGroup";
import { SignupWrapper } from "./SignupWrapper";
import classes from "./signupPage.module.scss";

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
    const { signupData, signupDataError, signupDataStatus } = useSignupData(invitaionToken);
    const questions = signupData?.questions ?? [];

    // util
    const showNotification = useShowNotification();
    const { navigate } = useNavigation();
    const regFormState = useRegistrationFinalizationFormState();

    // slides
    const summaryImageUrl = images[6];
    const gereetImageUrl = images[0];
    const finalizeImageUrl = images[7];
    const slidesState = usePaging([1, 2, 3, 4]);

    // questionnaire 
    const questionnaireState = usePaging(questions, () => slidesState.previous(), () => slidesState.next());
    const currentQuestion = questionnaireState.currentItem;
    const questionnaireProgressbarValue = (questionnaireState.currentIndex / questions.length) * 100;
    const questionnaireProgressLabel = `${questionnaireState.currentIndex + 1}/${questions.length}`;

    // question answers
    const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswerDTO[]>([]);
    const currentQuestionSelectedAnswerId = questionAnswers
        .filter(x => x.questionId == currentQuestion.questionId)[0]?.answerId as number | null;

    // save questionnaire answers
    const { saveAnswers, saveAnswersError, saveAnswersStatus } = useSaveSignupQuestionnaireAnswers();

    useEffect(() => {

        if (signupData)
            setQuestionAnswers(signupData.questionAnswers ?? []);
    }, [signupDataStatus]);

    const submitFinalizationRequestAsync = async () => {

        const dto = new FinalizeUserRegistrationDTO(
            regFormState.phoneNumber,
            regFormState.password,
            regFormState.passwordControl,
            invitaionToken);

        try {

            await finalizeUserRegistartionAsync(dto);

            showNotification("Felhasználó sikeresen frissítve")

            // TODO unnecessary
            navigate("/login");
        }
        catch (error) {

            showNotification("Felhasználó frissítése sikertelen ")
        }
    }

    const handleAnswerSelectedAsync = async (answerId: number) => {

        // save answer
        const newAnswers = [
            ...questionAnswers
                .filter(x => x.questionId != currentQuestion.questionId),
            {
                answerId: answerId,
                questionId: currentQuestion.questionId
            } as QuestionAnswerDTO
        ];
        setQuestionAnswers(newAnswers);

        // save answers 
        await saveAnswers(newAnswers, invitaionToken);

        // go to next question
        questionnaireState.next();
    }

    const GreetSlide = () => <SignupWrapper
        title="Regisztráció"
        upperTitle="Üdv a fedélzeten!"
        currentImage={gereetImageUrl}
        description={"A következő kérdéssorozat segítségével felmérjük tanulási stílusodat, hogy a lehető leghatékonyabban tudd használni az Epistogramot"}
        onNext={() => slidesState.next()}
        nextButtonTitle="Kezdés">
    </SignupWrapper>

    const QuestionnaireSlide = () => <SignupWrapper
        title={currentQuestion.questionText}
        nextButtonTitle="Kovetkezo"
        onNavPrevious={() => questionnaireState.previous()}
        currentImage={currentQuestion.imageUrl!}
        bottomComponent={<LinearProgressWithLabel value={questionnaireProgressbarValue} />}
        upperComponent={<Typography>{questionnaireProgressLabel}</Typography>}>
        <SignupRadioGroup
            answers={currentQuestion.answers}
            onAnswerSelected={x => handleAnswerSelectedAsync(x)}
            selectedAnswerId={currentQuestionSelectedAnswerId} />
    </SignupWrapper>

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

    return <Flex direction="column" justify="flex-start" align="center">

        {/* navbar */}
        <AllNavbar
            showHighlightedButton={false}
            menuItems={{
                "middleMenu": [],
                "lastItem": {
                    "menuName": "",
                    "menuPath": ""
                }
            }}
            desktopClassName={classes.navbar}
            showLastButton={false} />

        <LoadingFrame loadingState={[signupDataStatus, saveAnswersStatus]}>
            <SlidesDisplay
                slides={slides}
                index={slidesState.currentIndex} />
        </LoadingFrame>
    </Flex>
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