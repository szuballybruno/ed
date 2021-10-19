import { Image } from "@chakra-ui/image";
import { Flex } from "@chakra-ui/layout";
import {
    ApartmentTwoTone,
    Close,
    Edit, Equalizer, WorkTwoTone
} from "@mui/icons-material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Checkbox, Typography } from "@mui/material";
import React, { ReactNode, useState } from "react";
import { applicationRoutes } from "../../../../configuration/applicationRoutes";
import { useAdministratedCourses } from "../../../../services/courseService";
import { useNavigation } from "../../../../services/navigatior";
import { FloatAddButton } from "../../../FloatAddButton";
import { LoadingFrame } from "../../../HOC/LoadingFrame";
import IntersectionObserverWrap from "../../../IntersectionObserverWrapper";
import { EpistoButton } from "../../../universal/EpistoButton";
import { EpistoSearch } from "../../../universal/EpistoSearch";
import { EpistoSelect } from "../../../universal/EpistoSelect";
import { FlexList } from "../../../universal/FlexList";
import { FlexListItem } from "../../../universal/FlexListItem";
import { FlexListTitleSubtitle } from "../../../universal/FlexListTitleSubtitle";
import { FloatChip } from "../../../universal/FloatChip";
import { AdminSubpageHeader } from "../../AdminSubpageHeader";

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

    return <Flex flex="1" direction="column" bgColor="white" maxW={"100%"}>

        {/* admin header */}
        <AdminSubpageHeader>
            <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} h={60}>
                <Flex direction={"row"} alignItems={"center"} justifyContent={"center"} minW={60} h={"100%"}>
                    <Checkbox checked={isAllCoursesSelected} onClick={() => selectAllOrNone(!isAllCoursesSelected)} />
                </Flex>

                {!isAllCoursesSelected && <Flex
                    w={240}
                    minW={165}
                    h={"100%"}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                    onClick={() => selectAllOrNone(!isAllCoursesSelected)}
                    cursor="pointer">

                    <Typography
                        style={{ marginLeft: "20px" }}>

                        Összes kijelölése
                    </Typography>
                </Flex>}

                {selectedCourseIds.length > 0 &&
                    <Flex
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        w={230}
                        minW={230}
                        h={"100%"}>
                        <Flex
                            direction={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            className="roundBorders"
                            bg="var(--epistoTeal)"
                            p="0 12px 0 12px"
                            color="white"
                            h={30}
                            ml={10}>
                            <Typography>
                                {selectedCourseIds.length} kurzus kijelölve
                            </Typography>
                            <Close onClick={() => {
                                setSelectedCourseIds([])
                            }} style={{
                                width: 18,
                                marginLeft: 5
                            }} />
                        </Flex>
                    </Flex>}



                {(selectedCourseIds.length === 1) && <IntersectionObserverWrap direction={"row"} alignItems={"center"} justifyContent={"flex-start"}>
                    <Button
                        size={"small"}
                        variant={"outlined"}
                        name={"edit"}
                        style={{
                            marginRight: "20px",
                            minWidth: "fit-content",
                            borderRadius: 7,
                            borderColor: "var(--mildGrey)",
                            color: "black"
                        }}
                        onClick={() => {
                            navigate(`${administrationRoutes.coursesRoute.route}/${selectedCourseIds[0]}/edit`)
                        }}
                    >
                        Szerkesztés
                    </Button>
                    <Button
                        size={"small"}
                        name="remove"
                        style={{
                            marginRight: "20px",
                            minWidth: "fit-content",
                            borderRadius: 7,
                            borderColor: "var(--mildGrey)",
                            color: "black"
                        }}
                        variant={"outlined"}>
                        Törlés
                    </Button>
                    <Button
                        size={"small"}
                        name="stats"
                        style={{
                            marginRight: "20px",
                            minWidth: "fit-content",
                            borderRadius: 7,
                            borderColor: "var(--mildGrey)",
                            color: "black"
                        }}
                        variant={"outlined"}
                        onClick={() => {
                            navigate(`${administrationRoutes.coursesRoute.route}/${selectedCourseIds[0]}/statistics`)
                        }}>
                        Statisztika megjelenítése
                    </Button>

                </IntersectionObserverWrap>}

                <Flex h={"100%"} flex={1}></Flex>

                <Flex
                    h={"100%"}
                    direction={"row"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    w={140}
                    mx={10}>
                    <EpistoSearch w={140}></EpistoSearch>
                </Flex>


                <Flex
                    direction={"row"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    h={"100%"}
                    mx={10}>
                    <EpistoSelect
                        minW={"fit-content"}
                        items={[]}
                        onSelected={x => { }}
                        selectedValue="1"
                        getCompareKey={x => x}
                        defaultValue="Rendezés...">

                    </EpistoSelect>
                </Flex>
            </Flex>
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
                            thumbnail={
                                <Image
                                    src={course.thumbnailImageURL}
                                    objectFit="cover"
                                    h={"100%"}
                                    w={300} />
                            }
                            setIsChecked={x => setSelectedCourse(course.courseId, x)}
                            isChecked={selectedCourseIds.some(x => x === course.courseId)}
                            midContent={
                                <FlexListTitleSubtitle
                                    title={course.title}
                                    subTitle={
                                        <Flex wrap="wrap" my="10px">
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
                                    style={{ width: 20 }}
                                >
                                    <Edit style={{ width: "20px", height: "20px" }} />
                                </EpistoButton>
                                <EpistoButton
                                    variant="colored"
                                    onClick={() => {
                                        navigate(`${administrationRoutes.coursesRoute.route}/${course.courseId}/statistics`)
                                    }}
                                    style={{ width: 20, marginLeft: 5 }}
                                >
                                    <Equalizer style={{ width: "20px", height: "20px" }} />
                                </EpistoButton>
                                <EpistoButton
                                    variant="colored"
                                    onClick={() => { }}
                                    style={{ width: 20, marginLeft: 5 }}
                                >
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
