import { Box, Flex } from '@chakra-ui/layout';
import React, { useContext, useEffect, useState } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useLogInUser } from '../../services/api/authenticationApiService';
import { useNavigation } from '../../services/core/navigatior';
import { useShowErrorDialog } from '../../services/core/notifications';
import { Environment } from '../../static/Environemnt';
import { useIsScreenWiderThan } from '../../static/frontendHelpers';
import { useQueryVal, useStringParam } from '../../static/locationHelpers';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoEntry } from '../controls/EpistoEntry';
import { EpistoFont } from '../controls/EpistoFont';
import { PageRootContainer } from '../PageRootContainer';
import { AuthenticationStateContext, AuthorizationContext, RefetchUserAsyncContext } from '../system/AuthenticationFrame';
import { LoadingFrame } from '../system/LoadingFrame';
import { useEpistoDialogLogic } from '../universal/epistoDialog/EpistoDialogLogic';
import { LoginPasswordResetDialog } from './LoginPasswordResetDialog';

const LoginScreen = () => {

    // util
    const { navigate, navigateToHref } = useNavigation();
    const showErrorDialog = useShowErrorDialog();
    const authState = useContext(AuthenticationStateContext);
    const refetchUser = useContext(RefetchUserAsyncContext);
    const { hasPermission } = useContext(AuthorizationContext);
    const dest = useQueryVal('dest');

    console.log(dest);

    // state
    const [errorMessage, setErrorMessage] = useState('');

    // refs
    const emailRef = React.useRef<HTMLInputElement>(null);
    const pwRef = React.useRef<HTMLInputElement>(null);

    const passwordResetDialogLogic = useEpistoDialogLogic('pwreset', {
        defaultCloseButtonType: 'top'
    });

    const isDesktopView = useIsScreenWiderThan(1200);

    // http 
    const { loginUserAsync, loginUserState } = useLogInUser();

    // func
    const handleLoginUserAsync = async () => {

        if (!emailRef.current?.value)
            return;

        if (!pwRef.current?.value)
            return;

        try {

            await loginUserAsync(emailRef.current?.value, pwRef.current?.value);
            refetchUser();
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

        if (authState === 'authenticated') {

            if (hasPermission('ACCESS_APPLICATION')) {

                if (dest) {

                    navigateToHref(dest);
                }
                else {

                    navigate(applicationRoutes.homeRoute);
                }
            }
            else {

                navigate(applicationRoutes.signupRoute);
            }
        }

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

    return <PageRootContainer>

        <Flex
            justify={'center'}
            background="gradientBlueBackground"
            py="60px"
            overflowY={'scroll'}
            height="100%"
            width="100%">

            {/* pw reset dialog */}
            <LoginPasswordResetDialog
                passwordResetDialogLogic={passwordResetDialogLogic} />

            {/* content pane */}
            <LoadingFrame
                className="roundBorders mildShadow"
                loadingState={loginUserState}
                background="var(--transparentWhite70)"
                zIndex="6"
                mx="100px"
                p="50px 150px"
                overflow="hidden"
                position={'relative'}>

                <Flex
                    wrap={'wrap'}
                    className="whall"
                    maxW="700px">

                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        //bgColor="green"
                        zIndex="7"
                        flex="1">

                        {/* epi logo */}
                        <img
                            src={Environment.getAssetUrl('/images/logo.png')}
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

                    </Flex>

                    <Flex
                        id="form"
                        direction="column"
                        justify="center"
                        zIndex="7"
                        flex="1">


                        <Flex
                            direction="column"
                            width="100%"
                            alignItems="flex-start">

                            <EpistoFont fontSize={'fontLargePlus'}>

                                Örülünk, hogy ismét itt vagy velünk!
                            </EpistoFont>

                        </Flex>

                        <Box width="100%">

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
                                    classes={['fontGrey']}
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
                        </Box>

                        <EpistoButton
                            variant="colored"
                            padding="10px"
                            type="submit"
                            style={{
                                marginTop: 15,
                                marginBottom: 15,
                                width: '100%',
                                backgroundColor: 'var(--deepBlue)'
                            }}
                            onClick={handleLoginUserAsync}>

                            Bejelentkezés
                        </EpistoButton>

                        <Flex
                            direction={'row'}
                            justifyContent={'space-between'}
                            width="100%">

                            <EpistoFont fontSize="fontSmall">
                                Még nincs hozzáférésed?
                            </EpistoFont>

                            <EpistoFont
                                onClick={() => navigate(applicationRoutes.registerViaActivationCodeRoute)}
                                fontSize="fontSmall"
                                style={{
                                    color: '--deepBlue',
                                    textAlign: 'right'
                                }}>

                                Aktiváld a PCWorld Ultimate kódodat az alábbi oldalon
                            </EpistoFont>
                        </Flex>
                    </Flex>
                </Flex>

                {/* Magic powder top-left */}
                <img
                    style={{
                        position: 'absolute',
                        left: 50,
                        top: -80,
                        width: 300,
                        transform: 'rotate(270deg)',
                        objectFit: 'contain',
                        zIndex: 0,
                    }}
                    src={Environment.getAssetUrl('/images/bg-art-2.png')}
                    alt="" />

                {/* Magic powder bottom-left */}
                <img
                    style={{
                        position: 'absolute',
                        left: -55,
                        bottom: -150,
                        transform: 'rotate(-90deg) scale(50%)',
                        zIndex: 0,
                    }}
                    src={Environment.getAssetUrl('/images/bg-art-5.png')}
                    alt="" />

                {/* Magic powder top-left */}
                <img
                    style={{
                        position: 'absolute',
                        right: -20,
                        top: -120,
                        transform: 'rotate(270deg) scale(70%)',
                        zIndex: 0,
                    }}
                    src={Environment.getAssetUrl('/images/bg-art-6.png')}
                    alt="" />
            </LoadingFrame>
        </Flex>
    </PageRootContainer>;
};

export default LoginScreen;
