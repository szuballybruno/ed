import React from 'react';
import { NavLink, useRouteMatch } from "react-router-dom";
import classes from './adminDashboardSearchItem.module.scss';
import SearchItemButton from "../buttons/SearchItemButton";
import ProfileImage from "../../../universal/atomic/profileImage/ProfileImage";
import { Chip, Collapse, Divider, Grid, Typography } from "@material-ui/core";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import {
    AccessTimeTwoTone,
    ApartmentTwoTone,
    CategoryTwoTone,
    DeleteTwoTone,
    Email,
    EqualizerTwoTone,
    ListTwoTone,
    MenuBookTwoTone,
    OndemandVideoTwoTone,
    PersonTwoTone,
    PictureInPictureTwoTone,
    PlayArrowTwoTone,
    ThumbsUpDownTwoTone,
    WorkTwoTone
} from "@material-ui/icons";
import { useState } from "@hookstate/core";
import { AdminPageUserView } from '../../../../models/shared_models/AdminPageUserDTO';

export type DashboardSearchItemAction = {
    to?: string,
    icon: string,
    selectedComponent?: string,
    onClick: (additionalData: any) => void
}

const AdminDashboardSearchItem = (props: {
    additionalData?: any,
    title: string,
    profileImageUrl?: string,
    thumbnailUrl?: string,
    chips: {
        label: string
        icon: string
    }[],
    actions: DashboardSearchItemAction[],
    userActionComponents: { [name: string]: JSX.Element }
}) => {

    const icons = {
        email: <Email />,
        organization: <ApartmentTwoTone />,
        work: <WorkTwoTone />,
        category: <CategoryTwoTone />,
        person: <PersonTwoTone />,
        video: <OndemandVideoTwoTone />,
        play: <PlayArrowTwoTone />,
        overlay: <PictureInPictureTwoTone />,
        length: <AccessTimeTwoTone />,
        read: <MenuBookTwoTone />,
        vote: <ThumbsUpDownTwoTone />,
    }

    const actionIcons: { [name: string]: JSX.Element } = {
        list: <ListTwoTone />,
        edit: <EditTwoToneIcon />,
        statistics: <EqualizerTwoTone />,
        delete: <DeleteTwoTone color={"secondary"} />
    }

    const match = useRouteMatch()
    const isOpen = useState(false)
    const currentComponent = useState("")

    return <Grid xs={12}>
        <Grid container
            style={{ width: "100%" }}
            spacing={0}
            direction={"row"}
            justify={"center"}
            alignContent={"center"}
            xs={12}
            wrap={"nowrap"}>
            {props.profileImageUrl ? <Grid lg={1} md={1} xs={1} item className={classes.searchItemAvatar}>
                <ProfileImage imageUrl={props.profileImageUrl} />
            </Grid> : null}

            {props.thumbnailUrl ? <Grid lg={2} md={3} xs={3} item className={classes.videoThumbnailWrapper}>
                <img src={props.thumbnailUrl} alt={""} />
            </Grid> : null}

            <Grid lg={9} md={10} xs={10} item>
                <div className={classes.searchItemInfoTopWrapper}>
                    <Typography variant={"h5"}
                        className={classes.itemMainTitle}>
                        {props.title}
                    </Typography>
                </div>
                <div className={classes.searchItemInfoBottomWrapper}>
                    {props.chips.map((chip, index) => {
                        return <Chip
                            key={index}
                            label={chip.label}
                            variant={"outlined"}
                            size={"small"}
                            icon={icons[chip.icon as keyof typeof icons]} />
                    })}
                </div>
            </Grid>

            <Grid xs={1} item className={classes.searchItemButtons}>
                {
                    props.actions.map((action, index) => {
                        return action.to ? <NavLink key={index} to={action.to}>
                            <SearchItemButton onClick={() => {
                                currentComponent.set(action.selectedComponent || "")
                            }}>
                                {actionIcons[action.icon]}
                            </SearchItemButton>
                        </NavLink> : <SearchItemButton key={index}
                            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                if (!isOpen.get()) {
                                    isOpen.set(true)
                                } else if (isOpen.get() && currentComponent.get() === action.selectedComponent) {
                                    isOpen.set(false)
                                } else {

                                }
                                currentComponent.set(action.selectedComponent || "")
                                action.onClick(props.additionalData)
                            }}>
                            {actionIcons[action.icon]}
                        </SearchItemButton>
                    })
                }
            </Grid>
        </Grid>
        <Divider />
        <Collapse in={isOpen.get()}>
            <div>{props.userActionComponents[currentComponent.get()]}</div>
        </Collapse>
    </Grid>
};

export default AdminDashboardSearchItem;
