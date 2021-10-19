import { Flex, FlexProps } from '@chakra-ui/layout';
import { Divider, Typography } from "@mui/material";
import React from 'react';
import classes from "./dashBoardSpacers.module.scss";

export const DashoardLeftItemGroup = (props: FlexProps & { title: string }) => {

    const { title, ...boxProps } = props;

    return (<Flex id="listItemGroup" direction="column" {...boxProps}>
        <Typography variant={"overline"}>{props.title}</Typography>
        {props.children}
    </Flex>);
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
            <Typography variant={"h4"}>{props.title}</Typography>
            <div className={classes.dashBoardRightSpacerWrapperDivider}>
                <Divider />
            </div>
        </div>
    );
};
