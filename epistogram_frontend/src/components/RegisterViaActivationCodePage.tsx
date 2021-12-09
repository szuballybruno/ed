import { Text } from "@chakra-ui/layout";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import { applicationRoutes } from "../configuration/applicationRoutes";
import { useRegisterUserViaActivationCode } from "../services/api/registrationApiService";
import { useNavigation } from "../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../services/core/notifications";
import { getAssetUrl } from "../static/frontendHelpers";
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

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [activationCode, setActivationCode] = useState("");

    const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

    const handleRegisterAsync = async () => {

        try {

            await registerUserViaActivationCodeAsync(activationCode, email, firstName, lastName);
            showNotification("Sikeres regisztracio!");
            navigate(applicationRoutes.homeRoute.route);
        }
        catch (e) {

            showError(e);
        }
    }

    return <MainWrapper>
        <Flex
            flexDir={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            bgColor={"#FAFAFA"}
            w={"100%"}
            h={"100%"}>

            {isLargerThan1280 && <Flex
                w={400}
                maxW={550}
                flex={1}
                alignItems={"center"}
                justifyContent={"center"}
                zIndex={3}>

                <img style={{
                    width: 300,
                    objectFit: "contain"
                }} src={getAssetUrl("/images/bal.png")} alt={""} />

                <Typography>

                </Typography>
            </Flex>}

            <Flex
                flex={1}
                flexDir={"column"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                zIndex={3}
                boxSizing={"border-box"}
                h={"100%"}
                maxW={500}
                py={20}
                overflowY={"scroll"}>
                <Flex>
                    <img
                        src={getAssetUrl("/images/logo.svg")}
                        style={{
                            width: "250px",
                            objectFit: "contain",
                            marginLeft: "15px",
                            cursor: "pointer",
                        }}
                        alt={""} />
                </Flex>
                <Flex
                    backgroundColor={"white"}
                    boxShadow={"0 0 20px 2px #0000002f"}
                    borderRadius={10}
                    p={"40px"}
                    flexDir={"column"}
                    alignItems={"center"}
                    mx={10}>
                    <Flex h={100} w={300}>
                        <Text
                            textAlign={"center"}
                            fontSize={"1.3em"}>
                            Váltsd be egyedi kódodat, hogy belekezdhess a tanulásba!
                        </Text>
                    </Flex>

                    <Flex
                        flexDir={"column"}
                        w={"100%"}>

                        <EpistoEntry
                            value={email}
                            setValue={setEmail}
                            labelVariant="top"
                            label="E-mail"
                            placeholder="te@email.com"
                            name="email"
                            height="50px" />

                        <EpistoEntry
                            value={firstName}
                            setValue={setFirstName}
                            labelVariant="top"
                            label="Vezetéknév"
                            placeholder="Vezetéknév"
                            name="lastName"
                            height="50px" />

                        <EpistoEntry
                            value={lastName}
                            setValue={setLastName}
                            labelVariant="top"
                            label="Keresztnév"
                            placeholder="Keresztnév"
                            name="firstName"
                            height="50px" />

                        <EpistoEntry
                            value={activationCode}
                            setValue={setActivationCode}
                            labelVariant="top"
                            label="Aktivációs kódod"
                            placeholder="Kód"
                            name="activationCode"
                            height="50px" />
                    </Flex>

                    {/* registration button */}
                    <Flex
                        w={"100%"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        h={80}>
                        <EpistoButton
                            style={{
                                width: "100%",
                                backgroundColor: "#324658"
                            }}
                            onClick={handleRegisterAsync}
                            variant={"colored"}>
                            Regisztráció
                        </EpistoButton>
                    </Flex>

                    <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        h={80}>
                        <Typography>
                            Nincs még hozzáférésed?
                        </Typography>
                        <Typography
                            style={{
                                maxWidth: "250px",
                                textAlign: "right"
                            }}>
                            Vásárold meg kedvezményesen erre a linkre kattintva!
                        </Typography>
                    </Flex>

                </Flex>
                <Flex>

                </Flex>
            </Flex>

            {isLargerThan1280 && <Flex
                w={400}
                maxW={550}
                flex={1}
                alignItems={"center"}
                justifyContent={"center"}
                zIndex={3}>

                <img
                    style={{
                        width: 300,
                        objectFit: "contain"
                    }}
                    src={getAssetUrl("/images/jobb.png")} alt={""} />
            </Flex>}

            <img
                style={{
                    position: "absolute",
                    left: -100,
                    top: 20,
                    width: 300,
                    objectFit: "contain",
                    zIndex: 0,
                }}
                src={getAssetUrl("/images/LoginShape1.png")} alt={""} />

            <img
                style={{
                    position: "absolute",
                    right: 200,
                    bottom: -60,
                    transform: "rotate(45deg)",
                    zIndex: 0,
                }}
                src={getAssetUrl("/images/LoginShape2.png")} alt={""} />

            <img
                style={{
                    position: "absolute",
                    right: 50,
                    top: -100,
                    width: 300,
                    transform: "scaleX(-1)",
                    objectFit: "contain",
                    zIndex: 0,
                }}
                src={getAssetUrl("/images/Shape1SVG.png")} alt={""} />
        </Flex>
    </MainWrapper>

}
