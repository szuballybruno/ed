import { Button, Typography } from "@mui/material";
import React from 'react';
import AdminDashboardHeader from "../administration/universal/adminDashboardHeader/AdminDashboardHeader";
import classes from './myExams.module.scss';

const MyExams = () => {
    return (
        <div className={classes.examsOuterWrapper}>
            <div className={classes.examsInnerWrapper}>
                <AdminDashboardHeader titleText={"Vizsgáim"} />
                <div className={classes.examsSecondRow}>
                    <Typography variant={"h6"}>
                        Még nem végeztél el egyetlen vizsgát sem
                    </Typography>
                    {/*<img alt="" src={`${config.assetStorageUrl}/application/CISSP.png`} />
                    <img alt="" src={`${config.assetStorageUrl}/application/MicrosoftOffice.png`} />
                    <img alt="" src={`${config.assetStorageUrl}/application/ScrumMaster.png`} />*/}
                </div>
                <div className={classes.examsThirdRow}>
                    <Button variant={"outlined"} size={"large"}>Új vizsgára jelentkezem</Button>
                </div>
            </div>
        </div>
    );
};

export default MyExams;
