import React from 'react';
import classes from './loginScreen.module.scss';
import {useState} from "@hookstate/core";
import instance from "../../../../services/axiosInstance";
import applicationRunningState from "../../../../store/application/applicationRunningState";
import Cookies from 'universal-cookie';
import SingleInput from "../../../administration/universal/singleInput/SingleInput";
import {Button, TextField, Typography} from "@material-ui/core";

const LoginScreen = (props: { history: any; }): JSX.Element => {
    const cookies = new Cookies();
    console.warn("[LoginScreen] Started...")
    const app = useState(applicationRunningState)

    const errorMessage = useState("");

    const authenticate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        instance.get(`/users/login?email=${app.currentEmail.get()}&password=${app.currentPassword.get()}`)
            .then(res => {
                if (res) {
                    if (res.status === 200) {
                        cookies.set('userId', res.data.userId, { path: '/' });
                        cookies.set('organizationId', res.data.organizationId, {path: '/'})
                        app.isLoggedIn.set(true)
                        return props.history.push('/kezdolap');

                    } else if (res.status === 401 || res.status === 500) {
                        errorMessage.set("A megadott adatok hibásak");
                    } else {
                        errorMessage.set("Ismeretlen hiba történt");
                    }
                } else {
                    errorMessage.set("A megadott adatok hibásak");
                }
            }).catch(err => {
                if (err.response !== undefined) {
                    if (err.response.status === 401 || err.response.status === 500) {
                        errorMessage.set( "A megadott adatok hibásak");
                    }
                } else {
                    errorMessage.set( "A szerver nem elérhető" + err);
                }
                //logout
            });
    };

    const changeHandler = (e: React.ChangeEvent<{ value: string, name: string }>) => {
        app[e.currentTarget.name as keyof typeof app].set(e.currentTarget.value)
    };


    return (
        <div className={classes.loginhatter}>
            <div className={classes.formkeret}>
                <div className={classes.cimek}>
                    <h1 className={classes.loginfocim}>Örülünk, hogy ismét itt vagy velünk!</h1>
                    <h1 className={classes.loginalcim}>Jelentkezz be, és már kezdhetsz is.</h1>
                </div>
                <form className={classes.formitem} onSubmit={(e: React.FormEvent<HTMLFormElement>) => authenticate(e)}>
                    <SingleInput labelText={"E-mail"} name={"currentEmail"} changeHandler={changeHandler} style={{justifySelf: "center"}} />
                    <SingleInput labelText={"Jelszó"} name={"currentPassword"} type={"password"} changeHandler={changeHandler} style={{justifySelf: "center"}} />
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
