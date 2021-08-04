import React from 'react';
import classes from './menuItemList.module.scss'
import NavbarButton from "./NavbarButton";
import {updateActivity} from "../../../../../services/updateActivity";
import {Button} from "@material-ui/core";

const MenuItemList = (props: {
    menuItems: {
        menuName: string,
        menuPath: string
    }[]
}) => {
    return <div className={classes.navbarNavLinksWrapper}>
        {props.menuItems.map((item, index) => {
            return <NavbarButton activeClassName={classes.fos}
                                 key={index}
                                 index={index}

                                 menuName={item.menuName}
                                 menuPath={item.menuPath} />
        })}
    </div>
}

export default MenuItemList;
