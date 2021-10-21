import {Divider, Flex, Text} from "@chakra-ui/react";
import {EpistoButton} from "../universal/EpistoButton";
import {getAssetUrl, PagingType} from "../../frontendHelpers";
import {ArrowBack, ArrowForward} from "@mui/icons-material";
import {LinearProgress} from "@mui/material";
import React from "react";
import {ExamDTO} from "../../models/shared_models/ExamDTO";

export const GreetSlide = (props: {
    exam: ExamDTO,
    answerSessionId: number,
    setIsExamInProgress: (isExamStarted: boolean) => void
    slidesState: PagingType<number>
}) => {

    const {
        exam,
        setIsExamInProgress,
        answerSessionId,
        slidesState
    } = props;


    return <Flex
        direction={"column"}
        w={"100%"}
        px={40}
        bgColor={"#7CC0C21A"}
    >
        <Flex
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            h={60}
            pl={5}
        >
            <Flex
                justifyContent={"flex-start"}
                alignItems={"center"}
                px={2}
                w={"20%"}
                h={60}
            >

                <Flex>
                    <img
                        src={""}
                        style={{
                            width: 30,
                            height: 30,
                        }}
                        alt={""} />
                </Flex>
                <Flex mx={3}>
                    <Text as="text">{"Üdv!"}</Text>
                </Flex>

            </Flex>
            <Flex
                direction={"column"}
                flex={1}
                h={60}
                maxW={450}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Text
                    as="text"
                    fontSize={"1.1rem"}
                >{exam.title}</Text>
            </Flex>
            <Flex
                w={"20%"}>
                <EpistoButton variant={"outlined"}>
                    Kilépek a tesztből
                </EpistoButton>
            </Flex>
        </Flex>
        <Divider w={"100%"} h={1} bgColor={"grey"} />
        <Flex
            flex={1}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Flex w={"80%"} flexWrap={"wrap-reverse"}>
                <Flex
                    justifyContent={"flex-end"}
                    maxH={300}
                    flexShrink={1}
                >
                    <img
                        src={getAssetUrl("/images/examCover.jpg")}
                        alt={""}
                        style={{
                            objectFit: "contain",
                            maxHeight: 300
                        }}
                    />
                </Flex>
                <Flex
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"flex-start"}
                    w={"100%"}
                    minW={"50%"}
                    px={7}
                    flex={1}
                >
                    <Flex
                        direction={"column"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        maxW={800}
                    >
                        <Text
                            as="text"
                            fontSize={"1.3rem"}
                        >
                            {"Ez egy kurva bonyolult kérdés, amit meg kellene válaszolnod! Ez magának a kérdésnek a fejéce."}
                        </Text>
                    </Flex>
                    <Flex
                        direction={"column"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        maxW={600}
                        py={20}
                    >
                        <Text
                            as="text"
                            fontSize={"1.1rem"}
                        >
                            {"De benne van az is, hogy a kérdés értelmezéséhez szükség van valamilyen kisebb-nagyon descriptionre is, például ha jogászokat akarunk képezni (márpedig akarunk), akkor egy-egy törvény paragrafusát ne a headingbe, hanem inkább a descriptionba írják bele az okosok."}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>


        </Flex>

        <Flex
            w={"100%"}
            h={80}
            mb={20}
            boxSizing={"border-box"}
            p={10}
        >
            <Flex w={"100%"} h={"100%"}  boxSizing={"border-box"} bgColor={"white"} borderRadius={7} p={8}>
                <Flex h={46} w={46} alignItems={"center"} justifyContent={"center"}>

                </Flex>
                <Flex flex={1}  px={10} alignItems={"center"}>

                </Flex>
                <Flex>
                    <EpistoButton
                        variant={"colored"}
                        onClick={() => {
                            setIsExamInProgress(true);
                            slidesState.next();
                        }}
                        style={{
                            width: 200,
                            height: 46
                        }}>Kezdés!
                        <ArrowForward />
                    </EpistoButton>
                </Flex>
            </Flex>
        </Flex>
    </Flex>
}
