import React from 'react';
import classes from './articlesListItem.module.scss'
import {State} from "@hookstate/core";

const ArticlesListItem = (props: {
    articleItem: {
        articleCoverImage: string,
        articleTitle: string,
        articleDescription: string,
        paid: boolean
    },
    articleIndex: number,
    currentArticle: State<{
        index: number,
        articleCoverImage: string
    }>}) => {

    function shorten(str: string, maxLen: number, separator: string = ' ') {
        if (str.length <= maxLen) return str;
        return str.substr(0, str.lastIndexOf(separator, maxLen)) + "...";
    }
    return (
        <div className={classes.articlesListItem} onClick={() => {
            props.currentArticle.index.set(props.articleIndex);
            props.currentArticle.articleCoverImage.set(props.articleItem.articleCoverImage)
        }}>
            <img alt={""} className={classes.articlesListItemImage} src={props.articleItem.articleCoverImage} />
            <div className={classes.articleIndicatorWrapper}>
                <div className={props.articleItem.paid ? `${classes.articleIndicator} ${classes.paidArticle}` : classes.articleIndicator} />
            </div>
            <div className={classes.articleDataWrapper}>
                <h1 className={classes.articleTitle}>
                    {props.articleItem.articleTitle}
                </h1>
                <p className={classes.articleDescription}>
                    {shorten(props.articleItem.articleDescription, 60 )}
                </p>
            </div>
        </div>
    );
};

export default ArticlesListItem;