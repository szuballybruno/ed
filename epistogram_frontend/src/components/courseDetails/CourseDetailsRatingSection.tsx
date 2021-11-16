import {Flex} from "@chakra-ui/react";
import {LinearProgress, Paper, Rating, Typography} from "@mui/material";
import React from "react";

export const CourseDetailsRatingSection = () => {
    const mockRatingProgresses = [60, 20, 10, 0, 0]

    const CourseDetailsRatingItem = () => {
        return <Flex w={"100%"} mt={20}>
            <Flex h={"100%"}>
                <Flex w={70}
                      h={70}
                      m={10}
                      className={"circle"}
                      border="2px solid var(--epistoTeal)"
                      bg="var(--deepBlue)"
                      color="white"
                      alignItems={"center"}
                      justifyContent={"center"}>
                    <Typography>
                        ND
                    </Typography>
                </Flex>
            </Flex>
            <Flex flex={1} flexDir={"column"}>
                <Flex h={70} alignItems={"center"} justifyContent={"space-between"}>
                    <Flex flexDir={"column"}>
                        <Typography style={{
                            fontWeight: "bold",
                            fontSize: "0.9em"
                        }}>
                            Nagy Dezső
                        </Typography>
                        <Typography style={{
                            fontSize: "0.8em"
                        }}>
                            Alkalmazott tudományok
                        </Typography>
                    </Flex>
                    <Flex>
                        <Rating value={5} style={{color: "var(--epistoTeal)"}} />
                    </Flex>
                </Flex>
                <Flex mt={20}>
                    <Typography style={{
                        fontSize: "0.8em"
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique suscipit tempor. Pellentesque dictum, augue a egestas faucibus, augue ipsum vehicula dui, faucibus eleifend risus orci quis ante. Curabitur porttitor fringilla blandit. Suspendisse placerat tempus vehicula. In dignissim tellus magna. Donec non tincidunt risus. Morbi sit amet turpis dolor. Proin vulputate leo eu leo bibendum, in condimentum ex efficitur.
                    </Typography>
                </Flex>
            </Flex>
        </Flex>
    }

    return <Flex mt={10} w={"100%"} h={500} direction={"column"} alignItems={"flex-start"}>
        <Flex w={"100%"} h={170}>
            <Paper>
                <Flex w={170} h={170} flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
                    <Typography style={{
                        fontWeight: "bold",
                        fontSize: "3em"
                    }}>4.6</Typography>
                    <Typography style={{
                        fontWeight: "bold"
                    }}>Kurzus értékelése</Typography>
                </Flex>
            </Paper>
            <Flex h={170} flex={1} px={20} flexDir={"column"} justifyContent={"space-evenly"}>
                {mockRatingProgresses.map(x => <LinearProgress style={{
                    width: "100%",
                    height: 10,
                    borderRadius: 5,
                }} value={x} variant={"determinate"} />)}
            </Flex>
            <Flex w={170} h={170} flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
                <Rating value={5} style={{color: "var(--epistoTeal)"}} />
                <Rating value={4} style={{color: "var(--epistoTeal)"}} />
                <Rating value={3} style={{color: "var(--epistoTeal)"}} />
                <Rating value={2} style={{color: "var(--epistoTeal)"}} />
                <Rating value={1} style={{color: "var(--epistoTeal)"}} />
            </Flex>
        </Flex>
        <Flex w={"100%"} flexDir={"column"}>
             <CourseDetailsRatingItem />
             <CourseDetailsRatingItem />
             <CourseDetailsRatingItem />
             <CourseDetailsRatingItem />
             <CourseDetailsRatingItem />
        </Flex>
    </Flex>
}
