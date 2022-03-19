import { Box, Divider, Flex } from "@chakra-ui/react";
import { Equalizer } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Chip, Typography } from "@mui/material";
import React from 'react';
import { useParams } from "react-router-dom";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useNavigation } from "../../../services/core/navigatior";
import { CourseAdminItemShortDTO } from "../../../shared/dtos/CourseAdminItemShortDTO";
import { formatTime, secondsToTime } from "../../../static/frontendHelpers";
import { translatableTexts } from "../../../static/translatableTexts";
import { EpistoButton } from "../../controls/EpistoButton";
import { EpistoFont } from "../../controls/EpistoFont";

const ChipSmall = (props: { text: string, color?: string, style?: React.CSSProperties }) => {

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

// deprecated because DataGrid
export const CourseEditItemViewNew = (props: {
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
    const { navigate } = useNavigation()

    const params = useParams<{ courseId: string }>();
    const courseId = parseInt(params.courseId);

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
        onClick={() => {
            navigate(applicationRoutes.administrationRoute.coursesRoute.route + "/" + courseId + "/" + item.type + "/" + item.id)
        }}
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


        </Flex>
        {props.isShowDivider && <Divider height={1} my={5} width="100%" bgColor={"#AAAAAA"} />}
    </Flex>
}
