import { ErrorWithCode } from '@episto/commontypes';
import React, { useCallback, useEffect, useState } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { Responsivity } from '../../helpers/responsivity';
import { AuthenticationStateType, useLogInUser } from '../../services/api/authenticationApiService';
import { CompanyApiService } from '../../services/api/CompanyApiService';
import { FeatureApiService } from '../../services/api/FeatureApiService';
import { SurveyApiService } from '../../services/api/SurveyApiService';
import { useNavigation } from '../../services/core/navigatior';
import { useShowErrorDialog } from '../../services/core/notifications';
import { useQueryParams } from '../../static/locationHelpers';
import { Logger } from '../../static/Logger';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoDiv } from '../controls/EpistoDiv';
import { EpistoEntry } from '../controls/EpistoEntry';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { ContentPane } from '../pageRootContainer/ContentPane';
import { GenericBackground } from '../pageRootContainer/GenericBackground';
import { RootContainerBackground } from '../pageRootContainer/RootContainerBackground';
import { useAuthContextState } from '../system/AuthenticationFrame';
import { useAuthorizationContext } from '../system/AuthorizationContext';
import { LoadingFrame } from '../system/LoadingFrame';
import { useEpistoDialogLogic } from '../universal/epistoDialog/EpistoDialogLogic';
import { LoginPasswordResetDialog } from './LoginPasswordResetDialog';

