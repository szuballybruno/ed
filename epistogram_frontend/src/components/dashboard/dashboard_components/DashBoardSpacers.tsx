import { Flex, FlexProps } from '@chakra-ui/layout';
import { PlayArrow } from '@mui/icons-material';
import { Divider, Typography } from "@mui/material";
import React from 'react';
import { EpistoButton } from '../../universal/EpistoButton';
import classes from "./dashBoardSpacers.module.scss";

export const DashoardLeftItemGroup = (props:
    FlexProps & {
        title: string,
        onClick?: () => {}
    }) => {

    const { title, onClick, ...boxProps } = props;

    return <Flex
        id="listItemGroup"
        direction="column"
        {...boxProps}>

        <Flex justify="space-between">

            <Typography
                variant={"overline"}
                lineHeight="16px">
                {props.title}
            </Typography>

            <EpistoButton
                variant="plain"
                onClick={onClick}
                style={{
                    height: 20
                }}>

                <PlayArrow
                    style={{
                        color: "var(--epistoTeal)"
                    }} />
            </EpistoButton>
        </Flex>

        {props.children}
    </Flex>;
}

export const DashboardVerticalDivider = () => {
    return (
        <div className={classes.dashBoardLeftBorderWrapper} >
            <Divider style={{ zIndex: 999, marginTop: 20 }} />
        </div>
    )
}

export const DashBoardRightSpacer = (props: { title: string }) => {
    return (
        <div className={classes.dashBoardRightSpacerWrapper}>

            <Typography variant={"h4"}>
                {props.title}
                </Typography>

            <div className={classes.dashBoardRightSpacerWrapperDivider}>
                <Divider />
            </div>
        </div>
    );
};
