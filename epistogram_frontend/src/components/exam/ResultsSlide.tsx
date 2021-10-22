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
                </Flex>
                <Flex mx={3}>
                    <Text as="text">{""}</Text>
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
            </Flex>
        </Flex>
        <Divider w={"100%"} h={1} bgColor={"grey"} />
        <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            w={"100%"}
            mt={30}
        >
            <Text
                as="text"
                fontSize={"1.3rem"}
            >
                {"Egy újabb tesztet oldottál meg, íme az eredményed:"}
            </Text>
        </Flex>


        <Flex w={"100%"} h={170}>
            <StatisticsCard suffix={"%"} title={"Helyes válaszok aránya"} value={"66"} />
            <StatisticsCard suffix={""} title={"Helyes válasz a kérdésekre"} value={"10/15"} />
            <StatisticsCard suffix={"perc"} title={"Alatt teljesítetted a tesztet"} value={"66"} />
            <StatisticsCard suffix={"%"} title={"Az összes felhaszáló között"} value={"top 20"} />
        </Flex>

        <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"100%"}
            mt={20}
            pl={15}
        >
            <Text
                as="text"
                fontSize={"1.3rem"}
            >
                {"Kérdések"}
            </Text>
            <Flex w={"25%"}>
                <Text
                    as="text"
                    fontSize={"1.3rem"}
                >
                    {"Válaszod"}
                </Text>
            </Flex>
        </Flex>

        <Flex direction={"column"} flex={1} mt={10}>
            {props.exam.questions.map((question, index) => {
                return <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Flex w={"77%"}>
                            <Typography>{question.questionText}</Typography>
                        </Flex>
                        <Flex w={"23%"}>
                            <Typography style={{
                                padding: "2px 15px",
                                backgroundColor: "#97CC9B",
                                borderRadius: 7
                            }}>{"Válasz"}</Typography>
                        </Flex>
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
                        Kurzus folytatása
                        <ArrowForward />
                    </EpistoButton>
                </Flex>
            </Flex>
        </Flex>
    </Flex>
};

export default ResultsSlide;
