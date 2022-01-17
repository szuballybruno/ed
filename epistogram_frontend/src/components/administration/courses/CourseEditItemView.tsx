import { Divider, Flex } from "@chakra-ui/react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Chip, Typography } from "@mui/material";
import React from 'react';
import { CourseAdminItemShortDTO } from "../../../models/shared_models/CourseAdminItemShortDTO";
import { formatTime } from "../../../static/frontendHelpers";
import { EpistoButton } from "../../controls/EpistoButton";

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
                <Flex alignItems={"center"} h={"100%"}>
                    <Typography style={{ marginRight: "10px" }}>
                        {index + 1}.
                    </Typography>
                </Flex>


                <Flex flexDir={"column"} justifyContent={"center"} minW={250}>
                    <Flex>

                        {/* title */}
                        <Typography>
                            {item.title}
                        </Typography>

                    </Flex>

                    <Flex>

                        {/* subtitle */}
                        <Typography
                            style={{
                                fontSize: "0.8em",
                                color: "gray"
                            }}>
                            {item.subTitle}
                        </Typography>

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
                            ? `Videó hossza: ${formatTime(Math.round(item.videoLength))}`
                            : "Nincs feltöltött videó")}

                    {/* question count */}
                    {chip(item.questionCount > 0 ? "var(--deepGreen)" : "var(--deepRed)", `Kérdések: ${item.questionCount}`)}
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
        {props.isShowDivider && <Divider h={1} my={5} w={"100%"} bgColor={"#AAAAAA"} />}
    </Flex>
}
