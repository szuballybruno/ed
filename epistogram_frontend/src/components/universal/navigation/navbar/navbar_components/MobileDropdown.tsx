import React from 'react';
import classes from "./mobileDropdown.module.scss";
import NavbarButton from "./NavbarButton";

const MobileDropdown = (props: {
    menuItems: {
        middleMenu: {
            menuName: string;
            menuPath: string
        }[];
        lastItem: {
            menuName: string;
            menuPath: string
        };
    },
    showHighlightedButton?: boolean
}) => {
    // const app = useState(applicationRunningState)
    return (
        <div></div>
        // <div className={classes.mobileNavbarInnerWrapper}>
        //     {/* {props.showHighlightedButton ?
        //         <button onClick={() => {app.hamburgerButtonState.set(true)}}>Mutass valamit!</button>
        //         : null} */}
        //     <div className={classes.mobileNavbarNavLinksWrapper}>
        //         {props.menuItems.middleMenu.map((item, index) => {
        //             return <NavbarButton key={index}
        //                 index={index}
        //                 menuName={item.menuName}
        //                 menuPath={item.menuPath} />
        //         })}
        //         <NavbarButton className={classes.mobileLastItem}
        //             key={4}
        //             index={4}
        //             menuName={props.menuItems.lastItem.menuName}
        //             menuPath={props.menuItems.lastItem.menuPath} />
        //     </div>
        // </div>
    );
};

export default MobileDropdown;
