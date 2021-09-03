import React from 'react';
import classes from './comments.module.scss';
import {DiscussionEmbed} from 'disqus-react';
import {useState} from "@hookstate/core";
import userDetailsState from "../../../../../store/user/userSideState";

const Comments = () => {
    const user = useState(userDetailsState)
    return (
        <div className={classes.commentsWrapper}>
            <div className={classes.commentsInnerWrapper}>
                <div>
                    <h1>Mondd el nekünk a véleményed</h1>
                </div>
                <DiscussionEmbed
                    shortname='quarantrainer'
                    config={
                        {
                            url: "http://quarantrainer.fit" + user.userData.currentItem._id.get(),
                            identifier: user.userData.currentItem._id.get(),
                            title: user.userData.currentItem.title.get(),
                        }
                    }
                />
            </div>
        </div>
    )
};

export default Comments;
