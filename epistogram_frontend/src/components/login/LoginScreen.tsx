import { Box, Flex } from "@chakra-ui/layout";
import { Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from 'react';
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { useLogInUser } from "../../services/api/authenticationApiService";
import { useNavigation } from "../../services/core/navigatior";
import { useShowErrorDialog } from "../../services/core/notifications";
import { getAssetUrl, useIsScreenWiderThan } from "../../static/frontendHelpers";
import { useEpistoDialogLogic } from "../EpistoDialog";
import { AuthenticationStateContext, CurrentUserContext, RefetchUserAsyncContext } from "../system/AuthenticationFrame";
import { LoadingFrame } from "../system/LoadingFrame";
import { EpistoButton } from "../universal/EpistoButton";
import { EpistoEntry } from "../universal/EpistoEntry";
import { LoginPasswordResetDialog } from "./LoginPasswordResetDialog";

const LoginScreen = () => {

    // util
    const { navigate } = useNavigation();
    const showErrorDialog = useShowErrorDialog();
    const authState = useContext(AuthenticationStateContext);
    const refetchUser = useContext(RefetchUserAsyncContext);
    const user = useContext(CurrentUserContext);

    // state
    const [errorMessage, setErrorMessage] = useState("");

    // refs
    const emailRef = React.useRef<HTMLInputElement>(null);
    const pwRef = React.useRef<HTMLInputElement>(null);

    const passwordResetDialogLogic = useEpistoDialogLogic({
        defaultCloseButtonType: "top",
        title: "Jelszo visszaallitasa"
    });

    const isDesktopView = useIsScreenWiderThan(1200);

    // http 
    const { loginUserAsync, loginUserError, loginUserState } = useLogInUser();

    // func
    const handleLoginUserAsync = async () => {

        if (!emailRef.current?.value)
            return;

        if (!pwRef.current?.value)
            return;

        await loginUserAsync(emailRef.current?.value, pwRef.current?.value);
        refetchUser();
    };

    const handleValidation = () => {

        // TODO
    }

    // watch for auth state change
    // and navigate to home page if athenticated
    useEffect(() => {

        if (authState === "authenticated") {

            if (user!.userActivity.canAccessApplication) {

                navigate(applicationRoutes.homeRoute.route);
            }
            else {

                navigate(applicationRoutes.signupRoute.route);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState]);

    // watch for login call errors
    useEffect(() => {

        if (!loginUserError)
            return;

        if (loginUserError.errorType === "bad request") {

            setErrorMessage("Hibas adatok!");
        }
        else if (loginUserError.errorType) {

            showErrorDialog(loginUserError.message);
        }
        else {

            showErrorDialog("" + loginUserError);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginUserError]);

    // keydown
    useEffect(() => {

        const onKeydown = (event) => {

            if (event.code !== "Enter" && event.code !== "NumpadEnter")
                return;

            event.preventDefault();
            handleLoginUserAsync();
        };

        document.addEventListener("keydown", onKeydown);

        return () => {
            document.removeEventListener("keydown", onKeydown);
        };
    }, []);

    return (
        <Flex h={"100vh"} justifyContent={"center"} alignItems={"flex-start"}>

            {/* pw reset dialog */}
            <LoginPasswordResetDialog
                passwordResetDialogLogic={passwordResetDialogLogic} />

            {/* side image pane */}
            <Flex
                direction={"column"}
                w={"60%"}
                h={"100vh"}
                display={isDesktopView ? undefined : "none"}
                backgroundSize={"100%"}
                backgroundRepeat={"space"}
                alignItems={"center"}
                justifyContent={"center"}
                position={"relative"}>

                {/* bg image */}
                <img
                    src={getAssetUrl("/loginScreen/loginbackground.png")}
                    style={{
                        position: "absolute",
                        objectFit: "cover",
                        filter: "contrast(0.7)"
                    }}
                    className="whall"
                    alt={""} />

                {/* logo overlay */}
                <img
                    style={{
                        zIndex: 1,
                        width: 200
                    }}
                    src={getAssetUrl("/loginScreen/logofeher.svg")}
                    alt={""} />

                {/* motto */}
                <Typography zIndex={1} color={"white"} fontSize={"3.5rem"}>
                    Rethink knowledge
                </Typography>
            </Flex>

            {/* content pane */}
            <LoadingFrame
                loadingState={loginUserState}
                direction={"column"}
                minH={"100%"}
                w={"40%"}
                maxW={"90%"}
                justifyContent={"center"}
                alignItems={"center"}
                bgColor={"white"}
                zIndex={5}>

                <Flex
                    direction="column"
                    alignItems={"center"}
                    width={window.innerWidth > 600 ? 450 : "90%"}>

                    <img
                        style={{
                            zIndex: 1,
                            width: 320,
                            marginBottom: 25,
                        }}
                        src={getAssetUrl("/loginScreen/pcworldloginlogo.png")}
                        alt={""} />

                    <Flex
                        direction="column"
                        w={"100%"}
                        alignItems="center">

                        <Typography fontSize={"1.5rem"}>
                            Örülünk, hogy ismét itt vagy velünk!
                        </Typography>

                    </Flex>

                    <Box w={"100%"}>

                        <EpistoEntry
                            ref={emailRef}
                            labelVariant="top"
                            label="E-mail"
                            placeholder="E-mail"
                            name="email"
                            setValue={handleValidation}
                            height="50px" />

                        <EpistoEntry
                            ref={pwRef}
                            labelVariant="top"
                            label="Jelszó"
                            placeholder="Jelszó"
                            name="password"
                            type="password"
                            setValue={handleValidation}
                            height="50px" />
                      
                        {/* forgot password */}
                        <EpistoButton
                            type="reset"
                            onClick={() => passwordResetDialogLogic.openDialog()}>

                            <Typography
                                className="fontSmall fontGrey"
                                style={{
                                    textTransform: "none",
                                    marginTop: "5px"
                                }}>

                                Elfelejtettem a jelszavam
                            </Typography>
                        </EpistoButton>

                        {/* error msg */}
                        <Typography style={{ color: "var(--mildRed)" }}>
                            {errorMessage}
                        </Typography>
                    </Box>

                    <EpistoButton 
                        variant="colored" 
                        padding="15px"
                        type="submit"
                        style={{
                            marginTop: 15,
                            marginBottom: 15,
                            width: "100%",
                            backgroundColor: "#AE1E2E"//"#6437AB"
                        }} onClick={handleLoginUserAsync}>
                        Bejelentkezés
                    </EpistoButton>

                    <Flex direction={"row"} justifyContent={"space-between"} w={"100%"}>
                        <Typography>Még nincs hozzáférésed?</Typography>
                        <Typography textAlign={"right"} style={{
                            color: "#AE1E2E"
                        }}>Aktiváld a PCWorld Ultimate kódodat az alábbi oldalon</Typography>
                    </Flex>
                </Flex>


            </LoadingFrame>
        </Flex>
    )
};

export default LoginScreen
