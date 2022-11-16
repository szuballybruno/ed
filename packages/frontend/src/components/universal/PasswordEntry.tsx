import { getPassowrdValidationError } from '@episto/commonlogic';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { EpistoEntryNew, EpistoEntryNewPropsType, useEpistoEntryState } from '../controls/EpistoEntryNew';

export const usePasswordEntryState = () => {

    // pw 
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string | null>(null);

    // pw comapre 
    const [passwordCompare, setPasswordCompare] = useState('');
    const [passwordCompareError, setPasswordCompareError] = useState<string | null>(null);

    const getValidationErrors = useCallback((password: string, passwordCompare: string) => {

        const pwValidationErrorCode = getPassowrdValidationError(password, passwordCompare);

        const [passwordErrorMessage, passwordCompareErrorMessage] = ((): [string | null, string | null] => {

            if (pwValidationErrorCode === 'passwordIsEmpty')
                return ['Nincs jelszo megadva.', 'Nincs jelszo megadva.'];

            if (pwValidationErrorCode === 'tooShort')
                return ['A jelszó túl rövid!', null];

            if (pwValidationErrorCode === 'tooLong')
                return ['A jelszó túl hosszú!', null];

            if (pwValidationErrorCode === 'hasNoNumber')
                return ['A jelszó nem tartalmaz számot!', null];

            if (pwValidationErrorCode === 'doesNotMatchControlPassword')
                return ['A jelszavak nem egyeznek!', 'A jelszavak nem egyeznek!'];

            return [null, null];
        })();

        return { passwordErrorMessage, passwordCompareErrorMessage };
    }, []);

    /**
     * Validator funciton 
     */
    const validate = useCallback(() => {

        const {
            passwordCompareErrorMessage,
            passwordErrorMessage
        } = getValidationErrors(password, passwordCompare);

        setPasswordError(passwordErrorMessage);
        setPasswordCompareError(passwordCompareErrorMessage);

        return passwordErrorMessage && passwordCompareErrorMessage;
    }, [password, passwordCompare, getValidationErrors]);

    /**
     * Validate passwords whenever validate function ref changes 
     */
    useEffect(() => {

        validate();
    }, [validate]);

    /**
     * Validators 
     */
    const validatePassowrdEntry = useCallback((pw: string) => {

        return getValidationErrors(pw, passwordCompare).passwordErrorMessage;
    }, [passwordCompare, getValidationErrors]);

    const validatePassowrdCompareEntry = useCallback((pwCompare: string) => {

        return getValidationErrors(password, pwCompare).passwordCompareErrorMessage;
    }, [password, getValidationErrors]);

    /**
     * Episto entry states 
     */
    const pwState = useEpistoEntryState({ isMandatory: true, validateFunction: validatePassowrdEntry });
    const pwCompareState = useEpistoEntryState({ isMandatory: true, validateFunction: validatePassowrdCompareEntry });

    /**
     * Propagate pw state value to upper state 
     */
    const { value: pwStateValue } = pwState;

    useEffect(() => {

        setPassword(pwStateValue);
    }, [setPassword, pwStateValue]);

    /**
     * Propagate pw compare state value to upper state 
     */
    const { value: pwCompareStateValue } = pwCompareState;

    useEffect(() => {

        setPasswordCompare(pwCompareStateValue);
    }, [setPasswordCompare, pwCompareStateValue]);

    const hasCredentialError = useMemo(() => {

        if (passwordError)
            return true;

        if (passwordCompareError)
            return true;

        if (pwState.errorMsg)
            return true;

        if (pwCompareState.errorMsg)
            return true;

        return false;
    }, [passwordError, passwordCompareError, pwState.errorMsg, pwCompareState.errorMsg]);

    return useMemo(() => ({
        password,
        passwordCompare,
        passwordError,
        passwordCompareError,
        hasCredentialError,
        pwState,
        pwCompareState,
        getValidationErrors,
        setPassword,
        setPasswordCompare,
        validate
    }), [
        password,
        passwordCompare,
        passwordError,
        passwordCompareError,
        hasCredentialError,
        pwState,
        pwCompareState,
        getValidationErrors,
        setPassword,
        setPasswordCompare,
        validate
    ]);
};

export type PasswordEntryStateType = ReturnType<typeof usePasswordEntryState>;

export const PasswordEntry = ({
    state,
    epistoEntryProps
}: {
    state: PasswordEntryStateType,
    epistoEntryProps?: EpistoEntryNewPropsType
}) => {

    const {
        passwordError,
        passwordCompareError,
        pwState,
        pwCompareState,
        setPassword,
        setPasswordCompare,
        getValidationErrors
    } = state;

    const labels = {
        pw: 'Jelszó',
        pwCompare: 'Jelszó mégegyszer'
    };

    return (
        <>
            <EpistoEntryNew
                labelVariant="top"
                type="password"
                label={labels.pw}
                placeholder={labels.pw}
                name="password"
                style={{
                    width: '100%'
                }}
                onFocusLost={setPassword}
                {...{
                    state: pwState,
                    ...(epistoEntryProps ?? {})
                }} />

            <EpistoEntryNew
                type="password"
                labelVariant="top"
                label={labels.pwCompare}
                placeholder={labels.pwCompare}
                onFocusLost={setPasswordCompare}
                name="passwordCompare"
                style={{
                    width: '100%'
                }}
                {...{
                    state: pwCompareState,
                    ...(epistoEntryProps ?? {})
                }} />
        </>
    );
};