export const LoginScreen = () => {

    // util
    const { navigate2, navigateToHref } = useNavigation();
    const showErrorDialog = useShowErrorDialog();
    const { refetchAuthHandshake, authState } = useAuthContextState();
    const { hasPermission } = useAuthorizationContext();
    const dest = useQueryParams<{ dest: string }>()
        .getValueOrNull(x => x.dest, 'string');
    const [isUpToDate, setIsUpToDate] = useState(false);

    // state
    const [errorMessage, setErrorMessage] = useState('');

    // refs
    const emailRef = React.useRef<HTMLInputElement>(null);
    const pwRef = React.useRef<HTMLInputElement>(null);

    const passwordResetDialogLogic = useEpistoDialogLogic('pwreset');

    const { checkFeature } = FeatureApiService.useCheckFeature();
    const { surveyData } = SurveyApiService.useSurveyData();

    const { isMobile } = Responsivity
        .useIsMobileView();

    // http 
    const { loginUserAsync, loginUserState } = useLogInUser();

    const { checkIfSurveySkippable, checkIfSurveySkippableStatus } = SurveyApiService.useCheckIfSurveySkippable();

    const qres = CompanyApiService
        .useCompanyDetailsByDomain();

    const backdropColor = qres.companyDetails?.backdropColor ?? 'white';
    const primaryColor = qres.companyDetails?.primaryColor ?? 'white';
    const secondaryColor = qres.companyDetails?.secondaryColor ?? 'white';
    const logoUrl = qres.companyDetails?.logoUrl ?? '';
    const coverUrl = qres.companyDetails?.coverUrl ?? '';

    // func
    const handleLoginUserAsync = async () => {

        if (!emailRef.current?.value)
            return;

        if (!pwRef.current?.value)
            return;

        try {

            await loginUserAsync(emailRef.current?.value, pwRef.current?.value);
            await refetchAuthHandshake();
        }
        catch (error: any) {

            if (!error)
                return;

            if ((error as ErrorWithCode).code === 'corrupt_credentials') {

                setErrorMessage('Hibás adatok!');
                return;
            }

            showErrorDialog(error);
        }
    };

    const handleValidation = () => {

        // TODO
    };

    /**
     * Navigate to app function
     */
    const navigateToApp = useCallback(async () => {

        /**
         * Survey can't be bypassed, navigating to survey
         */
        const isSurveySkippable = await checkIfSurveySkippable();

        if (!isSurveySkippable) {

            navigate2(applicationRoutes.surveyRoute);
            return;
        }

        /**
         * Survey can be bypassed and there's a des prop, going to dest
         */
        if (dest) {

            navigateToHref(dest);
            return;
        }

        /**
         * Survey can be bypassed, going to home
         */
        navigate2(applicationRoutes.homeRoute);
    }, [checkIfSurveySkippable, dest, navigate2, navigateToHref]);

    // watch for auth state change
    // and navigate to home page if athenticated
    useEffect(() => {

        /**
         * Unauthenticated is not allowed to be navigated 
         * to either survey or home page
         */
        if (authState !== 'authenticated')
            return;

        Logger.logScoped('AUTH', `Auth state is ${'authenticated' as AuthenticationStateType}, navigating...`);

        navigateToApp();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState]);

    // keydown
    useEffect(() => {

        const onKeydown = (event) => {

            if (event.code !== 'Enter' && event.code !== 'NumpadEnter')
                return;

            event.preventDefault();
            handleLoginUserAsync();
        };

        document.addEventListener('keydown', onKeydown);

        return () => {
            document.removeEventListener('keydown', onKeydown);
        };
    }, []);

    return (
        <>
            <RootContainerBackground>

                <GenericBackground
                    customBaseColor={backdropColor}
                    isFixed
                    isFullscreenSized />
            </RootContainerBackground>

            <ContentPane
                hideNavbar
                noPadding>

                <EpistoFlex2
                    align='center'
                    justify={'center'}
                    height="100vh"
                    width="100vw">

                    {/* pw reset dialog */}
                    <LoginPasswordResetDialog
                        passwordResetDialogLogic={passwordResetDialogLogic} />

                    {/* content pane */}
                    <LoadingFrame
                        loadingState={loginUserState}
                        zIndex="6"
                        flex='1'
                        height='100%'
                        overflow="hidden"
                        position={'relative'}>

                        {!isMobile && <EpistoFlex2
                            flex='1'
                            direction='column'
                            align='center'
                            position='relative'
                            justify='center'>

                            {/* Company background */}
                            <img
                                src={coverUrl}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    position: 'absolute',
                                    top: '0',
                                    zIndex: -1
                                }}
                                alt="" />
                        </EpistoFlex2>}

                        <EpistoFlex2
                            flex='1'
                            className="whall"
                            justify='center'
                            align='center'>

                            <EpistoFlex2
                                className='roundBorders mildShadow'
                                id="form"
                                direction="column"
                                align='center'
                                justify="center"
                                width={isMobile ? 'calc(100% - 20px)' : undefined}
                                //height={isMobile ? '100%' : undefined}
                                padding={isMobile ? '20px' : '80px 100px'}
                                maxH={isMobile ? undefined : 'calc(100% - 100px)'}
                                maxW={isMobile ? undefined : 'calc(100% - 20px)'}
                                background="var(--transparentWhite70)"
                                zIndex="7">


                                {/* company logo */}
                                <img
                                    src={logoUrl}
                                    style={{
                                        width: '250px',
                                        maxHeight: '115px',
                                        objectFit: 'contain',
                                        marginLeft: '15px',
                                        marginBottom: '20px',
                                        cursor: 'pointer',
                                    }}
                                    alt="" />


                                <EpistoFlex2
                                    direction="column"
                                    width="100%"
                                    alignItems="flex-start">

                                    <EpistoFont fontSize={'font19'}>

                                        Örülünk, hogy ismét itt vagy velünk!
                                    </EpistoFont>

                                </EpistoFlex2>

                                <EpistoDiv width="100%">

                                    <EpistoEntry
                                        inputRef={emailRef}
                                        labelVariant="top"
                                        label="E-mail"
                                        placeholder="E-mail"
                                        name="email"
                                        setValue={handleValidation} />

                                    <EpistoEntry
                                        inputRef={pwRef}
                                        labelVariant="top"
                                        label="Jelszó"
                                        placeholder="Jelszó"
                                        name="password"
                                        type="password"
                                        setValue={handleValidation} />

                                    {/* forgot password */}
                                    <EpistoButton
                                        type="reset"
                                        onClick={() => passwordResetDialogLogic.openDialog()}>

                                        <EpistoFont
                                            fontSize="fontSmall"
                                            textColor='eduptiveMildDarkGreen'
                                            style={{
                                                textTransform: 'none',
                                                marginTop: '5px',
                                                fontWeight: 400
                                            }}>

                                            Elfelejtettem a jelszavam
                                        </EpistoFont>
                                    </EpistoButton>

                                    {/* error msg */}
                                    <EpistoFont style={{ color: 'var(--mildRed)' }}>
                                        {errorMessage}
                                    </EpistoFont>
                                </EpistoDiv>

                                <EpistoButton
                                    variant="action"
                                    padding="10px"
                                    type="submit"
                                    style={{
                                        marginTop: 15,
                                        marginBottom: 15,
                                        width: '100%',
                                        backgroundColor: primaryColor
                                    }}
                                    onClick={handleLoginUserAsync}>

                                    Bejelentkezés
                                </EpistoButton>

                                <EpistoFlex2
                                    direction={'row'}
                                    justifyContent={'space-between'}
                                    width="100%">

                                    <EpistoFont fontSize="fontSmall">
                                        Még nincs hozzáférésed?
                                    </EpistoFont>

                                    <EpistoFont
                                        onClick={() => navigate2(applicationRoutes.registerViaActivationCodeRoute, {})}
                                        fontSize="fontSmall"
                                        style={{
                                            color: secondaryColor,
                                            fontWeight: 600,
                                            textAlign: 'right',
                                            marginLeft: 20
                                        }}>

                                        Váltsd be itt aktivációs kódodat!
                                    </EpistoFont>
                                </EpistoFlex2>
                            </EpistoFlex2>
                        </EpistoFlex2>
                    </LoadingFrame>
                </EpistoFlex2>
            </ContentPane>
        </>
    );
};
