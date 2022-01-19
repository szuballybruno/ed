import { Flex } from "@chakra-ui/react";
import { LinearProgress, Paper, Rating } from "@mui/material";
import React from "react";
import { EpistoFont } from "../controls/EpistoFont";

export const CourseDetailsRatingSection = () => {
    const mockRatingProgresses = [60, 20, 10, 0, 0]

    const CourseDetailsRatingItem = () => {
        return <Flex width="100%" mt={20}>
            <Flex height="100%">
                <Flex width={70}
                    height={70}
                    m={10}
                    className={"circle"}
                    border="2px solid var(--epistoTeal)"
                    bg="var(--deepBlue)"
                    color="white"
                    alignItems={"center"}
                    justifyContent={"center"}>
                    <EpistoFont>
                        ND
                    </EpistoFont>
                </Flex>
            </Flex>
            <Flex flex={1} flexDir={"column"}>
                <Flex height={70} alignItems={"center"} justifyContent={"space-between"}>
                    <Flex flexDir={"column"}>
                        <EpistoFont style={{
                            fontWeight: "bold",
                            fontSize: "0.9em"
                        }}>
                            Nagy Dezső
                        </EpistoFont>
                        <EpistoFont style={{
                            fontSize: "0.8em"
                        }}>
                            Alkalmazott tudományok
                        </EpistoFont>
                    </Flex>
                    <Flex>
                        <Rating value={5} style={{ color: "var(--epistoTeal)" }} />
                    </Flex>
                </Flex>
                <Flex mt={20}>
                    <EpistoFont style={{
                        fontSize: "0.8em"
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique suscipit tempor. Pellentesque dictum, augue a egestas faucibus, augue ipsum vehicula dui, faucibus eleifend risus orci quis ante. Curabitur porttitor fringilla blandit. Suspendisse placerat tempus vehicula. In dignissim tellus magna. Donec non tincidunt risus. Morbi sit amet turpis dolor. Proin vulputate leo eu leo bibendum, in condimentum ex efficitur.
                    </EpistoFont>
                </Flex>
            </Flex>
        </Flex>
    }

    return <Flex mt={10} width="100%" height={500} direction={"column"} alignItems={"flex-start"}>
        <Flex width="100%" height={170}>
            <Paper>
                <Flex width={170} height={170} flexDir={"column"} alignItems={"center"} justifyContent={"center"}>

                    <EpistoFont
                        style={{
                            fontWeight: "bold",
                            fontSize: "3em"
                        }}>
                        4.6
                    </EpistoFont>

                    <EpistoFont
                        style={{
                            fontWeight: "bold"
                        }}>

                        Kurzus értékelése
                    </EpistoFont>
                </Flex>
            </Paper>
            <Flex height={170} flex={1} px={20} flexDir={"column"} justifyContent={"space-evenly"}>
                {mockRatingProgresses.map(x => <LinearProgress style={{
                    width: "100%",
                    height: 10,
                    borderRadius: 5,
                }} value={x} variant={"determinate"} />)}
            </Flex>
            <Flex width={170} height={170} flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
                <Rating value={5} style={{ color: "var(--epistoTeal)" }} />
                <Rating value={4} style={{ color: "var(--epistoTeal)" }} />
                <Rating value={3} style={{ color: "var(--epistoTeal)" }} />
                <Rating value={2} style={{ color: "var(--epistoTeal)" }} />
                <Rating value={1} style={{ color: "var(--epistoTeal)" }} />
            </Flex>
        </Flex>
        <Flex width="100%" flexDir={"column"}>
            <CourseDetailsRatingItem />
            <CourseDetailsRatingItem />
            <CourseDetailsRatingItem />
            <CourseDetailsRatingItem />
            <CourseDetailsRatingItem />
        </Flex>
    </Flex>
}
