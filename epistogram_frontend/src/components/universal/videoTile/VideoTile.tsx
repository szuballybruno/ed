import React from 'react';
import classes from "./videoTile.module.scss";
import {config} from "../../../configuration/config";
import {  item } from '../../../store/types/item';

const VideoTile = (props: {item: item, itemIndex: number}) => {
    return (
        <div className={classes.searchItemWrapper}>
            <div className={classes.searchItem}>
                <div className={classes.videoItemTopWrapper}>
                    <img alt={""} className={classes.videoItemThumbnailImage} src={props.item.thumbnailUrl} />
                </div>
                <div className={classes.videoItemBottomWrapper}>
                    <div className={classes.videoTitleOuterWrapper}>
                        <div className={classes.videoMainTitleItem}>
                            <span>{props.item.title}</span>
                        </div>
                        <div className={classes.videoTitleDivider}/>
                        <div className={classes.videoSubTitleItem}>
                            <span>{props.item.subTitle}</span>
                        </div>
                    </div>
                    <div className={classes.videoInfoOuterWrapper}>
                        <div className={classes.videoInfoItemWrapper}>
                            <img alt="" src={config.assetStorageUrl + "/application/teacher.svg"} />
                            <span>Oktató: {props.item.teacherName}</span>
                        </div>
                        <div className={classes.videoInfoItemWrapper}>
                            <img alt="" src={config.assetStorageUrl + "/application/clock.svg"} />
                            <span>Hossz: {props.item.length + " perc"}</span>
                        </div>
                        <div className={classes.videoInfoItemWrapper}>
                            <img alt="" src={config.assetStorageUrl + "/application/list.svg"} />
                            <span>Kategória: {props.item.teacherName}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoTile;
