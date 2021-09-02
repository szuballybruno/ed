import { Typography } from "@material-ui/core";
import React from 'react';
import classes from './playerDescription.module.scss';

const PlayerDescription = (props: { description: string }) => {

    // const breakText = (inputText: string) => {
    //     try {
    //         const text = inputText.split("<br />");
    //         return text.map((textike: string, index: number) => {
    //             return <p key={index}>{text[index]}<br /></p>;
    //         });
    //     } catch {
    //         return "";
    //     }
    // };

    return (
        <div className={classes.descriptionWrapper}>
            <div className={classes.innerDescriptionWrapper}>
                <div className={classes.descriptionTextWrapper}>
                    {/* <Typography>{breakText(props.description)}</Typography> */}
                    {props.description}
                </div>
            </div>
        </div>
    )
};

export default PlayerDescription
