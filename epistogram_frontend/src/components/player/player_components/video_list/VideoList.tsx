import React from 'react';
import classes from './videoList.module.scss';
import {useState} from "@hookstate/core";
import userDetailsState from "../../../../store/user/userSideState";
import instance from "../../../../services/axiosInstance";
import {Cookies} from "react-cookie";
import ListItem from "../../../universal/atomic/listItem/ListItem";
import applicationRunningState from "../../../../store/application/applicationRunningState";
import {Slider} from "@material-ui/core";
import {item} from "../../../../store/types/item";
import {useParams} from "react-router";
import {updateActivity} from "../../../../services/updateActivity";
import {DialogFrame} from "../../../../HOC/dialog_frame/DialogFrame";
import {useHistory} from "react-router-dom";
import {globalConfig} from "../../../../configuration/config";

const VideoList = () => {
    const user = useState(userDetailsState)
    const app = useState(applicationRunningState)
    const history = useHistory()

    const {courseId, id} = useParams<{ courseId: string, id: string }>();

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

    const cookies = new Cookies();

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
            instance.patch(`/users/${cookies.get("userId")}/course/${courseId}/item/${id}`).then((res) => {
                if (res.status === 201) {
                    user.userData.currentItem.set(res.data.currentItem)
                    user.userData.currentCourse.set(res.data.currentCourse)
                }
            }).catch((e) => {

            })
        }
    }


    return user.userData.currentCourse.name.get() ? <div className={classes.videoListWrapper}>
            <div className={classes.videoListInnerWrapper}>
                <div className={classes.learningTypeSelector}>
                    <Slider className={classes.slider}
                            defaultValue={30}
                            aria-labelledby="discrete-slider"
                            step={30}
                            marks={marks}
                            min={30}
                            max={90}/>
                </div>
                <div className={classes.videoWrapper}>
                    {user.userData.currentCourse.items.get().map((item, index) => {
                        return item.type === "video" ?
                            <ListItem active={app.activeVideoListItem.get() === item._id}
                                      key={index}
                                      mainTitle={item.title}
                                      subTitle={item.subTitle}
                                      to={"/watch/" + user.userData.currentCourse._id.get() + "/" + item._id}
                                      thumbnailUrl={item.thumbnailUrl}
                                      onClick={() => {
                                          updateActivity("",
                                              "selectVideo",
                                          window.location.href,
                                          "VideoList-ListItems-SelectsNewVideo",
                                          item.title,
                                          "collBasedPassive",
                                          "A felhasználó kiválaszt egy videót",
                                          true,
                                          undefined,
                                          undefined,
                                          "videos",
                                          "_id",
                                          item._id,
                                          index.toString(),
                                              globalConfig.siteUrl + "watch/" + user.userData.currentCourse._id.get() + "/" + item._id)
                                          //updateActivity("collBasedActive", "selectVideo", "A felhasználó kiválaszt egy másik videót", window.location.href, "VideoList-ListItems-SelectsNewVideo", item.videoMainTitle, "" + index)
                                          setCurrentItem(item)
                                      }}/> :
                            <ListItem active={app.activeVideoListItem.get() === item._id}
                                      className={app.showPlayerOrExam.get() ? [classes.quiz, classes.selectedQuiz].join(' ') : [classes.quiz].join('')}
                                      mainTitle={"Vizsga"}
                                      subTitle={"Teszteld a tudásod"}
                                      onClick={() => {
                                          updateActivity("","selectExam",
                                              window.location.href,
                                              "VideoList-ListItems-SelectsNewExam",
                                              item.name as string,
                                              "collBasedPassive",
                                              "A felhasználó kiválaszt egy vizsgát",
                                              true,
                                              undefined,
                                              undefined,
                                              "exams",
                                              "_id",
                                              item._id,
                                              index.toString(),
                                              globalConfig.siteUrl + "/watch/" + user.userData.currentCourse._id.get() + "/" + item._id)
                                          setCurrentItem(item)
                                      }}/>
                    })}
                </div>
            </div>
        </div> : <div style={{backgroundColor: "white"}}/>
}

export default VideoList
