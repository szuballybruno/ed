import React, {useEffect, useState} from 'react';
import classes from "./editCourse.module.scss"
import {Checkbox, Divider, List, ListItem, Radio, Switch, TextField, Typography} from "@material-ui/core";
import EditItem from "../../../universal/atomic/editItem/EditItem";
import { useParams } from "react-router";
import AdminDashboardHeader from "../../universal/adminDashboardHeader/AdminDashboardHeader";
import { AdminDashboardSearch } from "../../universal/searchBar/AdminDashboardSearch";
import { HexColorPicker } from "react-colorful";
import SelectImage from "../../universal/selectImage/SelectImage";
import { AdminDashboardWrapper } from "../../universal/adminDashboardWrapper/AdminDashboardWrapper";
import { SaveBar } from "../../universal/saveBar/SaveBar";
import { getEventFileCallback, getEventValueCallback, useCreateObjectURL } from "../../../../frontendHelpers";
import { useAdminEditedCourse, useUserCourses } from "../../../../services/courseService";
import { AdministrationListItem } from "../../universal/adminDashboardSearchItem/AdministrationListItem";
import { getChipWithLabel } from "../courseList/CourseList";
import {SelectMultiple} from "../../universal/selectMultiple/SelectMultiple";
import {AdminPageEditCourseDTO, EditListItemDTO} from "../../../../models/shared_models/AdminPageEditCourseDTO";
import {httpPostAsync} from "../../../../services/httpClient";

/* TODO:
*   - onClick for save changes button
*   - editCourseDTO
*   - fetch all the necessary data
*/

export const TextOrInput = (props: {isEditable: boolean, value: string}) => {
    return props.isEditable ? <TextField value={props.value} /> : <Typography>{props.value}</Typography>
}

const updateEditPage = (data?: AdminPageEditCourseDTO) => {
    console.log("Data is updated on the server")

    console.log("This is the data: " + JSON.stringify(data))
    //Send data in post request here
}

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
    const [organizations, setOrganizations] = useState<EditListItemDTO[]>([])
    const [groups, setGroups] = useState<EditListItemDTO[]>([])
    const [tags, setTags] = useState<EditListItemDTO[]>([])
    const [teachers, setTeachers] = useState<EditListItemDTO[]>([])



    const { course, status, error } = useAdminEditedCourse(Number(courseId));

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

    return <AdminDashboardWrapper>
        <Divider style={{
            width: "100%"
        }} />
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
                    <div className={classes.editTagsWrapper}>
                        <SelectMultiple
                            items={course?.organizations}
                            title={"Cég kiválasztása"}
                        >
                            {course?.organizations?.map((item, index) =>
                                <div key={"org" + index}>
                                    <ListItem className={classes.listItem}>
                                        <Checkbox checked={item.checked} />
                                        <TextOrInput isEditable={isAllowEditOnPage} value={item.name} />
                                    </ListItem>
                                    <Divider style={{width: "100%"}} />
                                </div>
                            )}

                        </SelectMultiple>
                    </div>

                    <div className={classes.editTagsWrapper}>
                        <SelectMultiple
                            items={teachers}
                            title={"Tanár kiválasztása"}
                        >
                            {teachers?.map((item, index) =>
                                <div key={"teacher" + index}>
                                    <ListItem className={classes.listItem}>
                                        <Radio checked={item.checked} />
                                        <TextOrInput isEditable={isAllowEditOnPage} value={item.name} />
                                    </ListItem>
                                    <Divider style={{width: "100%"}} />
                                </div>
                            )}

                        </SelectMultiple>
                    </div>
                    <div className={classes.editTagsWrapper}>
                        <SelectMultiple
                            items={tags}
                            title={"Tagek kiválasztása"}
                        >
                            {tags?.map((item, index) =>
                                <div key={"tag" + index}>
                                    <ListItem className={classes.listItem}>
                                        <Checkbox checked={item.checked} />
                                        <TextOrInput isEditable={isAllowEditOnPage} value={item.name} />
                                    </ListItem>
                                    <Divider style={{width: "100%"}} />
                                </div>
                            )}

                        </SelectMultiple>
                    </div>
                    <div className={classes.editTagsWrapper}>
                        <SelectMultiple
                            items={groups}
                            title={"Csoport kiválasztása"}
                        >
                            {groups?.map((item, index) =>
                                <div key={"group" + index}>
                                    <ListItem className={classes.listItem}>
                                        <Checkbox checked={item.checked} />
                                        <TextOrInput isEditable={isAllowEditOnPage} value={item.name} />
                                    </ListItem>
                                    <Divider style={{width: "100%"}} />
                                </div>
                            )}

                        </SelectMultiple>
                    </div>
                </div>
                <Divider orientation={"vertical"} />
                <div className={classes.editDataRightWrapper}>
                    <div className={classes.tagWrapper}>
                        <Typography variant={"overline"} className={classes.colorPickerTitle}>Elsődleges szín</Typography>
                        <div className={classes.colorPickerWrapper}>
                            <HexColorPicker style={{ width: "100%" }} color={colorOne} onChange={(color) => {
                                !showSecondColorPicker && setColorTwo(color)
                                setColorOne(color)
                            }} />
                        </div>
                    </div>
                    <div className={classes.colorPickerSwitchWrapper}>
                        <Typography>Második szín kiválasztása a színátmenethez</Typography><Switch onChange={() => { setShowSecondColorPicker(p => !p) }} />
                    </div>
                    {showSecondColorPicker && <div className={classes.tagWrapper}>
                        <Typography variant={"overline"}>Másodlagos szín</Typography>
                        <HexColorPicker style={{ width: "100%" }} color={colorTwo} onChange={(color) => {
                            setColorTwo(color)
                        }} />
                    </div>}
                </div>
            </div>

        </div>

        <Divider style={{
            width: "100%"
        }} />

        <div className={classes.editVideosWrapper}>
            <AdminDashboardSearch searchChangeHandler={() => { }} name={"searchData"} title={"A kurzus tartalma"} />
            {course?.courseItems.map((item, index) => <AdministrationListItem key={"adlistitem" + index} title={item.title} thumbnailUrl={item.thumbnailUrl} chips={[
                getChipWithLabel("fis" + index, item.type, "category"),
                getChipWithLabel("fos" + index, "item.length", "person"),
                getChipWithLabel("fasz" + index, "item.isEssential", "video")
            ]} searchItemButtons={[]} />)}
        </div>

        <AdminDashboardHeader titleText={""} />

        <SaveBar open={isAllowEditOnPage} onClick={() => setIsAllowEditOnPage(p => !p) } onDoneClick={() => {
            return updateAdminPageEditCourse(getAdminPageEditCourseDTO())
        }} />

    </AdminDashboardWrapper>
};
