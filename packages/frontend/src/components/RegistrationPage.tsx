import { useState } from 'react';
import { applicationRoutes } from '../configuration/applicationRoutes';
import { Responsivity } from '../helpers/responsivity';
import { FeatureApiService } from '../services/api/FeatureApiService';
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
import { MUI } from './controls/MUIControls';
import { ContentPane } from './pageRootContainer/ContentPane';
import { LoadingFrame } from './system/LoadingFrame';
import { PasswordEntry, usePasswordEntryState } from './universal/PasswordEntry';

export const RegistrationPage = () => {

    // query params 
    const queryParams = LocationHelpers
        .useQueryParams<{ token: string, isInvited: string }>();
    const token = queryParams.getValue(x => x.token, 'string');
    const isInvitedString = queryParams.getValue(x => x.isInvited, 'string');
    const isInvited = isInvitedString === 'true' ? true : false;
    const { isMobile } = Responsivity.useIsMobileView();
    const { isIPhone } = Responsivity.useIsIPhone();

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
    const { checkFeature } = FeatureApiService.useCheckFeature();

    //const { refetchAuthHandshake } = useAuthContextState();

    const handleRegisterUser = async () => {

        if (passwordEntryState.validate()) {

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

            // TODO:2 CHECKFEATURE
            const isSurveyEnabled = await checkFeature({
                featureCode: 'SIGNUP_SURVEY'
            });

            if (isSurveyEnabled) {

                navigate2(applicationRoutes.surveyRoute);
            }
            else {

                navigate2(applicationRoutes.homeRoute);
            }
        }
        catch (e) {

            showErrorDialog(translatableTexts.registrationPage.unknownErrorTryAgain);
        }
    };

    return <ContentPane
        hideNavbar
        height={isMobile ? 'calc(100vh - 80px)' : '100vh'}
        width='100vw'
        align="center"
        justify="center">

        <LoadingFrame
            loadingState={[registerUserState, registerInvitedUserState]}
            direction="column"
            width={isMobile ? '100%' : '500px'}
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
                    src={Environment.getAssetUrl('/images/logo.png')} />
            </EpistoFlex2>

            {/* some label idk TODO */}
            {isInvited
                ? <EpistoFont
                    textColor='eduptiveDeepDarkGreen'
                    isMultiline>

                    {translatableTexts.registrationPage.setPasswordDescription}
                </EpistoFont>
                : <EpistoFont
                    textColor='eduptiveDeepDarkGreen'>

                    {translatableTexts.registrationPage.learningStyleSurvey}
                </EpistoFont>}

            {/* registration */}
            {!isInvited && <>
                <MUI.TextField
                    variant="standard"
                    label={translatableTexts.registrationPage.firstNameLabel}
                    value={firstName}
                    onChange={x => setFirstName(x.currentTarget.value)}
                    style={{ margin: '10px' }}></MUI.TextField>

                <MUI.TextField
                    variant="standard"
                    label={translatableTexts.registrationPage.lastNameLabel}
                    value={lastName}
                    onChange={x => setLastName(x.currentTarget.value)}
                    style={{ margin: '10px' }}></MUI.TextField>

                <MUI.TextField
                    variant="standard"
                    label={translatableTexts.registrationPage.emailLabel}
                    value={emailAddress}
                    onChange={x => setEmailAddress(x.currentTarget.value)}
                    style={{ margin: '10px' }}></MUI.TextField>
            </>}

            {/* invited */}
            {isInvited && <PasswordEntry
                state={passwordEntryState} />}

            <EpistoFlex2 direction={'row'}
                alignItems={'center'}>

                <MUI.Checkbox
                    checked={isPrivacyPolicyAccepted}
                    value={isPrivacyPolicyAccepted}
                    onClick={() => setIsPrivacyPolicyAccepted(p => !p)} />

                <EpistoFont
                    textColor='eduptiveDeepDarkGreen'
                    style={{
                        userSelect: 'none'
                    }}>

                    {translatableTexts.registrationPage.privacyPolicyDescriptionParts[0]}

                    <a
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#0055CC' }}
                        href={'https://dtraining.hu/adatkezelesi-tajekoztato'}>

                        {' ' + translatableTexts.registrationPage.privacyPolicyDescriptionParts[1]}
                    </a>

                    {translatableTexts.registrationPage.privacyPolicyDescriptionParts[2]}
                </EpistoFont>
            </EpistoFlex2>


            <EpistoButton
                onClick={handleRegisterUser}
                variant="action"
                isDisabled={!isPrivacyPolicyAccepted || (isInvited && passwordEntryState.hasCredentialError)}
                style={{
                    width: '200px',
                    alignSelf: 'center',
                    marginTop: '20px'
                }}>

                {translatableTexts.registrationPage.letsStart}
            </EpistoButton>
        </LoadingFrame>
    </ContentPane>;
};
