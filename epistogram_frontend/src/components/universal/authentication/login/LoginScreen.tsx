import { useState } from "@hookstate/core";
import { Button } from "@material-ui/core";
import React, { useContext } from 'react';
import { Redirect } from "react-router";
import { AuthenticationStateContext } from "../../../../HOC/data_manager_frame/DataManagerFrame";
import { useLogInUser } from '../../../../services/authenticationService';
import applicationRunningState from "../../../../store/application/applicationRunningState";
import SingleInput from "../../../administration/universal/singleInput/SingleInput";
import classes from './loginScreen.module.scss';

const LoginScreen = (props: { history: any; }): JSX.Element => {

    console.warn("[LoginScreen] Started...")
    const app = useState(applicationRunningState)
    const errorMessage = useState("");
    const logInUser = useLogInUser();

    const authenticate = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const email = app.currentEmail.get();
        const password = app.currentPassword.get();

        try {
            const response = await logInUser(email, password);

            if (response) {

                if (response.code === 200) {

                    console.log("Login successful, naving to home page!");
                    return props.history.push('/kezdolap');
                }

                else if (response.code !== 200) {

                    errorMessage.set("A megadott adatok hibásak");
                }

                else {

                    errorMessage.set("Ismeretlen hiba történt");
                }
            }

            else {

                errorMessage.set("A megadott adatok hibásak");
            }
        } catch (error) {

            if (error.response !== undefined) {
                if (error.response.status === 401 || error.response.status === 500) {
                    errorMessage.set("A megadott adatok hibásak");
                }
            } else {
                errorMessage.set("A szerver nem elérhető" + error);
            }
        }
    };

    const changeHandler = (e: React.ChangeEvent<{ value: string, name: string }>) => {
        app[e.currentTarget.name as keyof typeof app].set(e.currentTarget.value)
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
                    <p className={classes.errorLabel}>{errorMessage.get()}</p>
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
