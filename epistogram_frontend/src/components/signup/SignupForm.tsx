import React from "react";
import { getEventValueCallback } from "../../static/frontendHelpers";
import SingleInput from "../singleInput/SingleInput";
import { RegFormStateType } from "./SignupFormLogic";

export const SignupForm = (props: { regFormState: RegFormStateType }) => {

    return (
        <form >
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
        </form>
    );
}