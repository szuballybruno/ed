import { useState } from "@hookstate/core";
import { Button, TextField, Typography } from "@material-ui/core";
import queryString from "query-string";
import React from 'react';
import { hasValue } from "../../../../frontendHelpers";
import FinalizeUserRegistrationDTO from "../../../../models/shared_models/FinalizeUserRegistrationDTO";
import { useNavigation } from "../../../../services/navigatior";
import { useShowNotification } from "../../../../services/notifications";
import { updateActivity } from "../../../../services/updateActivity";
import { finalizeUserRegistartionAsync } from "../../../../services/userManagementService";
import { PersonalitySurvey } from "./components/personalitySurvey/PersonalitySurvey";
import { RegistrationForm } from "./components/registrationForm/RegistrationForm";
import StartRegistration from "./components/startRegistration/StartRegistration";
import { Summary } from "./components/summary/Summary";
import classes from "./signup.module.scss";
import { images } from "./store/images";
import { questions } from "./store/questions";

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

    const questionsState = useState([""])

    const localState = useState({
        currentItemIndex: 0,

        showUpperTitle: false,
        showProgressCounter: false,
        showProgressBar: false,
        showBackHandler: false,

        currentUpperTitle: "Üdv a fedélzeten!",
        currentImage: images[0],
        currentProgressCounterValue: "",
        currentType: "start",
        currentItemValue: "",
        currentProgressBarValue: 0,
    })
    let params

    const getTokenFromUrl = () => {

        params = queryString.parse(window.location.search);
        return params.token;
    };

    const showNotification = useShowNotification();
    const invitaionToken = getTokenFromUrl();
    const { navigate } = useNavigation();
    const regFormState = useRegistrationFinalizationFormState();

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

    const backHandler = (event: React.MouseEvent<any>) => {

        const curretnItemIndex = localState.currentItemIndex.get();
        const setCurretnItemIndex = localState.currentItemIndex.set;
        const setCurrentType = localState.currentType.set;

        if (curretnItemIndex === 0) {

            setCurrentType("start")
        }
        else if (curretnItemIndex < questions.length) {

            setCurretnItemIndex(p => (p > 0) ? p - 1 : p)
        }
        else if (curretnItemIndex === questions.length) {

            setCurretnItemIndex(p => (p > 0) ? p - 1 : p)
            setCurrentType("registration")
        }
        else {

            setCurrentType("info")
        }
    }

    const handleQuestionsChange = (e: React.FormEvent<{ name: string, value: string }>) => {
        questionsState[localState.currentItemIndex.get() - 1].set(e.currentTarget.value)
        if (localState.currentItemIndex.get() === questions.length - 1) {
            localState.currentType.set("info")
        }
        localState.currentItemIndex.set(p => p < questions.length ? p + 1 : p)
        updateActivity(
            invitaionToken,
            "answerSignupSurvey",
            "" + window.location.href,
            "Signup-PersonalitySurvey-SelectAnswer",
            e.currentTarget.name,
            "collBasedActive",
            "A felhasználó válaszol a kezdeti felmérés egyik kérdésére",
            true,
            localState.currentItemIndex.get() < questions.length ? questions[localState.currentItemIndex.get() - 1].title : "ActionValueOverreached",
            e.currentTarget.value,
            "exams",
            "_id",
            "kitöltendő",
            undefined,
            undefined,
            "newQuestion",
            localState.currentItemIndex.get() < questions.length ? questions[localState.currentItemIndex.get()].title : "SummaryPage"
        )
        console.log(questionsState.get())
    }

    return (hasValue(invitaionToken)) ? <div>
        {localState.currentType.get() === "start" &&
            <StartRegistration title={"Regisztráció"}
                backHandler={backHandler}
                currentImage={images[0]}

                description={"A következő kérdéssorozat segítségével felmérjük tanulási stílusodat, hogy a lehető leghatékonyabban tudd használni az Epistogramot"}

                onClick={(e) => {
                    localState.currentType.set("registration")
                }}
                showUpperTitle
                upperTitle={"Üdv a fedélzeten!"}
                nextButtonTitle={"Kezdés"} />}
        {localState.currentType.get() === "registration" &&
            <PersonalitySurvey title={questions[localState.currentItemIndex.get()].title}
                currentValue={questionsState[localState.currentItemIndex.get()].get()}
                onChange={handleQuestionsChange}
                backHandler={backHandler}
                currentImage={images[localState.currentItemIndex.get() + 1]}
                progressBarValue={(localState.currentItemIndex.get() + 1) / questions.length * 100}
                progressCounterValue={`${localState.currentItemIndex.get() + 1}/${questions.length}`}
                questionAnswers={questions[localState.currentItemIndex.get()].questionAnswers} />}
        {localState.currentType.get() === "info" &&
            <Summary title={"A bal oldalon a saját egyedi tanulási stílusod vizualizációja látható"}
                currentValue={localState.currentItemValue.get()}
                description={"Már csak egy-két adatra van szükségünk, hogy elkezdhesd a rendszer használatát"}
                backHandler={backHandler}
                onClick={() => {
                    localState.currentType.set("form")
                }}
                currentImage={images[6]}
                showBackHandler
                showUpperTitle
                upperTitle={"Összegzés"}
                nextButtonTitle={"Folytatás"} />}
        {localState.currentType.get() === "form" &&
            <RegistrationForm title={"Személyes adatok és jelszó megadása"}
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
                errorText={""} />}
    </div> : <div className={classes.noUserScreen}>
        <Typography>
            Nem található felhasználó. A regisztrációs email újraküldéséhez írd be az email címed és kattints a majd itt található gombra
        </Typography>
        <form>
            <TextField />
        </form>
        <Button>
            Regisztrációs e-mail újraküldése
        </Button>
    </div>
};