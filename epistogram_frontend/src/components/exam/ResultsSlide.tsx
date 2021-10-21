import React from 'react';
import {Divider, Flex, Text} from "@chakra-ui/react";
import {EpistoButton} from "../universal/EpistoButton";
import StatisticsCard from "../statisticsCard/StatisticsCard";
import {Accordion, AccordionDetails, AccordionSummary, Checkbox, LinearProgress, Typography} from "@mui/material";
import {ArrowBack, ArrowForward, ExpandMore} from "@mui/icons-material";
import {ExamDTO} from "../../models/shared_models/ExamDTO";
import {useNavigation} from "../../services/navigatior";

const ResultsSlide = (props: {
    exam: ExamDTO,
    answerSessionId: number,
    setIsExamInProgress: (isExamStarted: boolean) => void
}) => {
    const { navigate } = useNavigation()

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
                >{props.exam.title}</Text>
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
            justifyContent={"flex-start"}
            alignItems={"center"}
        >
            <Flex
                direction={"column"}
                justifyContent={"flex-end"}
                alignItems={"flex-start"}
                w={"100%"}
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

        <Flex w={"100%"}>
            <StatisticsCard suffix={"%"} title={"Helyes válaszok aránya"} value={"66"} />
            <StatisticsCard suffix={""} title={"Helyes válasz a kérdésekre"} value={"10/15"} />
            <StatisticsCard suffix={"perc"} title={"Alatt teljesítetted a tesztet"} value={"66"} />
            <StatisticsCard suffix={"%"} title={"Az összes felhaszáló között"} value={"top 20"} />
        </Flex>

        <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            w={"100%"}
        >
            <Text
                as="text"
                fontSize={"1.3rem"}
            >
                {"Válaszok"}
            </Text>
        </Flex>

        <Flex direction={"column"} flex={1}>
            {props.exam.questions.map((question, index) => {
                return <Accordion expanded>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{question.questionText}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Flex
                            direction={"row"}
                            justifyContent={"center"}
                            pt={10}
                            flex={1}
                        >
                            <Flex
                                direction={"column"}
                                maxW={"50%"}
                                flex={1}
                            >
                                {question.answers.map((answer, index) => {
                                    if (index % 2 === 0) {
                                        return <Flex
                                            key={answer.answerId}
                                            alignItems={"center"}
                                            borderRadius={7}
                                            cursor={"pointer"}
                                            style={{
                                                margin: "5px",
                                                padding: "0 0 0 10px",
                                                border: "2px solid var(--epistoTeal)"
                                            }}
                                        >
                                            <Checkbox checked={false} size="small" value="advanced" />
                                            <Typography style={{ fontSize: "14px"}}>
                                                {answer.answerText}
                                            </Typography>
                                        </Flex>
                                    }
                                })}
                            </Flex>
                            <Flex
                                direction={"column"}
                                maxW={"50%"}
                                flex={1}
                            >
                                {question.answers.map((answer, index) => {
                                    if (index % 2 !== 0) {
                                        return <Flex
                                            key={answer.answerId}
                                            alignItems={"center"}
                                            borderRadius={7}
                                            cursor={"pointer"}
                                            style={{
                                                margin: "5px",
                                                padding: "0 0 0 10px",
                                                border: "2px solid var(--epistoTeal)"
                                            }}
                                        >
                                            <Checkbox checked={false} size="small" value="advanced" />
                                            <Typography style={{ fontSize: "14px"}}>
                                                {answer.answerText}
                                            </Typography>
                                        </Flex>
                                    }
                                })}

                            </Flex>
                        </Flex>
                    </AccordionDetails>
                </Accordion>
            })}
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
                    <EpistoButton style={{
                        backgroundColor: "#7CC0C240",
                        borderRadius: 7,
                        width: 46,
                        height: 46
                    }}  >
                        <ArrowBack />
                    </EpistoButton>
                </Flex>
                <Flex flex={1}  px={10} alignItems={"center"}>
                    <LinearProgress variant="determinate" value={30} style={{ flex: "1", marginRight: "10px" }} />
                </Flex>
                <Flex>
                    <EpistoButton
                        variant={"colored"}
                        onClick={() => {
                            navigate("/courses")
                        }}
                        style={{
                            width: 200,
                            height: 46
                        }}>
                        Tanfolyamkereső
                        <ArrowForward />
                    </EpistoButton>
                </Flex>
            </Flex>
        </Flex>
    </Flex>
};

export default ResultsSlide;
