import { useState } from "@hookstate/core";
import { Slider } from "@material-ui/core";
import React from 'react';
import { useHistory } from "react-router-dom";
import { VideoDTO } from "../../../../models/shared_models/VideoDTO";
import applicationRunningState from "../../../../store/application/applicationRunningState";
import { item } from "../../../../store/types/item";
import userDetailsState from "../../../../store/user/userSideState";
import ListItem from "../../../universal/atomic/listItem/ListItem";
import classes from './videoList.module.scss';

const VideoList = () => {

    const videoList = [] as VideoDTO[];
    const currentCourseItemId = 0;
    const courseId = 0;

    const user = useState(userDetailsState)
    const app = useState(applicationRunningState)
    const history = useHistory()

    const currentLoadedItem = useState({
        _id: "",
        type: "",
        title: "",
        subTitle: "",
        url: "",
        length: 0,
        description: "",
        thumbnailUrl: "",
        teacherName: "",
        showAutomaticOverlay: false,
        overlays: [{
            _id: "",
            type: 0,
            question: "",
            timecode: 0,
            answers: [{
                _id: "",
                answer: ""
            }],
            validAnswer: ""
        }],
    })

    const marks = [
        {
            value: 30,
            label: 'Alapértelmezett',
        },
        {
            value: 60,
            label: 'Áttekintés',
        },
        {
            value: 90,
            label: 'Ismétlés',
        }
    ];

    const setCurrentVideo = () => {
        app.alert.showAlert.set(false)
        app.activeVideoListItem.set(user.userData.currentItem._id.get())
        return history.push(`/watch/${user.userData.currentCourse._id.get()}/${user.userData.currentItem._id.get()}`);
    }

    const stopExam = () => {
        user.userData.currentItem.set(JSON.parse(JSON.stringify(currentLoadedItem.get())))
        app.activeVideoListItem.set(JSON.parse(JSON.stringify(currentLoadedItem._id.get())))
        app.showPlayerOrExam.set(false)
        app.alert.showAlert.set(false)
    }

    const setCurrentItem = (item: item) => {
        if (app.showPlayerOrExam.get()) {
            app.alert.set({
                alertTitle: "Biztosan megszakítod a vizsgát?",
                targetLocation: "",
                alertDescription: "Figyelem! Ha most kilépsz, a jelenlegi vizsgád elveszik és nem kezdhető újra.",
                showFirstButton: true,
                firstButtonTitle: "Mégse",
                showSecondButton: true,
                secondButtonTitle: "Igen",
                showAlert: true
            })
            currentLoadedItem.set(JSON.parse(JSON.stringify(item)))

        } else {
            app.shouldViewOverlay.set(false)
            app.showPlayerOrExam.set(item.type === "exam")
            app.activeVideoListItem.set(item._id)

            // instance.patch(`/users/${cookies.get("userId")}/course/${courseId}/item/${id}`).then((res) => {
            //     if (res.status === 201) {
            //         user.userData.currentItem.set(res.data.currentItem)
            //         user.userData.currentCourse.set(res.data.currentCourse)
            //     }
            // }).catch((e) => {

            // })
        }
    }

    return (
        <div className={classes.videoListWrapper}>
            <div className={classes.videoListInnerWrapper}>
                <div className={classes.learningTypeSelector}>
                    <Slider className={classes.slider}
                        defaultValue={30}
                        aria-labelledby="discrete-slider"
                        step={30}
                        marks={marks}
                        min={30}
                        max={90} />
                </div>
                <div className={classes.videoWrapper}>
                    {videoList
                        .map((item, index) => {

                            const isActiveItem = item.id == currentCourseItemId;

                            return item.type === "video"
                                ? <ListItem
                                    active={isActiveItem}
                                    key={index}
                                    mainTitle={item.title}
                                    subTitle={item.subTitle}
                                    to={"/watch/" + courseId + "/" + item.id}
                                    thumbnailUrl={item.thumbnailUrl}
                                    onClick={() => {

                                        //updateActivity("collBasedActive", "selectVideo", "A felhasználó kiválaszt egy másik videót", window.location.href, "VideoList-ListItems-SelectsNewVideo", item.videoMainTitle, "" + index)
                                        // setCurrentItem(item)
                                    }} />
                                : <ListItem
                                    active={isActiveItem}
                                    className={app.showPlayerOrExam.get() ? [classes.quiz, classes.selectedQuiz].join(' ') : [classes.quiz].join('')}
                                    mainTitle={"Vizsga"}
                                    subTitle={"Teszteld a tudásod"}
                                    onClick={() => {

                                        // setCurrentItem(item)
                                    }} />
                        })}
                </div>
            </div>
        </div>
    )
}

export default VideoList

// updateActivity("",
//                                             "selectVideo",
//                                             window.location.href,
//                                             "VideoList-ListItems-SelectsNewVideo",
//                                             item.title,
//                                             "collBasedPassive",
//                                             "A felhasználó kiválaszt egy videót",
//                                             true,
//                                             undefined,
//                                             undefined,
//                                             "videos",
//                                             "_id",
//                                             item.id,
//                                             index.toString(),
//                                             currentOrigin + "watch/" + user.userData.currentCourse._id.get() + "/" + item._id)

// updateActivity("", "selectExam",
//                                     window.location.href,
//                                     "VideoList-ListItems-SelectsNewExam",
//                                     item.name as string,
//                                     "collBasedPassive",
//                                     "A felhasználó kiválaszt egy vizsgát",
//                                     true,
//                                     undefined,
//                                     undefined,
//                                     "exams",
//                                     "_id",
//                                     item._id,
//                                     index.toString(),
//                                     currentOrigin + "/watch/" + user.userData.currentCourse._id.get() + "/" + item._id)