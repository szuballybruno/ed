import React from 'react';
import classes from "./recommendedCourses.module.scss";

const RecommendedCourses = () => {
    return (
        <div className={classes.recommendedCoursesWrapper}>
            <div className={classes.coursesOuterRow}>
                <h1>Ajánlott kurzusok</h1>
                <div className={classes.coursesInnerRow}>
                    <img alt="" src={'https://itsfourothree.hu/uploads/videoThumbnailUrls/ExcelTile.png'} />
                    <img alt="" src={'https://itsfourothree.hu/uploads/videoThumbnailUrls/GDPRTile.png'} />
                    <img alt="" src={'https://itsfourothree.hu/uploads/videoThumbnailUrls/LinuxTile.png'} />
                    <img alt="" src={'https://itsfourothree.hu/uploads/videoThumbnailUrls/PythonTile.png'} />
                    <img alt="" src={'https://itsfourothree.hu/uploads/videoThumbnailUrls/ExcelTile.png'} />
                    <img alt="" src={'https://itsfourothree.hu/uploads/videoThumbnailUrls/GDPRTile.png'} />
                    <img alt="" src={'https://itsfourothree.hu/uploads/videoThumbnailUrls/LinuxTile.png'} />
                    <img alt="" src={'https://itsfourothree.hu/uploads/videoThumbnailUrls/PythonTile.png'} />
                </div>
            </div>
        </div>
    );
};

export default RecommendedCourses;
