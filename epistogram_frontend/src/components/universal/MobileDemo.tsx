import React from 'react';
import {Button, Typography} from "@material-ui/core";
import classes from './mobileDemo.module.scss'
import Navbar from "./navigation/navbar/AllNavbar";
import AllNavbar from "./navigation/navbar/AllNavbar";
import {useState} from "@hookstate/core";
import {globalConfig} from "../../configuration/config";

export const MobileDemo = () => {
    const showNextPage = useState(true)
    const wrongAnswer = useState({
        0: false,
        1: false,
        2: false,
        3: false
    })

    const signupNavbar = {
        "middleMenu": [],
        "lastItem": {
            "menuName": "",
            "menuPath": ""
        }
    }
    const logoUrl = globalConfig.assetStorageUrl + "/application/logo.png"

    return <div className={classes.mobileDemoWrapper}>
        <div className={classes.navbar}>
            <img className={classes.logo} alt="EpistoGram Logo" src={logoUrl}/>
        </div>
        <div className={classes.mobileDemoTitleWrapper}>
            <Typography style={{
                fontWeight: "bold"
            }}>{showNextPage.get() ? "Mely betűszó jelöli egy kattintás árát?" : "Edina, újabb lépést tettél a fejlődésedért!"}</Typography>
        </div>
        {showNextPage.get() ? <div className={classes.mobileDemoButtonsWrapper}>
            <Button variant={"outlined"}
                    style={{backgroundColor: wrongAnswer[0].get() ? "red" : ""}}
                    onClick={(e) => {
                        wrongAnswer[0].set(true)
                        setTimeout(() => {
                            wrongAnswer[0].set(false)
                        }, 500)
                    }}>
                CTR
            </Button>
            <Button variant={"outlined"}
                    style={{backgroundColor: wrongAnswer[1].get() ? "red" : ""}}
                    onClick={(e) => {
                        wrongAnswer[1].set(true)
                        setTimeout(() => {
                            wrongAnswer[1].set(false)
                        }, 500)
                    }}>ROI</Button>
            <Button variant={"outlined"} onClick={() => {
                showNextPage.set(false)
            }}>CPC</Button>
            <Button variant={"outlined"}
                    style={{backgroundColor: wrongAnswer[3].get() ? "red" : ""}}
                    onClick={(e) => {
                        wrongAnswer[3].set(true)
                        setTimeout(() => {
                            wrongAnswer[3].set(false)
                        }, 500)
                    }}>ROAS</Button>
        </div> : <div className={classes.nextPageWrapper}>
            <img className={classes.congrat} src={`${globalConfig.assetStorageUrl}/application/welldone.png`} />
            <div>
                <Typography> A kérdés megválaszolásával nem csak tudásodat bővítetted, de 3</Typography>
                <img className={classes.epistoCoin} alt={""} src={`${globalConfig.assetStorageUrl}/application/episto.png`} />
                <Typography>-al is gazdagodtál. Szép munka volt, így tovább!</Typography>
            </div>
        </div>}
    </div>
}