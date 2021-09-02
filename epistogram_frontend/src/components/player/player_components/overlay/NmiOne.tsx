import React, { useEffect } from 'react';
import classes from "./nmiOne.module.scss";
import { globalConfig } from "../../../../configuration/config";
import { Button, Typography } from "@material-ui/core";
import { ChangeHistory, CheckBoxOutlineBlank, RadioButtonUnchecked } from "@material-ui/icons";
import { Box } from '@chakra-ui/react';

const NmiOne = () => {

    const handleClick = (e: any, item: {
        displayName: string,
        affix: string,
        name: string
    }, index: number) => {
        if (item.name === currentNmiObjects[nmiState.get()].name) {
            app.shouldViewOverlay.set(false)
            app.shouldPlayVideo.set(true)
        }
    }

    const currentNmiObjects = [{
        "displayName": "zöld háromszög",
        "affix": "et",
        "name": "triangle",
        "component": <ChangeHistory className={classes.greenTriangle} />
        //"img": `${config.assetStorageUrl}/application/circle_yellow.svg`
    }, {
        "displayName": "piros négyzet",
        "affix": "et",
        "name": "square",
        "component": <CheckBoxOutlineBlank className={classes.redSquare} />
        //"img": `${config.assetStorageUrl}/application/square_red.svg`
    }, {
        "displayName": "sárga kör",
        "affix": "t",
        "name": "circle",
        "component": <RadioButtonUnchecked className={classes.yellowCircle} />
        //"img": `${config.assetStorageUrl}/application/triangle_green.svg`
        /*<img onCompositionStart={() => {nmiState.set(index)}}
                             onClick={(e) => handleClick(e, item, index)}
                             src={item.img}
                             alt="" />*/
    }]

    return (
        <div className={classes.modalDiv}>
            <div className={classes.nmiModalText}>
                <Typography variant={"button"}>{`Kérlek válaszd ki a ${currentNmiObjects[nmiState.get()].displayName}${currentNmiObjects[nmiState.get()].affix}`}</Typography>
            </div>
            <div className={classes.nmiButtonsWrapper}>
                {currentNmiObjects.map((item, index) => {
                    return <Button variant={"contained"} onClick={(e) => handleClick(e, item, index)}>
                        {item.component}
                    </Button>
                })}
            </div>
        </div>
    );
};

export default NmiOne;
