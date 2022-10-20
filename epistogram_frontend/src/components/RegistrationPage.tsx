import { Checkbox, TextField } from '@mui/material';
import { useState } from 'react';
import { applicationRoutes } from '../configuration/applicationRoutes';
import { useRegisterInvitedUser, useRegisterUser } from '../services/api/registrationApiService';
import { useNavigation } from '../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../services/core/notifications';
import { Environment } from '../static/Environemnt';
import { LocationHelpers } from '../static/locationHelpers';
import { translatableTexts } from '../static/translatableTexts';
import { EpistoButton } from './controls/EpistoButton';
import { EpistoFlex2 } from './controls/EpistoFlex';
import { EpistoFont } from './controls/EpistoFont';
import { EpistoImage } from './controls/EpistoImage';
import { useRefetchUserAsync } from './system/AuthenticationFrame';
import { LoadingFrame } from './system/LoadingFrame';
import { PasswordEntry, usePasswordEntryState } from './universal/PasswordEntry';

export const RegistrationPage = () => {

    // query params 
    const queryParams = LocationHelpers
        .useQueryParams<{ token: string, isInvited: string }>();
    const token = queryParams.getValue(x => x.token, 'string');
    const isInvitedString = queryParams.getValue(x => x.isInvited, 'string');
    const isInvited = isInvitedString === 'true' ? true : false;

    // state 
    const [isPrivacyPolicyAccepted, setIsPrivacyPolicyAccepted] = useState(false);
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');

    const passwordEntryState = usePasswordEntryState();

    const { navigate2 } = useNavigation();
    const showErrorDialog = useShowErrorDialog();
    const { registerUserAsync, registerUserState } = useRegisterUser();
    const { registerInvitedUserAsync, registerInvitedUserState } = useRegisterInvitedUser();

    const { refetchAuthHandshake } = useRefetchUserAsync();

    const handleRegisterUser = async () => {

        if (!passwordEntryState.validate()) {

            showErrorDialog('Validation failed!');
            throw new Error('Validation failed!');
        }

        try {

            // reigster user via invitation token
            if (isInvited) {

                await registerInvitedUserAsync(token, passwordEntryState.password, passwordEntryState.passwordCompare);
            }

            // register user via public token  
            else {

                await registerUserAsync(token, emailAddress, firstName, lastName);
            }

            showNotification(translatableTexts.registrationPage.successfulRegistration);
            const { permissions } = await refetchAuthHandshake();

            if (permissions.any(x => x === 'BYPASS_SURVEY')) {

                navigate2(applicationRoutes.homeRoute);
            }
            else {

                navigate2(applicationRoutes.surveyRoute);
            }
        }
        catch (e) {

            showErrorDialog(translatableTexts.registrationPage.unknownErrorTryAgain);
        }
    };

    return <EpistoFlex2
        background="var(--gradientBlueBackground)"
        height="100vh"
        width='100vw'
        direction="column"
        align="center"
        justify="center"
        position="relative">

        <LoadingFrame
            loadingState={[registerUserState, registerInvitedUserState]}
            direction="column"
            width='500px'
            maxWidth="95%"
            position="relative"
            bg="white"
            padding="30px"
            alignItems="center"
            justifyContent={'center'}
            className="roundBorders"
            boxShadow="#00000024 10px 30px 50px 0px">

            <EpistoFlex2
                width="100%"
                maxH='50px'
                my="25px"
                justifyContent={'center'}>

                <EpistoImage
                    width="50%"
                    src={Environment.getAssetUrl('/images/logo.svg')} />
            </EpistoFlex2>

            {/* some label idk TODO */}
            {isInvited
                ? <EpistoFont isMultiline>
                    {translatableTexts.registrationPage.setPasswordDescription}
                </EpistoFont>
                : <EpistoFont>
                    {translatableTexts.registrationPage.learningStyleSurvey}
                </EpistoFont>}

            {/* registration */}
            {!isInvited && <>
                <TextField
                    variant="standard"
                    label={translatableTexts.registrationPage.firstNameLabel}
                    value={firstName}
                    onChange={x => setFirstName(x.currentTarget.value)}
                    style={{ margin: '10px' }}></TextField>

                <TextField
                    variant="standard"
                    label={translatableTexts.registrationPage.lastNameLabel}
                    value={lastName}
                    onChange={x => setLastName(x.currentTarget.value)}
                    style={{ margin: '10px' }}></TextField>

                <TextField
                    variant="standard"
                    label={translatableTexts.registrationPage.emailLabel}
                    value={emailAddress}
                    onChange={x => setEmailAddress(x.currentTarget.value)}
                    style={{ margin: '10px' }}></TextField>
            </>}

            {/* invited */}
            {isInvited && <PasswordEntry
                state={passwordEntryState} />}

            <EpistoFlex2 direction={'row'}
                alignItems={'center'}>

                <Checkbox
                    checked={isPrivacyPolicyAccepted}
                    value={isPrivacyPolicyAccepted}
                    onClick={() => setIsPrivacyPolicyAccepted(p => !p)} />

                <EpistoFont
                    style={{
                        userSelect: 'none'
                    }}>

                    {translatableTexts.registrationPage.privacyPolicyDescriptionParts[0]}

                    <a
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#0055CC' }}
                        href={'https://epistogram.com/adatkezelesi-tajekoztato'}>

                        {' ' + translatableTexts.registrationPage.privacyPolicyDescriptionParts[1]}
                    </a>

                    {translatableTexts.registrationPage.privacyPolicyDescriptionParts[2]}
                </EpistoFont>
            </EpistoFlex2>


            <EpistoButton
                onClick={handleRegisterUser}
                variant="outlined"
                isDisabled={!isPrivacyPolicyAccepted || (isInvited && passwordEntryState.hasCredentialError)}
                style={{
                    width: '200px',
                    alignSelf: 'center',
                    marginTop: '20px'
                }}>

                {translatableTexts.registrationPage.letsStart}
            </EpistoButton>
        </LoadingFrame>
    </EpistoFlex2>;
};
