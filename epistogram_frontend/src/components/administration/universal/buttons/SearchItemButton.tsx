import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from "./searchItemButton.module.scss";

export const SearchItemButton = (props: {
    buttonText?: string,
    children: JSX.Element,
    onClick?: any
    to?: string
}) => {
    return (
        props.to ? <NavLink to={props.to}>
            {props.children ? <button className={classes.searchItemButton} onClick={props.onClick}>
                {props.children}
            </button> : <button className={classes.searchItemButton} onClick={props.onClick}>
                {props.buttonText}
            </button>}
        </NavLink> : null
    );
};
