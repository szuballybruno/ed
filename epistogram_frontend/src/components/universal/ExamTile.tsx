import { Box, css, Flex, FlexProps, Text } from "@chakra-ui/react";
import { LinearProgress } from "@mui/material";
import React from "react";
import { getAssetUrl } from "../../static/frontendHelpers";
import { EpistoButton } from "./EpistoButton";

export const ExamTile = (props: {
    className?: string,
} & FlexProps) => {

    const ExamTileResultLabel = () => <Flex
        position="absolute"
        bottom={10}
        left={1}
        justify="flex-end">

        <Flex
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            padding="4px"
            w={140}
            bg="white"
            borderRadius="0 7px 7px 0">
            <Text
                fontSize="0.85em"
                textTransform={"uppercase"}
                color="var(--epistoTeal)">
                65%-os eredmény
            </Text>
        </Flex>
    </Flex>

    const ExamTileTopPercentLabel = () => <Flex
        position="absolute"
        bottom={10}
        right={1}
        justify="flex-end">

        <Flex
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            padding="4px"
            w={160}
            bg="var(--epistoTeal)"
            borderRadius="7px 0 0 7px">
            <Text
                fontSize="0.85em"
                textTransform={"uppercase"}
                color="white">
                top 30% cégen belül
            </Text>
        </Flex>
    </Flex>

    return <Flex
        className="whall"
        direction="column"
        borderRadius="10px"
        position="relative"
        overflow="hidden"
        background="var(--transparentWhite70)"
        boxShadow={"1px 1px 5px 2px rgba(255,100,30,0.1)"}
        p="5px"
        justifyContent="space-between"
        {...css}>

        {/* image  */}
        <Flex direction={"column"}>

            <Box
                flex="1"
                position="relative"
                minH={200}
                maxH={200}>

                <Box
                    position="relative"
                    className="whall"
                    minHeight="150px">

                    <Box
                        position="absolute"
                        top="0"
                        height="100%"
                        width="100%"
                        p="4px">

                        <img
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                backgroundColor: "white",
                                borderRadius: 10
                            }}
                            src={getAssetUrl("/courseCoverImages/1.png")}
                            alt="" />

                        <Flex position="relative">

                            <ExamTileResultLabel />
                            <ExamTileTopPercentLabel />
                        </Flex>
                    </Box>
                </Box>
            </Box>

            {/* title */}
            <Box
                flexBasis="80px"
                zIndex={1}>

                <Flex
                    direction="column"
                    p="10px">

                    <Text
                        as="text"
                        color="black">

                        {"Irodai alkalmazások"}
                    </Text>

                    <Flex direction="column">

                        <Text
                            as="h6"
                            fontWeight={"bold"}
                            fontSize="large">

                            {"Menüszalagok használata az Excelben"}
                        </Text>
                    </Flex>

                    <Flex mt={7}>

                        <Flex
                            direction={"row"}
                            alignItems={"center"}
                            mr={5}
                            flex="1">

                            <img
                                src={getAssetUrl("images/time3D.png")}
                                alt={""}
                                style={{
                                    width: 15,
                                    height: 15,
                                    margin: "0 2px 0 2px"
                                }}
                            />

                            <Text as={"text"} color={"grey"}>{"52 perc"}</Text>
                        </Flex>

                        <Flex
                            direction={"row"}
                            alignItems={"center"}
                            mr={5}
                            flex="1">

                            <img
                                src={getAssetUrl("images/testoutcome3D.png")}
                                alt={""}
                                style={{
                                    width: 15,
                                    height: 15,
                                    margin: "0 2px 0 4px"
                                }}
                            />
                            <Text as={"text"} color={"grey"}>{"65%-os eredmény"}</Text>
                        </Flex>
                    </Flex>

                    <Flex
                        direction={"row"}
                        alignItems={"center"}
                        mt={7}>

                        <Flex
                            direction={"row"}
                            alignItems={"center"}
                            mr={5}
                            flex="1">

                            <img
                                src={getAssetUrl("images/difficulty3D.png")}
                                alt={""}
                                style={{
                                    width: 20,
                                    height: 20,
                                    margin: "0 2px"
                                }} />

                            <Text
                                as="text">

                                {"8.9/10 nehézség"}
                            </Text>
                        </Flex>

                        <Flex
                            direction={"row"}
                            alignItems={"center"}
                            mr={5}
                            flex="1">

                            <img
                                src={getAssetUrl("images/correctanswernumber3D.png")}
                                alt={""}
                                style={{
                                    width: 20,
                                    height: 20,
                                    margin: "0 2px"
                                }} />

                            <Text
                                as="text">

                                {"16/23 helyes válasz"}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </Flex>

        <Flex
            direction="column"
            minH="50px">

            <Flex
                w="100%"
                justifyContent="space-between"
                p="5">

                {/* <EpistoButton style={{
                    width: "50%",
                }}>Részletek</EpistoButton> */}

                <EpistoButton
                    variant="colored"
                    style={{
                        backgroundColor: "white",
                        width: "100%",
                        color: "#98A4CC"
                    }}>
                    Újrapróbálom
                </EpistoButton>
            </Flex>
        </Flex>
    </Flex>
}
