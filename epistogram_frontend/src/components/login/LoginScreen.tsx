import { Box, Flex } from "@chakra-ui/layout";
import { Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from 'react';
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { useNavigation } from "../../services/core/navigatior";
import { useShowErrorDialog } from "../../services/core/notifications";
import { AuthenticationStateContext, CurrentUserContext, RefetchUserAsyncContext } from "../system/AuthenticationFrame";
import { EpistoButton } from "../universal/EpistoButton";
import classes from './loginScreen.module.scss';
import { getAssetUrl } from "../../static/frontendHelpers";
import { useLogInUser } from "../../services/api/authenticationApiService";
import { EpistoEntry } from "../universal/EpistoEntry";

const LoginScreen = (): JSX.Element => {

    console.warn("[LoginScreen] Started...")
    const { loginUserAsync, loginUserError } = useLogInUser();
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { navigate } = useNavigation();
    const showErrorDialog = useShowErrorDialog();
    const authState = useContext(AuthenticationStateContext);
    const refetchUser = useContext(RefetchUserAsyncContext);
    const user = useContext(CurrentUserContext);

    const handleLoginUserAsync = async () => {

        await loginUserAsync(email, password);
        refetchUser();
    };

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

    return (
        <Flex h={"100vh"} justifyContent={"center"} alignItems={"flex-start"}>

            <Flex
                direction={"column"}
                w={"60%"}
                h={"100vh"}
                hidden={window.innerWidth < 1000 && true}
                backgroundSize={"100%"}
                backgroundRepeat={"space"}
                alignItems={"center"}
                justifyContent={"center"}
                position={"relative"}>
                <img
                    src={getAssetUrl("/loginScreen/loginbackground.png")}
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        objectFit: "cover"
                    }}
                    alt={""}
                />
                <img style={{
                    zIndex: 1,
                    width: 200
                }} src={getAssetUrl("/loginScreen/logofeher.svg")} alt={""} />
                <Typography zIndex={1} color={"white"} fontSize={"3.5rem"}>Rethink knowledge</Typography>

                <Flex bg={"#AAAAAA40"} position={"absolute"} top={0} w={"100%"} zIndex={0} h={"100%"}></Flex>

            </Flex>

            <Flex
                direction={"column"}
                minH={"100%"}
                w={"40%"}
                minW={window.innerWidth > 600 ? 500 : "90%"}
                maxW={"90%"}
                justifyContent={"center"}
                alignItems={"center"}
                bgColor={"white"}
                zIndex={5}>

                <Flex
                    direction="column"
                    alignItems={"center"}
                    width={window.innerWidth > 600 ? 450 : "90%"}>

                    <img style={{
                        zIndex: 1,
                        width: 320,
                        marginBottom: 25,
                    }} src={getAssetUrl("/loginScreen/pcworldloginlogo.png")} alt={""} />

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
                            value={email}
                            labelVariant="top"
                            label="E-mail"
                            placeholder="E-mail"
                            name="email"
                            setValue={setEmail}
                            height="50px" />

                        <EpistoEntry
                            value={password}
                            labelVariant="top"
                            label="Jelszó"
                            placeholder="Jelszó"
                            name="lastName"
                            setValue={setPassword}
                            height="50px" />

                        <p className={classes.forgotPassword}>
                            Elfelejtettem a jelszavam
                        </p>

                        <Typography style={{ color: "var(--mildRed)" }}>
                            {errorMessage}
                        </Typography>
                    </Box>

                    <EpistoButton variant="colored" padding="15px" style={{
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


            </Flex>
        </Flex>
    )
};

export default LoginScreen
