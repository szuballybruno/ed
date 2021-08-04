import React, {useEffect} from 'react';
import {useState} from "@hookstate/core";
import applicationRunningState from "../../../../store/application/applicationRunningState";
import NmiOne from "./NmiOne";
import NmiTwo from './NmiTwo';
import userSideState from "../../../../store/user/userSideState";
import classes from "./overlay.module.scss"
import {updateActivity} from "../../../../services/updateActivity";

const Overlay = (props: { children: React.ReactNode; currentSeekSliderValue: number }) => {
    const user = useState(userSideState)
    const app = useState(applicationRunningState)


   useEffect(() => {
        if (props.currentSeekSliderValue === user.userData.currentItem.overlays[0].timecode.get() && props.currentSeekSliderValue !== 0 && user.userData.currentItem.overlays[0].timecode.get() !== 0) {
            app.shouldPlayVideo.set(false)
            updateActivity(
                "",
                "openNMI",
                window.location.href as string,
                "Overlay-useEffect",
                "useEffect",
                "collBasedActive",
                "NMI megnyitva",
                false,
                undefined,
                undefined,
                "videos",
                "_id",
                user.userData.currentItem._id.get(), undefined, undefined)
            return app.shouldViewOverlay.set(true)
        }
        // eslint-disable-next-line
    },[props.currentSeekSliderValue])



    const overlays: {[key: number]: JSX.Element} = {
        0: <NmiOne />,
        1: <NmiTwo />
    }


    return <div className={classes.overlayWrapper}>
        {app.shouldViewOverlay.get() ? overlays[user.userData.currentItem.overlays[0].type.get() || 0] : null}
        <div className={app.shouldViewOverlay.get() ? classes.blur : ""}>{props.children}</div>
    </div>
};

export default Overlay
