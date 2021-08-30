import React, {useEffect} from 'react';
import classes from "./editCourse.module.scss"
import {Divider, List, Switch, Typography} from "@material-ui/core";
import EditItem from "../../../universal/atomic/editItem/EditItem";
import {CourseVideoList} from "./CourseVideoList";
import {useParams} from "react-router";
import AdminDashboardHeader from "../../universal/adminDashboardHeader/AdminDashboardHeader";
import { AdminDashboardSearch } from "../../universal/searchBar/AdminDashboardSearch";
import { HexColorPicker } from "react-colorful";
import SelectImage from "../../universal/selectImage/SelectImage";
import {AdminDashboardWrapper} from "../../universal/adminDashboardWrapper/AdminDashboardWrapper";
import {SelectRadio} from "../../universal/SelectRadio";
import {SaveBar} from "../../universal/saveBar/SaveBar";
import {getEventFileCallback, getEventValueCallback} from "../../../../frontendHelpers";
import {useCreateObjectURL} from "../../../../hooks/useCreateObjectURL";

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


    useEffect(() => {

    }, [])

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
                                     title={"Borítókép"}/>
                        <Typography variant={"overline"}>Alapadatok</Typography>
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            className={classes.tagList}
                        >
                            <EditItem value={name}
                                      title={"Név"}
                                      onChange={getEventValueCallback(setName)}
                                      name={"name"} />

                            <EditItem value={category}
                                      title={"Kategória"}
                                      onChange={getEventValueCallback(setCategory)}
                                      name={"category"} />

                            <EditItem value={courseGroup}
                                      title={"Kategória csoport"}
                                      onChange={getEventValueCallback(setCourseGroup)}
                                      name={"courseGroup"} />

                            <EditItem value={permissionLevel}
                                      title={"Elérés"}
                                      onChange={getEventValueCallback(setPermissionLevel)}
                                      name={"permissionLevel"} />
                        </List>
                    </div>
                    <div className={classes.editTagsWrapper}>
                        <SelectRadio radioButtonOnChange={() => {}} itemValueOnChange={() => {}} name={""} onClick={() => {}} title={"Cég kiválasztása"} />
                    </div>
                    <div className={classes.editTagsWrapper}>
                        <SelectRadio radioButtonOnChange={() => {}} itemValueOnChange={() => {}} name={""} onClick={() => {}} title={"Tanár kiválasztása"} />
                    </div>
                    <div className={classes.editTagsWrapper}>
                        <SelectRadio radioButtonOnChange={() => {}} itemValueOnChange={() => {}} name={""} onClick={() => {}} title={"Tagek (ide majd selectcheckbox)"} />
                    </div>
                    <div className={classes.editTagsWrapper}>
                        <SelectRadio radioButtonOnChange={() => {}} itemValueOnChange={() => {}} name={""} onClick={() => {}} title={"Csoportok kiválasztása"} />
                    </div>


                </div>
                <Divider orientation={"vertical"} />
                <div className={classes.editDataRightWrapper}>
                    <div className={classes.tagWrapper}>
                        <Typography variant={"overline"} className={classes.colorPickerTitle}>Elsődleges szín</Typography>
                        <div className={classes.colorPickerWrapper}>
                            <HexColorPicker style={{width: "100%"}} color={colorOne} onChange={(color) => {
                                !showSecondColorPicker && setColorTwo(color)
                                setColorOne(color)
                            }} />
                        </div>
                    </div>
                    <div className={classes.colorPickerSwitchWrapper}>
                        <Typography>Második szín kiválasztása a színátmenethez</Typography><Switch onChange={() => {setShowSecondColorPicker(p => !p)}} />
                    </div>
                    {showSecondColorPicker && <div className={classes.tagWrapper}>
                        <Typography variant={"overline"}>Másodlagos szín</Typography>
                        <HexColorPicker style={{width: "100%"}} color={colorTwo} onChange={(color) => {
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
            <AdminDashboardSearch searchChangeHandler={() => {}} name={"searchData"} title={"Videók"}/>
            <CourseVideoList courseId={courseId} />
        </div>

        <AdminDashboardHeader titleText={""}/>

        <SaveBar open={true} />

    </AdminDashboardWrapper>
};
