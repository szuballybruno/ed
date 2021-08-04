import React, {useRef} from 'react';
import classes from './settings.module.scss'
import ReactImageFallback from "react-image-fallback";
import avatar from "../../player_main/img/avatar-placeholder.png";
import Switch from "react-switch";
import pencil from "./pencil.svg"
import {useState} from "@hookstate/core";
import userSideState from "../../../../globalStates/userSideState";
import {config} from "../../../../configuration/config";

const Settings = (props: { currentComponent: { set: () => void; }; }) => {
    const user = useState(userSideState)

    const [file, setFile] = React.useState()
    const hiddenFileInput: React.MutableRefObject<any> = useRef();

    const handleUpload = () => {
        hiddenFileInput.current.click();
    }
    const dataSheetData = [{
        name: "Név",
        placeholderName: ["firstName", "lastName"]
    }, {
        name: "E-mail",
        placeholderName: ["email"]
    }, {
        name: "Beosztás",
        placeholderName: ["innerRole"]
    }, {
        name: "Telefonszám",
        placeholderName: ["phoneNumber"]
    }, {
        name: "Bemutatkozás",
        placeholderName: ["userDescription"]
    },{
        name: "LinkedIn",
        placeholderName: ["linkedInUrl"]
    }]

    const viewSettingsData = [
        "Téma",
        "Akadálymentesítétt mód",
        "Csökkentett adatforgalom"
    ]

    const notificationData = [
        "Új ajánlott kurzus",
        "Új kurzusok",
        "Vizsgaeredmény érkezett",
        "Új hírek az üzenőfalon",
        "Új vizsgakitöltés (csoportvezető)",
        "Jelentés elérhető (csoportvezető)",
        "Segítségkérés (csoportvezető)"
    ]

    const SettingsTitle = (props: {titleText: string}) => {
        return <div className={classes.titleWrapper}>
            <h1>{props.titleText}</h1>
            <div className={classes.titleSpacer} />
        </div>
    }
    return (
        <div className={classes.settingsWrapper}>


            <SettingsTitle titleText={"Adatlap"} />
            <div className={classes.dataSheetWrapper}>
                <div className={classes.profileImageWrapper}>
                    <div className={classes.addProfileImage} onClick={handleUpload}>Kiválasztás</div>
                    <input type="file"
                           ref={hiddenFileInput}
                           style={{display: "none"}}
                           onChange={(e) => {
                           }}/>
                    <ReactImageFallback alt="avatar"
                                        fallbackImage={avatar}
                                        src={`${config.assetStorageUrl}/users/${localStorage.getItem("userId")}/avatar.${"jpg" || "png"}`}/>
                </div>
                {dataSheetData.map((data) => {
                    return <div className={classes.dataSheetItem}>
                        <div className={classes.dataSheetItemTitleWrapper}>
                            <label>{data.name}</label>
                        </div>
                        <input placeholder={`${user.user.userData[data.placeholderName[1]].get() || ""} ${user.user.userData[data.placeholderName[0]].get() || ""}`} disabled={true} />
                        <button>
                            <img style={{
                                width: "100%"
                            }} src={pencil} />
                        </button>
                    </div>
                })}
            </div>


            <SettingsTitle titleText={"Megjelenítés"} />
            <div className={classes.viewSettingsWrapper}>
                {viewSettingsData.map((item, index) => {
                    return <div className={classes.viewSettingsItem}>
                        <div className={classes.viewSettingsItemTitleWrapper}>
                            <label>{item}</label>
                        </div>
                        <Switch checked={index / 3 ? true : false}
                                onChange={() =>{}}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                onColor={"#1BBEFF"}/>
                    </div>
                })}
            </div>


            <SettingsTitle titleText={"Biztonság"} />
            <div className={classes.securityWrapper}>

                <div className={classes.viewSettingsItem}>
                    <div className={classes.viewSettingsItemTitleWrapper}>
                        <label>{"Kétfaktoros autentikáció"}</label>
                    </div>
                    <Switch checked={true}
                            onChange={()=>{}}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor={"#1BBEFF"}/>
                </div>
                <div className={classes.viewSettingsItem}>
                    <div className={classes.viewSettingsItemTitleWrapper}>
                        <label>Engedélyezett otthoni eszközök</label>
                    </div>
                    <button>Eszközök mutatása</button>
                </div>
                <div className={classes.viewSettingsItem}>
                    <div className={classes.viewSettingsItemTitleWrapper}>
                        <label></label>
                    </div>
                    <button onClick={() => {
                        props.currentComponent.set("ChangePassword")
                        props.currentComponentName.set("Jelszó módosítása")
                    }}>Jelszó módosítása</button>
                </div>
            </div>


            <SettingsTitle titleText={"Értesítések"} />
            <div className={classes.notificationsWrapper}>
                {notificationData.map((item, index) => {
                    return <div className={classes.viewSettingsItem}>
                        <div className={classes.viewSettingsItemTitleWrapper}>
                            <label>{item}</label>
                        </div>
                        <Switch checked={index % 4  === 0}
                                onChange={()=>{}}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                onColor={"#1BBEFF"}/>
                    </div>
                })}


            </div>
        </div>
    );
};

export default Settings;
