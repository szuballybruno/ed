import { Typography } from "@material-ui/core";
import queryString from "query-string";
import React from 'react';
import { useState } from "react";
import { hasValue, usePaging } from "../../../../frontendHelpers";
import FinalizeUserRegistrationDTO from "../../../../models/shared_models/FinalizeUserRegistrationDTO";
import { QuestionAnswerDTO } from "../../../../models/shared_models/QuestionAnswerDTO";
import { useNavigation } from "../../../../services/navigatior";
import { useShowNotification } from "../../../../services/notifications";
import { finalizeUserRegistartionAsync } from "../../../../services/userManagementService";
import { SlidesDisplay } from "../../SlidesDisplay";
import { SignupForm } from "./fragments/SignupForm";
import { SignupRadioGroup } from "./fragments/SignupRadioGroup";
import { LinearProgressWithLabel } from "./ProgressIndicator";
import { SignupWrapper } from "./SignupWrapper";
import { images } from "./store/images";
import { questions } from "./store/questions";

const getTokenFromUrl = () => {

    const params = queryString.parse(window.location.search);
    return params.token as string;
};

const useRegistrationFinalizationFormState = () => {

    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordControl, setPasswordControl] = React.useState("");

    return {
        phoneNumber,
        setPhoneNumber,

        password,
        setPassword,

        passwordControl,
        setPasswordControl
    };
}

export type RegFormStateType = ReturnType<typeof useRegistrationFinalizationFormState>

export const SignupPage = (props: { history: any }) => {

    const showNotification = useShowNotification();
    const invitaionToken = getTokenFromUrl();
    const { navigate } = useNavigation();
    const regFormState = useRegistrationFinalizationFormState();
    const hasInvitationToken = hasValue(invitaionToken);
    const invitationTokenError = hasInvitationToken ? null : new Error("Nem megfelelo token!");
    const slideIds = [1, 2, 3, 4];
    const slidesState = usePaging(slideIds);
    const questionnaireState = usePaging(questions, () => slidesState.previous(), () => slidesState.next());
    const currentQuestion = questionnaireState.currentItem;
    const questionnaireProgressbarValue = (questionnaireState.currentIndex / questions.length) * 100;
    const questionnaireProgressLabel = `${questionnaireState.currentIndex + 1}/${questions.length}`;
    const summaryImageUrl = images[6];
    const gereetImageUrl = images[0];
    const finalizeImageUrl = images[7];
    const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswerDTO[]>([]);
    const currentQuestionSelectedAnswerId = questionAnswers
        .filter(x => x.questionId == currentQuestion.questionId)[0]?.answerId as number | null;

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

    const handleAnswerSelected = (answerId: number) => {

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
            onAnswerSelected={handleAnswerSelected}
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

    return <SlidesDisplay
        slides={slides}
        index={slidesState.currentIndex} />;
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