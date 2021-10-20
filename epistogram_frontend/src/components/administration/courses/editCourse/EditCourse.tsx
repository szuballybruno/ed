import { Flex } from "@chakra-ui/react";
import { Checkbox, Divider, List, ListItem, Radio, Switch, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { HexColorPicker } from "react-colorful";
import { useParams } from "react-router";
import { getEventFileCallback, getEventValueCallback, useCreateObjectURL } from "../../../../frontendHelpers";
import { AdminPageEditCourseDTO, EditListItemDTO } from "../../../../models/shared_models/AdminPageEditCourseDTO";
import { CourseItemDTO } from "../../../../models/shared_models/CourseItemDTO";
import { useAdminEditedCourse } from "../../../../services/courseService";
import { httpPostAsync } from "../../../../services/httpClient";
import SelectImage from "../../../selectImage/SelectImage";
import EditItem from "../../../universal/editItem/EditItem";
import { AdminSubpageHeader } from "../../AdminSubpageHeader";
import AdminDashboardHeader from "../adminDashboardHeader/AdminDashboardHeader";
import { AdministrationListItem } from "../adminDashboardSearchItem/AdministrationListItem";
import { SaveBar } from "../saveBar/SaveBar";
import { AdminDashboardSearch } from "../searchBar/AdminDashboardSearch";
import { SelectMultiple } from "../selectMultiple/SelectMultiple";
import classes from "./editCourse.module.scss";
import {applicationRoutes} from "../../../../configuration/applicationRoutes";
import {EditUserControl} from "../../EditUserControl";

/* TODO:
*   - Create a new CourseItemDTO for this page
*   - Make the order state editable -> If the orderIndex is not equal with the sent array index
*
*/

export const TextOrInput = (props: { isEditable?: boolean, value: string }) => {
    return props.isEditable ? <TextField value={props.value} /> : <Typography>{props.value}</Typography>
}

// const updateEditPage = (data?: AdminPageEditCourseDTO) => {
//     console.log("Data is updated on the server")

//     console.log("This is the data: " + JSON.stringify(data))
//     //Send data in post request here
// }

export const EditCourse = () => {
    console.log("EditCourse loaded")
    const [showSecondColorPicker, setShowSecondColorPicker] = useState(false)

    const { courseId } = useParams<{ courseId: string }>();

    const [isAllowEditOnPage, setIsAllowEditOnPage] = useState(false)

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [courseGroup, setCourseGroup] = useState("")
    const [permissionLevel, setPermissionLevel] = useState("")
    const [thumbnailImage, setThumbnailImage] = useState("")
    const [thumbnailURL, setThumbnailURL] = useState("")
    const [colorOne, setColorOne] = useState("")
    const [colorTwo, setColorTwo] = useState("")
    const [courseItems, setCourseItems] = useState<CourseItemDTO[]>([])
    const [organizations, setOrganizations] = useState<EditListItemDTO[]>([])
    const [groups, setGroups] = useState<EditListItemDTO[]>([])
    const [tags, setTags] = useState<EditListItemDTO[]>([])
    const [teachers, setTeachers] = useState<EditListItemDTO[]>([])
    const { course } = useAdminEditedCourse(Number(courseId));

    useCreateObjectURL(thumbnailImage, setThumbnailURL)

    const setEditCourseState = (course: AdminPageEditCourseDTO) => {
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
        } = course

        setTitle(title)
        setCategory(category)
        setCourseGroup(courseGroup)
        setPermissionLevel(permissionLevel)
        setThumbnailURL(thumbnailURL)
        setColorOne(colorOne)
        setColorTwo(colorTwo)
        setCourseItems(courseItems)
        setOrganizations(organizations)
        setTags(tags)
        setTeachers(teachers)
        setGroups(groups)
    }

    const getAdminPageEditCourseDTO = () => {
        return {
            courseId: course?.courseId,
            title: title,
            category: category,
            courseGroup: courseGroup,
            permissionLevel: permissionLevel,
            thumbnailURL: thumbnailURL,
            colorOne: colorOne,
            colorTwo: colorTwo,
            courseItems: course?.courseItems,
            organizations: organizations,
            tags: tags,
            teachers: teachers,
            groups: groups
        } as AdminPageEditCourseDTO
    }
    const updateAdminPageEditCourse = (course: AdminPageEditCourseDTO) => {
        return httpPostAsync("set-admin-edit-course", course)
    }

    useEffect(() => {
        !!course && setEditCourseState(course)
    }, [course])

    const handleOnDragEnd = (dragParams) => {
        const items = Array.from(courseItems)
        const [reorderedItem] = items.splice(dragParams.source.index, 1)
        items.splice(dragParams.destination.index, 0, reorderedItem)

        setCourseItems(items)
    }

    const DraggableListItemWrapper = ({ ...props }) => <Draggable
        key={props.key}
        draggableId={props.draggableId}
        index={props.index}>
        {(provided) => (
            <li className={classes.draggableListItem}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}>
                {props.children}
            </li>
        )}
    </Draggable>

    return <Flex flex="1" direction="column" bgColor="white" maxW={"100%"}>

        {/* admin header */}
        <AdminSubpageHeader tabMenuItems={[
            applicationRoutes.administrationRoute.coursesRoute.editCourseRoute,
            /*applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute,*/
        ]}>
            {/*<EditUserControl
                editDTO={userEditData}
                saveUserAsync={handleSaveUserAsync}></EditUserControl>*/}
        </AdminSubpageHeader>


        <div className={classes.editDataOuterWrapper}>

            <div className={classes.editDataInnerWrapper}>
                <div className={classes.editDataLeftWrapper}>

                    <div className={classes.editDataListWrapper}>
                        <SelectImage onChange={getEventFileCallback(setThumbnailImage)}
                            uploadedImageUrls={[thumbnailURL]}
                            title={"Borítókép"} />
                        <Typography variant={"overline"}>Alapadatok</Typography>
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            className={classes.tagList}
                        >
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
                        </List>
                    </div>
                </div>




                <Divider orientation={"vertical"} />





                <div className={classes.editDataRightWrapper}>
                    <SelectMultiple
                        items={course?.organizations}
                        title={"Cég kiválasztása"}
                    >
                        {course?.organizations?.map((item, index) =>
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
                    <SelectMultiple
                        items={groups}
                        title={"Csoport kiválasztása"}
                    >
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
                    <SelectMultiple
                        items={teachers}
                        title={"Tanár kiválasztása"}
                    >
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
                    <SelectMultiple
                        items={tags}
                        title={"Tagek kiválasztása"}
                    >
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

                </div>
            </div>

        </div>

        <Divider style={{
            width: "100%"
        }} />

        <Flex
            direction={"column"}
            px={10}>
            <AdminDashboardSearch searchChangeHandler={() => { }} name={"searchData"} title={"A kurzus tartalma"} />
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId={"courseItems"}>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {courseItems.map((item, index) => <DraggableListItemWrapper key={item.title} draggableId={item.title} index={index}>
                                <AdministrationListItem
                                    key={"adlistitem" + index}
                                    title={item.title}
                                    thumbnailUrl={item.thumbnailUrl}
                                    chips={[]/*[
                                            getChipWithLabel("a" + index, "item.type", "category"),
                                            getChipWithLabel("b" + index, "item.length", "person"),
                                            getChipWithLabel("c" + index, "item.isEssential", "video")
                                        ]*/}
                                    searchItemButtons={[]}
                                />
                            </DraggableListItemWrapper>
                            )}{provided.placeholder}
                        </div>

                    )}
                </Droppable>

            </DragDropContext>
        </Flex>

        <AdminDashboardHeader titleText={""} />

        <SaveBar open={isAllowEditOnPage} onClick={() => setIsAllowEditOnPage(p => !p)} onDoneClick={() => {
            setIsAllowEditOnPage(p => !p)
            return updateAdminPageEditCourse(getAdminPageEditCourseDTO())
        }} />

    </Flex>
};
