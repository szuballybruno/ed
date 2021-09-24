import React from 'react';
import Navbar from "../navbar/Navbar";
import classes from "./coursePage.module.scss";

const CoursePage = (props: { pageUrl: string }) => {
    return (
        <div className={classes.coursePageOuterWrapper}>
            <Navbar />
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
                title={"coursePage"} />
        </div>
    );
};

export default CoursePage;
