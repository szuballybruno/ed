import React from 'react';
import classes from './testModule.module.scss'
import {useState} from "@hookstate/core";
import animationData from "./2882-scan-button.json";
import Lottie from "lottie-web-react";
import circles from "./circles.svg"
import done from "../user/player_main/player_components/exam/11272-party-popper.json";
import downArrow from "../user/player_main/player_components/exam/down-arrow.svg";


const TestModule = () => {
    const currentPage = useState("start")
    const defaultDoneOptions = {
        loop: true,
        autoplay: true,
        animationData: done,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const Questions = (props: {onClickHandler: () => void, questionText: string, buttons: string[], progressText: string}) => {
        return <div className={classes.questionWrapper}>
            <h1>{props.progressText}</h1>
            <div className={classes.progress}>
                <div className={classes.progressValue} />
            </div>
            <h1>{props.questionText}</h1>
            <div className={classes.questionInnerWrapper}>
                {props.buttons.map((button) => {
                    return <button className={classes.questionAnswerButton}
                                   onClick={props.onClickHandler} >
                        {button}
                    </button>
                })}
            </div>
        </div>
    }

    const testPages = [{
        pageName: "start",
        pageComponent: <div className={classes.mobileWrapper}>
            <img alt="" src={circles} className={classes.startTestButtonBackground} />
            <Lottie className={classes.startTestLottie}
                    options={defaultOptions}
                    playingState={"play"}
            />
            <button className={classes.startTestButton}
                    onClick={() => {
                currentPage.set("firstPage")
            }} >Teszt indítása</button>
        </div>
    },{
        pageName: "firstPage",
        pageComponent: <Questions onClickHandler={() => {currentPage.set("secondPage")}}
                                  questionText={"Mi a phishing??"}
                                  progressText={"13/15"}
                                  buttons={["Horgászat","Adathalászat","Zsarolóvírus","VPN fajta"]}/>
    },{
        pageName: "secondPage",
        pageComponent: <Questions onClickHandler={() => {currentPage.set("thirdPage")}}
                                  questionText={"Melyik a legerősebb Wi-fi titkosítás?"}
                                  progressText={"14/15"}
                                  buttons={["WEP","AES","RSA256","WPA2"]}/>
    },{
        pageName: "thirdPage",
        pageComponent: <Questions onClickHandler={() => {currentPage.set("congratPage")}}
                                  questionText={"Melyik innen a vírusírtó szoftver?"}
                                  progressText={"15/15"}
                                  buttons={["Banda Security","Arast","AXG","Kaspersky"]}/>
    },{
        pageName: "congratPage",
        pageComponent: <div className={classes.mobileWrapper}>
            <h1 className={classes.congratText}>Gratulálunk</h1>
            <Lottie className={classes.examEndImage}
                    options={defaultDoneOptions}
                    playingState={"play"}
            />
            <p style={{
                color: "white",
                textAlign: "center"
            }}>Sikeresen teljesítetted a CyberSecurity Alapok kurzust! Okleveled letöltéséhez kattints az alábbi gombra!</p>
            <a href={"https://cdn.discordapp.com/attachments/746265082639417447/749556066294956032/Gratulalunk-Edina.pdf"} target="_new">
                <img alt=""
                     className={classes.examEndButton}
                     src={downArrow}
                     style={{
                         height: "30px"
                     }}/>
            </a>
        </div>
    }]
    return testPages.map((page) => {
            if (currentPage.get() === page.pageName) {
                return page.pageComponent
            }
            return 1
        })
};

export default TestModule;