import React, { useEffect, useState } from 'react';
import classes from "./learningStatisticsItem.module.scss";
import { Button, Card, Typography } from "@mui/material";
import { Fullscreen, FullscreenExit } from "@mui/icons-material";
import { FlexFloat } from '../universal/FlexFloat';
import { EpistoButton } from '../universal/EpistoButton';
import { Box, Flex } from '@chakra-ui/react';
import { EpistoHeader } from '../administration/universal/EpistoHeader';

const StatisticsCard = (props: {
    iconPath?: string
    suffix: string
    title: string
    value: string
    isOpenByDefault?: boolean
    children?: React.ReactNode
    chartSize?: string
}) => {

    const [isOpen, setIsOpen] = useState(!!props.isOpenByDefault)
    const iconPath = props.iconPath ? props.iconPath : "https://picsum.photos/100/100";

    return <FlexFloat
        direction="column"
        p="0px"
        minW={250}
        style={{
            gridColumn: `auto / span ${isOpen ? (props.chartSize === "large" ? 4 : 2) : 1}`,
            gridRow: `auto / span ${isOpen ? 2 : 1}`
        }}
        //width={isOpen ? "600px" : "300px"}
        //height={isOpen ? undefined : "150px"}
        position="relative"
        m="10px">

        {isOpen
            ? <Flex w={"100%"} mt="50px" p="0 20px 20px 20px" direction="column">
                <EpistoHeader variant="strongSub" text={props.title} />
                <Box height="300px">
                    {props.children}
                </Box>
            </Flex>

            : <Flex flex="1" align="center">

                {/* image */}
                {iconPath && <img
                    className="square50"
                    style={{ margin: "10px 10px 10px 20px" }}
                    src={iconPath} />}

                {/* texts */}
                <Flex direction="column" pr="10px">

                    {/* value and suffix */}
                    <Flex align="flex-end">
                        <Typography variant={"h5"}>{props.value}</Typography>
                        <Typography style={{ marginLeft: "5px" }}>{props.suffix}</Typography>
                    </Flex>

                    {/* title */}
                    <Typography className={classes.itemTitle}>{props.title}</Typography>
                </Flex>
            </Flex>}

        <Box position="absolute">
            {props.children && <EpistoButton style={{ alignSelf: "flex-start" }} onClick={() => { setIsOpen(p => !p) }}>
                {isOpen ? <FullscreenExit /> : <Fullscreen />}
            </EpistoButton>}
        </Box>
    </FlexFloat>
};

export default StatisticsCard;
