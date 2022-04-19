import { Image } from '@chakra-ui/image';
import { Flex } from '@chakra-ui/layout';
import { Checkbox, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { applicationRoutes } from '../configuration/applicationRoutes';
import { useRegisterInvitedUser, useRegisterUser } from '../services/api/registrationApiService';
import { useNavigation } from '../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../services/core/notifications';
import { getAssetUrl, usePasswordEntryState } from '../static/frontendHelpers';
import { useBoolParam, useStringParam } from '../static/locationHelpers';
import { translatableTexts } from '../static/translatableTexts';
import { EpistoButton } from './controls/EpistoButton';
import { EpistoFont } from './controls/EpistoFont';
import { RefetchUserAsyncContext } from './system/AuthenticationFrame';
import { LoadingFrame } from './system/LoadingFrame';

export const RegistrationPage = () => {

    //const token = useStringParam('token')!;
    const params = useParams();
    const token = params.token + '';

    const isInvited = !!params.isInvited;
    //const isInvited = useBoolParam('isInvited')!;

    const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState(false);

    // registration
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');

    // invitation
    const {
        password,
        passwordCompare,
        passwordCompareError,
        passwordError,
        hasCredentialError,
        setPassword,
        setPasswordCompare,
        validate
    } = usePasswordEntryState();

    const showErrorDialog = useShowErrorDialog();
    const { navigate } = useNavigation();
    const { registerUserAsync, registerUserState } = useRegisterUser();
    const { registerInvitedUserAsync, registerInvitedUserState } = useRegisterInvitedUser();

    const refetchUser = useContext(RefetchUserAsyncContext);

    const handleRegistration = async () => {

        if (!validate())
            return;

        try {

            if (isInvited) {

                await registerInvitedUserAsync(token, password, passwordCompare);
            } else {

                await registerUserAsync(token, emailAddress, firstName, lastName);
            }

            showNotification(translatableTexts.registrationPage.successfulRegistration);
            await refetchUser();
            navigate(applicationRoutes.signupRoute);
        }
        catch (e) {

            showErrorDialog(translatableTexts.registrationPage.unknownErrorTryAgain);
        }
    };

    return <Flex
        background="var(--gradientBlueBackground)"
        height="100vh"
        direction="column"
        align="center"
        justify="center"
        position="relative">

        <LoadingFrame
            loadingState={[registerUserState, registerInvitedUserState]}
            direction="column"
            width={500}
            maxWidth="95%"
            position="relative"
            bg="white"
            padding="30px"
            alignItems="center"
            justifyContent={'center'}
            className="roundBorders"
            boxShadow="#00000024 10px 30px 50px 0px">


            <Flex width="100%"
maxH={50}
my="25px"
justifyContent={'center'}>
                <Image width="50%"
src={getAssetUrl('/images/logo.svg')} />
            </Flex>

            {!isInvited && <EpistoFont>{translatableTexts.registrationPage.learningStyleSurvey}</EpistoFont>}

            {isInvited && <EpistoFont isMultiline>{translatableTexts.registrationPage.setPasswordDescription}</EpistoFont>}

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
            {isInvited && <>

                <TextField
                    variant="standard"
                    label={translatableTexts.registrationPage.passwordLabel}
                    type="password"
                    value={password}
                    error={!!passwordError}
                    helperText={passwordError}
                    onChange={x => {
                        setPassword(x.currentTarget.value);
                    }}
                    style={{ margin: '10px' }}></TextField>

                <TextField
                    variant="standard"
                    type="password"
                    label={translatableTexts.registrationPage.passwordAgainLabel}
                    value={passwordCompare}
                    error={!!passwordCompareError}
                    helperText={passwordCompareError}
                    onChange={x => {
                        setPasswordCompare(x.currentTarget.value);
                    }}
                    style={{ margin: '10px' }}>

                </TextField>
            </>}

            <Flex direction={'row'}
alignItems={'center'}>

                <Checkbox
                    checked={acceptPrivacyPolicy}
                    value={acceptPrivacyPolicy}
                    onClick={() => setAcceptPrivacyPolicy(p => !p)} />

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
            </Flex>


            <EpistoButton
                onClick={handleRegistration}
                variant="outlined"
                isDisabled={!acceptPrivacyPolicy || (isInvited && hasCredentialError)}
                style={{
                    width: '200px',
                    alignSelf: 'center',
                    marginTop: '20px'
                }}>

                {translatableTexts.registrationPage.letsStart}
            </EpistoButton>
        </LoadingFrame>
    </Flex>;
};
