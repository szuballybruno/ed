import { Box, Flex, Image } from "@chakra-ui/react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Checkbox, Divider, ListItem, Radio, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { getEventValueCallback } from "../../../frontendHelpers";
import { AdminPageEditCourseDTO, EditListItemDTO } from "../../../models/shared_models/AdminPageEditCourseDTO";
import { CourseItemDTO } from "../../../models/shared_models/CourseItemDTO";
import { useAdminEditedCourse } from "../../../services/courseService";
import { useNavigation } from "../../../services/navigatior";
import { showNotification, useShowErrorDialog } from "../../../services/notifications";
import { useCreateVideo, useDeleteVideo } from "../../../services/videoService";
import { DragAndDropList } from "../../universal/DragAndDropList";
import EditItem from "../../universal/editItem/EditItem";
import { EpistoButton } from "../../universal/EpistoButton";
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
    saveCourseAsync: (dto: AdminPageEditCourseDTO) => Promise<void>
}) => {

    const { saveCourseAsync } = props;
    const params = useParams<{ courseId: string }>();
    const courseId = parseInt(params.courseId);
    const [isAllowEditOnPage, setIsAllowEditOnPage] = useState(false);
    const { navigate } = useNavigation();
    const courseRoutes = applicationRoutes.administrationRoute.coursesRoute;

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [courseGroup, setCourseGroup] = useState("")
    const [permissionLevel, setPermissionLevel] = useState("")
    const [thumbnailSrc, setThumbnailSrc] = useState("")
    const [colorOne, setColorOne] = useState("")
    const [colorTwo, setColorTwo] = useState("")
    const [courseItems, setCourseItems] = useState<CourseItemDTO[]>([])
    const [organizations, setOrganizations] = useState<EditListItemDTO[]>([])
    const [groups, setGroups] = useState<EditListItemDTO[]>([])
    const [tags, setTags] = useState<EditListItemDTO[]>([])
    const [teachers, setTeachers] = useState<EditListItemDTO[]>([])

    // http
    const { courseEditData } = useAdminEditedCourse(courseId);
    const { createVideoAsync, createVideoState, createVideoResult } = useCreateVideo();
    const { deleteVideoAsync, deleteVideoState } = useDeleteVideo();

    const showError = useShowErrorDialog();

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
            colorOne: colorOne,
            colorTwo: colorTwo,
            courseItems: courseItems,
            organizations: organizations,
            tags: tags,
            teachers: teachers,
            groups: groups
        } as AdminPageEditCourseDTO;

        setIsAllowEditOnPage(p => !p)
        return saveCourseAsync(dto);
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
            colorOne,
            colorTwo,
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
        setColorOne(colorOne)
        setColorTwo(colorTwo)
        setCourseItems(courseItems)
        setOrganizations(organizations)
        setTags(tags)
        setTeachers(teachers)
        setGroups(groups)
    }, [courseEditData]);

    const [thumbnailImageFile, setThumbnailImageFile] = useState<File | null>(null);

    const setBrowsedImage = (src: string, file: File) => {

        setThumbnailSrc(src);
        setThumbnailImageFile(file);
    }

    const handleEditCourseItem = (courseItem: CourseItemDTO) => {

        if (courseItem.type === "exam") {

            navToExamEdit(courseItem.id);
        }
        else {

            navToVideoEdit(courseItem.id);
        }
    }

    const handleAddNewVideoAsync = async () => {

        try {

            const idResult = await createVideoAsync(courseId);

            showNotification("Uj video sikeresen hozzaadva!");

            navToVideoEdit(idResult.id);
        } catch (e) {

            showError(e);
        }
    }

    const handleDeleteCourseItemAsync = async (courseItem: CourseItemDTO) => {

        try {

            if (courseItem.type === "exam") {

                // await deleteVideoAsync(videoId);
                // showNotification("Video sikeresen torolve!");
            }
            else {

                await deleteVideoAsync(courseItem.id);
                showNotification("Video sikeresen torolve!");
            }

            setCourseItems(courseItems.filter(x => x.descriptorCode !== courseItem.descriptorCode));
        }
        catch (e) {

            showError(e);
        }
    }

    const handleAddNewExam = () => {


    }

    return <Flex direction="column">

        {/* admin header */}
        <AdminSubpageHeader
            tabMenuItems={[
                applicationRoutes.administrationRoute.coursesRoute.editCourseRoute,
                applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute
            ]}>
        </AdminSubpageHeader>

        {/* content columns */}
        <Flex>

            {/* settings */}
            <Box p="20px" flex="1" className="dividerBorderRight">

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
                    <Flex direction="column">

                        <EditItem
                            isEditing={isAllowEditOnPage}
                            value={title}
                            title={"Név"}
                            onChange={getEventValueCallback(setTitle)}
                            name={"name"} />

                        <EditItem
                            isEditing={isAllowEditOnPage}
                            value={category}
                            title={"Kategória"}
                            onChange={getEventValueCallback(setCategory)}
                            name={"category"} />

                        <EditItem
                            isEditing={isAllowEditOnPage}
                            value={courseGroup}
                            title={"Kategória csoport"}
                            onChange={getEventValueCallback(setCourseGroup)}
                            name={"courseGroup"} />

                        <EditItem
                            isEditing={isAllowEditOnPage}
                            value={permissionLevel}
                            title={"Elérés"}
                            onChange={getEventValueCallback(setPermissionLevel)}
                            name={"permissionLevel"} />
                    </Flex>
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
                    setList={setCourseItems}
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
                    onClick={() => handleAddNewVideoAsync()}
                    style={{ alignSelf: "center" }}
                    variant="outlined">
                    Add new video
                </EpistoButton>

                <EpistoButton
                    onClick={() => handleAddNewExam()}
                    style={{ alignSelf: "center" }}
                    variant="outlined">
                    Add new exam
                </EpistoButton>
            </Flex>
        </Flex>
    </Flex>
};