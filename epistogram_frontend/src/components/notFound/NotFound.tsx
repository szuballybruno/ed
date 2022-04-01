import React from "react";
import classes from "./notFound.module.scss";

const NotFound = () => {
    return (
        <div className={classes.notFoundWrapper}>
            <h1>Never gonna give you up!</h1>
            <h3>Az oldal nem található (404)</h3>
        </div>
    );
};

export default NotFound;
