import React from 'react';
import classes from "./editItemPage.module.scss";
import SelectImage from "../../../universal/selectImage/SelectImage";
import {Button, Divider, List, Typography} from "@material-ui/core";
import {useState} from "@hookstate/core";
import adminSideState from '../../../../../store/admin/adminSideState';
import {useParams} from "react-router";
import EditItem from "../../../../universal/atomic/editItem/EditItem";
import {Add} from "@material-ui/icons";
import {SelectRadio} from "../../SelectRadio";

type TagType = {
    tagId: string
    tagName: string
}

export const EditItemPage = () => {
    const admin = useState(adminSideState)

    const allTags = [] as TagType[]

    const [file, setFile] = React.useState<string | Blob>("")

    const { courseId, itemId } = useParams<{ courseId: string, itemId: string }>();

    const selectImage = (e) => {
        if (e.currentTarget.files) {
            setEditedVideoThumbnailURL(URL.createObjectURL(e.currentTarget.files[0]));
            setFile(e.currentTarget.files[0])

            new FormData()
            e.preventDefault();
            let formdata =  new FormData()

            formdata.append('file', e.currentTarget.files[0])
        }
    }

    const editedVideoTitle = admin.currentlyEdited.video.title.get()
    const setEditedVideoTitle = admin.currentlyEdited.video.title.set

    const editedVideoSubTitle = admin.currentlyEdited.video.subTitle.get()
    const setEditedVideoSubTitle = admin.currentlyEdited.video.subTitle.set

    const editedVideoURL = admin.currentlyEdited.video.url.get()
    const setEditedVideoURL = admin.currentlyEdited.video.url.set

    const editedVideoDescription = admin.currentlyEdited.video.description.get()
    const setEditedVideoDescription = admin.currentlyEdited.video.description.set

    const editedVideoThumbnailURL = admin.currentlyEdited.video.thumbnailUrl.get()
    const setEditedVideoThumbnailURL = admin.currentlyEdited.video.thumbnailUrl.set

    const editedVideoTags = admin.currentlyEdited.video.tags.get()
    const setEditedVideoTags = admin.currentlyEdited.video.tags.set

    const editedVideoOverlays = admin.currentlyEdited.video.overlays.get()
    const setEditedVideoOverlays = admin.currentlyEdited.video.overlays.set




    return <div className={classes.editCourseWrapper}>
        <Divider style={{
            width: "100%"
        }} />
        <div className={classes.editDataOuterWrapper}>
            <div className={classes.editDataInnerWrapper}>

                <div className={classes.editDataLeftWrapper}>
                    <div className={classes.editDataListWrapper}>

                        <SelectImage onChange={selectImage}
                                     uploadedImageUrls={[editedVideoThumbnailURL]}
                                     title={"Thumbnail kép"}/>

                        <Typography variant={"overline"}>Alapadatok</Typography>

                        <List component="nav"
                              aria-labelledby="nested-list-subheader"
                              className={classes.tagList}>

                            <EditItem value={editedVideoTitle}
                                      title={"Cím"}
                                      onChange={() => {}}
                                      name={"editedVideoTitle"}/>
                            <EditItem value={editedVideoSubTitle}
                                      title={"Alcím"}
                                      onChange={() => {}}
                                      name={"editedVideoSubTitle"}/>
                            <EditItem value={editedVideoURL}
                                      title={"URL"}
                                      onChange={() => {}}
                                      name={"editedVideoURL"}/>
                            <EditItem value={editedVideoDescription}
                                      title={"Leírás"}
                                      onChange={() => {}}
                                      name={"editedVideoDescription"}/>

                        </List>

                        <div className={classes.editTagsWrapper}>
                            <SelectRadio items={allTags} radioButtonOnChange={() => {}} itemValueOnChange={() => {}} name={""} onClick={() => {}} title={"Tagek (ide majd selectcheckbox)"} />
                        </div>

                    </div>
                </div>

                <Divider orientation={"vertical"} />

                <div className={classes.editDataRightWrapper}>
                    <Typography variant={"overline"} style={{margin: "10px 0 0 0"}}>NMI Kérdések</Typography>
                    {editedVideoOverlays.map((item, index) => {
                        return <div className={classes.editOverlayWrapper}>
                            <EditItem title={"Kérdés"}
                                      name={"editedVideoOverlayQuestion"}
                                      value={editedVideoOverlays[index].question}
                                      onChange={(e: React.ChangeEvent<any>) => {
                                          return admin.currentlyEdited.video.overlays[0].question.set(e.currentTarget.value)
                                      }}/>
                            <EditItem title={"Megjelenés ideje"} name={item.timecode + "mp"} />
                            <SelectRadio items={item.answers} radioButtonOnChange={() => {}} itemValueOnChange={() => {}} name={""} onClick={() => {}} title={"Overlay válaszok"} />
                        </div>
                    })}
                    <Button variant={"outlined"} className={classes.addNmiQuestionButton} onClick={() => {
                        setEditedVideoOverlays([...editedVideoOverlays, {
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
