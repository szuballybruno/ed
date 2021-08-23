import React, {useEffect} from 'react';
import classes from "./editCourse.module.scss"
import {Divider, List, Switch, Typography} from "@material-ui/core";
import EditItem from "../../../../universal/atomic/editItem/EditItem";
import {CourseVideoList} from "../CourseVideoList";
import {useParams} from "react-router";
import AdminDashboardHeader from "../../../universal/adminDashboardHeader/AdminDashboardHeader";
import AdminDashboardSearch from "../../../universal/searchBar/AdminDashboardSearch";
import { HexColorPicker } from "react-colorful";
import {none, State, useState} from "@hookstate/core";
import instance from "../../../../../services/axiosInstance";
import adminSideState from '../../../../../store/admin/adminSideState';
import {SelectMultiple} from "../../../universal/selectMultiple/SelectMultiple";
import applicationRunningState from "../../../../../store/application/applicationRunningState";
import SelectImage from "../../../universal/selectImage/SelectImage";
import {globalConfig} from "../../../../../configuration/config";
import {Cookies} from "react-cookie";
import {fetchReducer} from "../../../universal/services/fetchReducer";
import {useDebouncedCallback} from "use-debounce";
import {Redirect} from "react-router-dom";
import {permissionLevelOptions} from "../../store";
import {AdminDashboardWrapper} from "../../../universal/adminDashboardWrapper/AdminDashboardWrapper";
import {SelectRadio} from "../../SelectRadio";


