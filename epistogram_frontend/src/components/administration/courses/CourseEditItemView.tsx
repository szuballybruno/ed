import { Divider, Flex } from "@chakra-ui/react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Chip, Typography } from "@mui/material";
import React from 'react';
import { CourseAdminItemShortDTO } from "../../../models/shared_models/CourseAdminItemShortDTO";
import { formatTime } from "../../../static/frontendHelpers";
import { translatableTexts } from "../../../static/translatableTexts";
import { EpistoButton } from "../../controls/EpistoButton";
import { EpistoFont } from "../../controls/EpistoFont";

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

    const chip = (color: any, label: string) => <Chip
        size={"small"}
        style={{
            margin: "0 5px",
            color: color,
            borderRadius: 5,
            fontWeight: "bold"
        }}
        label={label}
        variant={"outlined"} />

    return <Flex
        flexDir={"column"}
        flex={1}>

        <Flex
            flex="1"
            borderLeft={`5px solid var(--${isVideo ? "deepBlue" : "intenseOrange"})`}
            pl="10px"
            justify="space-between"
            m="3px">

            <Flex flexDirection={"row"} alignItems={"flex-start"} justifyContent={"center"} >

                {/* index */}
                <Flex alignItems={"center"} height="100%">
                    <EpistoFont style={{ marginRight: "10px" }}>
                        {index + 1}.
                    </EpistoFont>
                </Flex>


                <Flex flexDir={"column"} justifyContent={"center"} minWidth={250}>
                    <Flex>

                        {/* title */}
                        <EpistoFont>
                            {item.title}
                        </EpistoFont>

                    </Flex>

                    <Flex>

                        {/* subtitle */}
                        <EpistoFont
                            fontSize={"fontSmall"}
                            classes={["fontGrey"]}>

                            {item.subTitle}
                        </EpistoFont>
                    </Flex>
                </Flex>
            </Flex>


            <Flex>
                <Flex alignItems={"center"}>

                    {item.isFinalExam && chip("var(--deepBlue)", "Zarovizsga")}

                    {/* video lenght / uploaded video */}
                    {isVideo && chip(
                        item.videoLength > 0 ? "var(--deepGreen)" : "var(--deepRed)",
                        item.videoLength
                            ? `${translatableTexts.administration.courseEditItemView.videoLength} ${formatTime(Math.round(item.videoLength))}`
                            : translatableTexts.administration.courseEditItemView.noVideoUploaded)}

                    {/* question count */}
                    {chip(item.questionCount > 0 ? "var(--deepGreen)" : "var(--deepRed)", `${translatableTexts.administration.courseEditItemView.questions} ${item.questionCount}`)}
                </Flex>

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
