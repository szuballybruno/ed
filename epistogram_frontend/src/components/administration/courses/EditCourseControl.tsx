import { Box, Flex, Image } from "@chakra-ui/react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { CourseAdminItemShortDTO } from "../../../models/shared_models/CourseAdminItemShortDTO";
import { CourseCategoryDTO } from "../../../models/shared_models/CourseCategoryDTO";
import { CourseEditDataDTO } from "../../../models/shared_models/CourseEditDataDTO";
import { UserDTO } from "../../../models/shared_models/UserDTO";
import { useCreateExam, useDeleteExam } from "../../../services/examService";
import { useNavigation } from "../../../services/navigatior";
import { showNotification, useShowErrorDialog } from "../../../services/notifications";
import { useCreateVideo, useDeleteVideo } from "../../../services/videoService";
import { EpistoDialog, useEpistoDialogLogic } from "../../EpistoDialog";
import { DragAndDropList } from "../../universal/DragAndDropList";
import { EpistoButton } from "../../universal/EpistoButton";
import { EpistoEntry } from "../../universal/EpistoEntry";
import { EpistoSearch } from "../../universal/EpistoSearch";
import { EpistoSelect } from "../../universal/EpistoSelect";
import { SelectImage } from "../../universal/SelectImage";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { EditSection } from "./EditSection";

export const TextOrInput = (props: { isEditable?: boolean, value: string }) => {
    return props.isEditable ? <TextField value={props.value} /> : <Typography>{props.value}</Typography>
}

