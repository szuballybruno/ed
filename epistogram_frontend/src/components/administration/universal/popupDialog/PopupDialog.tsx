import React from 'react';
import classes from "./popupDialog.module.scss";
import {Link} from "react-router-dom";
import applicationRunningState from "../../../../store/application/applicationRunningState";
import {useState} from "@hookstate/core";

const PopupDialog = (props: {exitButtonLink: string}) => {
    const app = useState(applicationRunningState)
    return <div>
        {app.showWarningPopup.get() ? <div className={classes.addUserPopupWrapper}>
            <div className={classes.addUserPopupInnerWrapper}>
                <div className={classes.popupTextWrapper}>Kilépés esetén a megadott adatok elvesznek. <br /> Biztosan folytatod?</div>
                <div className={classes.popupButtonsWrapper}>
                    <button onClick={() => {
                        app.showWarningPopup.set(false)
                    }}>
                        Szerkesztés folytatása
                    </button>
                    <Link to={props.exitButtonLink}>
                        <button onClick={() => {
                            app.showWarningPopup.set(false)
                        }}>
                            Kilépés
                        </button>
                    </Link>
                </div>
            </div>
        </div> : null}
    </div>
};

export default PopupDialog;
