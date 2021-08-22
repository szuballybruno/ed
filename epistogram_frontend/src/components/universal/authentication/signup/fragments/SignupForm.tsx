import { Typography } from "@material-ui/core";
import React from "react";
import { getEventValueCallback } from "../../../../../frontendHelpers";
import SingleInput from "../../../../administration/universal/singleInput/SingleInput";
import { RegFormStateType } from "../Signup";
import { NextButton } from "./NextButton";

export const SignupForm = (
    props: {
        to?: string,
        regFormState: RegFormStateType,
        onSubmit: (e: any) => any
        onClick: (e: any) => any
        errorText?: string
    }) => <form onSubmit={props.onSubmit}>
        <div>
            <SingleInput style={{ height: 65 }}
                labelText={"Telefonszám"}
                name={"phone"}
                id="phone"
                changeHandler={getEventValueCallback(props.regFormState.setPhoneNumber)} />

            <SingleInput style={{ height: 65 }}
                labelText={"Jelszó"}
                type={"password"}
                name={"password"}
                changeHandler={getEventValueCallback(props.regFormState.setPassword)} />

            <SingleInput style={{ height: 65, marginBottom: 20 }}
                type={"password"}
                labelText={"Jelszó mégegyszer"}
                name={"password"}
                changeHandler={getEventValueCallback(props.regFormState.setPasswordControl)} />
        </div>

        <Typography style={{ color: "red", marginBottom: 20, maxWidth: 300 }}>{props.errorText}</Typography>


        <NextButton buttonTitle={"Regisztráció befejezése"}
            type={"submit"}
            to={props.to}
            onClick={props.onClick} />
    </form>