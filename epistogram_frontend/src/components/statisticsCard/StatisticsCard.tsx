import { Box, Flex } from '@chakra-ui/react';
import {Fullscreen, FullscreenExit, Lock} from "@mui/icons-material";
import { Typography } from "@mui/material";
import React, { useState } from 'react';
import { EpistoHeader } from '../EpistoHeader';
import { EpistoButton } from '../universal/EpistoButton';
import { FlexFloat } from '../universal/FlexFloat';
import classes from "./learningStatisticsItem.module.scss";
import {translatableTexts} from "../../translatableTexts";

const StatisticsCard = (props: {
    iconPath?: string
    suffix: string
    title: string
    value: string
    isOpenByDefault?: boolean
    isDummy?: boolean
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

        {props.isDummy && <Flex
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            color={"white"}
            pos={"absolute"}
            w={"100%"}
            h={"100%"}
            borderRadius={5}
            bgColor={"#333333CC"}
        >
            <Lock style={{
                width: "50%",
                height: "50%"
            }} />
            <Typography align="center">
                Ez a statisztika még nem elérhető
            </Typography>
        </Flex>}

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
                    alt=""
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
