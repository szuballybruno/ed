import { useState } from "@hookstate/core";
import { Typography } from "@material-ui/core";
import queryString from "query-string";
import React from 'react';
import { hasValue, usePaging } from "../../../../frontendHelpers";
import FinalizeUserRegistrationDTO from "../../../../models/shared_models/FinalizeUserRegistrationDTO";
import { useNavigation } from "../../../../services/navigatior";
import { useShowNotification } from "../../../../services/notifications";
import { finalizeUserRegistartionAsync } from "../../../../services/userManagementService";
import { SlidesDisplay } from "../../SlidesDisplay";
import { RegistrationForm } from "./components/registrationForm/RegistrationForm";
import { Summary } from "./components/summary/Summary";
import { SignupRadioGroup } from "./fragments/SignupRadioGroup";
import { SignupWrapper } from "./HOC/signupWrapper/SignupWrapper";
import { LinearProgressWithLabel } from "./ProgressIndicator";
import { images } from "./store/images";
import { questions } from "./store/questions";

const getTokenFromUrl = () => {

    const params = queryString.parse(window.location.search);
    return params.token;
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

export const Signup = (props: { history: any }) => {

    const showNotification = useShowNotification();
    const invitaionToken = getTokenFromUrl();
    const { navigate } = useNavigation();
    const regFormState = useRegistrationFinalizationFormState();
    const hasInvitationToken = hasValue(invitaionToken);
    const invitationTokenError = hasInvitationToken ? null : new Error("Nem megfelelo token!");
    const [answerIds, setAnswerIds] = React.useState<number[]>([]);
    const slideIds = [1, 2, 3, 4];
    const slidesState = usePaging(slideIds);
    const questionnaireState = usePaging(questions, () => slidesState.previous(), () => slidesState.next());
    const [currentQuestion, setCurrentQuestion] = React.useState<any>();
    const currnetQuestionDisplayIndex = questionnaireState.currentIndex + 1;
    const questionnaireProgressbarValue = (currnetQuestionDisplayIndex / questions.length) * 100;
    const questionnaireProgressLabel = `${currnetQuestionDisplayIndex}/${questions.length}`;

    const submitFinalizationRequestAsync = async (formData: FormData) => {

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

        setAnswerIds([...answerIds, answerId]);
    }

    const handleQuestionnaireCompleted = () => {


    }

    const greetSlide = <SignupWrapper
        title="Regisztráció"
        upperTitle="Üdv a fedélzeten!"
        currentImage={images[0]}
        description={"A következő kérdéssorozat segítségével felmérjük tanulási stílusodat, hogy a lehető leghatékonyabban tudd használni az Epistogramot"}
        onNext={() => slidesState.next()}
        nextButtonTitle="Kezdés">
    </SignupWrapper>

    const questionnaireSlide = <SignupWrapper
        title={currentQuestion.title}
        nextButtonTitle="Kovetkezo"
        onNext={() => { }}
        onNavPrevious={() => questionnaireState.previous()}
        currentImage={currentQuestion.imageUrl}
        bottomComponent={<LinearProgressWithLabel value={questionnaireProgressbarValue} />}
        upperComponent={<Typography>{questionnaireProgressLabel}</Typography>}>
        <div>
            <SignupRadioGroup
                answers={currentQuestion.answers}
                onAnswerSelected={handleAnswerSelected}
                selectedAnswerId={currentQuestion.selectedAnswerId} />
        </div>
    </SignupWrapper>

    const summarySlide = <Summary
        title={"A bal oldalon a saját egyedi tanulási stílusod vizualizációja látható"}
        description={"Már csak egy-két adatra van szükségünk, hogy elkezdhesd a rendszer használatát"}
        backHandler={() => }
        onClick={() => {
            localState.currentType.set("form")
        }}
        currentImage={images[6]}
        showBackHandler
        showUpperTitle
        upperTitle={"Összegzés"}
        nextButtonTitle={"Folytatás"} />;

    const finalizeFormSlide = <RegistrationForm
        title={"Személyes adatok és jelszó megadása"}
        currentValue={localState.currentItemValue.get()}
        description={""}
        backHandler={backHandler}
        onClick={() => { }}
        currentImage={images[7]}
        showBackHandler
        showUpperTitle
        upperTitle={"Utolsó simítások"}
        nextButtonTitle={"Regisztráció befejezése"}
        regFormState={regFormState}
        onSubmit={(e) => {

            e.preventDefault();
            submitFinalizationRequestAsync(new FormData(e.currentTarget));
        }}
        errorText={""} />;

    const slides = [
        greetSlide,
        questionnaireSlide,
        summarySlide,
        finalizeFormSlide
    ];

    return <SlidesDisplay
        setIsLastSlide={setIsLastSlide}
        slides={slides}
        index={slideIndex} />;
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