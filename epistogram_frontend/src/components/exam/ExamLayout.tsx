import { Flex, Text } from "@chakra-ui/react";
import { ArrowForward } from "@mui/icons-material";
import { LinearProgress, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { isString } from "../../static/frontendHelpers";
import { EpistoButton } from "../universal/EpistoButton";

export const ExamLayout = (props: {
    content: ReactNode,
    handleNext: () => void,
    nextButtonTitle: string,
    showNextButton: boolean,
    exitExamAction?: () => void,
    headerCenterText?: string,
    headerLeftItem?: string | ReactNode,
    progressValue?: number,
}) => {

    const { exitExamAction, headerCenterText, showNextButton, headerLeftItem, content, progressValue, handleNext, nextButtonTitle } = props;

    return <Flex
        className="whall"
        direction="column"
        alignItems="center"
        px={40}>

        {/* header */}
        <Flex
            direction={"row"}
            alignItems={"center"}
            className="dividerBorderBottom"
            w={"100%"}
            h={60}
            pl={5}>

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
            width="100%"
            align="center"
            justify="center"
            direction="column">

            {content}
        </Flex>

        {/* footer */}
        <Flex
            w={"100%"}
            bgColor={"white"}
            className="dividerBorderTop"
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

            {/* continue button */}
            {showNextButton && <EpistoButton
                variant={"colored"}
                onClick={handleNext}
                style={{
                    width: 200,
                    height: 46
                }}>
                {nextButtonTitle}
                <ArrowForward />
            </EpistoButton>}
        </Flex>
    </Flex>
}
