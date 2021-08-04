import React, {useEffect} from 'react';
import classes from "./editItemPage.module.scss";
import SelectImage from "../../../universal/selectImage/SelectImage";
import {Button, Divider, List, Typography} from "@material-ui/core";
import {none, State, useState} from "@hookstate/core";
import adminSideState from '../../../../../store/admin/adminSideState';
import instance from "../../../../../services/axiosInstance";
import applicationRunningState from "../../../../../store/application/applicationRunningState";
import {useParams} from "react-router";
import {Cookies} from "react-cookie";
import EditItem from "../../../../universal/atomic/editItem/EditItem";
import {Add} from "@material-ui/icons";
import {SelectMultiple} from "../../../universal/selectMultiple/SelectMultiple";
import {fetchReducer} from "../../../universal/services/fetchReducer";
import {config} from "../../../../../configuration/config";

export const EditItemPage = () => {
    const admin = useState(adminSideState)
    const app = useState(applicationRunningState)

    const allTags: State<{
        _id: string
        name: string
    }[]> = useState([{
        _id: "",
        name: ""
    }])

    const [file, setFile] = React.useState<string | Blob>("")
    const showSecondColorPicker = useState(false)
    const showAddTag = useState(true)
    const editingItems = useState([""])

    const { courseId, itemId } = useParams<{ courseId: string, itemId: string }>();
    const cookies = new Cookies()

    const selectImage = (e) => {
        if (e.currentTarget.files) {
            admin.currentlyEdited.video.thumbnailUrl.set(URL.createObjectURL(e.currentTarget.files[0]));
            setFile(e.currentTarget.files[0])

            new FormData()
            e.preventDefault();
            let formdata =  new FormData()

            formdata.append('file', e.currentTarget.files[0])

            instance.put("videos/video/"+admin.currentlyEdited.video._id.get()+"/image", formdata).then((res) => {
                if (res.status === 201) {
                    app.snack.snackTitle.set("A videó thumbnail képe sikeresen frissítve")
                    return app.snack.showSnack.set(true)
                }
            }).catch((e) => {
                app.snack.snackTitle.set("A videó thumbnail képének frissítése sikertelen " + e)
                app.snack.showSnack.set(true)
            })
        }
    }

    const removeFromEditingItems = (inputValue) => {
        editingItems.get().filter(function(value, index, arr){
            return value === inputValue ? editingItems[index].set(none) : null
        })
    }

    const updateItem = (name: string, value: string, doneMessage: string) => {
        admin.currentlyEdited.video[name].set(value)
        instance.patch("videos/video/"+admin.currentlyEdited.video._id.get(), {
            [name]: value
        }).then((res) => {
            app.snack.showSnack.set(true)
            app.snack.snackTitle.set(doneMessage)
        })
    }

    const updateItemStopEditing = (e: React.MouseEvent<any>, dbItemName: string, doneMessage: string) => {
        removeFromEditingItems(dbItemName)
        updateItem(dbItemName, e.currentTarget.value, doneMessage)
    }

    const editOnChange = (e: React.ChangeEvent<any>) => {
        admin.currentlyEdited.video.tags.get().filter((value, index, array) => {
            return value._id === e.currentTarget.name ? admin.currentlyEdited.video.tags[index].name.set(e.currentTarget.value) : null
        })
        allTags.get().filter((value, index, array) => {
            return value._id === e.currentTarget.name ? allTags[index].name.set(e.currentTarget.value) : null
        })
    }

    useEffect(() => {
        fetchReducer(`videos/video/${itemId}`, (res) => {
            admin.currentlyEdited.video.set(res.data)
        })
        fetchReducer(`tags`, (res) => {
            allTags.set(res.data)
        })
    }, [])


    const checkItem = (e: React.ChangeEvent<{ value: string, name?: string }>, changeableArray: string, doneMessage: string) => {
        admin.currentlyEdited.video[changeableArray].merge([{_id: e.currentTarget.value, name: e.currentTarget.name as string}])
        instance.put("videos/video/"+admin.currentlyEdited.video._id.get(), {
            [changeableArray]: e.currentTarget.value
        }).then((res) => {
            app.snack.showSnack.set(true)
            app.snack.snackTitle.set(doneMessage)
        })
    }

    const unCheckItem = (e: React.ChangeEvent<{ value: string, name?: string }>, index, changeableArray: string, doneMessage: string) => {
        admin.currentlyEdited.video[changeableArray][index].set(none)
        instance.patch("videos/video/"+admin.currentlyEdited.video._id.get()+"/remove", {
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

    const updateTag = (e: React.ChangeEvent<any>) => {
        removeFromEditingItems(e.currentTarget.value)
        showAddTag.set(true)
        instance.patch("tags", {
            _id: e.currentTarget.value,
            name: e.currentTarget.name,
            itemId: admin.currentlyEdited.video._id.get()
        }).then((res) => {
            allTags.get().filter(function(value, index, arr){
                return value._id === "" ? allTags[index]._id.set(res.data._id) : null
            })
            admin.currentlyEdited.video.tags.get().filter(function(value, index, arr){
                return value._id === "" ? admin.currentlyEdited.video.tags[index]._id.set(res.data._id) : null
            })
            app.snack.showSnack.set(true)
            app.snack.snackTitle.set("A res.data: " + JSON.stringify(res.data))
        })
    }


    return <div className={classes.editCourseWrapper}>
        <Divider style={{
            width: "100%"
        }} />
        <div className={classes.editDataOuterWrapper}>
            <div className={classes.editDataInnerWrapper}>
                <div className={classes.editDataLeftWrapper}>
                    <div className={classes.editDataListWrapper}>
                        <SelectImage onChange={selectImage}
                                     uploadedImageUrls={[admin.currentlyEdited.video.thumbnailUrl.get()]}
                                     title={"Thumbnail kép"}/>
                        <Typography variant={"overline"}>Alapadatok</Typography>
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            className={classes.tagList}
                        >
                            <EditItem value={admin.currentlyEdited.video.title.get()}
                                      title={"Cím"}
                                      editOnChange={(e: React.ChangeEvent<any>) => {
                                          return admin.currentlyEdited.video.title.set(e.currentTarget.value)
                                      }}
                                      editButtonOnClick={(e: React.MouseEvent<any>) => {
                                          editingItems.merge(["title"])
                                      }}
                                      doneButtonOnClick={(e) => updateItemStopEditing(e, "title", "A videó címe sikeresen módosítva")}
                                      isEditing={editingItems.get().includes("title")}
                                      name={admin.currentlyEdited.video.title.get()}
                                      showEditButton />
                            <EditItem value={admin.currentlyEdited.video.subTitle.get()}
                                      title={"Alcím"}
                                      editOnChange={(e: React.ChangeEvent<any>) => {
                                          return admin.currentlyEdited.video.subTitle.set(e.currentTarget.value)
                                      }}
                                      editButtonOnClick={(e: React.MouseEvent<any>) => {
                                          editingItems.merge(["subTitle"])
                                      }}
                                      doneButtonOnClick={(e) => updateItemStopEditing(e, "subTitle", "A kurzus alcíme sikeresen módosítva")}
                                      isEditing={editingItems.get().includes("subTitle")}
                                      name={admin.currentlyEdited.video.subTitle.get()}
                                      showEditButton />
                            <EditItem value={admin.currentlyEdited.video.url.get()}
                                      title={"URL"}
                                      editOnChange={(e: React.ChangeEvent<any>) => {
                                          return admin.currentlyEdited.video.url.set(e.currentTarget.value)
                                      }}
                                      editButtonOnClick={(e: React.MouseEvent<any>) => {
                                          editingItems.merge(["url"])
                                      }}
                                      doneButtonOnClick={(e) => updateItemStopEditing(e, "url", "A kurzus címe sikeresen módosítva")}
                                      isEditing={editingItems.get().includes("url")}
                                      name={admin.currentlyEdited.video.url.get()}
                                      showEditButton />
                            <EditItem value={admin.currentlyEdited.video.description.get()}
                                      title={"Leírás"}
                                      editOnChange={(e: React.ChangeEvent<any>) => {
                                          return admin.currentlyEdited.video.description.set(e.currentTarget.value)
                                      }}
                                      editButtonOnClick={(e: React.MouseEvent<any>) => {
                                          editingItems.merge(["description"])
                                      }}
                                      doneButtonOnClick={(e) => updateItemStopEditing(e, "description", "A kurzus leírása sikeresen módosítva")}
                                      isEditing={editingItems.get().includes("description")}
                                      name={admin.currentlyEdited.video.description.get()}
                                      showEditButton />
                        </List>
                        <div className={classes.editTagsWrapper}>
                            <SelectMultiple title={"Tag-ek"}

                                            nameProperty={"name"}
                                            valueProperty={"_id"}

                                            inputArray={allTags.get().filter((tag, index, arr) => {
                                                return admin.currentlyEdited.video.tags.get().includes(tag) || tag.name === "" ? null : tag
                                            })}
                                            editingItems={editingItems.get()}
                                            checkedItems={admin.currentlyEdited.video.tags.get().map(tag => tag._id)}

                                            checkBoxOnChange={(e) => {
                                                admin.currentlyEdited.video.tags.get().find(tag => tag._id === e.currentTarget.value) ?
                                                    admin.currentlyEdited.video.tags.get().filter((value, index, array) =>
                                                        value._id === e.currentTarget.value && unCheckItem(e, index, "tags","Tag sikeresen eltávolítva"))
                                                    : checkItem(e, "tags", "Tag sikeresen hozzáadva")

                                            }}
                                            searchOnChange={() => {}}
                                            editOnChange={editOnChange}

                                            showAdd={showAddTag.get()}
                                            showCheckBox={true}
                                            selectOne={false}
                                            showEditButton
                                            showDeleteButton

                                            emptyArrayMessage={"Nem található egy tag sem. A plussz jelre kattintva adj hozzá egyet."}

                                            editButtonOnClick={(e) => {
                                                editingItems.merge([e.currentTarget.value])}
                                            }
                                            doneButtonOnClick={updateTag}

                                            addButtonOnClick={(e) => {
                                                editingItems.merge([e.currentTarget.value])
                                                allTags.merge([{_id: "", name: "Nincs érték"}])
                                                admin.currentlyEdited.video.tags.merge([{_id: "", name: "Nincs érték"}])
                                                showAddTag.set(false)
                                            }}
                                            deleteButtonOnClick={(e) => {
                                                admin.currentlyEdited.video.tags.get().filter((value, index, array) => {
                                                    return value._id === e.currentTarget.value ? admin.currentlyEdited.video.tags[index].set(none) : null
                                                })
                                                allTags.get().filter((value, index, array) => {
                                                    return value._id === e.currentTarget.value ? allTags[index].set(none) : null
                                                })
                                                instance.delete("tags/"+e.currentTarget.value).then((res) => {
                                                    app.snack.showSnack.set(true)
                                                    app.snack.snackTitle.set("A res.data: " + JSON.stringify(res.data))
                                                })
                                            }}/>
                        </div>
                    </div>


                </div>
                <Divider orientation={"vertical"} />
                <div className={classes.editDataRightWrapper}>
                    <Typography variant={"overline"} style={{margin: "10px 0 0 0"}}>NMI Kérdések</Typography>
                    {admin.currentlyEdited.video.overlays.get().map((item, index) => {
                        return <div className={classes.editOverlayWrapper}>
                            <EditItem title={"Kérdés"}
                                      name={admin.currentlyEdited.video.overlays[index].question.get()}
                                      value={admin.currentlyEdited.video.overlays[index].question.get()}
                                      editOnChange={(e: React.ChangeEvent<any>) => {
                                          return admin.currentlyEdited.video.overlays[0].question.set(e.currentTarget.value)
                                      }}
                                      editButtonOnClick={(e: React.MouseEvent<any>) => {
                                          editingItems.merge(["overlayQuestion"+index])
                                      }}
                                      doneButtonOnClick={(e) => {
                                          removeFromEditingItems("overlayQuestion"+index)
                                          admin.currentlyEdited.video[e.currentTarget.name].set(e.currentTarget.value)
                                          instance.patch("videos/video/"+admin.currentlyEdited.video._id.get(), {
                                              [`overlays.${index}`]: {
                                                  overlayQuestion: e.currentTarget.value
                                          }}).then((res) => {
                                              app.snack.showSnack.set(true)
                                              app.snack.snackTitle.set("Az NMI kérdése sikeresen frissítve.")
                                          })
                                      }}
                                      isEditing={editingItems.get().includes("overlayQuestion"+index)}
                                      showEditButton />
                            <EditItem title={"Megjelenés ideje"} name={item.timecode + "mp"} />
                            <SelectMultiple title={"Válaszok"}
                                            nameProperty={"answer"}
                                            valueProperty={"_id"}
                                            inputArray={admin.currentlyEdited.video.overlays[index].answers.get()}
                                            editingItems={editingItems.get()}
                                            checkedItems={admin.currentlyEdited.video.overlays[index].answers.get().map((value, inIndex) => {
                                                return value._id === admin.currentlyEdited.video.overlays[index].validAnswer.get() ? value._id : ""
                                            })}
                                            checkBoxOnChange={(e) => {
                                                admin.currentlyEdited.video.overlays[index].answers.get().map((value, inIndex) => {
                                                    if (value._id === admin.currentlyEdited.video.overlays[index].validAnswer.get()) {
                                                        instance.patch("videos/video/"+admin.currentlyEdited.video._id.get(), {
                                                            [`overlays.${index}`]: {
                                                                [`answers.${inIndex}`]: {
                                                                    isTheAnswerTrue: false
                                                                }
                                                            }}).then((res) => {

                                                        })
                                                    }
                                                    if (e.currentTarget.value === value._id) {
                                                        instance.patch("videos/video/"+admin.currentlyEdited.video._id.get(), {
                                                            [`overlays.${index}`]: {
                                                                [`answers.${inIndex}`]: {
                                                                    isTheAnswerTrue: true
                                                                }
                                                            }}).then((res) => {
                                                                app.snack.showSnack.set(true)
                                                                app.snack.snackTitle.set("Az NMI válasza sikeresen frissítve")
                                                        })
                                                        return admin.currentlyEdited.video.overlays[index].validAnswer.set(value._id)
                                                    }
                                                })
                                            }}
                                            searchOnChange={() => {}}
                                            editOnChange={(e) => {
                                                editingItems.get().find((item, indexInFind) => {
                                                    e.currentTarget.name === item  && editingItems[indexInFind].set(e.currentTarget.value)
                                                })
                                                admin.currentlyEdited.video.overlays[index].answers.get().filter((value, indexIn, array) => {
                                                    return value.answer === e.currentTarget.name ? admin.currentlyEdited.video.overlays[index].answers[indexIn].answer.set(e.currentTarget.value) : null
                                                })
                                            }}
                                            showAdd={showAddTag.get()}
                                            showCheckBox={true}
                                            selectOne={true}
                                            showEditButton
                                            showDeleteButton
                                            emptyArrayMessage={"Jelenleg nem található egy válasz sem"}
                                            editButtonOnClick={(e) => {
                                                editingItems.merge([e.currentTarget.value])}
                                            }
                                            doneButtonOnClick={(e) => {
                                                removeFromEditingItems(e.currentTarget.name)
                                                admin.currentlyEdited.video.overlays[index].answers.get().filter((value, indexIn, array) => {
                                                    return value.answer === e.currentTarget.name ? instance.patch("overlays/overlay/"+admin.currentlyEdited.video.overlays[index]._id.get() + "/answer/" + value._id, {
                                                            answer: e.currentTarget.value
                                                        }).then((res) => {
                                                        app.snack.showSnack.set(true)
                                                        app.snack.snackTitle.set("Az NMI válasza sikeresen frissítve.")
                                                    }) : null
                                                })

                                            }}

                                            addButtonOnClick={(e) => {
                                                editingItems.merge(["novalue"])
                                                admin.currentlyEdited.video.overlays[index].answers.merge([{
                                                    _id: "novalue",
                                                    answer: "Nincs érték"
                                                }])
                                            }}
                                            deleteButtonOnClick={(e) => {
                                                removeFromEditingItems(e.currentTarget.name)
                                                admin.currentlyEdited.video.overlays[index].answers.get().filter((value, indexIn, array) => {
                                                    return value.answer === e.currentTarget.name ? admin.currentlyEdited.video.overlays[index].answers[indexIn].merge(none) : null
                                                })

                                                admin.currentlyEdited.video.overlays[index].answers.get().filter((value, indexIn, array) => {
                                                    return value.answer === e.currentTarget.name ? instance.patch("videos/video/"+admin.currentlyEdited.video._id.get() + "/remove", {
                                                        [`overlays.${index}.answers`]: {
                                                                "answer": e.currentTarget.value

                                                        }}).then((res) => {
                                                            app.snack.showSnack.set(true)
                                                            app.snack.snackTitle.set("Az NMI válasza sikeresen frissítve.")
                                                    }) : null
                                                })
                                            }}/>
                        </div>
                    })}
                    <Button variant={"outlined"} className={classes.addNmiQuestionButton} onClick={() => {
                        admin.currentlyEdited.video.overlays.merge([{
                            _id: "",
                            validAnswer: "",
                            type: 1,
                            question: "",
                            timecode: 0,
                            answers: [{
                                _id: "",
                                answer: ""
                            }]
                        }])
                    }}>
                        <Add />
                    </Button>
                </div>
            </div>

        </div>
    </div>
}
