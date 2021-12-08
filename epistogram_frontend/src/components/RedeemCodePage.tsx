import {Flex, useMediaQuery} from "@chakra-ui/react";
import {TextField, Typography} from "@mui/material";
import SingleInput from "./singleInput/SingleInput";
import React from "react";
import {EpistoButton} from "./universal/EpistoButton";
import {getAssetUrl} from "../frontendHelpers";
import {Text} from "@chakra-ui/layout";
import {MainWrapper} from "./system/MainPanels";

export const RedeemCodePage = () => {
    const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')

    const inputStyle = {
        '& .MuiOutlinedInput-root': {
            padding: "0 7px",
            height: 50,
            marginTop: 2
        }
    }
    return <MainWrapper>
        <Flex
            flexDir={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            bgColor={"#FAFAFA"}
            w={"100%"}
            h={"100%"}
        >
            {isLargerThan1280 && <Flex
                w={400}
                maxW={550}
                flex={1}
                alignItems={"center"}
                justifyContent={"center"}
                zIndex={3}
            >
                <img style={{
                    width: 300,
                    objectFit: "contain"
                }} src={getAssetUrl("/images/bal.png")} alt={""} />
                <Typography></Typography>
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
                overflowY={"scroll"}
            >
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
                    mx={10}
                >
                    <Flex h={100} w={300}>
                        <Text
                            textAlign={"center"}
                            fontSize={"1.3em"}
                        >
                            Váltsd be egyedi kódodat, hogy belekezdhess a tanulásba!
                        </Text>
                    </Flex>

                    <Flex
                        flexDir={"column"}
                        w={"100%"}
                    >
                        <SingleInput
                            id="email"
                            labelText={"E-mail"}
                            placeholder={"E-mail címed"}
                            name={"currentEmail"}
                            changeHandler={(e) => {}}
                            sx={inputStyle}
                            style={{ justifySelf: "center" }} />
                        <SingleInput
                            id="email"
                            labelText={"Vezetéknév"}
                            placeholder={"Vezetéknév"}
                            name={"currentEmail"}
                            changeHandler={(e) => {}}
                            sx={inputStyle}
                            style={{ justifySelf: "center" }} />
                        <SingleInput
                            id="email"
                            labelText={"Keresztnév"}
                            placeholder={"Keresztnév"}
                            name={"currentEmail"}
                            changeHandler={(e) => {}}
                            sx={inputStyle}
                            style={{ justifySelf: "center" }} />
                        <SingleInput
                            id="email"
                            labelText={"Egyedi kódod"}
                            placeholder={"Kód"}
                            name={"currentEmail"}
                            changeHandler={(e) => {}}
                            sx={inputStyle}
                            style={{ justifySelf: "center" }} />
                    </Flex>

                    <Flex
                        w={"100%"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        h={80}
                    >
                        <EpistoButton
                            style={{
                                width: "100%",
                                backgroundColor: "#324658"
                            }}
                            variant={"colored"}>
                            Regisztráció
                        </EpistoButton>
                    </Flex>

                    <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        h={80}
                    >
                        <Typography>
                            Nincs még hozzáférésed?
                        </Typography>
                        <Typography
                            style={{
                                maxWidth: "250px",
                                textAlign: "right"
                            }}
                        >
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
                zIndex={3}
            >
                <img style={{
                    width: 300,
                    objectFit: "contain"
                }} src={getAssetUrl("/images/jobb.png")} alt={""} />
            </Flex>}

            <img style={{
                position: "absolute",
                left: -100,
                top: 20,
                width: 300,
                objectFit: "contain",
                zIndex: 0,
            }} src={getAssetUrl("/images/LoginShape1.png")} alt={""} />

            <img style={{
                position: "absolute",
                right: 200,
                bottom: -60,
                transform: "rotate(45deg)",
                zIndex: 0,
            }} src={getAssetUrl("/images/LoginShape2.png")} alt={""} />

            <img style={{
                position: "absolute",
                right: 50,
                top: -100,
                width: 300,
                transform: "scaleX(-1)",
                objectFit: "contain",
                zIndex: 0,
            }} src={getAssetUrl("/images/Shape1SVG.png")} alt={""} />
        </Flex>
    </MainWrapper>

}
