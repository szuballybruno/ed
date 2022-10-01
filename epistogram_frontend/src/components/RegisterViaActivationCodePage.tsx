import { useState } from 'react';
import { useRegisterUserViaActivationCode } from '../services/api/registrationApiService';
import { useNavigation } from '../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../services/core/notifications';
import { ErrorCodeType } from '../shared/types/sharedTypes';
import { Environment } from '../static/Environemnt';
import { translatableTexts } from '../static/translatableTexts';
import { EpistoButton } from './controls/EpistoButton';
import { EpistoEntryNew, useEpistoEntryState } from './controls/EpistoEntryNew';
import { EpistoFlex2 } from './controls/EpistoFlex';
import { EpistoFont } from './controls/EpistoFont';
import { validateAllEntries } from './controls/logic/controlsLogic';
import { PageRootContainer } from './PageRootContainer';
import { LoadingFrame } from './system/LoadingFrame';

export const RegisterViaActivationCodePage = () => {

    const {
        registerUserViaActivationCodeAsync,
        registerUserViaActivationCodeState
    } = useRegisterUserViaActivationCode();

    const showError = useShowErrorDialog();
    const { navigate2 } = useNavigation();

    // state
    const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

    const emailEntryState = useEpistoEntryState({ isMandatory: true });
    const firstNameEntryState = useEpistoEntryState({ isMandatory: true });
    const lastNameEntryState = useEpistoEntryState({ isMandatory: true });
    const activationCodeEntryState = useEpistoEntryState({ isMandatory: true });

    // func

    const validateAll = () => validateAllEntries([
        emailEntryState,
        firstNameEntryState,
        lastNameEntryState,
        activationCodeEntryState
    ]);

    const handleRegisterAsync = async () => {

        try {

            if (!validateAll())
                return;

            await registerUserViaActivationCodeAsync(
                activationCodeEntryState.value,
                emailEntryState.value,
                firstNameEntryState.value,
                lastNameEntryState.value);

            setRegistrationSuccessful(true);
            showNotification(translatableTexts.registerViaActivationCodePage.successfulSignup);
        }
        catch (e: any) {

            const errorCode = e.code as ErrorCodeType;

            if (errorCode === 'activation_code_issue') {

                activationCodeEntryState
                    .setError(translatableTexts.registerViaActivationCodePage.wrongActivationCode);
            }
            else if (errorCode === 'email_taken') {

                emailEntryState
                    .setError(translatableTexts.registerViaActivationCodePage.wrongEmailAddress);
            }
            else {

                showError(e);
            }
        }
    };

    return <PageRootContainer>

        <EpistoFlex2
            justify={'center'}
            background="gradientBlueBackground"
            py="60px"
            overflowY={'scroll'}
            height="100%"
            width="100%">

            {/* content */}
            <EpistoFlex2
                wrap={'wrap'}
                background="var(--transparentWhite70)"
                zIndex="6"
                width="100%"
                maxW="1700px"
                height="fit-content"
                mx="100px"
                p="50px 150px"
                overflow="hidden"
                position={'relative'}>

                <EpistoFlex2
                    direction="column"
                    align="center"
                    justify="center"
                    //bgColor="green"
                    zIndex="7"
                    minWidth="300px"
                    flex="5">

                    {/* epi logo */}
                    <img
                        src={Environment.getAssetUrl('/images/logo.svg')}
                        style={{
                            width: '250px',
                            maxHeight: '100px',
                            objectFit: 'contain',
                            marginLeft: '15px',
                            cursor: 'pointer',
                        }}
                        alt="" />

                    {/* 3d redeem image */}
                    <img
                        src={Environment.getAssetUrl('/images/redeem3D.png')}
                        style={{
                            width: '100%',
                            maxHeight: '350px',
                            objectFit: 'contain',
                            marginLeft: '15px',
                            cursor: 'pointer',
                        }}
                        alt="" />

                </EpistoFlex2>

                {/* form */}
                <LoadingFrame
                    id="form"
                    minWidth="400px"
                    loadingState={registerUserViaActivationCodeState}
                    direction="column"
                    zIndex="7"
                    flex="5">

                    {/* Redeem title */}
                    <EpistoFlex2
                        minH="80px"
                        direction="column"
                        justify="center"
                        maxW="320px"
                        align="center">

                        <EpistoFont
                            style={{
                                textAlign: 'left'
                            }}
                            fontSize={20}>

                            {translatableTexts.registerViaActivationCodePage.redeemYourCode}
                        </EpistoFont>
                    </EpistoFlex2>

                    {/* Redeem info input fields */}
                    <EpistoFlex2
                        direction="column">

                        <EpistoEntryNew
                            state={emailEntryState}
                            labelVariant="top"
                            label="E-mail"
                            placeholder="te@email.com"
                            name="email"
                            height="30px" />

                        <EpistoEntryNew
                            state={lastNameEntryState}
                            labelVariant="top"
                            label={translatableTexts.misc.lastName}
                            placeholder={translatableTexts.misc.lastName}
                            name="lastName"
                            height="30px" />

                        <EpistoEntryNew
                            state={firstNameEntryState}
                            labelVariant="top"
                            label={translatableTexts.misc.firstName}
                            placeholder={translatableTexts.misc.firstName}
                            name="firstName"
                            height="30px" />

                        <EpistoEntryNew
                            state={activationCodeEntryState}
                            labelVariant="top"
                            label={translatableTexts.registerViaActivationCodePage.activationCode.label}
                            placeholder={translatableTexts.registerViaActivationCodePage.activationCode.placeholder}
                            name="activationCode"
                            height="30px" />
                    </EpistoFlex2>

                    {/* registration button */}
                    <EpistoFlex2
                        align="center"
                        justify="center"
                        minH='80px'>

                        <EpistoButton
                            style={{
                                width: '100%',
                                backgroundColor: '#324658',
                                height: 60
                            }}
                            onClick={handleRegisterAsync}
                            variant="colored">

                            {translatableTexts.registerViaActivationCodePage.signup}
                        </EpistoButton>
                    </EpistoFlex2>

                    <EpistoFlex2
                        justify="space-between"
                        align="center"
                        height='80px'>

                        <EpistoFont
                            color="fontGray">

                            {translatableTexts.registerViaActivationCodePage.dontHaveAccount}
                        </EpistoFont>

                        <EpistoFont
                            style={{
                                maxWidth: '250px',
                                textAlign: 'right',
                                color: 'var(--epistoTeal)'
                            }}>

                            <a href="https://pcworld.hu/elofizetes"
                                target="_blank"
                                rel="noreferrer">

                                {translatableTexts.registerViaActivationCodePage.buySubscription}
                            </a>
                        </EpistoFont>
                    </EpistoFlex2>


                    <EpistoFlex2
                        position="fixed"
                        align="center"
                        justify="center"
                        width="100vw"
                        height="100vh"
                        background="var(--transparentWhite70)"
                        top="0"
                        left="0"
                        display={registrationSuccessful ? undefined : 'none'}>

                        <EpistoFlex2
                            className="roundBorders mildShadow"
                            background="white"
                            align="center"
                            justify="center"
                            padding="50px"
                            width="500px"
                            height="250px">

                            <EpistoFont style={{ textAlign: 'center' }}>
                                {translatableTexts.registerViaActivationCodePage.signupSuccessfulDescriptions[0]}
                                {emailEntryState.value}
                                {translatableTexts.registerViaActivationCodePage.signupSuccessfulDescriptions[1]}
                            </EpistoFont>
                        </EpistoFlex2>

                    </EpistoFlex2>

                </LoadingFrame>
            </EpistoFlex2>
        </EpistoFlex2 >
    </PageRootContainer >;
};
