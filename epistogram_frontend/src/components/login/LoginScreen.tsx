import React, { useContext, useEffect, useState } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { AuthenticationStateType, useLogInUser } from '../../services/api/authenticationApiService';
import { CompanyApiService } from '../../services/api/CompanyApiService1';
import { gradientBackgroundGenerator } from '../../services/core/gradientBackgroundGenerator';
import { useNavigation } from '../../services/core/navigatior';
import { useShowErrorDialog } from '../../services/core/notifications';
import { useIsScreenWiderThan } from '../../static/frontendHelpers';
import { useQueryVal } from '../../static/locationHelpers';
import { Logger } from '../../static/Logger';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoDiv } from '../controls/EpistoDiv';
import { EpistoEntry } from '../controls/EpistoEntry';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoGrid } from '../controls/EpistoGrid';
import { PageRootContainer } from '../PageRootContainer';
import { AuthenticationStateContext, useRefetchUserAsync } from '../system/AuthenticationFrame';
import { useAuthorizationContext } from '../system/AuthorizationContext';
import { LoadingFrame } from '../system/LoadingFrame';
import { useEpistoDialogLogic } from '../universal/epistoDialog/EpistoDialogLogic';
import { LoginPasswordResetDialog } from './LoginPasswordResetDialog';

const LoginScreen = () => {

    // util
    const { navigate2, navigateToHref } = useNavigation();
    const showErrorDialog = useShowErrorDialog();
    const authState = useContext(AuthenticationStateContext);
    const { refetchAuthHandshake } = useRefetchUserAsync();
    const { hasPermission } = useAuthorizationContext();
    const dest = useQueryVal('dest');
    const [isUpToDate, setIsUpToDate] = useState(false);

    // state
    const [errorMessage, setErrorMessage] = useState('');

    // refs
    const emailRef = React.useRef<HTMLInputElement>(null);
    const pwRef = React.useRef<HTMLInputElement>(null);

    const passwordResetDialogLogic = useEpistoDialogLogic('pwreset');

    const isDesktopView = useIsScreenWiderThan(1200);

    // http 
    const { loginUserAsync, loginUserState } = useLogInUser();
    const { companyDetails } = CompanyApiService.useCompanyDetailsByDomain(window.location.origin);

    const gradients = gradientBackgroundGenerator(companyDetails?.backdropColor!);

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
        catch (e: any) {

            if (!e)
                return;

            if (e.errorType === 'bad request') {

                setErrorMessage('Hibás adatok!');
            }
            else if (e.errorType) {

                showErrorDialog(e.message);
            }
            else {

                showErrorDialog('' + e);
            }
        }
    };

    const handleValidation = () => {

        // TODO
    };

    // watch for auth state change
    // and navigate to home page if athenticated
    useEffect(() => {

        /**
         * Unauthenticated is not allowed to be navigated 
         * to either survey or home page
         */
        if (authState !== 'authenticated')
            return;

        Logger.logScoped('AUTO NAV', `Auth state is ${'authenticated' as AuthenticationStateType}, navigating...`);

        /**
         * Survey can't be bypassed, navigating to survey
         */
        if (!hasPermission('BYPASS_SURVEY')) {

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

    return <PageRootContainer noBackground>

        <EpistoFlex2
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
                overflow="hidden"
                position={'relative'}>

                <EpistoFlex2
                    flex='1'
                    direction='column'
                    align='center'
                    position='relative'
                    justify='center'>

                    {/* Company background */}
                    <img
                        src={companyDetails?.coverUrl!}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            top: '0',
                            zIndex: -1
                        }}
                        alt="" />
                </EpistoFlex2>

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
                        p='80px 100px'
                        maxH='calc(100% - 100px)'
                        background="var(--transparentWhite70)"
                        zIndex="7">


                        {/* company logo */}
                        <img
                            src={companyDetails?.logoUrl!}
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

                            <EpistoFont fontSize={'fontLargePlus'}>

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
                                    color="fontGray"
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
                            variant="colored"
                            padding="10px"
                            type="submit"
                            style={{
                                marginTop: 15,
                                marginBottom: 15,
                                width: '100%',
                                backgroundColor: companyDetails?.primaryColor!
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
                                onClick={() => navigate2(applicationRoutes.registerViaActivationCodeRoute)}
                                fontSize="fontSmall"
                                style={{
                                    color: companyDetails?.secondaryColor!,
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

        <EpistoGrid
            bgColor={'white'}
            position="fixed"
            top={'0'}
            left={'0'}
            w="100vw"
            h="100vh"
            zIndex="-1"
            filter="blur(50px)"
            minColumnWidth={'33%'}
            gap='0px'
            gridTemplateColumns="repeat(3, 1fr)"
            auto={'fill'}>

            {gradients
                .map((gradient, index) => {
                    return <EpistoFlex2
                        key={index}
                        padding="20px"
                        filter="blur(8px)"
                        background={gradient}>

                    </EpistoFlex2>;
                })}
        </EpistoGrid>
    </PageRootContainer>;
};

export default LoginScreen;
