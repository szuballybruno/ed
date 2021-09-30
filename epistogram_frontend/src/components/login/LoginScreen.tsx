import { Button } from "@mui/material";
import React, { useContext, useState } from 'react';
import { Redirect } from "react-router";
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { TypedError } from "../../frontendHelpers";
import { useLogInUser } from '../../services/authenticationService';
import { useNavigation } from "../../services/navigatior";
import SingleInput from "../administration/universal/singleInput/SingleInput";
import { AuthenticationStateContext } from "../HOC/AuthenticationFrame";
import classes from './loginScreen.module.scss';

const LoginScreen = (props: { history: any; }): JSX.Element => {

    console.warn("[LoginScreen] Started...")
    const logInUser = useLogInUser();
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { navigate } = useNavigation();

    const authenticate = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        try {

            await logInUser(email, password);

            console.log("Login successful, naving to home page!");
            navigate(applicationRoutes.homeRoute.route);

        } catch (error: any | TypedError) {

            // non typed error
            if (!error.errorType) {

                setErrorMessage("Ismeretlen hiba történt");
            }

            // typed error 
            else {

                const typedError = error as TypedError;

                if (typedError.errorType == "bad request") {

                    setErrorMessage("A megadott adatok hibásak");
                }
                else {

                    setErrorMessage("Ismeretlen hiba történt a szerverrel való kommunikáció során");
                }
            }
        }
    };

    const authState = useContext(AuthenticationStateContext);

    if (authState === "loading")
        return <div>loading...</div>

    if (authState === "authenticated")
        return <Redirect to={applicationRoutes.homeRoute.route}></Redirect>

    return (
        <div className={classes.loginhatter}>
            <div className={classes.formkeret}>
                <div className={classes.cimek}>
                    <h1 className={classes.loginfocim}>Örülünk, hogy ismét itt vagy velünk!</h1>
                    <h1 className={classes.loginalcim}>Jelentkezz be, és már kezdhetsz is.</h1>
                </div>
                <form className={classes.formitem} onSubmit={(e: React.FormEvent<HTMLFormElement>) => authenticate(e)}>

                    <SingleInput
                        id="email"
                        labelText={"E-mail"}
                        name={"currentEmail"}
                        changeHandler={(e) => setEmail(e.target.value)}
                        style={{ justifySelf: "center" }} />

                    <SingleInput
                        id="password"
                        labelText={"Jelszó"}
                        name={"currentPassword"}
                        type={"password"}
                        changeHandler={(x) => setPassword(x.target.value)}
                        style={{ justifySelf: "center" }} />

                    <p className={classes.forgotPassword}>Elfelejtettem a jelszavam</p>

                    <Button type="submit" variant={"outlined"}>Bejelentkezés</Button>
                    <p className={classes.errorLabel}>{errorMessage}</p>
                </form>
            </div>
            <div className={classes.regisztracio}>
                <h3>Még nem regisztráltál?</h3>
                <h3>Itt az ideje!</h3>
            </div>
        </div>
    )
};

export default LoginScreen
