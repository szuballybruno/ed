import React, { useEffect } from 'react';
import classes from "./editCourse.module.scss"
import {Checkbox, Divider, List, ListItem, Radio, Switch, TextField, Typography} from "@material-ui/core";
import EditItem from "../../../universal/atomic/editItem/EditItem";
import { CourseVideoList } from "./CourseVideoList";
import { useParams } from "react-router";
import AdminDashboardHeader from "../../universal/adminDashboardHeader/AdminDashboardHeader";
import { AdminDashboardSearch } from "../../universal/searchBar/AdminDashboardSearch";
import { HexColorPicker } from "react-colorful";
import SelectImage from "../../universal/selectImage/SelectImage";
import { AdminDashboardWrapper } from "../../universal/adminDashboardWrapper/AdminDashboardWrapper";
import { SelectRadio } from "../../universal/SelectRadio";
import { SaveBar } from "../../universal/saveBar/SaveBar";
import { getEventFileCallback, getEventValueCallback, useCreateObjectURL } from "../../../../frontendHelpers";
import { useAdminEditedCourse, useUserCourses } from "../../../../services/courseService";
import { AdministrationListItem } from "../../universal/adminDashboardSearchItem/AdministrationListItem";
import { getChipWithLabel } from "../courseList/CourseList";
import {ListItemWithRadio} from "../../universal/selectMultiple/components/ListItemWithRadioButton/ListItemWithRadioButton";
import {SelectMultiple} from "../../universal/selectMultiple/SelectMultiple";

/* TODO:
*   - onClick for save changes button
*   - editCourseDTO
*   - fetch all the necessary data
*/

export const EditCourse = () => {
    const [showSecondColorPicker, setShowSecondColorPicker] = React.useState(false)

    const { courseId } = useParams<{ courseId: string }>();

    const [name, setName] = React.useState("")
    const [category, setCategory] = React.useState("")
    const [courseGroup, setCourseGroup] = React.useState("")
    const [permissionLevel, setPermissionLevel] = React.useState("")
    const [thumbnailImage, setThumbnailImage] = React.useState("")
    const [thumbnailURL, setThumbnailURL] = React.useState("")
    const [colorOne, setColorOne] = React.useState("")
    const [colorTwo, setColorTwo] = React.useState("")

    const { course, status, error } = useAdminEditedCourse(Number(courseId));

    useCreateObjectURL(thumbnailImage, setThumbnailURL)

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
                            <EditItem value={course?.title}
                                title={"Név"}
                                onChange={getEventValueCallback(setName)}
                                name={"name"} />

                            <EditItem value={course?.category}
                                title={"Kategória"}
                                onChange={getEventValueCallback(setCategory)}
                                name={"category"} />

                            <EditItem value={course?.courseGroup}
                                title={"Kategória csoport"}
                                onChange={getEventValueCallback(setCourseGroup)}
                                name={"courseGroup"} />

                            <EditItem value={course?.permissionLevel}
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
                            {course?.organizations?.map(item =>
                                <div>
                                    <ListItem className={classes.listItem}>
                                        <Checkbox checked={item.checked} />
                                        <Typography>{item.name}</Typography>
                                    </ListItem>
                                    <Divider style={{width: "100%"}} />
                                </div>
                            )}

                        </SelectMultiple>
                    </div>
                    <div className={classes.editTagsWrapper}>
                        <SelectRadio radioButtonOnChange={() => { }} itemValueOnChange={() => { }} name={""} onClick={() => { }} title={"Tanár kiválasztása"} />
                    </div>
                    <div className={classes.editTagsWrapper}>
                        <SelectRadio radioButtonOnChange={() => { }} itemValueOnChange={() => { }} name={""} onClick={() => { }} title={"Tagek (ide majd selectcheckbox)"} />
                    </div>
                    <div className={classes.editTagsWrapper}>
                        <SelectMultiple
                            items={course?.groups}
                            title={"Csoport kiválasztása"}
                        >
                            {course?.groups?.map(item =>
                                <div>
                                    <ListItem className={classes.listItem}>
                                        <Checkbox checked={item.checked} />
                                        <Typography>{item.name}</Typography>
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
                            <HexColorPicker style={{ width: "100%" }} color={course?.colorOne} onChange={(color) => {
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
                        <HexColorPicker style={{ width: "100%" }} color={course?.colorTwo} onChange={(color) => {
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
            {course?.courseItems.map((item, index) => <AdministrationListItem title={item.title} thumbnailUrl={item.thumbnailUrl} chips={[
                getChipWithLabel(index, item.type, "category"),
                getChipWithLabel(index, "item.length", "person"),
                getChipWithLabel(index, "item.isEssential", "video")
            ]} searchItemButtons={[]} />)}
        </div>

        <AdminDashboardHeader titleText={""} />

        <SaveBar open={true} />

    </AdminDashboardWrapper>
};
