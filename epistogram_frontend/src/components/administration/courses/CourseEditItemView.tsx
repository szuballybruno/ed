import { Flex } from "@chakra-ui/react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Typography } from "@mui/material";
import React from 'react';
import { CourseAdminItemShortDTO } from "../../../models/shared_models/CourseAdminItemShortDTO";
import { EpistoButton } from "../../universal/EpistoButton";

export const CourseEditItemView = (props: {
    moduleIndex: number,
    index: number,
    item: CourseAdminItemShortDTO,
    editCourseItem: (item: CourseAdminItemShortDTO) => void,
    deleteCourseItem: (item: CourseAdminItemShortDTO) => void
}) => {

    const { moduleIndex, index, item, editCourseItem, deleteCourseItem } = props;

    return <Flex
        flex="1"
        borderLeft={`5px solid var(--${item.type === "exam" ? "intenseOrange" : "deepBlue"})`}
        p="10px"
        justify="space-between"
        m="3px">

        <Flex flexDirection={"column"} alignItems={"flex-start"}>
            <Flex>

                {/* index */}
                <Typography style={{ marginRight: "10px" }}>
                    {moduleIndex + 1} / {index + 1}
                </Typography>

                {/* title */}
                <Typography>
                    {item.title}
                </Typography>

                {/* question count */}
                <Typography
                    style={{
                        marginLeft: "10px",
                        background: item.questionCount == 0
                            ? "var(--mildOrange)"
                            : "var(--intenseGreen)",
                        textAlign: "center",
                        color: "white"
                    }}
                    className="circle square20">
                    {item.questionCount}
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

                {item.videoLength !== null && <Typography
                    style={{
                        fontSize: "0.8em",
                        marginLeft: "5px",
                        color: item.videoLength ? "var(--deepGreen)" : "var(--mildRed)"
                    }}>
                    {"- "}{!!item.videoLength ? `${Math.round(item.videoLength)}s` : "Nincs feltoltott video"}
                </Typography>}
            </Flex>
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
}