export const EditCourseControl = (props: {
    saveCourseAsync: (dto: CourseEditDataDTO, thumbnailFile: null | File) => Promise<void>,
    courseEditData: CourseEditDataDTO | null,
    courseId: number
}) => {

    const { saveCourseAsync, courseId, courseEditData } = props;
    const categories = courseEditData?.categories ?? [];
    const { navigate } = useNavigation();
    const courseRoutes = applicationRoutes.administrationRoute.coursesRoute;

    const [title, setTitle] = useState("")
    const [courseItems, setCourseItems] = useState<CourseAdminItemShortDTO[]>([])
    const [thumbnailSrc, setThumbnailSrc] = useState("")
    const [thumbnailImageFile, setThumbnailImageFile] = useState<File | null>(null);
    const [category, setCategory] = useState<CourseCategoryDTO | null>(null);
    const [subCategory, setSubCategory] = useState<CourseCategoryDTO | null>(null);

    // http
    const { createVideoAsync } = useCreateVideo();
    const { createExamAsync } = useCreateExam();
    const { deleteVideoAsync } = useDeleteVideo();
    const { deleteExamAsync } = useDeleteExam();

    const showError = useShowErrorDialog();
    const isAllowEditOnPage = false;
    const deleteWarningDialogLogic = useEpistoDialogLogic();

    const navToVideoEdit = (videoId: number) => navigate(courseRoutes.editVideoRoute.route, { courseId, videoId });
    const navToExamEdit = (examId: number) => navigate(courseRoutes.editExamRoute.route, { courseId, examId });

    const handleSaveCourseAsync = async () => {

        const dto = {
            courseId: courseId,
            title: title,
            thumbnailURL: thumbnailSrc,
            courseItems: courseItems,

            teacher: {
                id: 1,
            } as UserDTO,

            category: {
                id: category?.id!
            },

            subCategory: {
                id: subCategory?.id!
            }
        } as CourseEditDataDTO;

        return saveCourseAsync(dto, thumbnailImageFile);
    }

    // set default values
    useEffect(() => {

        if (!courseEditData)
            return;

        setTitle(courseEditData.title);
        setThumbnailSrc(courseEditData.thumbnailURL);
        setCourseItems(courseEditData.courseItems);

        // set category
        const currentCategory = categories
            .filter(x => x.id === courseEditData.category.id)[0];

        setCategory(currentCategory);

        // set sub category
        setSubCategory(courseEditData.subCategory);
    }, [courseEditData]);


    const setBrowsedImage = (src: string, file: File) => {

        setThumbnailSrc(src);
        setThumbnailImageFile(file);
    }

    const handleSetReorderedCourseItems = (courseItems: CourseAdminItemShortDTO[]) => {

        // set order indexes according to list item order
        courseItems
            .forEach((x, index) => x.orderIndex = index);

        setCourseItems(courseItems);
    }

    const handleEditCourseItem = (courseItem: CourseAdminItemShortDTO) => {

        if (courseItem.type === "exam") {

            navToExamEdit(courseItem.id);
        }
        else {

            navToVideoEdit(courseItem.id);
        }
    }

    const handleAddCourseItemAsync = async (type: "video" | "exam") => {

        try {

            if (type === "video") {

                const idResult = await createVideoAsync(courseId)
                showNotification("Új videó sikeresen hozzáadva!");
                navToVideoEdit(idResult.id);
            }
            else {

                const idResult = await createExamAsync(courseId);
                showNotification("Új vizsga sikeresen hozzáadva!");
                navToExamEdit(idResult.id);
            }
        } catch (e) {

            showError(e);
        }
    }

    const handleDeleteCourseItemAsync = async (courseItem: CourseAdminItemShortDTO) => {

        // exam
        if (courseItem.type === "exam") {

            deleteWarningDialogLogic
                .openDialog({
                    title: "Biztosan törlöd a vizsgát?",
                    description: "A benne lévő összes kérdés el fog veszni.",
                    buttons: [
                        {
                            title: "Vizsga törlése",
                            action: async () => {

                                try {

                                    await deleteExamAsync(courseItem.id);
                                    showNotification("Vizsga sikeresen törölve!");
                                    setCourseItems(courseItems.filter(x => x.descriptorCode !== courseItem.descriptorCode));
                                }
                                catch (e) {

                                    showError(e);
                                }
                            }
                        }
                    ]
                });
        }

        // video
        else {

            deleteWarningDialogLogic
                .openDialog({
                    title: "Biztosan törlöd a videót?",
                    description: "A feltöltött fájl, és az összes kérdés el fog veszni.",
                    buttons: [
                        {
                            title: "Videó törlése",
                            action: async () => {

                                try {

                                    await deleteVideoAsync(courseItem.id);
                                    showNotification("Videó sikeresen törölve!");
                                    setCourseItems(courseItems.filter(x => x.descriptorCode !== courseItem.descriptorCode));
                                }
                                catch (e) {

                                    showError(e);
                                }
                            }
                        }
                    ]
                });
        }
    }

    return <AdminSubpageHeader
        tabMenuItems={[
            applicationRoutes.administrationRoute.coursesRoute.editCourseRoute,
            applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute
        ]}
        onSave={handleSaveCourseAsync}
        direction="row">

        <EpistoDialog logic={deleteWarningDialogLogic} />

        {/* settings */}
        <Box px="20px" flex="1" className="dividerBorderRight">

            {/* thumbnaul image */}
            <EditSection title="Borítókép">
                <SelectImage
                    width="300px"
                    height="200px"
                    onImageSelected={setBrowsedImage}>
                    <Image className="whall" objectFit="cover" src={thumbnailSrc}></Image>
                </SelectImage>
            </EditSection>

            {/* basic info edit */}
            <EditSection title="Alapadatok">

                <EpistoEntry
                    value={title}
                    label="Név"
                    setValue={setTitle} />

                {/* category */}
                <Typography style={{ color: "gray", marginTop: "10px" }}>
                    Főkategória
                </Typography>
                <EpistoSelect
                    getCompareKey={x => x?.id + ""}
                    getDisplayValue={x => x?.name + ""}
                    items={categories}
                    selectedValue={category}
                    onSelected={setCategory} />

                {/* subcategory */}
                <Typography style={{ color: "gray", marginTop: "10px" }}>
                    Alkategória
                </Typography>
                <EpistoSelect
                    getCompareKey={x => x?.id + ""}
                    getDisplayValue={x => x?.name + ""}
                    items={category?.childCategories ?? []}
                    selectedValue={subCategory}
                    onSelected={setSubCategory} />
            </EditSection>
        </Box>

        {/* course items */}
        <Flex
            flex="1"
            direction={"column"}
            px={10}>

            <EpistoSearch />

            <Flex padding="20px">
                <EpistoButton
                    onClick={() => handleAddCourseItemAsync("video")}
                    style={{ alignSelf: "center" }}
                    variant="outlined">
                    Új videó hozzáadása
                </EpistoButton>

                <EpistoButton
                    onClick={() => handleAddCourseItemAsync("exam")}
                    style={{ alignSelf: "center" }}
                    variant="outlined">
                    Új vizsga hozzáadása
                </EpistoButton>
            </Flex>

            <DragAndDropList
                list={courseItems}
                setList={handleSetReorderedCourseItems}
                getKey={x => x.descriptorCode}
                renderListItem={(item, _, index) => <Flex
                    flex="1"
                    borderLeft={`5px solid var(--${item.type === "exam" ? "intenseOrange" : "deepBlue"})`}
                    p="10px"
                    justify="space-between"
                    m="3px">

                    <Flex flexDirection={"column"} alignItems={"flex-start"}>
                        <Flex>

                            {/* index */}
                            <Typography style={{ marginRight: "10px" }}>
                                {index + 1}
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
                                    fontSize: "0.8em"
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
                            onClick={() => handleEditCourseItem(item)}>
                            <EditIcon></EditIcon>
                        </EpistoButton>
                        <EpistoButton
                            onClick={() => handleDeleteCourseItemAsync(item)}>
                            <DeleteIcon></DeleteIcon>
                        </EpistoButton>
                    </Flex>
                </Flex>} />
        </Flex>

    </AdminSubpageHeader >
};
