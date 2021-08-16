import React from 'react';
import classes from "./courseTile.module.scss";
import { Gradient } from 'react-gradient';
import { globalConfig } from "../../../../configuration/config";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { animated, useSpring } from "react-spring";
import { NavLink } from "react-router-dom";
import instance from "../../../../services/axiosInstance";
import { Cookies } from "react-cookie";
import { useState } from "@hookstate/core";
import userDetailsState from "../../../../store/user/userSideState";
import applicationRunningState from "../../../../store/application/applicationRunningState";
import { course } from "../../../../store/types/course";
import { Button } from "@material-ui/core";
import Navbar from "../../navigation/navbar/AllNavbar";

const CourseTile = (props: { item: course, itemIndex: number, className?: string }) => {
    const app = useState(applicationRunningState)
    const user = useState(userDetailsState)
    const anim = useSpring({ opacity: 1, from: { opacity: 0 } })
    const cookies = new Cookies();
    const updateCourse = () => {
        instance.patch("/users/" + cookies.get("userId") + "/course/" + props.item._id).then((res) => {
            if (res.status !== 201) {
                console.log("A betöltés sikertelen")
            } else {
                app.activeVideoListItem.set(res.data.items[0]._id)
                user.userData.currentCourse.set(JSON.parse(JSON.stringify(props.item)))
                user.userData.currentItem.set(res.data.items[0])
            }
        })
    }

    const SearchItem = (props: { item: course }) => {
        return <animated.div style={anim} className={classes.searchItem}>
            <div className={classes.videoItemTopWrapper}>
                <animated.img className={classes.videoItemThumbnailImage} style={anim}
                    src={globalConfig.assetStorageUrl + `/courses/${props.item._id}.${"png" || "jpg"}`}
                    onError={(e) => { e.currentTarget.src = "https://picsum.photos/500/350" }} />
                <div className={classes.videoTitleOuterWrapper}>
                    <Gradient className={classes.courseTitleBorder}
                        gradients={[[props.item.colorOne || "grey", props.item.colorTwo || "grey"]]}
                        property="background"
                        duration={3000}
                        angle="45deg" />
                    <div className={classes.videoInteractionsWrapper}>
                        <div className={classes.videoTitleItem}>
                            <h3>{props.item.name}</h3>
                            <span>{props.item.teacherName}</span>
                        </div>
                        <div className={classes.videoInfoInnerWrapper}>
                            <Button>
                                <NavLink to={"/excel-kurzus"}>
                                    Adatlap
                                </NavLink>
                            </Button>
                            <Button className={classes.videoInfoStartButton} onClick={() => {
                                updateCourse()
                            }}>
                                <NavLink to={props.item.items ? `/watch/${props.item._id}/${props.item.items[0]._id}` : "/kurzusok"}>
                                    Indítás
                                </NavLink>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </animated.div>
    }

    return <Grid className={props.className} item xs={12} sm={12} md={6} lg={4} xl={3} >
        <Paper>
            <SearchItem item={props.item} />
        </Paper>
    </Grid>
};

export default CourseTile;
