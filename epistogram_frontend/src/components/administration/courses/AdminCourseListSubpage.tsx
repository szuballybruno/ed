import { Image } from "@chakra-ui/image";
import { Flex } from "@chakra-ui/layout";
import {
    ApartmentTwoTone, Edit, Equalizer, WorkTwoTone
} from "@mui/icons-material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { ReactNode, useState } from "react";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useAdministratedCourses } from "../../../services/courseService";
import { useNavigation } from "../../../services/navigatior";
import { FloatAddButton } from "../../FloatAddButton";
import { LoadingFrame } from "../../HOC/LoadingFrame";
import { EpistoButton } from "../../universal/EpistoButton";
import { FlexList } from "../../universal/FlexList";
import { FlexListItem } from "../../universal/FlexListItem";
import { FlexListTitleSubtitle } from "../../universal/FlexListTitleSubtitle";
import { FloatChip } from "../../universal/FloatChip";
import { AdminListEditHeader } from "../AdminListEditHeader";
import { AdminSubpageHeader } from "../AdminSubpageHeader";

export const CourseAdministration = () => {

    const [searchText] = React.useState("");
    const { courses, coursesStatus, coursesError } = useAdministratedCourses(searchText);

    const administrationRoutes = applicationRoutes.administrationRoute;

    const { navigate } = useNavigation();

    const navigateToAddUser = () => navigate(applicationRoutes.administrationRoute.coursesRoute.addRoute.route);

    const [selectedCourseIds, setSelectedCourseIds] = useState<number[]>([]);
    const isAllCoursesSelected = !courses.some(course => !selectedCourseIds.some(uid => uid === course.courseId));

    const setSelectedCourse = (courseId: number, isSelected: boolean) => {

        if (isSelected) {

            setSelectedCourseIds([...selectedCourseIds, courseId]);
        }
        else {

            setSelectedCourseIds(selectedCourseIds.filter(x => x !== courseId));
        }
    }

    const selectAllOrNone = (isAll: boolean) => {

        if (isAll) {

            setSelectedCourseIds(courses.map(x => x.courseId));
        } else {

            setSelectedCourseIds([]);
        }
    }

    const singleSelectedCourse = courses.filter(x => x.courseId === selectedCourseIds[0])[0];

    const bulkEditButtons = [
        {
            name: "editButton",
            text: "Szerkesztés",
            onClick: () => navigate(administrationRoutes.coursesRoute.editCourseRoute.route, { courseId: singleSelectedCourse.courseId })
        },
        {
            name: "deleteButton",
            text: "Törlés",
            onClick: () => { }
        },
        {
            name: "statsButton",
            text: "Statisztika megjelenítése",
            onClick: () => navigate(administrationRoutes.coursesRoute.statisticsCourseRoute.route, { courseId: singleSelectedCourse.courseId })
        }
    ]

    return <Flex flex="1" direction="column" bgColor="white" maxW={"100%"}>

        {/* admin header */}
        <AdminSubpageHeader>
            <AdminListEditHeader
                headerButtons={bulkEditButtons}
                isAllSelected={isAllCoursesSelected}
                selectAllOrNone={selectAllOrNone}
                selectedIds={selectedCourseIds}
                itemLabel="kurzus" />
        </AdminSubpageHeader>

        <LoadingFrame loadingState={coursesStatus} error={coursesError} flex="1">
            {/* List of courses */}
            <FlexList flex={1}>
                {courses
                    .map(course => {

                        const chips = [] as { name: string, icon: ReactNode }[];


                        chips.push(
                            {
                                name: course.category,
                                icon: <AlternateEmailIcon />
                            });

                        chips.push(
                            {
                                name: course.teacherName,
                                icon: <ApartmentTwoTone />
                            });

                        chips.push(
                            {
                                name: course.videosCount + "",
                                icon: <WorkTwoTone />
                            })

                        return <FlexListItem
                            align="center"
                            h={100}
                            thumbnailContent={
                                <Image
                                    src={course.thumbnailImageURL}
                                    objectFit="cover"
                                    className="square70" />
                            }
                            setIsChecked={x => setSelectedCourse(course.courseId, x)}
                            isChecked={selectedCourseIds.some(x => x === course.courseId)}
                            midContent={
                                <FlexListTitleSubtitle
                                    title={course.title}
                                    subTitle={
                                        <Flex wrap="wrap">
                                            {chips
                                                .map((chip, index) => <FloatChip
                                                    name={chip.name}
                                                    icon={chip.icon}
                                                    padding="5px" />)}
                                        </Flex>
                                    }
                                />
                            }
                            endContent={<Flex align="center" justifyContent={"flex-end"} h={"100%"} width={165} px={10}>
                                <EpistoButton
                                    variant={"colored"}
                                    onClick={() => {
                                        navigate(`${administrationRoutes.coursesRoute.route}/${course.courseId}/edit`)
                                    }}
                                    style={{ width: 20 }}>
                                    <Edit style={{ width: "20px", height: "20px" }} />
                                </EpistoButton>

                                <EpistoButton
                                    variant="colored"
                                    onClick={() => {
                                        navigate(`${administrationRoutes.coursesRoute.route}/${course.courseId}/statistics`)
                                    }}
                                    style={{ width: 20, marginLeft: 5 }} >
                                    <Equalizer style={{ width: "20px", height: "20px" }} />
                                </EpistoButton>

                                <EpistoButton
                                    variant="colored"
                                    onClick={() => { }}
                                    style={{ width: 20, marginLeft: 5 }}>
                                    <DeleteIcon style={{ width: "20px", height: "20px" }}></DeleteIcon>
                                </EpistoButton>
                            </Flex>}
                        />
                    })}
            </FlexList>
        </LoadingFrame>

        <FloatAddButton onClick={navigateToAddUser} />
    </Flex>
}
