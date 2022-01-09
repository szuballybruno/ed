import { Box, Flex } from '@chakra-ui/react';
import { Fullscreen, FullscreenExit, Lock } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React, { useState } from 'react';
import { EpistoHeader } from '../EpistoHeader';
import { EpistoButton } from '../universal/EpistoButton';
import { FlexFloat } from '../universal/FlexFloat';
import classes from "./learningStatisticsItem.module.scss";

const StatisticsCard = (props: {
    iconPath?: string
    suffix: string
    title: string
    value: string
    isOpenByDefault?: boolean
    children?: React.ReactNode
    chartSize?: string,
    isComingSoon?: boolean
}) => {

    const { iconPath, isComingSoon, children } = props;

    const [isOpen, setIsOpen] = useState(!!props.isOpenByDefault)

    return <FlexFloat
        background="var(--transparentWhite70)"
        direction="column"
        minW={250}
        position="relative">

        {/* locked overlay */}
        {isComingSoon && <Flex
            flexDir={"column"}
            alignItems={"flex-end"}
            justifyContent={"flex-start"}
            color={"black"}
            pos={"absolute"}
            w={"100%"}
            h={"100%"}
            borderRadius={5}
            bgColor={"#33333317"}>

            <Lock style={{
                width: "20px",
                height: "20px",
                margin: 10
            }} />
        </Flex>}

        {/* open state */}
        {isOpen && <Flex w={"100%"} mt="50px" p="0 20px 20px 20px" direction="column">
            <EpistoHeader variant="strongSub" text={props.title} />
            <Box height="300px">
                {props.children}
            </Box>
        </Flex>}

        {/* closed state */}
        {!isOpen && <Flex flex="1" align="center">

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

                    {/* value */}
                    <Typography
                        variant={"h5"}>

                        {props.value}
                    </Typography>

                    {/* suffix */}
                    <Typography
                        style={{
                            marginLeft: "5px"
                        }}>

                        {props.suffix}
                    </Typography>
                </Flex>

                {/* title */}
                <Typography >
                    {props.title}
                </Typography>
            </Flex>
        </Flex>}

        {/* open / close button */}
        {children && <Box position="absolute">
            <EpistoButton
                style={{
                    alignSelf: "flex-start"
                }}
                onClick={() => { setIsOpen(p => !p) }}>

                {isOpen ? <FullscreenExit /> : <Fullscreen />}
            </EpistoButton>
        </Box>}
    </FlexFloat>
};

export default StatisticsCard;
