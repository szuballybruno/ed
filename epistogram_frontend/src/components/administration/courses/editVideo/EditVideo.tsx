import { Divider, List, Typography } from "@mui/material";
import React from 'react';
import { getEventFileCallback, getEventValueCallback } from "../../../../frontendHelpers";
import SelectImage from "../../../selectImage/SelectImage";
import EditItem from "../../../universal/editItem/EditItem";
import classes from "./editItemPage.module.scss";

export const EditVideo = () => {

    const [editedVideoTitle, setEditedVideoTitle] = React.useState("")
    const [editedVideoSubTitle, setEditedVideoSubTitle] = React.useState("")
    const [editedVideoURL, setEditedVideoURL] = React.useState("")
    const [editedVideoDescription, setEditedVideoDescription] = React.useState("")
    const [editedVideoThumbnailImage, setEditedVideoThumbnailImage] = React.useState("")
    const [editedVideoThumbnailURL, setEditedVideoThumbnailURL] = React.useState("")

    return <div className={classes.editCourseWrapper}>
        <Divider style={{
            width: "100%"
        }} />
        <div className={classes.editDataOuterWrapper}>
            <div className={classes.editDataInnerWrapper}>

                <div className={classes.editDataLeftWrapper}>
                    <div className={classes.editDataListWrapper}>

                        <SelectImage onChange={getEventFileCallback(setEditedVideoThumbnailImage)}
                            uploadedImageUrls={[editedVideoThumbnailURL]}
                            title={"Thumbnail kép"} />

                        <Typography variant={"overline"}>Alapadatok</Typography>

                        <List component="nav"
                            aria-labelledby="nested-list-subheader"
                            className={classes.tagList}>

                            <EditItem value={editedVideoTitle}
                                title={"Cím"}
                                onChange={getEventValueCallback(setEditedVideoTitle)}
                                name={"editedVideoTitle"} />
                            <EditItem value={editedVideoSubTitle}
                                title={"Alcím"}
                                onChange={getEventValueCallback(setEditedVideoSubTitle)}
                                name={"editedVideoSubTitle"} />
                            <EditItem value={editedVideoURL}
                                title={"URL"}
                                onChange={getEventValueCallback(setEditedVideoURL)}
                                name={"editedVideoURL"} />
                            <EditItem value={editedVideoDescription}
                                title={"Leírás"}
                                onChange={getEventValueCallback(setEditedVideoDescription)}
                                name={"editedVideoDescription"} />

                        </List>

                        <div className={classes.editTagsWrapper}>
                            {/*There should be a tag selector*/}
                        </div>

                    </div>
                </div>

                <Divider orientation={"vertical"} />

                <div className={classes.editDataRightWrapper}>
                    <Typography variant={"overline"} style={{ margin: "10px 0 0 0" }}>NMI Kérdések</Typography>
                    {/*{editedVideoOverlays.map((item, index) => {
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
                    </Button>*/}
                </div>

            </div>
        </div>
    </div>
}
