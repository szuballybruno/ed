import React from 'react';
import {AddFrame} from "../../../../HOC/add_frame/AddFrame";
import SingleInput from "../../universal/singleInput/SingleInput";
import {useState} from "@hookstate/core";
import adminSideState from '../../../../store/admin/adminSideState';
import {Cookies} from "react-cookie";
import classes from "../../users/addUser/addUser.module.scss";
import {Button} from "@material-ui/core";
import SelectImage from "../../universal/selectImage/SelectImage";
import {ColorPicker} from "../../universal/colorPicker/ColorPicker";
import EditItem from "../../../universal/atomic/editItem/EditItem";
import {SelectRadio} from "../../universal/SelectRadio";
import {getEventFileCallback} from "../../../../frontendHelpers";

export const AddCourse = () => {
    const admin = useState(adminSideState)


    const [file, setFile] = React.useState<string | Blob>("")
    const [permissionLevel, setPermissionLevel] = React.useState("")
    const [courseName, setCourseName] = React.useState("")

    const cookies = new Cookies()

    const inputChangeHandler = (e: React.ChangeEvent<{ value: unknown, name?: string }>) => {
        admin.currentlyEdited.course[e.currentTarget.name as keyof typeof admin.currentlyEdited.course].set(e.currentTarget.value as string)
    }



    const selectImage = (e) => {
        if (e.currentTarget.files) {
            admin.currentlyEdited.course.uploadedFileUrl.set(URL.createObjectURL(e.currentTarget.files[0]));
            setFile(e.currentTarget.files[0])
        }
    }

    const createAddCourseDTO = () => {

    }

    const submitHandler = () => {
        const formData = createAddCourseDTO
    }

    return <AddFrame submitHandler={submitHandler} title={"Új kurzus hozzáadása"}>
            <SelectImage onChange={getEventFileCallback(setFile)}
                         uploadedImageUrls={[admin.currentlyEdited.course.uploadedFileUrl.get()]}
                         title={"Borítókép"}/>
            <SingleInput labelText={"Név"} name={"name"} changeHandler={() => setCourseName} />
            <SingleInput labelText={"Kategória"} name={"category"} changeHandler={inputChangeHandler} />

            <EditItem value={permissionLevel}
                      title={"Elérés"}
                      onChange={(e) => {
                          setPermissionLevel(e.currentTarget.value)
                      }}
                      editButtonOnClick={(e: React.MouseEvent<any>) => {

                      }}
                      name={permissionLevel}
                      showEditButton />


            {
                (permissionLevel === "groups" || permissionLevel === "publicInsideOrganization") &&
                <SelectRadio
                    radioButtonOnChange={() => {}}
                    itemValueOnChange={() => {}}
                    name={""} onClick={() => {}}
                    title={"Cég kiválasztása"} />
            }

            <SelectRadio radioButtonOnChange={() => {}} itemValueOnChange={() => {}} name={""} onClick={() => {}} title={"Tanár kiválasztása"} />

            <SelectRadio radioButtonOnChange={() => {}} itemValueOnChange={() => {}} name={""} onClick={() => {}} title={"Tagek kiválasztása"} />
            {(admin.currentlyEdited.course.permissionLevel.get() === "groups") &&
            <SelectRadio radioButtonOnChange={() => {}} itemValueOnChange={() => {}} name={""} onClick={() => {}} title={"Csoportok kiválasztása"} />}
            <ColorPicker title={"Elsődleges szín"}
                         currentColor={admin.currentlyEdited.course.colorOne.get()}
                         onChange={(color) => admin.currentlyEdited.course.colorOne.set(color)} />
            <ColorPicker title={"Másodlagos szín"}
                         currentColor={admin.currentlyEdited.course.colorTwo.get()}
                         onChange={(color) => admin.currentlyEdited.course.colorTwo.set(color)} />
            <Button className={classes.submitButton}
                    type={"submit"}
                    variant={"outlined"}
                    color={"secondary"}>
                Feltöltés
            </Button>
        </AddFrame>
};
