import { Box, Flex, Image } from "@chakra-ui/react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Checkbox, Divider, ListItem, Radio, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { EditCourseDataDTO, EditListItemDTO } from "../../../models/shared_models/AdminPageEditCourseDTO";
import { CourseItemDTO } from "../../../models/shared_models/CourseItemDTO";
import { useCreateExam, useDeleteExam } from "../../../services/examService";
import { useNavigation } from "../../../services/navigatior";
import { showNotification, useShowErrorDialog } from "../../../services/notifications";
import { useCreateVideo, useDeleteVideo } from "../../../services/videoService";
import { EpistoDialog, useEpistoDialogLogic } from "../../EpistoDialog";
import { DragAndDropList } from "../../universal/DragAndDropList";
import { EpistoButton } from "../../universal/EpistoButton";
import { EpistoEntry } from "../../universal/EpistoEntry";
import { EpistoSearch } from "../../universal/EpistoSearch";
import { SelectImage } from "../../universal/SelectImage";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import classes from "./editCourse/editCourse.module.scss";
import { EditSection } from "./EditSection";
import { SelectMultiple } from "./selectMultiple/SelectMultiple";

export const TextOrInput = (props: { isEditable?: boolean, value: string }) => {
    return props.isEditable ? <TextField value={props.value} /> : <Typography>{props.value}</Typography>
}

