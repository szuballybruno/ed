import React from 'react';
import classes from "./courseTile.module.scss";
import ReactImageFallback from "react-image-fallback";
import {course} from "../../../globalStates/types"
import teacher from "./teacher.svg"
import clock from "./clock.svg"
import list from "./list.svg"
import {useState} from "@hookstate/core";
import userSideState from "../../../globalStates/userSideState";
import { Gradient } from 'react-gradient';
import {NavLink} from "react-router-dom";
import instance from "../../../helpers/axiosInstance";

const CourseTile = (props: {item: course, itemIndex: number}) => {
    const user = useState(userSideState)
    const isFlipped = useState(false)

    const updateCurrentCourse  = () => {

    }

    return isFlipped.get() ? <div className={`${classes.searchItemFrontWrapper} ${classes.searchItemFlipped}`}
                                  onMouseEnter={() =>{isFlipped.get() ? isFlipped.set(false) : isFlipped.set(true)}}
                                  onMouseLeave={() =>{isFlipped.get() ? isFlipped.set(false) : isFlipped.set(true)}}>
        <div className={classes.searchItemBackInnerWrapper}>
            <div className={classes.searchItem}>
                <div className={classes.videoItemTopWrapper}>
                    <ReactImageFallback className={classes.videoItemThumbnailImage}
                                        src={`https://itsfourothree.hu/uploads/videoThumbnailUrls/${props.item._id}.${"jpg" || "png"}`}
                                        fallbackImage={`https://itsfourothree.hu/uploads/videoThumbnailUrls/${props.item._id}.${"jpg" || "png"}`} />
                </div>
                <Gradient className={classes.videoItemBottomWrapper}
                          gradients={
                              [
                                  [props.item.colorOne || "grey", props.item.colorTwo || "grey"]
                              ]
                          }
                          property="background"
                          duration={ 3000 }
                          angle="45deg">
                    <div className={classes.videoTitleOuterWrapper}>
                        <div className={classes.videoSubTitleItem}>
                            <span>{props.item.name}</span>
                        </div>
                    </div>
                    <div className={classes.videoInfoOuterWrapper}>
                        <div className={classes.videoInfoItemWrapper}>
                            <img src={teacher} />
                            <span>Oktató: {props.item.teacherName}</span>
                        </div>
                        <div className={classes.videoInfoItemWrapper}>
                            <img src={clock} />
                            <span>Hossz: {props.item.videosCount}</span>
                        </div>
                        <div className={classes.videoInfoItemWrapper}>
                            <img src={list} />
                            <span>Kategória: {props.item.category}</span>
                        </div>
                    </div>
                </Gradient>
            </div>
            <div className={classes.courseItemFlippedWrapper}>
                <NavLink to={"/cyberbiztonsag"}>
                    <button className={classes.courseOptionButton}>A kurzus adatlapja</button>
                </NavLink>
                <button className={classes.courseOptionButton} onClick={() => {
                    user.course.set(JSON.parse(JSON.stringify(props.item)))
                }}>A kurzus kiválasztása</button>
            </div>
        </div>
    </div> : <div className={classes.searchItemFrontWrapper} onMouseEnter={() =>{isFlipped.get() ? isFlipped.set(false) : isFlipped.set(true)}}>
        <div className={classes.searchItem}>
            <div className={classes.videoItemTopWrapper}>
                <ReactImageFallback className={classes.videoItemThumbnailImage}
                                    src={`https://itsfourothree.hu/uploads/videoThumbnailUrls/${props.item._id}.${"jpg"|| "png"}`}
                                    fallbackImage={`https://itsfourothree.hu/uploads/videoThumbnailUrls/${props.item._id}.${"jpg" || "png"}`} />
            </div>
            <Gradient className={classes.videoItemBottomWrapper}
                      gradients={
                          [
                              [props.item.colorOne || "grey", props.item.colorTwo || "grey"]
                          ]
                      }
                      property="background"
                      duration={ 3000 }
                      angle="45deg">
                <div className={classes.videoTitleOuterWrapper}>
                    <div className={classes.videoSubTitleItem}>
                        <span>{props.item.name}</span>
                    </div>
                </div>
                <div className={classes.videoInfoOuterWrapper}>
                    <div className={classes.videoInfoItemWrapper}>
                        <img src={teacher} />
                        <span>Oktató: {props.item.teacherName}</span>
                    </div>
                    <div className={classes.videoInfoItemWrapper}>
                        <img src={clock} />
                        <span>Hossz: {props.item.courseLength + " videó"}</span>
                    </div>
                    <div className={classes.videoInfoItemWrapper}>
                        <img src={list} />
                        <span>Kategória: {props.item.category}</span>
                    </div>
                </div>
            </Gradient>
        </div>
    </div>
};

export default CourseTile;