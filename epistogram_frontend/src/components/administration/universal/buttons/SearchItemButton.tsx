import React from 'react';
import classes from "./searchItemButton.module.scss";

const SearchItemButton = (props: {
    buttonText?: string,
    children: JSX.Element,
    onClick?: any
}) => {
    return (
        props.children ? <button className={classes.searchItemButton} onClick={props.onClick}>
            {props.children}
        </button> : <button className={classes.searchItemButton} onClick={props.onClick}>
            {props.buttonText}
        </button>
    );
};

export default SearchItemButton;
