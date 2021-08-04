import React from 'react';
import classes from "./coursePage.module.scss"
import menuItems from '../../configuration/menuItems.json'
import Navbar from "../universal/navigation/navbar/AllNavbar";

const CoursePage = (props: {pageUrl: string}) => {
    return (
        <div className={classes.coursePageOuterWrapper}>
            <Navbar style={{
                position: "absolute",
                top: 0
            }}
                    showHighlightedButton={true}
                    menuItems={menuItems["user"]}
                    showLastButton={true}
                    showSwitchButton={false}
                    showNavigation={true}/>
            <div style={{
                position: "absolute",
                top: 0,
                width: "100%",
                height: 80
            }}>

            </div>
            <iframe className={classes.iframe}
                    style={{
                        border: "none",
                        height: "1000px"
                    }}
                    src={props.pageUrl}
                    width={'100%'}
                    height={"100%"}
                    title={"coursePage"}/>
        </div>
    );
};

export default CoursePage;
