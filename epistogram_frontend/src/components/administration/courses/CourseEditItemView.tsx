import { Box, Divider, Flex } from "@chakra-ui/react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Chip, Typography } from "@mui/material";
import React from 'react';
import { CourseAdminItemShortDTO } from "../../../models/shared_models/CourseAdminItemShortDTO";
import { formatTime } from "../../../static/frontendHelpers";
import { translatableTexts } from "../../../static/translatableTexts";
import { EpistoButton } from "../../controls/EpistoButton";
import { EpistoFont } from "../../controls/EpistoFont";

const ChipSmall = (props: { text: string, color?: string }) => {

    const color = props.color ?? "var(--deepBlue)";

    return (
        <EpistoFont
            noLineBreak
            style={{
                border: "1px solid " + color,
                borderRadius: "5px",
                margin: "2px"
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
    deleteCourseItem: (item: CourseAdminItemShortDTO) => void,
    isShowDivider?: boolean,
}) => {

    const { moduleIndex, index, item, editCourseItem, deleteCourseItem } = props;
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

                <Flex direction="column">

                    {/* chips  */}
                    <Flex alignItems={"center"}>

                        {/* final exam */}
                        {item.isFinalExam && chip("var(--deepBlue)", "Zarovizsga")}

                        {/* video lenght / uploaded video */}
                        {isVideo && chip(
                            item.videoLength > 0
                                ? "var(--deepGreen)"
                                : "var(--deepRed)",
                            item.videoLength
                                ? `${translatableTexts.administration.courseEditItemView.videoLength} ${formatTime(Math.round(item.videoLength))}`
                                : translatableTexts.administration.courseEditItemView.noVideoUploaded)}

                        {/* question count */}
                        {chip(item.questionCount > 0
                            ? "var(--deepGreen)"
                            : "var(--deepRed)",
                            `${translatableTexts.administration.courseEditItemView.questions} ${item.questionCount}`)}
                    </Flex>

                    {/* questions */}
                    <Flex direction="column">
                        {item
                            .questions
                            .map(question => (
                                <Flex direction="column">

                                    <Flex direction="column">
                                        <EpistoFont noLineBreak>
                                            {question.questionText}
                                        </EpistoFont>

                                        {item.type === "video" && <EpistoFont
                                            noLineBreak
                                            style={{
                                                color: question.questionShowUpSeconds === 0 ? "var(--deepRed)" : undefined
                                            }}>

                                            Show up seconds: {question.questionShowUpSeconds}
                                        </EpistoFont>}
                                    </Flex>

                                    <Flex>
                                        <ChipSmall text={`Answer count: ${question.answerCount}`} />
                                        <ChipSmall text={`Correct answer count: ${question.correctAnswerCount}`} />
                                    </Flex>

                                    {/* answers */}
                                    <Flex direction="column">
                                        {question
                                            .answers
                                            .map(answer => {

                                                return <EpistoFont
                                                    style={{
                                                        marginLeft: "15px"
                                                    }}>

                                                    {answer.answerText} {answer.answerIsCorrect ? "- correct" : ""}
                                                </EpistoFont>
                                            })}
                                    </Flex>
                                </Flex>
                            ))}
                    </Flex>
                </Flex>

                {/* item toolbar */}
                <Flex>
                    <EpistoButton
                        onClick={() => editCourseItem(item)}>
                        <EditIcon></EditIcon>
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
