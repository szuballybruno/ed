import { useState } from "react";

export const useRegistrationFinalizationFormState = () => {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [passwordControl, setPasswordControl] = useState("");

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
