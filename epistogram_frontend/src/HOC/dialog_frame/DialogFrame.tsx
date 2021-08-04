import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import React from "react";
import {useState} from "@hookstate/core";
import applicationRunningState from "../../store/application/applicationRunningState";

export const DialogFrame = (props: {
    children: JSX.Element;
    history?: any,
    firstButtonOnClick: any,
    secondButtonOnClick: any,
    className?: any
}) => {
    const app = useState(applicationRunningState)

    return <div className={props.className} style={{width: "100%"}}>
        <Dialog
            open={app.alert.showAlert.get()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            style={{
                zIndex: 10000
            }}
        >
            <DialogTitle id="alert-dialog-title">{app.alert.alertTitle.get()}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {app.alert.alertDescription.get()}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {app.alert.showFirstButton.get() ? <Button color="primary"
                                                           onClick={props.firstButtonOnClick}>
                    {app.alert.firstButtonTitle.get()}
                </Button> : null}

                {app.alert.showSecondButton.get() ?
                    <Button onClick={props.secondButtonOnClick}
                            color="primary"
                            autoFocus>
                        {app.alert.secondButtonTitle.get()}
                    </Button> : null}
            </DialogActions>
        </Dialog>
        {props.children as JSX.Element}
    </div>
}
