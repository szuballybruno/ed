import { Box, Flex, Image } from "@chakra-ui/react";
import { TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { insertAtIndex, isNullOrUndefined, swapItems } from "../../../frontendHelpers";
import { CourseAdminItemShortDTO } from "../../../models/shared_models/CourseAdminItemShortDTO";
import { CourseCategoryDTO } from "../../../models/shared_models/CourseCategoryDTO";
import { CourseEditDataDTO } from "../../../models/shared_models/CourseEditDataDTO";
import { ModuleEditDTO } from "../../../models/shared_models/ModuleEditDTO";
import { useCreateExam, useDeleteExam } from "../../../services/examService";
import { useNavigation } from "../../../services/navigatior";
import { showNotification, useShowErrorDialog } from "../../../services/notifications";
import { useCreateVideo, useDeleteVideo } from "../../../services/videoService";
import { EpistoDialog, useEpistoDialogLogic } from "../../EpistoDialog";
import { EpistoHeader } from "../../EpistoHeader";
import { DragAndDropContext, DragItem, DropZone } from "../../universal/DragAndDrop";
import { DragAndDropList } from "../../universal/DragAndDropList";
import { EpistoButton } from "../../universal/EpistoButton";
import { EpistoEntry } from "../../universal/EpistoEntry";
import { EpistoSearch } from "../../universal/EpistoSearch";
import { EpistoSelect } from "../../universal/EpistoSelect";
import { SelectImage } from "../../universal/SelectImage";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { CourseEditItemView } from "./CourseEditItemView";
import { EditSection } from "./EditSection";
import DeleteIcon from '@mui/icons-material/Delete';
import { ModuleDTO } from "../../../models/shared_models/ModuleDTO";
import { UserDTO } from "../../../models/shared_models/UserDTO";
import { useCreateModule } from "../../../services/courseService";

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
    const [modules, setModules] = useState<ModuleEditDTO[]>([])
    const [thumbnailSrc, setThumbnailSrc] = useState("")
    const [thumbnailImageFile, setThumbnailImageFile] = useState<File | null>(null);
    const [category, setCategory] = useState<CourseCategoryDTO | null>(null);
    const [subCategory, setSubCategory] = useState<CourseCategoryDTO | null>(null);

    // http
    const { createVideoAsync } = useCreateVideo();
    const { createExamAsync } = useCreateExam();
    const { deleteVideoAsync } = useDeleteVideo();
    const { deleteExamAsync } = useDeleteExam();
    const { createModuleAsync } = useCreateModule();

    const showError = useShowErrorDialog();
    const isAllowEditOnPage = false;
    const deleteWarningDialogLogic = useEpistoDialogLogic();

    const navToVideoEdit = (videoId: number) => navigate(courseRoutes.editVideoRoute.route, { courseId, videoId });
    const navToExamEdit = (examId: number) => navigate(courseRoutes.editExamRoute.route, { courseId, examId });

    // set default values
    useEffect(() => {

        if (!courseEditData)
            return;

        setTitle(courseEditData.title);
        setThumbnailSrc(courseEditData.thumbnailURL);
        setModules(courseEditData.modules);

        // set category
        const currentCategory = categories
            .filter(x => x.id === courseEditData.category.id)[0];

        setCategory(currentCategory);

        // set sub category
        setSubCategory(courseEditData.subCategory);
    }, [courseEditData]);

    const handleSaveCourseAsync = async () => {

        const orderedModules = [...modules];

        // set order indices & module ids
        orderedModules
            .forEach((m, mIndex) => {

                m.orderIndex = mIndex;

                m.items
                    .forEach((i, iIndex) => {

                        i.moduleId = m.id;
                        i.orderIndex = iIndex;
                    });
            });

        const dto = {
            courseId: courseId,
            title: title,
            thumbnailURL: thumbnailSrc,
            modules: orderedModules,

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

    const setBrowsedImage = (src: string, file: File) => {

        setThumbnailSrc(src);
        setThumbnailImageFile(file);
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

    const removeCourseItem = (code: string) => {

        setModules([...modules]
            .map(x => {
                x.items = x.items
                    .filter(y => y.descriptorCode !== code)
                return x;
            }));
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
                                    removeCourseItem(courseItem.descriptorCode);
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
                                    removeCourseItem(courseItem.descriptorCode);
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

    const handleDeleteModule = async (module: ModuleEditDTO) => {


    }

    const handleAddNewModuleAsync = async () => {

        try {

            await createModuleAsync({
                courseId: courseId,
                name: "Uj modul",
                orderIndex: modules.length
            });
        }
        catch (e) {

            showError(e);
        }
    }

    const onDragEnd = (srcId: string, destId: string | null, srcIndex: number, destIndex: number | null) => {

        console.log(`${srcId} - ${destId} - Src:${srcIndex} - Dest:${destIndex}`);

        if (isNullOrUndefined(destId) || isNullOrUndefined(destIndex))
            return;

        const newModules = [...modules];

        if (destId === "zone-root") {

            setModules(swapItems(newModules, srcIndex, destIndex!));
        }
        else {

            if (destId === srcId) {

                const module = newModules
                    .filter(x => x.id + "" === destId)[0];

                module.items = swapItems(module.items, srcIndex, destIndex!);

                setModules(newModules);
            }
            else {

                const srcModule = newModules
                    .filter(x => x.id + "" === srcId)[0];

                const destModule = newModules
                    .filter(x => x.id + "" === destId)[0];

                insertAtIndex(destModule.items, destIndex!, srcModule.items[srcIndex]);

                srcModule.items = srcModule.items
                    .filter((x, index) => index !== srcIndex);

                setModules(newModules);
            }
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

                <EpistoButton
                    onClick={handleAddNewModuleAsync}
                    style={{ alignSelf: "center" }}
                    variant="outlined">
                    Új modul hozzáadása
                </EpistoButton>
            </Flex>

            <DragAndDropContext onDragEnd={onDragEnd}>
                <DropZone zoneId="zone-root" groupId="root">
                    {modules
                        .map((module, moduleIndex) => {

                            return <DragItem itemId={module.id + ""} index={moduleIndex}>
                                <DropZone
                                    width="100%"
                                    my="5px"
                                    mt="10px"
                                    zoneId={module.id + ""}
                                    groupId="child">

                                    <Flex align="center" justify="space-between">
                                        <EpistoHeader
                                            text={module.name}
                                            variant="strongSub"
                                            style={{ marginLeft: "10px" }} />

                                        <EpistoButton
                                            onClick={() => handleDeleteModule(module)}>
                                            <DeleteIcon></DeleteIcon>
                                        </EpistoButton>
                                    </Flex>

                                    {module
                                        .items
                                        .map((item, itemIndex) => {

                                            // const index = parseInt(`${moduleIndex + 1}${itemIndex}`);

                                            return <DragItem
                                                itemId={item.descriptorCode}
                                                index={itemIndex}>

                                                <CourseEditItemView
                                                    moduleIndex={moduleIndex}
                                                    index={itemIndex}
                                                    item={item}
                                                    deleteCourseItem={handleDeleteCourseItemAsync}
                                                    editCourseItem={handleEditCourseItem} />
                                            </DragItem>
                                        })}
                                </DropZone>
                            </DragItem>
                        })}
                </DropZone>
            </DragAndDropContext>
        </Flex>

    </AdminSubpageHeader>
};