export const EditCourse = () => {
    const admin = useState(adminSideState)
    const app = useState(applicationRunningState)

    const [file, setFile] = React.useState<string | Blob>("")
    const showSecondColorPicker = useState(false)
    const showAddTag = useState(true)
    const editingItems = useState([""])

    const { courseId } = useParams<{ courseId: string }>();
    const cookies = new Cookies()

    
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

    useEffect(() => {
        fetchReducer(`courses/course/${courseId}`, (res) => {
            admin.currentlyEdited.course.set(res.data)
            admin.currentlyEdited.course.uploadedFileUrl.set(`${globalConfig.assetStorageUrl}/courses/${admin.currentlyEdited.course._id.get()}.png`)
        })
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

    const uploadImage = (e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
        e.preventDefault();
        let formdata =  new FormData()

        formdata.append('file', file)

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

    const updateItem = (name: string, value: string, doneMessage: string) => {
        admin.currentlyEdited.course[name].set(value)
        instance.patch("courses/course/"+admin.currentlyEdited.course._id.get(), {
            [name]: value
        }).then((res) => {
            app.snack.showSnack.set(true)
            app.snack.snackTitle.set(doneMessage)
        })
    }

    const updateItemWithDebounce = useDebouncedCallback(
        (name: string, value: string, doneMessage: string) => {
            updateItem(name, value, doneMessage)
        },
        500
    );

    const selectImage = (e) => {
        if (e.currentTarget.files) {
            admin.currentlyEdited.course.uploadedFileUrl.set(URL.createObjectURL(e.currentTarget.files[0]));
            setFile(e.currentTarget.files[0])

            new FormData()
            e.preventDefault();
            let formdata =  new FormData()

            formdata.append('file', e.currentTarget.files[0])

            instance.put("courses/course/"+admin.currentlyEdited.course._id.get()+"/image", formdata).then((res) => {
                if (res.status === 201) {
                    app.snack.snackTitle.set("A kurzus képe sikeresen frissítve")
                    return app.snack.showSnack.set(true)
                }
            }).catch((e) => {
                app.snack.snackTitle.set("A kurzus képének frissítése sikertelen " + e)
                app.snack.showSnack.set(true)
            })
        }
    }

    const checkItem = (e: React.ChangeEvent<{ value: string, name?: string }>, changeableArray: string, doneMessage: string) => {
        admin.currentlyEdited.course[changeableArray].merge([{_id: e.currentTarget.value, name: e.currentTarget.name as string}])
        instance.put("courses/course/"+admin.currentlyEdited.course._id.get(), {
            [changeableArray]: e.currentTarget.value
        }).then((res) => {
            app.snack.showSnack.set(true)
            app.snack.snackTitle.set(doneMessage)
        })
    }

    const unCheckItem = (e: React.ChangeEvent<{ value: string, name?: string }>, index, changeableArray: string, doneMessage: string) => {
        admin.currentlyEdited.course[changeableArray][index].set(none)
        instance.patch("courses/course/"+admin.currentlyEdited.course._id.get()+"/remove", {
            [changeableArray]: e.currentTarget.value
        }).then((res) => {
            app.snack.showSnack.set(true)
            app.snack.snackTitle.set(doneMessage)
        })
    }

    const addItem = (state: State<any>, callback: () => void) => {
        state.merge([{_id: "", name: "Nincs érték"}])
        callback()
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

    const updateItemStopEditing = (e: React.MouseEvent<any>, dbItemName: string, doneMessage: string) => {
        removeFromEditingItems(dbItemName)
        updateItem(dbItemName, e.currentTarget.value, doneMessage)
    }

    const editOnChange = (e: React.ChangeEvent<any>) => {
        admin.currentlyEdited.course.tags.get().filter((value, index, array) => {
            return value._id === e.currentTarget.name ? admin.currentlyEdited.course.tags[index].name.set(e.currentTarget.value) : null
        })
        allTags.get().filter((value, index, array) => {
            return value._id === e.currentTarget.name ? allTags[index].name.set(e.currentTarget.value) : null
        })
    }


    return <AdminDashboardWrapper>
        <Divider style={{
            width: "100%"
        }} />
        <div className={classes.editDataOuterWrapper}>
            <div className={classes.editDataInnerWrapper}>
                <div className={classes.editDataLeftWrapper}>
                    <div className={classes.editDataListWrapper}>
                        <SelectImage onChange={selectImage}
                                     uploadedImageUrls={[admin.currentlyEdited.course.uploadedFileUrl.get()]}
                                     title={"Borítókép"}/>
                        <Typography variant={"overline"}>Alapadatok</Typography>
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            className={classes.tagList}
                        >
                            <EditItem value={admin.currentlyEdited.course.name.get()}
                                      title={"Név"}
                                      onChange={(e: React.ChangeEvent<any>) => {
                                          return admin.currentlyEdited.course.name.set(e.currentTarget.value)
                                      }}
                                      editButtonOnClick={(e: React.MouseEvent<any>) => {
                                          editingItems.merge(["name"])
                                      }}
                                      doneButtonOnClick={(e) => updateItemStopEditing(e, "name", "A kurzus neve sikeresen módosítva")}
                                      isEditing={editingItems.get().includes("name")}
                                      name={admin.currentlyEdited.course.name.get()}
                                      showEditButton />
                            <EditItem value={admin.currentlyEdited.course.category.get()}
                                      title={"Kategória"}
                                      onChange={(e: React.ChangeEvent<any>) => {
                                          return admin.currentlyEdited.course.category.set(e.currentTarget.value)
                                      }}
                                      editButtonOnClick={(e: React.MouseEvent<any>) => {
                                          editingItems.merge(["category"])
                                      }}
                                      doneButtonOnClick={(e) => updateItemStopEditing(e, "category", "A kurzus kategóriája sikeresen módosítva")}
                                      isEditing={editingItems.get().includes("category")}
                                      name={admin.currentlyEdited.course.category.get()}
                                      showEditButton />
                            <EditItem value={admin.currentlyEdited.course.courseGroup.get()}
                                      title={"Kategória csoport"}
                                      onChange={(e: React.ChangeEvent<any>) => {
                                          return admin.currentlyEdited.course.courseGroup.set(e.currentTarget.value)
                                      }}
                                      editButtonOnClick={(e: React.MouseEvent<any>) => {
                                          editingItems.merge(["courseGroup"])
                                      }}
                                      doneButtonOnClick={(e) => updateItemStopEditing(e, "courseGroup", "A kurzus kategória csoportja sikeresen módosítva")}
                                      isEditing={editingItems.get().includes("courseGroup")}
                                      name={admin.currentlyEdited.course.courseGroup.get()}
                                      showEditButton />
                            <EditItem value={admin.currentlyEdited.course.permissionLevel.get()}
                                      title={"Elérés"}
                                      onChange={(e) => updateItem("permissionLevel", e.currentTarget.value, "A kurzus elérése sikeresen módosítva")}
                                      editButtonOnClick={(e: React.MouseEvent<any>) => {
                                          editingItems.merge(["permissionLevel"])
                                      }}
                                      isEditing={editingItems.get().includes("permissionLevel")}
                                      name={admin.currentlyEdited.course.permissionLevel.get()}
                                      showEditButton />
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
                            <HexColorPicker style={{width: "100%"}} color={admin.currentlyEdited.course.colorOne.get()} onChange={(color) => {
                                admin.currentlyEdited.course.colorOne.set(color)
                                !showSecondColorPicker.get() && admin.currentlyEdited.course.colorTwo.set(color)
                                updateItemWithDebounce("colorOne", color, "Kurzus elsődleges színe megváltoztatva")
                            }} />
                        </div>
                    </div>
                    <div className={classes.colorPickerSwitchWrapper}>
                        <Typography>Második szín kiválasztása a színátmenethez</Typography><Switch onChange={() => {showSecondColorPicker.set(p => !p)}} />
                    </div>
                    {showSecondColorPicker.get() && <div className={classes.tagWrapper}>
                        <Typography variant={"overline"}>Másodlagos szín</Typography>
                        <HexColorPicker style={{width: "100%"}} color={admin.currentlyEdited.course.colorTwo.get()} onChange={(color) => {
                            admin.currentlyEdited.course.colorTwo.set(color)
                            updateItemWithDebounce("colorTwo", color, "Kurzus másodlagos színe megváltoztatva")
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
    </AdminDashboardWrapper>
};
