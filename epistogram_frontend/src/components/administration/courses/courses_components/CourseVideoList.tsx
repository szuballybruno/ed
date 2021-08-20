import React, {useEffect} from 'react';
import classes from "./courseVideoList.module.scss"
import {none, useState} from "@hookstate/core";
import instance from "../../../../services/axiosInstance";
import AdminDashboardSearchItem from "../../universal/adminDashboardSearchItem/AdminDashboardSearchItem";
import {globalConfig} from "../../../../configuration/config";
import UserStatistics from "../../users/users_components/userStatistics/UserStatistics";
import {Typography} from "@material-ui/core";
import adminSideState from '../../../../store/admin/adminSideState';
import { backendUrl } from '../../../../Environemnt';

export const CourseVideoList = (props: {courseId: string}) => {
    const admin = useState(adminSideState)

    const items = useState([{
        _id: "",
        type: "",
        title: "",
        subTitle: "",
        url: "",
        thumbnailUrl: "",
        teacherName: "",
        courseName: "",
        overlaysCount: 0,
        length: 0,
        watchCount: 0,
        uploadTime: "",
        name: "",
        examQuestions: [{
            questionValue: "",
            questionAnswers: [{
                answerValue: "",
                isTheAnswerTrue: false,
            }]
        }]
    }])
    useEffect(() => {
        instance.get(`/courses/course/${props.courseId}`).then((res) => {
            return items.set(res.data.items)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <div className={classes.itemsContainer}>
            {items.get() ? items.get().map((item, index) => {
                return item.type === "video" ? <AdminDashboardSearchItem title={item.title}
                                                 thumbnailUrl={item.thumbnailUrl}
                                                 chips={[
                                                     {label: "item.watchCount.toString()", icon: "play"},
                                                     {label: item.overlaysCount.toString(), icon: "overlay"},
                                                     {label: Math.round(item.length / 60) + " perc", icon: "length"}]}

                                                 key={item._id}
                                                 actions={[
                                                     {
                                                         to: `/admin/manage/courses/${admin.currentlyEdited.course._id.get()}/item/${item._id}`, // Ezt a komponenst szerkeszteni, hogy elfogadjon más URL-t is.
                                                         icon: "edit",
                                                         onClick: () => {

                                                         }
                                                     }, {
                                                         selectedComponent: "userStatistics",
                                                         icon: "statistics",
                                                         onClick: () => {

                                                         }
                                                     }, {
                                                         icon: "delete",
                                                         onClick: () => {
                                                            instance.delete(`${backendUrl}videos/deletevideo?videoId=${item._id}`).then(() => {
                                                                return items[index].set(none)
                                                            }).catch(e => console.error(e.toString()))
                                                         }
                                                    },]
                                                }
                                                userActionComponents={{
                                                    editCourse: <div>asd</div>,
                                                    videoStatistics: <UserStatistics />
                                                }} /> : null
            }) : <div className={classes.noCourseContainer}><Typography>Ez a kurzus még nem tartalmaz egy videót sem.</Typography></div>}
        </div>
    );
};
