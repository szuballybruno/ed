import { TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { validatePassowrd } from '../../shared/logic/sharedLogic';
import { EpistoEntryNew, EpistoEntryNewPropsType, useEpistoEntryState } from '../controls/EpistoEntryNew';

export const usePasswordEntryState = () => {

    // pw 
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string | null>(null);

    // pw comapre 
    const [passwordCompare, setPasswordCompare] = useState('');
    const [passwordCompareError, setPasswordCompareError] = useState<string | null>(null);

    const getValidationErrors = useCallback((password: string, passwordCompare: string) => {

        const pwValidationErrorCode = validatePassowrd(password, passwordCompare);

        const [passwordErrorMessage, passwordCompareErrorMessage] = ((): [string | null, string | null] => {

            if (pwValidationErrorCode === 'passwordIsEmpty')
                return ['Nincs jelszo megadva.', 'Nincs jelszo megadva.'];

            if (pwValidationErrorCode === 'tooShort')
                return ['A jelszó túl rövid!', null];

            if (pwValidationErrorCode === 'tooLong')
                return ['A jelszó túl hosszú!', null];

            if (pwValidationErrorCode === 'doesNotMatchControlPassword')
                return ['A jelszavak nem egyeznek!', 'A jelszavak nem egyeznek!'];

            if (pwValidationErrorCode === 'hasNoNumber')
                return ['A jelszó nem tartalmaz számot!', null];

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
    }, [password, passwordCompare]);

    /**
     * Validate passwords whenever validate function ref changes 
     */
    useEffect(() => {

        validate();
    }, [validate]);

    return {
        password,
        passwordCompare,
        passwordError,
        passwordCompareError,
        hasCredentialError: !!passwordError || !!passwordCompareError,
        getValidationErrors,
        setPassword,
        setPasswordCompare,
        validate
    };
};

export type PasswordEntryStateType = ReturnType<typeof usePasswordEntryState>;

export const PasswordEntry = ({
    state,
    display = 'MUI',
    epistoEntryProps
}: {
    state: PasswordEntryStateType,
    display?: 'MUI' | 'EPISTO',
    epistoEntryProps?: EpistoEntryNewPropsType
}) => {

    const {
        passwordError,
        passwordCompareError,
        setPassword,
        setPasswordCompare,
        getValidationErrors
    } = state;

    const labels = {
        pw: 'Jelszó',
        pwCompare: 'Jelszó mégegyszer'
    };

    /**
     * Validators 
     */
    const validatePassowrd = useCallback((pw: string) => {

        return getValidationErrors(pw, state.passwordCompare).passwordErrorMessage;
    }, [state.passwordCompare, getValidationErrors]);

    const validatePassowrdCompare = useCallback((pwCompare: string) => {

        return getValidationErrors(state.password, pwCompare).passwordCompareErrorMessage;
    }, [state.password, getValidationErrors]);

    /**
     * Episto entry states 
     */
    const pwState = useEpistoEntryState({ isMandatory: true, validateFunction: validatePassowrd });
    const pwCompareState = useEpistoEntryState({ isMandatory: true, validateFunction: validatePassowrdCompare });

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

    return (
        display === 'MUI'
            ? <>
                <TextField
                    style={{ margin: '20px' }}
                    variant="standard"
                    type="password"
                    autoComplete="new-password"
                    error={!!passwordError}
                    helperText={passwordError}
                    onChange={x => setPassword(x.currentTarget.value)}
                    label={labels.pw}></TextField>


                <TextField
                    style={{ margin: '0 20px 20px 20px' }}
                    variant="standard"
                    autoComplete="new-password"
                    type="password"
                    error={!!passwordCompareError}
                    helperText={passwordCompareError}
                    onChange={x => setPasswordCompare(x.currentTarget.value)}
                    label={labels.pwCompare}></TextField>
            </>
            : <>
                <EpistoEntryNew
                    labelVariant="top"
                    type="password"
                    label={labels.pw}
                    placeholder={labels.pw}
                    name="password"
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
                    {...{
                        state: pwCompareState,
                        ...(epistoEntryProps ?? {})
                    }} />
            </>
    );
};