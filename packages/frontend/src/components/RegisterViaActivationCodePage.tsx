import { useEffect, useMemo } from 'react';
import { applicationRoutes } from '../configuration/applicationRoutes';
import { useRegisterUserViaActivationCode } from '../services/api/registrationApiService';
import { useNavigation } from '../services/core/navigatior';
import { showNotification } from '../services/core/notifications';
import { Environment } from '../static/Environemnt';
import { useIsMobileView, useTryCatchWrapper } from '../static/frontendHelpers';
import { LocationHelpers } from '../static/locationHelpers';
import { translatableTexts } from '../static/translatableTexts';
import { EpistoButton } from './controls/EpistoButton';
import { EpistoEntryNew, useEpistoEntryState } from './controls/EpistoEntryNew';
import { EpistoFlex2 } from './controls/EpistoFlex';
import { EpistoFont } from './controls/EpistoFont';
import { validateAllEntries } from './controls/logic/controlsLogic';
import { LoadingFrame } from './system/LoadingFrame';
import { PasswordEntry, usePasswordEntryState } from './universal/PasswordEntry';

export const RegisterViaActivationCodePage = () => {

    const {
        registerUserViaActivationCodeAsync,
        registerUserViaActivationCodeState
    } = useRegisterUserViaActivationCode();

    const { navigate2 } = useNavigation();
    const isMobile = useIsMobileView();
    const query = LocationHelpers
        .useQueryParams<{ activationCode: string }>();

    const activationCode = query
        .getValueOrNull(x => x.activationCode, 'string');

    // state
    const emailEntryState = useEpistoEntryState({ isMandatory: true });
    const firstNameEntryState = useEpistoEntryState({ isMandatory: true });
    const lastNameEntryState = useEpistoEntryState({ isMandatory: true });
    const activationCodeEntryState = useEpistoEntryState({ isMandatory: true });
    const passwordState = usePasswordEntryState();

    /**
     * Set activation code
     */
    useEffect(() => {

        if (!activationCode)
            return;

        if (activationCodeEntryState.value)
            return;

        activationCodeEntryState
            .setValue(activationCode);
    }, [activationCode, activationCodeEntryState]);

    /**
     * Prepare error handler wrapper 
     * for register function
     */
    const { errorMessage, getWrappedAction } = useTryCatchWrapper(code => {

        if (code === 'activation_code_issue') {

            activationCodeEntryState
                .setErrorMsg(translatableTexts.registerViaActivationCodePage.wrongActivationCode);

            return 'PREVENT MSG';
        }

        if (code === 'email_taken') {

            emailEntryState
                .setErrorMsg(translatableTexts.registerViaActivationCodePage.wrongEmailAddress);

            return 'PREVENT MSG';
        }
    });

    /**
     * Is validation ok
     */
    const isAllValid = useMemo(() => {

        const entriesValid = validateAllEntries([
            emailEntryState,
            firstNameEntryState,
            lastNameEntryState,
            activationCodeEntryState
        ]);

        const pwStateValid = !passwordState
            .hasCredentialError;

        return entriesValid && pwStateValid;
    }, [emailEntryState, firstNameEntryState, lastNameEntryState, activationCodeEntryState, passwordState]);

    /**
     * Register async 
     */
    const handleRegisterAsync = getWrappedAction(async () => {

        if (!isAllValid)
            return;

        await registerUserViaActivationCodeAsync({
            activationCode: activationCodeEntryState.value,
            emailAddress: emailEntryState.value,
            firstName: firstNameEntryState.value,
            lastName: lastNameEntryState.value,
            password: passwordState.password,
            passwordCompare: passwordState.passwordCompare
        });

        showNotification(translatableTexts.registerViaActivationCodePage.successfulSignup);
        navigate2(applicationRoutes.homeRoute);
    });

    return <>

        <EpistoFlex2
            justify={'center'}
            background="gradientBlueBackground"
            py={isMobile ? undefined : '60px'}
            pt={isMobile ? '10px' : undefined}
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
                mx={isMobile ? undefined : '100px'}
                p={isMobile ? '10px' : '50px 150px'}
                overflow="hidden"
                position={'relative'}>

                <EpistoFlex2
                    direction="column"
                    align="center"
                    justify="center"
                    //bgColor="green"
                    zIndex="7"
                    width={isMobile ? '100%' : undefined}
                    minWidth="300px"
                    flex="5">

                    {/* epi logo */}
                    <img
                        src={Environment.getAssetUrl('/images/logo.svg')}
                        style={{
                            width: isMobile ? '120px' : '250px',
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
                            maxHeight: isMobile ? '200px' : '350px',
                            objectFit: 'contain',
                            marginLeft: isMobile ? undefined : '15px',
                            cursor: 'pointer',
                        }}
                        alt="" />

                </EpistoFlex2>

                {/* form */}
                <LoadingFrame
                    id="form"
                    minWidth={isMobile ? undefined : '400px'}
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

                    {/* Entry fields */}
                    <EpistoFlex2
                        direction="column">

                        <EpistoEntryNew
                            state={emailEntryState}
                            labelVariant="top"
                            label="E-mail"
                            placeholder="te@email.com"
                            name="email"
                            height={isMobile ? '40px' : '30px'} />

                        <EpistoEntryNew
                            state={lastNameEntryState}
                            labelVariant="top"
                            label={translatableTexts.misc.lastName}
                            placeholder={translatableTexts.misc.lastName}
                            name="lastName"
                            height={isMobile ? '40px' : '30px'} />

                        <EpistoEntryNew
                            state={firstNameEntryState}
                            labelVariant="top"
                            label={translatableTexts.misc.firstName}
                            placeholder={translatableTexts.misc.firstName}
                            name="firstName"
                            height={isMobile ? '40px' : '30px'} />

                        <EpistoEntryNew
                            state={activationCodeEntryState}
                            labelVariant="top"
                            label={translatableTexts.registerViaActivationCodePage.activationCode.label}
                            placeholder={translatableTexts.registerViaActivationCodePage.activationCode.placeholder}
                            name="activationCode"
                            height={isMobile ? '40px' : '30px'} />

                        <PasswordEntry
                            state={passwordState}
                            display={'EPISTO'} />
                    </EpistoFlex2>

                    {/* registration button */}
                    <EpistoFlex2
                        align="center"
                        justify="center"
                        minH='80px'>

                        <EpistoButton
                            style={{
                                width: '100%',
                                backgroundColor: isAllValid ? '#324658' : undefined,
                                height: 60
                            }}
                            isDisabled={!isAllValid}
                            onClick={handleRegisterAsync}
                            variant="colored">

                            {translatableTexts.registerViaActivationCodePage.register}
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
                </LoadingFrame>
            </EpistoFlex2>
        </EpistoFlex2>
    </>;
};
