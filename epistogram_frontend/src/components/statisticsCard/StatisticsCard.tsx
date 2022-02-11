import { Box, Flex, FlexProps } from '@chakra-ui/react';
import { Fullscreen, FullscreenExit, Lock } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React, { useState } from 'react';
import { EpistoHeader } from '../EpistoHeader';
import { EpistoButton } from '../controls/EpistoButton';
import { FlexFloat } from '../controls/FlexFloat';
import classes from "./learningStatisticsItem.module.scss";
import { EpistoFont } from '../controls/EpistoFont';

const StatisticsCard = (props: {
    iconPath?: string
    suffix: string
    title: string
    value: string
    isOpenByDefault?: boolean
    children?: React.ReactNode
    chartSize?: string,
    isComingSoon?: boolean
} & FlexProps) => {

    const { iconPath, isComingSoon, children, ...css } = props;

    const [isOpen, setIsOpen] = useState(!!props.isOpenByDefault)

    return <FlexFloat
        background="var(--transparentWhite70)"
        gridColumn={props.chartSize === "large" ? "1 / -1" : (isOpen ? "span 2" : "unset")} // do not remove!!
        gridRow={props.chartSize === "large" ? "span 2" : (isOpen ? "span 2" : "unset")} // do not remove!!
        //boxShadow="inset -1px -1px 5px rgba(0,0,0,0.15)"
        direction="column"
        minWidth={250}
        position="relative"
        {...css}>

        {/* locked overlay */}
        {isComingSoon && <Flex
            flexDir={"column"}
            alignItems={"flex-end"}
            justifyContent={"flex-start"}
            color={"black"}
            pos={"absolute"}
            width="100%"
            height="100%"
            borderRadius={5}
            bgColor={"#33333317"}>

            <Lock style={{
                width: "20px",
                height: "20px",
                margin: 10
            }} />
        </Flex>}

        {/* open state */}
        {isOpen && <Flex width="100%" mt="50px" p="0 20px 20px 20px" direction="column">

            <EpistoHeader variant="strongSub" text={props.title} />

            <Box>
                {props.children}
            </Box>
        </Flex>}

        {/* closed state */}
        {!isOpen && <Flex flex="1" align="center">

            {/* image */}
            {iconPath && <img
                style={{
                    margin: "5px 10px 5px 20px",
                    width: 70,
                    height: 70,
                    objectFit: "contain"
                }}
                alt=""
                src={iconPath} />}

            {/* texts */}
            <Flex direction="column" pr="10px">

                {/* value and suffix */}
                <Flex align="flex-end">

                    {/* value */}
                    <EpistoFont
                        fontSize={40}
                        style={{
                            lineHeight: 1,
                        }}>

                        {props.value}
                    </EpistoFont>

                    {/* suffix */}
                    <EpistoFont
                        fontSize="fontLargePlus"
                        style={{
                            fontSize: "20px",
                            marginLeft: "5px"
                        }}>

                        {props.suffix}
                    </EpistoFont>
                </Flex>

                {/* title */}
                <EpistoFont fontSize="fontSmall" >
                    {props.title}
                </EpistoFont>
            </Flex>
        </Flex>}

        {/* open / close button 
        {children && <Box position="absolute">
            <EpistoButton
                style={{
                    alignSelf: "flex-start"
                }}
                onClick={() => { setIsOpen(p => !p) }}>

                {isOpen ? <FullscreenExit /> : <Fullscreen />}
            </EpistoButton>
        </Box>}*/}
    </FlexFloat>
};

export default StatisticsCard;
