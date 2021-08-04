import React, {useEffect} from 'react';
import {useState} from "@hookstate/core";
import StartRegistration from "./components/startRegistration/StartRegistration";
import {PersonalitySurvey} from "./components/personalitySurvey/PersonalitySurvey";
import {images} from "./store/images";
import {questions} from "./store/questions";
import {Summary} from "./components/summary/Summary";
import {RegistrationForm} from "./components/registrationForm/RegistrationForm";
import applicationRunningState from "../../../../store/application/applicationRunningState";
import instance from "../../../../services/axiosInstance";
import queryString from "query-string";
import {validatePassword} from "../../../../services/validator";
import classes from "./signup.module.scss"
import {config} from "../../../../configuration/config";
import {updateActivity} from "../../../../services/updateActivity";
import {Redirect} from "react-router-dom";
import {Button, TextField, Typography} from "@material-ui/core";

export const Signup = (props: {history: any}) => {
    const app = useState(applicationRunningState)
    const [file, setFile] = React.useState<string | Blob>("")

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
        console.log("GetTokenFromUrl")
        params = queryString.parse(window.location.search);
        console.log(params)
        try {
            if (params.token) {
                app.signup.token.set(params.token as keyof typeof app);
                return true
            } else {
                return false
            }
        } catch (e) {
            return false
        }
    };

    useEffect(() => {
        getTokenFromUrl();
    },[])

    const submitHandler = (e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
        e.preventDefault();
        console.log(JSON.stringify(app.signup.get()))
        let formdata =  new FormData(e.currentTarget)
        formdata.append('file', file)
        formdata.set('phoneNumber', app.signup.phoneNumber.get())
        formdata.set('newPassword', app.signup.passwordOne.get())

        if (app.signup.token.get() || app.signup.token.get() !== "") {
            instance.patch("users", formdata, {
                headers: {
                    'Authorization': "Bearer " + app.signup.token.get(),
                    'Content-Type': 'multipart/form-data'},
            }).then((res) => {
                if (res.status === 201) {
                    app.snack.snackTitle.set("Felhasználó sikeresen frissítve")
                    app.snack.showSnack.set(true)
                    return props.history.push("/login")
                }
            }).catch((e) => {
                app.snack.snackTitle.set("Felhasználó frissítése sikertelen " + e)
                app.snack.showSnack.set(true)
            })
        } else {
            app.snack.snackTitle.set("Nem található felhasználóe")
            app.snack.showSnack.set(true)
        }
    }

    const backHandler = (event: React.MouseEvent<any>) => {
        if (localState.currentItemIndex.get() === 0) {
            localState.currentType.set("start")
        } else if (localState.currentItemIndex.get() < questions.length) {
            localState.currentItemIndex.set(p => (p > 0) ? p - 1 : p)
        } else if ((localState.currentItemIndex.get()) === questions.length) {
            localState.currentItemIndex.set(p => (p > 0) ? p - 1 : p)
            localState.currentType.set("registration")
        } else {
            localState.currentType.set("info")
        }

    }
    const forwardHandler = (event: React.MouseEvent<any>) => {
        localState.currentItemIndex.set(p => (p < questions.length - 1) ? p + 1 : p)
    }

    const handleFormChange = (e: React.FormEvent<{ name: string, value: string  }>) => {
        app.signup[e.currentTarget.name].set(e.currentTarget.value);
    };

    const handleQuestionsChange = (e: React.FormEvent<{name: string, value: string}>) => {
        questionsState[localState.currentItemIndex.get() - 1].set(e.currentTarget.value)
        if (localState.currentItemIndex.get() === questions.length - 1) {
            localState.currentType.set("info")
        }
        localState.currentItemIndex.set(p => p < questions.length ? p + 1 : p)
        updateActivity(
            app.signup.token.get(),
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

    return (app.signup.token.get() || app.signup.token.get() !== "") ? <div>
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
                               nextButtonTitle={"Kezdés"}/>}
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
                         nextButtonTitle={"Folytatás"}/>}
        {localState.currentType.get() === "form" &&
                <RegistrationForm title={"Személyes adatok és jelszó megadása"}
                                  currentValue={localState.currentItemValue.get()}
                                  description={""}
                                  backHandler={backHandler}
                                  onClick={() => {}}
                                  currentImage={images[7]}
                                  showBackHandler
                                  showUpperTitle
                                  upperTitle={"Utolsó simítások"}
                                  nextButtonTitle={"Regisztráció befejezése"}
                                  onChange={handleFormChange}
                                  onSubmit={submitHandler}
                                  errorText={app.signup.errorText.get()}/>}
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