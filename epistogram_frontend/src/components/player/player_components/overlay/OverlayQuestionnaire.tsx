import React, { useEffect } from 'react';
import NmiOne from "./NmiOne";
import NmiTwo from './NmiTwo';
import classes from "./overlay.module.scss"
import { Box } from '@chakra-ui/react';

export const OverlayQuestionnaire = (props: { children: React.ReactNode; currentSeekSliderValue: number }) => {

    return <Box>

        {props.children}
    </Box>;

    // const user = useState(userDetailsState)
    // const app = useState(applicationRunningState)

    // useEffect(() => {
    //     if (props.currentSeekSliderValue === user.userData.currentItem.overlays[0].timecode.get() && props.currentSeekSliderValue !== 0 && user.userData.currentItem.overlays[0].timecode.get() !== 0) {
    //         app.shouldPlayVideo.set(false)

    //         return app.shouldViewOverlay.set(true)
    //     }
    //     // eslint-disable-next-line
    // }, [props.currentSeekSliderValue])

    // const overlays: { [key: number]: JSX.Element } = {
    //     0: <NmiOne />,
    //     1: <NmiTwo />
    // }

    // return <div id="overlayRoot" className={classes.overlayWrapper}>
    //     {app.shouldViewOverlay.get() ? overlays[user.userData.currentItem.overlays[0].type.get() || 0] : null}
    //     <Box id="overlayInner" width="100%" height="100%" className={app.shouldViewOverlay.get() ? classes.blur : ""}>
    //         {props.children}
    //     </Box>
    // </div>
};

// updateActivity(
//     "",
//     "openNMI",
//     window.location.href as string,
//     "Overlay-useEffect",
//     "useEffect",
//     "collBasedActive",
//     "NMI megnyitva",
//     false,
//     undefined,
//     undefined,
//     "videos",
//     "_id",
//     user.userData.currentItem._id.get(), undefined, undefined)