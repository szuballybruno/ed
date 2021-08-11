/* Stage 1 kész
* Finomhangolások: TODO:
*                   - Fallback image létrehozása
*                   - Saját loadIndicator használata külön
*                   - Reszponzívitás
*
*/

import React, {useEffect} from 'react';
import classes from "./articles.module.scss";
import './components/carouselStyles.scss'
import {State, useState} from "@hookstate/core";
import ArticlesListItem from "./components/ArticlesListItem";
import applicationRunningState from "../../../../store/application/applicationRunningState";
import instance from "../../../../services/axiosInstance";
import {globalConfig} from "../../../../configuration/config";

const Articles = () => {
    const app = useState(applicationRunningState)

    useEffect(() => {
        instance.get(globalConfig.backendUrl + "articles/getarticles").then((res) => {
            if (res.data) {
                app.articles.set(res.data)
                app.loadingIndicator.set("succeeded")
            } else {
                app.loadingIndicator.set("failed")
            }
        })
        // eslint-disable-next-line
    }, [])


    const currentArticle: State<{ articleCoverImage: string; index: number }> = useState({
        index: 0,
        articleCoverImage: ""
    })

    return (
        <div className={classes.secondRowArticlesContainer}>
            <div className={classes.carouselWrapper}>
                {app.articles.get().map((article, index) => {
                    const localArticle = <a className={classes.articleLink} href={article.articleUrl} target="_blank" rel="noopener noreferrer" >
                        <div className={classes.secondRowArticlesInnerContainer}>
                            <img alt="" src={article.articleCoverImage} />
                            <div className={classes.articleItem}>
                                <h1>{article.articleTitle}</h1>
                                <p>{article.articleDescription}</p>
                            </div>
                        </div>
                    </a>
                    if (currentArticle.index.get() === index) {
                        return localArticle
                    } else {
                        return <div />
                    }
                })}
            </div>
            <div className={classes.articlesList} >
                {app.articles.get().map((article, index) => {
                    return <ArticlesListItem articleItem={article}
                                             articleIndex={index}
                                             currentArticle={currentArticle} />
                })}
            </div>
        </div>
    );
};

export default Articles;
