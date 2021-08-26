import React, {useEffect} from 'react';
import {AddFrame} from "../../../../../HOC/add_frame/AddFrame";
import SingleInput from "../../../universal/singleInput/SingleInput";
import {none, State, useState} from "@hookstate/core";
import adminSideState from '../../../../../store/admin/adminSideState';
import instance from "../../../../../services/axiosInstance";
import {Redirect} from "react-router-dom";
import {Cookies} from "react-cookie";
import applicationRunningState from "../../../../../store/application/applicationRunningState";
import classes from "../../../users/users_components/addUser.module.scss";
import {Button} from "@material-ui/core";
import SelectImage from "../../../universal/selectImage/SelectImage";
import {ColorPicker} from "../../../universal/colorPicker/ColorPicker";
import {fetchReducer} from "../../../universal/services/fetchReducer";
import {permissionLevelOptions} from "../../store";
import EditItem from "../../../../universal/atomic/editItem/EditItem";
import {SelectRadio} from "../../SelectRadio";

export const AddCourse = () => {
    const admin = useState(adminSideState)
    const app = useState(applicationRunningState)
    const isEditing = useState(false)


    const editingItems = useState([""])
    const showAddTag = useState(true)


    const selectedTags: State<string[]> = useState([""])
    const selectedGroups: State<string[]> = useState([""])

    const checkItem = (e: React.ChangeEvent<{ value: string, name?: string }>) => {
        selectedGroups.merge(e.currentTarget.value)
    }

    const unCheckItem = (e: React.ChangeEvent<{ value: string, name?: string }>, index) => {
        selectedGroups[index].set(none)
    }


    const allTags: State<{
        _id: string
        name: string
    }[]> = useState([{
        _id: "",
        name: ""
    }])

    const allGroups: State<{
        _id: string
        name: string
    }[]> = useState([{
        _id: "",
        name: ""
    }])

    const allOrganizations: State<{
        _id: string
        name: string
    }[]> = useState([{
        _id: "",
        name: ""
    }])

    const allTeachers: State<{
        _id: string
        name: string
    }[]> = useState([{
        _id: "",
        name: ""
    }])

    const [file, setFile] = React.useState<string | Blob>("")

    const cookies = new Cookies()

    const organizations = useState<{
        optionText: string,
        optionValue: string
    }[]>([{
        optionText: "",
        optionValue: ""
    }])

    const teachers = useState<{
        optionText: string,
        optionValue: string
    }[]>([{
        optionText: "",
        optionValue: ""
    }])

    const inputChangeHandler = (e: React.ChangeEvent<{ value: unknown, name?: string }>) => {
        admin.currentlyEdited.course[e.currentTarget.name as keyof typeof admin.currentlyEdited.course].set(e.currentTarget.value as string)
    }

    useEffect(() => {
        fetchReducer(`tags`, (res) => {
            allTags.set(res.data)
        })
        fetchReducer(`groups`, (res) => {
            allGroups.set(res.data)
        })
        fetchReducer(`organizations/getorganizations`, (res) => {
            allOrganizations.set(res.data)
        })
        fetchReducer(`users/?userId=${cookies.get("userId")}`, (res) => {
            res.data.map((item, index) => {
                return allTeachers[index].merge({_id: item._id, name: item.name})
            })
        })
        showAddTag.set(true)
    }, [])

    const selectImage = (e) => {
        if (e.currentTarget.files) {
            admin.currentlyEdited.course.uploadedFileUrl.set(URL.createObjectURL(e.currentTarget.files[0]));
            setFile(e.currentTarget.files[0])
        }
    }

    const selectItem = (e: React.ChangeEvent<{ value: string, name?: string }>, state: State<string[]>) => {
        state.merge([e.currentTarget.value])
        console.log(selectedTags.get())
    }


    const addItem = (state: State<any>, callback: () => void) => {
        state.merge([{_id: "", name: "Nincs érték"}])
        callback()
    }

    const editItem = (e: React.ChangeEvent<any>, endpoint: string) => {
        instance.post(endpoint, {
            name: e.currentTarget.name
        }).then((res) => {
            if (res.status === 201) {
                app.snack.snackTitle.set("Tag sikeresen hozzáadva")
                app.snack.showSnack.set(true)
                return isEditing.set(false)
            }
        }).catch((e) => {
            app.snack.snackTitle.set("Tag hozzáadása sikertelen " + e)
            app.snack.showSnack.set(true)
        })
    }

    const editTag = (e) => {
        instance.post("tags", {
            name: e.currentTarget.name
        }).then((res) => {
            if (res.status === 201) {
                app.snack.snackTitle.set("Tag sikeresen hozzáadva")
                app.snack.showSnack.set(true)
                return isEditing.set(false)
            }
        }).catch((e) => {
            app.snack.snackTitle.set("Tag hozzáadása sikertelen " + e)
            app.snack.showSnack.set(true)
        })
    }

    const editGroup = (e) => {
        instance.post("groups", {
            name: admin.currentlyEdited.course.groups[admin.currentlyEdited.course.groups.length - 1].get().name
        }).then((res) => {
            if (res.status === 201) {
                app.snack.snackTitle.set("Csoport sikeresen hozzáadva")
                app.snack.showSnack.set(true)
                return isEditing.set(false)
            }
        }).catch((e) => {
            app.snack.snackTitle.set("Csoport hozzáadása sikertelen " + e)
            app.snack.showSnack.set(true)
        })
    }

    const removeFromEditingItems = (inputValue) => {
        editingItems.get().filter(function(value, index, arr){
            return value === inputValue ? editingItems[index].set(none) : null
        })
    }

    const updateTag = (e: React.ChangeEvent<any>) => {
        removeFromEditingItems(e.currentTarget.value)
        showAddTag.set(true)
        instance.patch("tags", {
            _id: e.currentTarget.value,
            name: e.currentTarget.name,
            courseId: admin.currentlyEdited.course._id.get()
        }).then((res) => {
            allTags.get().filter(function(value, index, arr){
                return value._id === "" ? allTags[index]._id.set(res.data._id) : null
            })
            admin.currentlyEdited.course.tags.get().filter(function(value, index, arr){
                return value._id === "" ? admin.currentlyEdited.course.tags[index]._id.set(res.data._id) : null
            })
            app.snack.showSnack.set(true)
            app.snack.snackTitle.set("A res.data: " + JSON.stringify(res.data))
        })
    }

    const editOnChange = (e: React.ChangeEvent<any>) => {
        admin.currentlyEdited.course.tags.get().filter((value, index, array) => {
            return value._id === e.currentTarget.name ? admin.currentlyEdited.course.tags[index].name.set(e.currentTarget.value) : null
        })
        allTags.get().filter((value, index, array) => {
            return value._id === e.currentTarget.name ? allTags[index].name.set(e.currentTarget.value) : null
        })
    }

    const submitHandler = (e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
        e.preventDefault();
        let formdata =  new FormData()

        formdata.append('file', file)
        formdata.set('name', admin.currentlyEdited.course.name.get())
        selectedTags.get().forEach((item) => formdata.append("tags", item))
        formdata.set('category', admin.currentlyEdited.course.category.get())
        formdata.set('permissionLevel', admin.currentlyEdited.course.permissionLevel.get())
        if (admin.currentlyEdited.course.permissionLevel.get() !== "public" || "private") {
            formdata.set('organizationId', admin.currentlyEdited.course.organizationId.get())
        }
        formdata.set('teacherId', admin.currentlyEdited.course.teacherId.get())

        selectedGroups.get().forEach((item) => formdata.append("groups", item))

        formdata.set('colorOne', admin.currentlyEdited.course.colorOne.get())
        formdata.set('colorTwo', admin.currentlyEdited.course.colorTwo.get())

        instance.post("courses/createCourse", formdata).then((res) => {
            if (res.status === 201) {
                app.snack.snackTitle.set("Felhasználó sikeresen hozzáadva")
                app.snack.showSnack.set(true)

                return <Redirect to={"/admin/manage/users"} />
            }
        }).catch((e) => {
            app.snack.snackTitle.set("Felhasználó hozzáadása sikertelen " + e)
            app.snack.showSnack.set(true)
        })
    }

    return (
        <AddFrame submitHandler={submitHandler} title={"Új kurzus hozzáadása"}>
            <SelectImage onChange={selectImage}
                         uploadedImageUrls={[admin.currentlyEdited.course.uploadedFileUrl.get()]}
                         title={"Borítókép"}/>
            <SingleInput labelText={"Név"} name={"name"} changeHandler={inputChangeHandler} />
            <SingleInput labelText={"Kategória"} name={"category"} changeHandler={inputChangeHandler} />
            <EditItem value={admin.currentlyEdited.course.permissionLevel.get()}
                      title={"Elérés"}
                      onChange={(e) => {
                          admin.currentlyEdited.course.permissionLevel.set(e.currentTarget.value)
                      }}
                      editButtonOnClick={(e: React.MouseEvent<any>) => {
                          editingItems.merge(["permissionLevel"])
                      }}
                      isEditing={editingItems.get().includes("permissionLevel")}
                      name={admin.currentlyEdited.course.permissionLevel.get()}
                      showEditButton />
            {(
                admin.currentlyEdited.course.permissionLevel.get() === "groups" ||
                admin.currentlyEdited.course.permissionLevel.get() === "publicInsideOrganization") &&
            <SelectRadio radioButtonOnChange={() => {}} itemValueOnChange={() => {}} name={""} onClick={() => {}} title={"Cég kiválasztása"} />}

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
    );
};
