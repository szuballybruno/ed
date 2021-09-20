import React from 'react';
import classes from "./settingsItem.module.scss";
import { NavLink } from "react-router-dom";
import { Switch } from "@mui/material";

const SettingsItem = ({ className, link, linkTitle, onClick, switchOnChange, switchProperty, switchState, title, value }: {
    className?: string,
    link?: string,
    linkTitle?: string,
    onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    onSwitch?: { (): void },
    title?: string,
    switchProperty?: string,
    switchState?: boolean,
    switchOnChange?: { (switchName: string, switchChecked: boolean): void },
    value?: string
}) => {
    return (
        <div className={`${classes.viewSettingsItem} ${className}`}>
            {title ? <div className={classes.viewSettingsItemTitleWrapper}>
                <label>{title}</label>
            </div> : <div className={classes.viewSettingsItemWrapper} />}
            {link ? <NavLink className={classes.settingsItemButton} to={link}>{linkTitle}</NavLink> : null}
            {onClick ? <button className={classes.settingsItemButton} onClick={onClick}>{linkTitle}</button> : null}
            {switchProperty && switchOnChange ? <Switch
                checked={switchState}
                onChange={(e) => {
                    switchOnChange(e.currentTarget.name, e.currentTarget.checked)
                }}
                name="checkedA"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            /> : null}
            {value ? <div className={classes.valueWrapper}>
                <span>{value}</span>
            </div> : null}
        </div>
    );
}

export default SettingsItem;