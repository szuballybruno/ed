import { LinearProgress, LinearProgressProps, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from 'react';
import { EpistoFont } from "../controls/EpistoFont";

export const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
    return <Box >
        <Box width="100%" mr={1} >
            <LinearProgress variant={"determinate"}  {...props} />
        </Box>
        < Box minWidth={35}>

            <EpistoFont fontSize={"fontNormal14"}>
                {`${Math.round(props.value)}%`}
            </EpistoFont>
        </Box>
    </Box>
}
