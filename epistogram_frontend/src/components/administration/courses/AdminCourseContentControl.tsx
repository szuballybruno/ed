import { Flex } from "@chakra-ui/react";
import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VideocamIcon from '@mui/icons-material/Videocam';
import { TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { CourseAdminItemShortDTO } from "../../../models/shared_models/CourseAdminItemShortDTO";
import { CourseEditDataDTO } from "../../../models/shared_models/CourseEditDataDTO";
import { ModuleAdminShortDTO } from "../../../models/shared_models/ModuleAdminShortDTO";
import { UserDTO } from "../../../models/shared_models/UserDTO";
import { useCreateExam, useDeleteExam } from "../../../services/api/examApiService";
import { useCreateModule, useDeleteModule } from "../../../services/api/moduleApiService";
import { useCreateVideo, useDeleteVideo } from "../../../services/api/videoApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications";
import { insertAtIndex, isNullOrUndefined, swapItems } from "../../../static/frontendHelpers";
import { EpistoDialog, useEpistoDialogLogic } from "../../EpistoDialog";
import { EpistoHeader } from "../../EpistoHeader";
import { CollapseItem } from "../../universal/CollapseItem";
import { DragAndDropContext, DragItem, DropZone } from "../../universal/DragAndDrop";
import { EpistoButton } from "../../universal/EpistoButton";
import { EpistoSearch } from "../../universal/EpistoSearch";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { CourseEditItemView } from "./CourseEditItemView";

export const TextOrInput = (props: { isEditable?: boolean, value: string }) => {
    return props.isEditable ? <TextField value={props.value} /> : <Typography>{props.value}</Typography>
}

export const AdminCourseContentControl = (props: {
    saveCourseAsync: (dto: CourseEditDataDTO, thumbnailFile: null | File) => Promise<void>,
    refetchCourseDataAsync: () => Promise<void>,
    courseEditData: CourseEditDataDTO | null,
    courseId: number
}) => {

    const { saveCourseAsync, courseId, courseEditData, refetchCourseDataAsync } = props;

    const { navigate } = useNavigation();
    const courseRoutes = applicationRoutes.administrationRoute.coursesRoute;

    const [modules, setModules] = useState<ModuleAdminShortDTO[]>([])

    const [thumbnailImageFile, setThumbnailImageFile] = useState<File | null>(null);

    const [openModuleIds, setOpenModuleIds] = useState<number[]>([]);

    // http
    const { createVideoAsync } = useCreateVideo();
    const { createExamAsync } = useCreateExam();
    const { deleteVideoAsync } = useDeleteVideo();
    const { deleteExamAsync } = useDeleteExam();
    const { createModuleAsync } = useCreateModule();
    const { deleteModuleAsync } = useDeleteModule();

    const showError = useShowErrorDialog();
    const isAllowEditOnPage = false;
    const deleteWarningDialogLogic = useEpistoDialogLogic();

    const navToVideoEdit = (videoId: number) => navigate(courseRoutes.editVideoRoute.route, { courseId, videoId });
    const navToExamEdit = (examId: number) => navigate(courseRoutes.editExamRoute.route, { courseId, examId });

    // set default values
    useEffect(() => {

        if (!courseEditData)
            return;

        setModules(courseEditData.modules);

    }, [courseEditData]);

    const setModuleOpenState = (isOpen: boolean, moduleId: number) => {

        if (isOpen) {

            setOpenModuleIds([...openModuleIds, moduleId]);
        }
        else {

            setOpenModuleIds(openModuleIds.filter(x => x !== moduleId));
        }
    }

    const handleSaveCourseAsync = async () => {

        if (!courseEditData)
            return;

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
            title: courseEditData.title,
            thumbnailURL: courseEditData.thumbnailURL,
            modules: orderedModules,

            teacher: {
                id: 1,
            } as UserDTO,

            category: courseEditData.category,
            subCategory: courseEditData.subCategory
        } as CourseEditDataDTO;


        return saveCourseAsync(dto, thumbnailImageFile);
    }


    const handleEditCourseItem = (courseItem: CourseAdminItemShortDTO) => {

        if (courseItem.type === "exam") {

            navToExamEdit(courseItem.id);
        }
        else {

            navToVideoEdit(courseItem.id);
        }
    }

    const handleAddCourseItemAsync = async (moduleId: number, type: "video" | "exam") => {

        await handleSaveCourseAsync();

        try {

            if (type === "video") {

                const idResult = await createVideoAsync(moduleId)
                showNotification("Új videó sikeresen hozzáadva!");
                navToVideoEdit(idResult.id);
            }
            else {

                const idResult = await createExamAsync(moduleId);
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

    const handleDeleteModule = async (module: ModuleAdminShortDTO) => {
        deleteWarningDialogLogic
            .openDialog({
                title: "Biztosan törlöd a modult?",
                description: "A benne lévő összes videó, és vizsga el fog veszni.",
                buttons: [
                    {
                        title: "Modul törlése",
                        action: async () => {

                            try {

                                await deleteModuleAsync(module.id);
                                showNotification("Modul sikeresen törölve!");
                                setModules(modules.filter(x => x.id !== module.id));
                            }
                            catch (e) {

                                showError(e);
                            }
                        }
                    }
                ]
            });
    }

    const handleEditModule = async (module: ModuleAdminShortDTO) => {

        await handleSaveCourseAsync();
        navigate(applicationRoutes.administrationRoute.coursesRoute.editModuleRoute.route, { courseId, moduleId: module.id });
    }

    const handleAddNewModuleAsync = async () => {

        try {

            await createModuleAsync({
                courseId: courseId,
                name: "Uj modul",
                orderIndex: modules.length
            });

            showNotification("Modul sikeresen hozzaadva!");
            await refetchCourseDataAsync();
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
            applicationRoutes.administrationRoute.coursesRoute.courseDetailsRoute,
            applicationRoutes.administrationRoute.coursesRoute.courseContentRoute,
            applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute
        ]}
        onSave={handleSaveCourseAsync}
        direction="column"
    >

        <EpistoDialog logic={deleteWarningDialogLogic} />



        {/* course items */}
        <Flex
            flex="1"
            direction={"column"}
            px={10}>



            <Flex w={"100%"}>
                <EpistoSearch flex={1} my={10} />
                <EpistoButton
                    onClick={handleAddNewModuleAsync}
                    style={{ alignSelf: "center", marginLeft: 20 }}
                    variant="outlined">
                    Új modul hozzáadása
                </EpistoButton>
                {openModuleIds.some(x => modules.map(x => x.id).includes(x)) ? <EpistoButton
                    onClick={() => {
                        setOpenModuleIds([])
                    }}
                    style={{ alignSelf: "center", marginLeft: 20 }}
                    variant="outlined">
                    Összes becsukása
                </EpistoButton> : <EpistoButton
                    onClick={() => {
                        setOpenModuleIds(modules.map(x => x.id))
                    }}
                    style={{ alignSelf: "center", marginLeft: 20 }}
                    variant="outlined">
                    Összes kinyitása
                </EpistoButton>}
            </Flex>

            <DragAndDropContext onDragEnd={onDragEnd}>
                <DropZone zoneId="zone-root" groupId="root">
                    {modules
                        .map((module, moduleIndex) => {

                            return <DragItem
                                alignHandle="top"
                                itemId={module.id + ""}
                                index={moduleIndex}>

                                <CollapseItem
                                    handleToggle={(targetIsOpen) => setModuleOpenState(targetIsOpen, module.id)}
                                    isOpen={openModuleIds.some(x => x === module.id)}
                                    style={{ width: "100%" }}
                                    header={(ecButton) => <Flex
                                        p="2px">

                                        {ecButton}

                                        <Flex
                                            width="100%"
                                            align="center"
                                            justify="space-between">

                                            <EpistoHeader
                                                text={module.name}
                                                variant="strongSub"
                                                style={{ marginLeft: "10px" }} />

                                            <Flex>

                                                {/* new video */}
                                                <EpistoButton
                                                    onClick={() => handleAddCourseItemAsync(module.id, "video")}
                                                    style={{ alignSelf: "center", margin: "2px" }}
                                                    padding="2px"
                                                    variant="outlined">
                                                    <Flex>
                                                        <AddIcon />
                                                        <VideocamIcon />
                                                    </Flex>
                                                </EpistoButton>

                                                {/* new exam */}
                                                <EpistoButton
                                                    onClick={() => handleAddCourseItemAsync(module.id, "exam")}
                                                    style={{ alignSelf: "center", margin: "2px" }}
                                                    padding="2px"
                                                    variant="outlined">
                                                    <Flex>
                                                        <AddIcon />
                                                        <AssignmentIcon />
                                                    </Flex>
                                                </EpistoButton>

                                                {/* edit module */}
                                                <EpistoButton
                                                    onClick={() => handleEditModule(module)}>
                                                    <EditIcon />
                                                </EpistoButton>

                                                {/* delete module */}
                                                <EpistoButton
                                                    onClick={() => handleDeleteModule(module)}>
                                                    <DeleteIcon />
                                                </EpistoButton>
                                            </Flex>
                                        </Flex>
                                    </Flex>}>
                                    <DropZone
                                        width="100%"
                                        my="5px"
                                        mt="10px"
                                        zoneId={module.id + ""}
                                        groupId="child">

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
                                                        editCourseItem={handleEditCourseItem}
                                                        isShowDivider={itemIndex + 1 < module.items.length}
                                                    />
                                                </DragItem>

                                            })}
                                    </DropZone>
                                </CollapseItem>
                            </DragItem>
                        })}
                </DropZone>
            </DragAndDropContext>
        </Flex >

    </AdminSubpageHeader >
};
