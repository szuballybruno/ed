import {Divider, Flex} from "@chakra-ui/react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Chip, Typography} from "@mui/material";
import React from 'react';
import { CourseAdminItemShortDTO } from "../../../models/shared_models/CourseAdminItemShortDTO";
import { EpistoButton } from "../../universal/EpistoButton";

export const CourseEditItemView = (props: {
    moduleIndex: number,
    index: number,
    item: CourseAdminItemShortDTO,
    editCourseItem: (item: CourseAdminItemShortDTO) => void,
    deleteCourseItem: (item: CourseAdminItemShortDTO) => void,
    isShowDivider?: boolean,
}) => {

    const { moduleIndex, index, item, editCourseItem, deleteCourseItem } = props;

    const formatTime = (seconds) =>
        new Date(seconds * 1000).toLocaleTimeString('en-GB', {
            timeZone:'Etc/UTC',
            hour12: false,
            minute: '2-digit',
            second: '2-digit'
        });

    return <Flex
        flexDir={"column"}
        flex={1}
    >
        <Flex
            flex="1"
            borderLeft={`5px solid var(--${item.type === "exam" ? "intenseOrange" : "deepBlue"})`}
            pl="10px"
            justify="space-between"
            m="3px">

            <Flex flexDirection={"row"} alignItems={"flex-start"} justifyContent={"center"} >

                {/* index */}
                <Flex alignItems={"center"} h={"100%"}>
                    <Typography style={{ marginRight: "10px"}}>
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

                    {/* question count */}
                    <Chip size={"small"} style={{
                        margin: "0 5px",
                        borderRadius: 5,
                        color: item.questionCount === 0 ? "#d27f7a" : "#7FB280FF",
                        fontWeight: "bold"
                    }}  label={"Kérdések: " + item.questionCount} variant={"outlined"} />


                    {item.videoLength !== null && <Chip size={"small"} style={{
                        margin: "0 5px",
                        color: (item.videoLength > 300 || !item.videoLength) ? "#d27f7a" : "#7FB280FF",
                        borderRadius: 5,
                        fontWeight: "bold"
                    }}  label={!!item.videoLength ? `Videó hossza: ${formatTime(Math.round(item.videoLength))}` : "Nincs feltöltött videó"} variant={"outlined"} />}


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
