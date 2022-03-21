import { Image } from "@chakra-ui/image";
import { Flex } from "@chakra-ui/layout";
import { Equalizer, ShortText, ViewList } from "@mui/icons-material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import CategoryIcon from '@mui/icons-material/Category';
import DeleteIcon from "@mui/icons-material/Delete";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import VideocamIcon from '@mui/icons-material/Videocam';
import React, { ReactNode, useState } from "react";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useAdminCourseList, useCreateCourse, useDeleteCourse } from "../../../services/api/courseApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications";
import { EpistoButton } from "../../controls/EpistoButton";
import { EpistoDialog, useEpistoDialogLogic } from "../../EpistoDialog";
import { FloatAddButton } from "../../FloatAddButton";
import { LoadingFrame } from "../../system/LoadingFrame";
import { FlexList } from "../../universal/FlexList";
import { FlexListItem } from "../../universal/FlexListItem";
import { FlexListTitleSubtitle } from "../../universal/FlexListTitleSubtitle";
import { FloatChip } from "../../universal/FloatChip";
import { AdminListEditHeader } from "../AdminListEditHeader";
import { AdminSubpageHeader } from "../AdminSubpageHeader";

// deprecated
export const AdminCourseListSubpage = () => {

    const [searchText] = React.useState("");

    // http
    const { courses, coursesStatus, coursesError, refetchCoursesAsync } = useAdminCourseList(searchText);
    const { createCourseAsync, createCourseState } = useCreateCourse();
    const { deleteCourseAsync, deleteCourseState } = useDeleteCourse();

    const administrationRoutes = applicationRoutes.administrationRoute;

    const { navigate } = useNavigation();
    const showError = useShowErrorDialog();
    const warnDialogLogic = useEpistoDialogLogic();

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

    const handleDeleteCourseAsync = async (courseId: number) => {

        warnDialogLogic
            .openDialog({
                title: "Biztosan törlöd a kurzust?",
                description: "Az összes benne található adat el fog veszni!",
                buttons: [
                    {
                        title: "Törlöm a kurzust",
                        action: async () => {
                            try {

                                await deleteCourseAsync({ id: courseId });

                                showNotification("Kurzus sikeresen törölve!");

                                await refetchCoursesAsync();
                            }
                            catch (e) {

                                showError(e);
                            }
                        }
                    }
                ]
            })
    }

    const handleCreateCourseAsync = async () => {

        try {

            await createCourseAsync({
                title: "Uj kurzus"
            });

            showNotification("Uj kurzus sikeresen letrehozva!");

            await refetchCoursesAsync();
        }
        catch (e) {

            showError(e);
        }
    }

    const singleSelectedCourse = courses.filter(x => x.courseId === selectedCourseIds[0])[0];

    const bulkEditButtons = [
        {
            name: "editButton",
            text: "Adatok",
            onClick: () => navigate(administrationRoutes.coursesRoute.courseDetailsRoute.route, { courseId: singleSelectedCourse.courseId })
        },
        {
            name: "editButton",
            text: "Tartalom",
            onClick: () => navigate(administrationRoutes.coursesRoute.courseContentRoute.route, { courseId: singleSelectedCourse.courseId })
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

    return <LoadingFrame
        loadingState={[coursesStatus, createCourseState, deleteCourseState]}
        error={coursesError}
        className="whall">

        <EpistoDialog logic={warnDialogLogic} />

        {/* admin header */}
        <AdminSubpageHeader direction="column">
            <AdminListEditHeader
                headerButtons={bulkEditButtons}
                isAllSelected={isAllCoursesSelected}
                selectAllOrNone={selectAllOrNone}
                selectedIds={selectedCourseIds}
                itemLabel="kurzus" />

            {/* List of courses */}
            <FlexList flex={1} pb="300px" mt="5px" className="roundBorders" background="var(--transparentWhite70)">
                {courses
                    .map(course => {

                        const chips = [] as { name: string, icon: ReactNode }[];

                        chips.push(
                            {
                                name: course.category.name + " / " + course.subCategory.name,
                                icon: <CategoryIcon />
                            });

                        chips.push(
                            {
                                name: course.teacher.name,
                                icon: <EmojiPeopleIcon />
                            });

                        chips.push(
                            {
                                name: course.examCount + "",
                                icon: <AssignmentIcon />
                            })

                        chips.push(
                            {
                                name: course.videosCount + "",
                                icon: <VideocamIcon />
                            })

                        return <FlexListItem
                            align="center"
                            height={100}
                            mb="1"
                            thumbnailContent={
                                <Image
                                    src={course.thumbnailImageURL}
                                    objectFit="cover"
                                    style={{
                                        height: 100,
                                        width: 180,
                                        padding: "10px"
                                    }}
                                />
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
                            endContent={<Flex align="center" justifyContent={"flex-end"} height="100%" width={165} px={10}>
                                <EpistoButton
                                    variant={"colored"}
                                    onClick={() => {
                                        navigate(administrationRoutes.coursesRoute.courseDetailsRoute.route, { courseId: course.courseId })
                                    }}
                                    style={{ width: 20 }}>
                                    <ShortText style={{ width: "20px", height: "20px" }} />
                                </EpistoButton>

                                <EpistoButton
                                    variant={"colored"}
                                    onClick={() => {
                                        navigate(administrationRoutes.coursesRoute.courseContentRoute.route, { courseId: course.courseId })
                                    }}
                                    style={{ width: 20, marginLeft: 5 }}>
                                    <ViewList style={{ width: "20px", height: "20px" }} />
                                </EpistoButton>

                                <EpistoButton
                                    variant="colored"
                                    onClick={() => {
                                        navigate(administrationRoutes.coursesRoute.statisticsCourseRoute.route, { courseId: course.courseId })
                                    }}
                                    style={{ width: 20, marginLeft: 5 }} >
                                    <Equalizer style={{ width: "20px", height: "20px" }} />
                                </EpistoButton>

                                <EpistoButton
                                    variant="colored"
                                    onClick={() => handleDeleteCourseAsync(course.courseId)}
                                    style={{ width: 20, marginLeft: 5 }}>
                                    <DeleteIcon style={{ width: "20px", height: "20px" }}></DeleteIcon>
                                </EpistoButton>
                            </Flex>}
                        />
                    })}
            </FlexList>

            <FloatAddButton onClick={handleCreateCourseAsync} />
        </AdminSubpageHeader>
    </LoadingFrame>
}
