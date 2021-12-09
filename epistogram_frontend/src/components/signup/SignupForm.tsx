import React from "react";
import { EpistoEntry } from "../universal/EpistoEntry";
import { RegFormStateType } from "./SignupFormLogic";

export const SignupForm = (props: { regFormState: RegFormStateType }) => {

    return (
        <form >
            <div>
                <EpistoEntry
                    value={props.regFormState.phoneNumber}
                    labelVariant="top"
                    label="Telefonszám"
                    placeholder="Telefonszám"
                    name="phoneNumber"
                    setValue={props.regFormState.setPhoneNumber}
                    height="50px" />

                <EpistoEntry
                    value={props.regFormState.password}
                    labelVariant="top"
                    label="Jelszó"
                    placeholder="Jelszó"
                    name="password"
                    setValue={props.regFormState.setPassword}
                    height="50px" />

                <EpistoEntry
                    value={props.regFormState.passwordControl}
                    labelVariant="top"
                    label="Jelszó mégegyszer"
                    placeholder="Jelszó mégegyszer"
                    name="password"
                    setValue={props.regFormState.setPasswordControl}
                    height="50px" />
            </div>
        </form>
    );
}