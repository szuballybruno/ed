import { useState } from 'react';

export const useRegistrationFormLogic = () => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [passwordControl, setPasswordControl] = useState('');

    return {
        phoneNumber,
        setPhoneNumber,

        password,
        setPassword,

        passwordControl,
        setPasswordControl
    };
};

export type RegistrationFormLogicType = ReturnType<typeof useRegistrationFormLogic>