export const EditCourseControl = (props: {
    saveCourseAsync: (dto: EditCourseDataDTO, thumbnailFile: null | File) => Promise<void>,
    courseEditData: EditCourseDataDTO | null,
    courseId: number
}) => {

    const { saveCourseAsync, courseId, courseEditData } = props;
    const { navigate } = useNavigation();
    const courseRoutes = applicationRoutes.administrationRoute.coursesRoute;

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [courseGroup, setCourseGroup] = useState("")
    const [permissionLevel, setPermissionLevel] = useState("")
    const [courseItems, setCourseItems] = useState<CourseItemDTO[]>([])
    const [organizations, setOrganizations] = useState<EditListItemDTO[]>([])
    const [groups, setGroups] = useState<EditListItemDTO[]>([])
    const [tags, setTags] = useState<EditListItemDTO[]>([])
    const [teachers, setTeachers] = useState<EditListItemDTO[]>([])
    const [thumbnailSrc, setThumbnailSrc] = useState("")
    const [thumbnailImageFile, setThumbnailImageFile] = useState<File | null>(null);

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
            category: category,
            courseGroup: courseGroup,
            permissionLevel: permissionLevel,
            thumbnailURL: thumbnailSrc,
            courseItems: courseItems,
            organizations: organizations,
            tags: tags,
            teachers: teachers,
            groups: groups
        } as EditCourseDataDTO;

        return saveCourseAsync(dto, thumbnailImageFile);
    }

    // set default values
    useEffect(() => {

        if (!courseEditData)
            return;

        const {
            title,
            category,
            courseGroup,
            permissionLevel,
            thumbnailURL,
            courseItems,
            organizations,
            tags,
            teachers,
            groups
        } = courseEditData;

        setTitle(title)
        setCategory(category)
        setCourseGroup(courseGroup)
        setPermissionLevel(permissionLevel)
        setThumbnailSrc(thumbnailURL)
        setCourseItems(courseItems)
        setOrganizations(organizations)
        setTags(tags)
        setTeachers(teachers)
        setGroups(groups)
    }, [courseEditData]);


    const setBrowsedImage = (src: string, file: File) => {

        setThumbnailSrc(src);
        setThumbnailImageFile(file);
    }

    const handleSetReorderedCourseItems = (courseItems: CourseItemDTO[]) => {

        // set order indexes according to list item order
        courseItems
            .forEach((x, index) => x.orderIndex = index);

        setCourseItems(courseItems);
    }

    const handleEditCourseItem = (courseItem: CourseItemDTO) => {

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

    const handleDeleteCourseItemAsync = async (courseItem: CourseItemDTO) => {

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

                <EpistoEntry
                    value={courseGroup}
                    label="Főkategória"
                    setValue={setCourseGroup} />

                <EpistoEntry
                    value={category}
                    label="Alkategória"
                    setValue={setCategory} />
            </EditSection>

            <EditSection title="">

                {/* organizations */}
                <SelectMultiple
                    items={organizations}
                    title={"Cég kiválasztása"} >
                    {organizations
                        .map((item, index) =>
                            <div key={"org" + index}>
                                <ListItem className={classes.listItem}>
                                    <Checkbox disabled={!isAllowEditOnPage} checked={item.checked} onChange={((e) => {
                                        let items = [...organizations];
                                        items[index] = {
                                            ...items[index],
                                            checked: e.currentTarget.checked
                                        };
                                        setGroups(items);
                                    })} />
                                    <TextOrInput value={item.name} />
                                </ListItem>
                                <Divider style={{ width: "100%" }} />
                            </div>
                        )}

                </SelectMultiple>

                {/* groups */}
                <SelectMultiple
                    items={groups}
                    title={"Csoport kiválasztása"} >
                    {groups?.map((item, index) =>
                        <div key={"group" + index}>
                            <ListItem className={classes.listItem}>
                                <Checkbox disabled={!isAllowEditOnPage} checked={item.checked} onChange={((e) => {
                                    let items = [...groups];
                                    items[index] = {
                                        ...items[index],
                                        checked: e.currentTarget.checked
                                    };
                                    setGroups(items);
                                })} />
                                <TextOrInput value={item.name} />
                            </ListItem>
                            <Divider style={{ width: "100%" }} />
                        </div>
                    )}

                </SelectMultiple>

                {/* teacher */}
                <SelectMultiple
                    items={teachers}
                    title={"Tanár kiválasztása"}>
                    {teachers?.map((item, index) =>
                        <div key={"teacher" + index}>
                            <ListItem className={classes.listItem}>
                                <Radio disabled={!isAllowEditOnPage} checked={item.checked} onChange={((e) => {
                                    let items = [...teachers];
                                    items[index] = {
                                        ...items[index],
                                        checked: e.currentTarget.checked
                                    };
                                    setGroups(items);
                                })} />
                                <TextOrInput isEditable={isAllowEditOnPage} value={item.name} />
                            </ListItem>
                            <Divider style={{ width: "100%" }} />
                        </div>
                    )}

                </SelectMultiple>

                {/* tags */}
                <SelectMultiple
                    items={tags}
                    title={"Tagek kiválasztása"}>
                    {tags?.map((item, index) =>
                        <div key={"tag" + index}>
                            <ListItem className={classes.listItem}>
                                <Checkbox disabled={!isAllowEditOnPage} checked={item.checked} onChange={((e) => {
                                    let items = [...tags];
                                    items[index] = {
                                        ...items[index],
                                        checked: e.currentTarget.checked
                                    };
                                    setGroups(items);
                                })} />
                                <TextOrInput isEditable={isAllowEditOnPage} value={item.name} />
                            </ListItem>
                            <Divider style={{ width: "100%" }} />
                        </div>
                    )}

                </SelectMultiple>
            </EditSection>
        </Box>

        {/* course items */}
        <Flex
            flex="1"
            direction={"column"}
            px={10}>

            <EpistoSearch />

            <DragAndDropList
                list={courseItems}
                setList={handleSetReorderedCourseItems}
                getKey={x => x.descriptorCode}
                renderListItem={(item) => <Flex
                    flex="1"
                    borderLeft={`5px solid var(--${item.type === "exam" ? "intenseOrange" : "deepBlue"})`}
                    p="10px"
                    justify="space-between"
                    m="3px">

                    <Typography alignSelf="center">
                        {item.title}
                    </Typography>

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

    </AdminSubpageHeader>
};
