import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import { ErrorCodeType } from "../models/shared_models/types/sharedTypes";
import { useRegisterUserViaActivationCode } from "../services/api/registrationApiService";
import { useNavigation } from "../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../services/core/notifications";
import { getAssetUrl } from "../static/frontendHelpers";
import { EpistoButton } from "./controls/EpistoButton";
import { EpistoEntryNew, useEpistoEntryState } from "./controls/EpistoEntryNew";
import { validateAllEntries } from "./controls/logic/controlsLogic";
import { PageRootContainer } from "./PageRootContainer";
import { LoadingFrame } from "./system/LoadingFrame";

export const RegisterViaActivationCodePage = () => {

    const {
        registerUserViaActivationCodeAsync,
        registerUserViaActivationCodeState
    } = useRegisterUserViaActivationCode();

    const showError = useShowErrorDialog();
    const { navigate } = useNavigation();

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
            showNotification("Sikeres regisztráció!");
        }
        catch (e: any) {

            const errorCode = e.code as ErrorCodeType;

            if (errorCode === "activation_code_issue") {

                activationCodeEntryState
                    .setError("Helytelen aktivációs kód.");
            }
            else if (errorCode === "email_taken") {

                emailEntryState
                    .setError("Nem megfelelő email cím, vagy már használatban van.");
            }
            else {

                showError(e);
            }
        }
    }

    return <PageRootContainer>

        <Flex
            justify={"center"}
            background="gradientBlueBackground"
            py="60px"
            overflowY={"scroll"}
            height="100%"
            width="100%">

            {/* content */}
            <Flex
                wrap={"wrap"}
                background="var(--transparentWhite70)"
                zIndex="6"
                width="100%"
                maxW="1700px"
                height="fit-content"
                mx="100px"
                p="50px 150px"
                overflow="hidden"
                position={"relative"}>

                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    //bgColor="green"
                    zIndex="7"
                    minWidth="300px"
                    flex="5">

                    {/* epi logo */}
                    <img
                        src={getAssetUrl("/images/logo.svg")}
                        style={{
                            width: "250px",
                            maxHeight: "100px",
                            objectFit: "contain",
                            marginLeft: "15px",
                            cursor: "pointer",
                        }}
                        alt="" />

                    {/* 3d redeem image */}
                    <img
                        src={getAssetUrl("/images/redeem3D.png")}
                        style={{
                            width: "100%",
                            maxHeight: "350px",
                            objectFit: "contain",
                            marginLeft: "15px",
                            cursor: "pointer",
                        }}
                        alt="" />

                </Flex>

                {/* form */}
                <LoadingFrame
                    id="form"
                    minWidth="400px"
                    loadingState={registerUserViaActivationCodeState}
                    direction="column"
                    zIndex="7"
                    flex="5">

                    {/* Redeem title */}
                    <Flex
                        minH="80px"
                        direction="column"
                        justify="center"
                        maxW="320px"
                        align="center">

                        <Text
                            textAlign="left"
                            fontSize="1.3em">

                            Váltsd be egyedi kódodat, hogy belekezdhess a tanulásba!
                        </Text>
                    </Flex>

                    {/* Redeem info input fields */}
                    <Flex
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
                            label="Vezetéknév"
                            placeholder="Vezetéknév"
                            name="lastName"
                            height="30px" />

                        <EpistoEntryNew
                            state={firstNameEntryState}
                            labelVariant="top"
                            label="Keresztnév"
                            placeholder="Keresztnév"
                            name="firstName"
                            height="30px" />

                        <EpistoEntryNew
                            state={activationCodeEntryState}
                            labelVariant="top"
                            label="Aktivációs kódod"
                            placeholder="Kód"
                            name="activationCode"
                            height="30px" />
                    </Flex>

                    {/* registration button */}
                    <Flex
                        align="center"
                        justify="center"
                        minH={80}>

                        <EpistoButton
                            style={{
                                width: "100%",
                                backgroundColor: "#324658",
                                height: 60
                            }}
                            onClick={handleRegisterAsync}
                            variant="colored">

                            Regisztráció
                        </EpistoButton>
                    </Flex>

                    <Flex
                        justify="space-between"
                        align="center"
                        height={80}>

                        <Typography
                            style={{
                                color: "#9FA2B4"
                            }}>

                            Nincs még hozzáférésed?
                        </Typography>

                        <Typography
                            style={{
                                maxWidth: "250px",
                                textAlign: "right",
                                color: "var(--epistoTeal)"
                            }}>

                            <a href="https://pcworld.hu/elofizetes" target="_blank">
                                Vásárold meg kedvezményesen erre a linkre kattintva!
                            </a>
                        </Typography>
                    </Flex>


                    <Flex
                        position="fixed"
                        align="center"
                        justify="center"
                        width="100vw"
                        height="100vh"
                        background="var(--transparentWhite70)"
                        top="0"
                        left="0"
                        display={registrationSuccessful ? undefined : "none"}>

                        <Flex
                            className="roundBorders mildShadow"
                            background="white"
                            align="center"
                            justify="center"
                            padding="50px"
                            width="500px"
                            height="250px">

                            <Typography align="center">
                                A regisztráció sikeres volt, a belépési linked elküldtük a(z) '{emailEntryState.value}' címre.
                            </Typography>
                        </Flex>

                    </Flex>

                </LoadingFrame>

                {/* Magic powder top-left */}
                <img
                    style={{
                        position: "absolute",
                        left: 50,
                        top: -80,
                        width: 300,
                        transform: "rotate(270deg)",
                        objectFit: "contain",
                        zIndex: 0,
                    }}
                    src={getAssetUrl("/images/bg-art-2.png")}
                    alt="" />

                {/* Magic powder bottom-left */}
                <img
                    style={{
                        position: "absolute",
                        left: -55,
                        bottom: -150,
                        transform: "rotate(-90deg) scale(50%)",
                        zIndex: 0,
                    }}
                    src={getAssetUrl("/images/bg-art-5.png")}
                    alt="" />

                {/* Magic powder top-left */}
                <img
                    style={{
                        position: "absolute",
                        right: -20,
                        top: -120,
                        transform: "rotate(270deg) scale(70%)",
                        zIndex: 0,
                    }}
                    src={getAssetUrl("/images/bg-art-6.png")}
                    alt="" />
            </Flex>
        </Flex>
    </PageRootContainer>
}
