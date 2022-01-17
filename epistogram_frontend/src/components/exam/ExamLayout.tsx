import { Flex, Text } from "@chakra-ui/react";
import { ArrowForward } from "@mui/icons-material";
import { LinearProgress, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { isString } from "../../static/frontendHelpers";
import { EpistoButton } from "../controls/EpistoButton";

export const ExamLayout = (props: {
    children: ReactNode,
    handleNext: () => void,
    nextButtonTitle: string,
    showNextButton?: boolean,
    exitExamAction?: () => void,
    headerCenterText?: string,
    headerLeftItem?: string | ReactNode,
    progressValue?: number,
    footerButtons?: ({ text: string, action: () => void })[]
}) => {

    const { exitExamAction, footerButtons, headerCenterText, showNextButton, headerLeftItem, children, progressValue, handleNext, nextButtonTitle } = props;

    const footerButton = (title: string, action: () => void, icon?: any) => <EpistoButton
        variant={"colored"}
        onClick={action}
        style={{
            height: "40px",
            marginLeft: "10px"
        }}>
        {title}
        {icon}
    </EpistoButton>

    return <Flex
        className="whall"
        direction="column"
        alignItems="center"
        px={40}>

        {/* header */}
        <Flex
            direction={"row"}
            alignItems={"center"}
            className="roundBorders"
            background="var(--transparentWhite70)"
            w={"100%"}
            h={60}
            pl={20}>

            <Flex minW="200">
                {(headerLeftItem && isString(headerLeftItem)) && <Text as="text">
                    {headerLeftItem}
                </Text>}
                {(headerLeftItem && !isString(headerLeftItem)) && headerLeftItem}
            </Flex>


            <Flex
                flex="1"
                align="center"
                justify="center">
                <Text
                    as="text"
                    fontSize={"1.1rem"}>
                    {headerCenterText}
                </Text>
            </Flex>

            <Flex minW="200" justify="flex-end">
                {exitExamAction && <EpistoButton
                    onClick={exitExamAction}
                    style={{
                        minWidth: 170
                    }}
                    variant={"outlined"}>

                    Kilépek a tesztből
                </EpistoButton>}
            </Flex>

        </Flex>

        {/* content */}
        <Flex
            flex="1"
            overflow="hidden"
            my="20px"
            minH="300px"
            width="100%"
            align="center"
            justify="center"
            direction="column">

            {children}
        </Flex>

        {/* footer */}
        <Flex
            w={"100%"}
            className="roundBorders"
            background="var(--transparentWhite70)"
            h="80px"
            p={20}>

            {/* progress line */}
            <Flex
                flex={1}
                px={10}
                alignItems={"center"}>

                {progressValue !== undefined && <>
                    <LinearProgress
                        variant="determinate"
                        value={progressValue}

                        style={{
                            flex: "1",
                            marginRight: "10px"
                        }} />

                    <Typography variant="body2"  >
                        {`${Math.round(progressValue)}%`}
                    </Typography>
                </>}
            </Flex>

            {/* other buttons */}
            {footerButtons && footerButtons
                .map(x => footerButton(x.text, x.action))}

            {/* continue button */}
            {showNextButton && footerButton(nextButtonTitle, handleNext, <ArrowForward />)}
        </Flex>
    </Flex>
}
