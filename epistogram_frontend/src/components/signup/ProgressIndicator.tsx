import { LinearProgress, LinearProgressProps, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from 'react';
import classes from "./signupWrapper.module.scss";

export const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
    return <Box className={classes.progressWrapper}>
        <Box width="100%" mr={1} >
            <LinearProgress variant={"determinate"} className={classes.progressBar} {...props} />
        </Box>
        < Box minWidth={35} >
            <Typography variant="body2" className={classes.progressPercentage} > {`${Math.round(
                props.value,
            )}%`
            }</Typography>
        </Box>
    </Box>
}
