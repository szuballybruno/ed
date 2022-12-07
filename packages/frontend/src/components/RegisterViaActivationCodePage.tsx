import { useCallback, useEffect, useMemo } from 'react';
import { applicationRoutes } from '../configuration/applicationRoutes';
import { Responsivity } from '../helpers/responsivity';
import { CompanyApiService } from '../services/api/CompanyApiService';
import { useRegisterUserViaActivationCode } from '../services/api/registrationApiService';
import { useNavigation } from '../services/core/navigatior';
import { showNotification } from '../services/core/notifications';
import { Environment } from '../static/Environemnt';
import { useSafeWrapper } from '../static/frontendHelpers';
import { LocationHelpers } from '../static/locationHelpers';
import { translatableTexts } from '../static/translatableTexts';
import { EpistoButton } from './controls/EpistoButton';
import { EpistoEntryNew, EpistoEntryStateType, useEpistoEntryState } from './controls/EpistoEntryNew';
import { EpistoFlex2 } from './controls/EpistoFlex';
import { EpistoFont } from './controls/EpistoFont';
import { ContentPane } from './pageRootContainer/ContentPane';
import { PasswordEntry, usePasswordEntryState } from './universal/PasswordEntry';

const validateAllEntries = (entryStates: EpistoEntryStateType[]) => {

    const isValid = !entryStates
        .map(x => x.validate())
        .some(x => !x);

    return isValid;
};

const isAllEntriesFilled = (entryStates: EpistoEntryStateType[]) => {

    return entryStates
        .none(x => x.isMandatory && x.value === '');
};

export const RegisterViaActivationCodePage = () => {

    const {
        registerUserViaActivationCodeAsync,
        registerUserViaActivationCodeState
    } = useRegisterUserViaActivationCode();

    const { navigate2 } = useNavigation();
    const { isMobile } = Responsivity
        .useIsMobileView();
    const query = LocationHelpers
        .useQueryParams<{ activationCode: string }>();

    const activationCode = query
        .getValueOrNull(x => x.activationCode, 'string');

    // state
    const emailEntryState = useEpistoEntryState({ isMandatory: true });
    const usernameEntryState = useEpistoEntryState({ isMandatory: true });
    const firstNameEntryState = useEpistoEntryState({ isMandatory: true });
    const lastNameEntryState = useEpistoEntryState({ isMandatory: true });
    const activationCodeEntryState = useEpistoEntryState({ isMandatory: true });
    const passwordState = usePasswordEntryState();

    const { companyDetails } = CompanyApiService
        .useCompanyDetailsByDomain();

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
     * Is validation ok
     */
    const getIsAllValid = useCallback(() => {

        const entriesValid = validateAllEntries([
            emailEntryState,
            firstNameEntryState,
            lastNameEntryState,
            activationCodeEntryState,
            usernameEntryState
        ]);

        const pwStateValid = !passwordState
            .hasCredentialError;

        return entriesValid && pwStateValid;
    }, [
        emailEntryState.value,
        firstNameEntryState.value,
        lastNameEntryState.value,
        usernameEntryState.value,
        activationCodeEntryState.value,
        passwordState
    ]);

    const isAllFilled = useMemo(() => {

        const entriesFilled = isAllEntriesFilled([
            emailEntryState,
            firstNameEntryState,
            lastNameEntryState,
            usernameEntryState,
            activationCodeEntryState
        ]);

        const pwStateValid = passwordState
            .password !== '' && passwordState.passwordCompare !== '';

        return entriesFilled && pwStateValid;
    }, [emailEntryState, firstNameEntryState, lastNameEntryState, usernameEntryState, activationCodeEntryState, passwordState]);

    const isAllValid = useMemo(() => {

        if (!isAllFilled)
            return;

        return getIsAllValid();
    }, [getIsAllValid, isAllFilled]);

    /**
     * Register async 
     */
    const handleRegisterAsync = useCallback(async () => {

        if (!isAllValid)
            throw new Error('Not all fields are valid!');

        await registerUserViaActivationCodeAsync({
            activationCode: activationCodeEntryState.value,
            emailAddress: emailEntryState.value,
            firstName: firstNameEntryState.value,
            lastName: lastNameEntryState.value,
            username: usernameEntryState.value,
            password: passwordState.password,
            passwordCompare: passwordState.passwordCompare
        });

        showNotification(translatableTexts.registerViaActivationCodePage.successfulSignup);

        navigate2(companyDetails?.isSurveyRequired
            ? applicationRoutes.surveyRoute
            : applicationRoutes.homeRoute);
    }, [
        navigate2,
        registerUserViaActivationCodeAsync,
        isAllValid,
        activationCodeEntryState.value,
        companyDetails?.isSurveyRequired,
        emailEntryState.value,
        firstNameEntryState.value,
        lastNameEntryState.value,
        usernameEntryState.value,
        passwordState.password,
        passwordState.passwordCompare
    ]);

    /**
     * Prepare error handler wrapper 
     * for register function
     */
    const getMessageFromCode = useCallback((code, defaultMsg) => {

        if (code === 'activation_code_issue') {

            activationCodeEntryState
                .setErrorMsg(translatableTexts.misc.wrongActivationCode);
        }
        else if (code === 'email_taken') {

            emailEntryState
                .setErrorMsg(translatableTexts.misc.wrongEmailAddress);
        }
        else if (code === 'username_invalid') {

            usernameEntryState
                .setErrorMsg(translatableTexts.misc.wrongUsername);
        }
        else {

            return defaultMsg;
        }
    }, [activationCodeEntryState, emailEntryState, usernameEntryState]);

    const { errorMessage, wrappedAction: handleRegisterSafeAsync } = useSafeWrapper(handleRegisterAsync, getMessageFromCode);

    return <>

        <ContentPane
            hideNavbar
            overflowY='scroll'
            justify={isMobile ? 'flex-start' : 'center'}
            align='center'>

            {/* content */}
            <EpistoFlex2
                wrap={'wrap'}
                background="var(--transparentWhite70)"
                zIndex="6"
                width="100%"
                maxW="1700px"
                mx={isMobile ? undefined : '100px'}
                my={'20px'}
                padding={isMobile ? '10px' : '50px 150px'}
                overflow={isMobile ? 'visible' : 'hidden'}
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
                <EpistoFlex2
                    id="form"
                    minWidth={isMobile ? undefined : '400px'}
                    direction="column"
                    zIndex="7"
                    flex="5">

                    {/* title */}
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
                            state={usernameEntryState}
                            labelVariant="top"
                            label="Felhasználó név"
                            placeholder="te.felhasznalo"
                            name="username"
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
                            state={passwordState} />
                    </EpistoFlex2>

                    {/* registration button */}
                    <EpistoFlex2
                        align="center"
                        justify="center"
                        minH='80px'>

                        <EpistoButton
                            dataTestid="register-button"
                            style={{
                                width: '100%',
                                backgroundColor: isAllValid ? '#324658' : undefined,
                                height: 60
                            }}
                            // isDisabled={!isAllValid}
                            onClick={handleRegisterAsync}
                            variant="colored">

                            {translatableTexts.registerViaActivationCodePage.register}
                        </EpistoButton>
                    </EpistoFlex2>

                    {/* buy access */}
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

                            <a
                                href="https://epistogram.com/officekupa"
                                target="_blank"
                                rel="noreferrer">

                                {translatableTexts.registerViaActivationCodePage.buySubscription}
                            </a>
                        </EpistoFont>
                    </EpistoFlex2>
                </EpistoFlex2>
            </EpistoFlex2>
        </ContentPane>
    </>;
};
