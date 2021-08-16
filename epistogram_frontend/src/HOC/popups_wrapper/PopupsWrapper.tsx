import React from 'react';
import classes from './popupsWrapper.module.scss'
import {
    Button,
    IconButton,
    Slide,
    Snackbar
} from "@material-ui/core";
import {CloseTwoTone} from "@material-ui/icons";
import {useState} from "@hookstate/core";
import applicationRunningState from "../../store/application/applicationRunningState";
import {TransitionProps} from "@material-ui/core/transitions";
import userDetailsState from "../../store/user/userSideState";

export const PopupsWrapper = (props: { children: JSX.Element; history?: any }) => {
    const app = useState(applicationRunningState)
    const user = useState(userDetailsState)


    function SlideTransition(props: TransitionProps) {
        return <Slide {...props} direction="right" />;
    }

    /* app.alert.alertType.get() === "stopCourse" ? stopExam : redirectToCourseSearch*/
    return (
        <div className={classes.snackbarWrapper}>
            <Snackbar
                className={classes.snackbar}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={app.snack.showSnack.get()}
                autoHideDuration={6000}
                onClose={() => {
                    app.snack.showSnack.set(false)
                }}
                TransitionComponent={SlideTransition}
                message={app.snack.snackTitle.get()}
                action={
                    <React.Fragment>
                        {app.snack.showSnackButton.get() ? <Button color="secondary" size="small" onClick={() => {}}>
                            Visszavonás
                        </Button> : null}
                        <IconButton size="small" aria-label="close" color="inherit" onClick={() => {app.snack.showSnack.set(false)}}>
                            <CloseTwoTone fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
            {props.children as JSX.Element}
        </div>
    );
}
