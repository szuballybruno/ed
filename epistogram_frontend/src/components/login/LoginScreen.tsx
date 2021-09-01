import { Button } from "@material-ui/core";
import React, { useContext, useState } from 'react';
import { Redirect } from "react-router";
import { TypedError } from "../../frontendHelpers";
import { AuthenticationStateContext } from "../../HOC/AuthenticationFrame";
import { useLogInUser } from '../../services/authenticationService';
import SingleInput from "../administration/universal/singleInput/SingleInput";
import classes from './loginScreen.module.scss';

const LoginScreen = (props: { history: any; }): JSX.Element => {

    console.warn("[LoginScreen] Started...")
    const logInUser = useLogInUser();
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const authenticate = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        try {

            await logInUser(email, password);

            console.log("Login successful, naving to home page!");
            return props.history.push('/kezdolap');

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

    const changeHandler = (e: React.ChangeEvent<{ value: string, name: string }>) => {
        // app[e.currentTarget.name as keyof typeof app].set(e.currentTarget.value)
    };

    const authState = useContext(AuthenticationStateContext);

    if (authState.isLoading)
        return <div>loading...</div>

    if (authState.isAuthenticated)
        return <Redirect to="/kezdolap"></Redirect>

    return (
        <div className={classes.loginhatter}>
            <div className={classes.formkeret}>
                <div className={classes.cimek}>
                    <h1 className={classes.loginfocim}>Örülünk, hogy ismét itt vagy velünk!</h1>
                    <h1 className={classes.loginalcim}>Jelentkezz be, és már kezdhetsz is.</h1>
                </div>
                <form className={classes.formitem} onSubmit={(e: React.FormEvent<HTMLFormElement>) => authenticate(e)}>
                    <SingleInput id="email" labelText={"E-mail"} name={"currentEmail"} changeHandler={changeHandler} style={{ justifySelf: "center" }} />
                    <SingleInput id="password" labelText={"Jelszó"} name={"currentPassword"} type={"password"} changeHandler={changeHandler} style={{ justifySelf: "center" }} />
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
