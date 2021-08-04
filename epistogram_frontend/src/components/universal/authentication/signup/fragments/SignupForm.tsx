import SingleInput from "../../../../administration/universal/singleInput/SingleInput";
import {NavLink} from "react-router-dom";
import React from "react";
import {NextButton} from "./NextButton";
import {Typography} from "@material-ui/core";

export const SignupForm = (
    props: {
        to?: string,
        onChange: (e: React.ChangeEvent<{value: string, name: string}>) => any,
        onSubmit: (e: any) => any
        onClick: (e: any) => any
        errorText?: string
    }) => <form onSubmit={props.onSubmit}>
    <div>
        <SingleInput style={{height: 65}}
                     labelText={"Telefonszám"}
                     name={"phoneNumber"}
                     changeHandler={props.onChange}/>
        <SingleInput style={{height: 65}}
                     labelText={"Jelszó"}
                     type={"password"}
                     name={"passwordOne"}
                     changeHandler={props.onChange}/>
        <SingleInput style={{height: 65, marginBottom: 20}}
                     type={"password"}
                     labelText={"Jelszó mégegyszer"}
                     name={"passwordTwo"}
                     changeHandler={props.onChange}/>
    </div>

    <Typography style={{color: "red", marginBottom: 20, maxWidth: 300}}>{props.errorText}</Typography>


    <NextButton buttonTitle={"Regisztráció befejezése"}
                type={"submit"}
                to={props.to}
                onClick={props.onClick} />
</form>