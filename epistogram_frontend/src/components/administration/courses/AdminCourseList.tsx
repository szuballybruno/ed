import { Image } from "@chakra-ui/image";
import { Flex } from "@chakra-ui/layout";
import { Equalizer, NavigateBefore, ShortText, ViewList } from "@mui/icons-material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import CategoryIcon from '@mui/icons-material/Category';
import DeleteIcon from "@mui/icons-material/Delete";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import VideocamIcon from '@mui/icons-material/Videocam';
import React, { ReactNode, useState } from "react";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { ApplicationRoute } from "../../../models/types";
import { useAdminCourseList, useCreateCourse, useDeleteCourse } from "../../../services/api/courseApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications";
import { EpistoButton } from "../../controls/EpistoButton";
import { EpistoSearch } from "../../controls/EpistoSearch";
import { EpistoDialog, useEpistoDialogLogic } from "../../EpistoDialog";
import { FloatAddButton } from "../../FloatAddButton";
import { LoadingFrame } from "../../system/LoadingFrame";
import { FlexList } from "../../universal/FlexList";
import { FlexListItem } from "../../universal/FlexListItem";
import { FlexListTitleSubtitle } from "../../universal/FlexListTitleSubtitle";
import { FloatChip } from "../../universal/FloatChip";
import { AdminListEditHeader } from "../AdminListEditHeader";
import { AdminSubpageHeader } from "../AdminSubpageHeader";

export const AdminCourseList = (props: {
    currentCoursePage: "details" | "content" | "statistics"
}) => {

    const [searchText] = React.useState("");

    // http
    const { courses, coursesStatus, coursesError, refetchCoursesAsync } = useAdminCourseList(searchText);
    const { createCourseAsync, createCourseState } = useCreateCourse();
    const { deleteCourseAsync, deleteCourseState } = useDeleteCourse();

    const { navigate } = useNavigation()

    const { currentCoursePage } = props

    const [selectedCourseIds, setSelectedCourseIds] = useState<number[]>([]);

    return <LoadingFrame
        direction="column"
        loadingState={[coursesStatus, createCourseState, deleteCourseState]}
        error={coursesError}>

        <EpistoSearch />

        {/* List of courses */}
        <FlexList flex={1} pb="300px" flexBasis="350px" mt="5px" className="roundBorders" background="var(--transparentWhite70)">
            {courses
                .map(course => {

                    return <FlexListItem
                        onClick={() => {
                            navigate(applicationRoutes.administrationRoute.coursesRoute.route + "/" + course.courseId + "/" + currentCoursePage)
                        }}
                        align="center"
                        mb="1"
                        thumbnailContent={
                            <Image
                                src={course.thumbnailImageURL}
                                objectFit="cover"
                                className="roundBorders"
                                style={{
                                    height: 72,
                                    width: 128
                                }}
                            />
                        }
                        midContent={
                            <FlexListTitleSubtitle
                                title={course.title}
                                subTitle={""}
                            />
                        }
                    />
                })}
        </FlexList>
    </LoadingFrame>
}
