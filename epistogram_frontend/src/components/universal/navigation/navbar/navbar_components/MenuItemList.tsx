import React from 'react';
import { MenuItemsType, MenuItemType } from '../Navbar';
import classes from './menuItemList.module.scss';
import NavbarButton from "./NavbarButton";

const MenuItemList = (props: {
    menuItems: MenuItemType[]
}) => {
    return <div className={classes.navbarNavLinksWrapper}>
        {props.menuItems.map((item, index) => {
            return <NavbarButton
                activeClassName={classes.fos}
                key={index}
                index={index}
                menuName={item.menuName}
                menuPath={item.menuPath} />
        })}
    </div>
}

export default MenuItemList;
