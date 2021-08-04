import React from 'react';
import classes from "./signupWrapper.module.scss"
import AllNavbar from "../../../../navigation/navbar/AllNavbar";
import {Button, Divider, LinearProgress, LinearProgressProps, Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";

export const SignupWrapper = (props: {
    children: any,
    showUpperTitle?: boolean
    upperTitle?: string
    showProgressCounter?: boolean
    progressCounterValue?: string
    showProgressBar?: boolean
    progressBarValue?: number
    backHandler: (e: React.MouseEvent<any>) => any
    showBackHandler?: boolean
    currentImage: string
}) => {
    const signupNavbar = {
        "middleMenu": [],
        "lastItem": {
            "menuName": "",
            "menuPath": ""
        }
    }

    function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
        return <Box className={classes.progressWrapper}>
            <Box width={"100%"} mr={1}>
                <LinearProgress variant={"determinate"} className={classes.progressBar} {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" className={classes.progressPercentage}>{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    }

    return <div className={classes.signupWrapper}>
        <AllNavbar showHighlightedButton={false}
                   menuItems={signupNavbar}
                   desktopClassName={classes.navbar}
                   showLastButton={false}/>
        <div className={classes.contentWrapper}>
            {props.showUpperTitle && <div className={classes.titleWrapper}>
                <Typography
                    variant={"overline"}>{props.upperTitle}
                </Typography>
            </div>}

            <Divider className={classes.divider}/>

            {props.showBackHandler && <div className={classes.backAndProgress}>
                <Button onClick={props.backHandler}>
                    Vissza
                </Button>
                {props.showProgressCounter && <Typography>{props.progressCounterValue}</Typography>}
            </div>}
        </div>
        <div className={classes.questionAndAnswersOuterWrapper}>
            <img className={classes.questionImage} src={props.currentImage} alt={""}/>
            {props.children}
        </div>
        {props.showProgressBar && <LinearProgressWithLabel value={props.progressBarValue ? props.progressBarValue : 0}/>}
    </div>
};
