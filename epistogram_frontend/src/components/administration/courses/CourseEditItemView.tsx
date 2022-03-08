import { Box, Divider, Flex } from "@chakra-ui/react";
import { Equalizer } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Chip, Typography } from "@mui/material";
import React from 'react';
import { CourseAdminItemShortDTO } from "../../../shared/dtos/CourseAdminItemShortDTO";
import { formatTime, secondsToTime } from "../../../static/frontendHelpers";
import { translatableTexts } from "../../../static/translatableTexts";
import { EpistoButton } from "../../controls/EpistoButton";
import { EpistoFont } from "../../controls/EpistoFont";

export const ChipSmall = (props: { text: string, color?: string, style?: React.CSSProperties }) => {

    const color = props.color ?? "var(--deepBlue)";

    return (
        <EpistoFont
            classes={["roundBorders"]}
            fontSize="fontSmall"
            style={{
                border: "1px solid var(--deepBlue)",
                color: color,
                padding: "0 5px",
                margin: "0 2px",
                fontWeight: 700,
                ...props.style
            }}>

            {props.text}
        </EpistoFont>
    )
}

export const CourseEditItemView = (props: {
    moduleIndex: number,
    index: number,
    item: CourseAdminItemShortDTO,
    editCourseItem: (item: CourseAdminItemShortDTO) => void,
    showCourseItemStats: (item: CourseAdminItemShortDTO) => void,
    deleteCourseItem: (item: CourseAdminItemShortDTO) => void,
    isShowDivider?: boolean,
}) => {

    const { moduleIndex, index, item, editCourseItem, showCourseItemStats, deleteCourseItem } = props;
    const isVideo = item.type === "video";

    const chip = (color: any, label: string) => (
        <Chip
            size={"small"}
            style={{
                margin: "0 5px",
                color: color,
                borderRadius: 5,
                fontWeight: "bold"
            }}
            label={label}
            variant={"outlined"} />
    );

    return <Flex
        flexDir={"column"}
        flex={1}>

        <Flex
            flex="1"
            borderLeft={`5px solid var(--${isVideo ? "deepBlue" : "intenseOrange"})`}
            pl="10px"
            justify="space-between"
            m="3px">

            <Flex
                justify={"center"} >

                {/* index */}
                <Flex
                    align={"center"}
                    height="100%">

                    <EpistoFont
                        style={{
                            marginRight: "10px"
                        }}>

                        {index + 1}.
                    </EpistoFont>
                </Flex>

                {/* title & subtitle */}
                <Flex
                    flexDir={"column"}
                    justifyContent={"center"}
                    minWidth={250}>

                    {/* title */}
                    <EpistoFont>
                        {item.title}
                    </EpistoFont>

                    {/* subtitle */}
                    <EpistoFont
                        fontSize={"fontSmall"}
                        classes={["fontGrey"]}>

                        {item.subTitle}
                    </EpistoFont>
                </Flex>
            </Flex>


            <Flex>

                {/* chips  */}
                <Flex
                    direction="column"
                    flexWrap="wrap"
                    flex="1">

                    <Flex>

                        {/* final exam */}
                        {item.isFinalExam && <ChipSmall
                            color={"var(--deepBlue)"}
                            text={"Záróvizsga"} />}

                        {/* video lenght / uploaded video */}
                        {isVideo && <ChipSmall
                            color={item.videoLength > 0
                                ? "var(--deepGreen)"
                                : "var(--deepRed)"}
                            text={
                                item.videoLength
                                    ? `${translatableTexts.administration.courseEditItemView.videoLength} ${formatTime(Math.round(item.videoLength))}`
                                    : translatableTexts.administration.courseEditItemView.noVideoUploaded} />}

                        {/* question count */}
                        <ChipSmall
                            color={
                                item.questionCount > 0
                                    ? "var(--deepGreen)"
                                    : "var(--deepRed)"
                            }
                            text={
                                item.videoLength || item.videoLength === 0
                                    ? `${translatableTexts.administration.courseEditItemView.questions} ${item.questionCount}`
                                    : "Nincs kérdés feltöltve"
                            } />
                    </Flex>

                    {item
                        .questions
                        .map(question => (
                            question.questionText && <Flex direction="column" mt="20px">
                                <Divider w="100%" h="1" bgColor="black" />
                                <Flex direction="row" flexWrap="wrap" mt="20px">

                                    {/* question text */}
                                    {question.questionText && <ChipSmall
                                        style={{
                                            width: "100%",
                                            marginBottom: 5
                                        }}
                                        color={question.questionText
                                            ? "var(--deepGreen)"
                                            : "var(--deepRed)"} text={"Kérdés: " + question.questionText} />}

                                    {/* question show up time */}
                                    {(item.type === "video") && <ChipSmall
                                        color={(question.questionShowUpSeconds || question.questionShowUpSeconds != 0)
                                            ? "var(--deepGreen)"
                                            : "var(--deepRed)"}
                                        text={question.questionShowUpSeconds ? "Megjelenés időpontja: " + secondsToTime(question.questionShowUpSeconds) : "Nincs megadva időpont"} />}

                                    {/* question answer count */}
                                    {question.answerCount && <ChipSmall
                                        color={question.answerCount == 4 ? "var(--deepGreen)" : "var(--deepRed)"}
                                        text={question.answerCount
                                            ? "Válaszok: " + question.answerCount
                                            : "Nincsenek válaszok megadva"} />}

                                    {/* correct answer count */}
                                    {question.correctAnswerCount && <ChipSmall
                                        color={question.correctAnswerCount == 1
                                            ? "var(--deepGreen)"
                                            : "var(--deepRed)"}
                                        text={question.correctAnswerCount
                                            ? "Megadott helyes válaszok: " + question.correctAnswerCount
                                            : "Nincs helyes válasz megadva"} />}

                                    {/* answer */}
                                    {question.answers && <Flex
                                        className="roundBorders"
                                        direction="column"
                                        width="100%"
                                        m="5px 2px 0 2px"
                                        border="1px solid var(--deepBlue)">

                                        {question
                                            .answers
                                            .map(answer => {

                                                return <EpistoFont
                                                    fontSize="fontSmall"
                                                    style={{
                                                        padding: "0 5px",
                                                        fontWeight: 700,
                                                        color: answer.answerIsCorrect
                                                            ? "var(--deepGreen)"
                                                            : "var(--deepBlue)"
                                                    }}>

                                                    {answer.answerText}
                                                </EpistoFont>
                                            })}
                                    </Flex>}
                                </Flex>
                            </Flex>
                        ))}
                </Flex>

                {/* item toolbar */}
                <Flex>
                    <EpistoButton
                        onClick={() => editCourseItem(item)}>
                        <EditIcon></EditIcon>
                    </EpistoButton>

                    <EpistoButton
                        onClick={() => showCourseItemStats(item)}>
                        <Equalizer></Equalizer>
                    </EpistoButton>

                    <EpistoButton
                        onClick={() => deleteCourseItem(item)}>
                        <DeleteIcon></DeleteIcon>
                    </EpistoButton>
                </Flex>

            </Flex>


        </Flex>
        {props.isShowDivider && <Divider height={1} my={5} width="100%" bgColor={"#AAAAAA"} />}
    </Flex>
}
