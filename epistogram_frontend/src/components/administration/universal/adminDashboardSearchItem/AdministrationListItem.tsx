import React from 'react';
import classes from './adminDashboardSearchItem.module.scss';
import { Grid, Typography } from "@mui/material";
import { Image } from "@chakra-ui/react";

export type DashboardSearchItemAction = {
    to?: string,
    icon: string,
    selectedComponent?: string,
    onClick: (additionalData: any) => void
}

export const AdministrationListItem = (props: {
    key: any,
    title: string,
    profileImageUrl?: string,
    thumbnailUrl?: string,
    chips: React.ReactNode[],
    searchItemButtons: React.ReactNode[]
}) => {

    const showRoundedImageOrNull = (imageUrl?: string) => {
        return imageUrl ? <Grid lg={1} md={1} xs={1} item className={classes.searchItemAvatar}>
            <Image src={imageUrl} />
        </Grid> : null
    }

    const showRectangleImageOrNull = (imageUrl?: string) => {
        return imageUrl ? <Grid lg={2} md={3} xs={3} item className={classes.videoThumbnailWrapper}>
            <img src={props.thumbnailUrl} alt={""} />
        </Grid> : null
    }

    return <Grid
        container
        style={{ width: "100%" }}
        key={props.key}
        spacing={0}
        direction={"row"}
        justifyContent={"center"}
        alignContent={"center"}
        xs={12}
        wrap={"nowrap"}>

        {/* Display image or nothing */}
        {showRectangleImageOrNull(props.thumbnailUrl)}
        {showRoundedImageOrNull(props.profileImageUrl ? props.profileImageUrl : "")}

        {/* Display title and info in chips */}
        <Grid lg={9} md={10} xs={10} item>
            <div className={classes.searchItemInfoTopWrapper}>
                <Typography variant={"h5"} className={classes.itemMainTitle}>
                    {props.title}
                </Typography>
            </div>
            <div className={classes.searchItemInfoBottomWrapper}>
                {
                    props.chips.map((chip, index) => {
                        return chip
                    })
                }
            </div>
        </Grid>

        {/* Show buttons to make further actions */}
        <Grid xs={1} item className={classes.searchItemButtons}>
            {
                props.searchItemButtons.map((action, index) => {
                    return action
                })
            }
        </Grid>
    </Grid>
};
