import { Text } from "@chakra-ui/layout";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useRegisterUserViaActivationCode } from "../services/api/registrationApiService";
import { useNavigation } from "../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../services/core/notifications";
import { getAssetUrl } from "../static/frontendHelpers";
import { LoadingFrame } from "./system/LoadingFrame";
import { MainWrapper } from "./system/MainPanels";
import { EpistoButton } from "./universal/EpistoButton";
import { EpistoEntry } from "./universal/EpistoEntry";

export const RegisterViaActivationCodePage = () => {

    const {
        registerUserViaActivationCodeAsync,
        registerUserViaActivationCodeState
    } = useRegisterUserViaActivationCode();

    const showError = useShowErrorDialog();
    const { navigate } = useNavigation();

    const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [activationCode, setActivationCode] = useState("");

    const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

    const handleRegisterAsync = async () => {

        try {

            await registerUserViaActivationCodeAsync(activationCode, email, firstName, lastName);
            setRegistrationSuccessful(true);
            showNotification("Sikeres regisztracio!");
        }
        catch (e) {

            showError(e);
        }
    }

    return <MainWrapper>
        <Flex
            justify={"center"}
            background="radial-gradient(farthest-corner at 300px 300px, rgba(177,208,242,0.7) 33%, rgba(255,255,255,1) 100%)"
            py="60px"
            overflowY={"scroll"}
            h="100%"
            w="100%">

            {/* content */}
            <Flex
                wrap={"wrap"}
                background="var(--transparentWhite70)"
                zIndex="6"
                w="100%"
                maxW="1700px"
                h="fit-content"
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
                    minW="300px"
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
                    minW="400px"
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

                        <EpistoEntry
                            value={email}
                            setValue={setEmail}
                            labelVariant="top"
                            label="E-mail"
                            placeholder="te@email.com"
                            name="email"
                            height="30px" />

                        <EpistoEntry
                            value={firstName}
                            setValue={setFirstName}
                            labelVariant="top"
                            label="Vezetéknév"
                            placeholder="Vezetéknév"
                            name="lastName"
                            height="30px" />

                        <EpistoEntry
                            value={lastName}
                            setValue={setLastName}
                            labelVariant="top"
                            label="Keresztnév"
                            placeholder="Keresztnév"
                            name="firstName"
                            height="30px" />

                        <EpistoEntry
                            value={activationCode}
                            setValue={setActivationCode}
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
                        h={80}>

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

                            Vásárold meg kedvezményesen erre a linkre kattintva!
                        </Typography>
                    </Flex>


                    <Flex
                        position="absolute"
                        className="whall"
                        background="white"
                        top="0"
                        display={registrationSuccessful ? undefined : "none"}>

                        <Typography>
                            A regisztracio sikeres volt, a belepesi linked elkuldtuk az '{email}' cimre.
                        </Typography>
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
    </MainWrapper>
}
