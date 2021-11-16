import { Box, Flex, FlexProps } from "@chakra-ui/layout";
import { useEffect } from "react";
import { ReactTimerType } from "../../helpers/reactTimer";

export const TimeoutFrame = (props: { reactTimer: ReactTimerType } & FlexProps) => {

    const { reactTimer, children, ...css } = props;

    const pauseTimeout = () => {

        reactTimer.pause();
    }

    const resumeTimeout = () => {

        reactTimer.start();
    }

    return <Flex
        position="relative"
        onMouseEnter={() => pauseTimeout()}
        onMouseLeave={() => resumeTimeout()}
        {...css}>

        <Box
            position="absolute"
            top="0"
            className="whall pauseAnimation"
            bg="var(--mildGrey)"
            style={{
                animationName: reactTimer.isIdle ? "" : "rightSlideAnimation",
                animationDuration: `${reactTimer.maxMiliseconds / 1000}s`,
                animationTimingFunction: "linear",
                animationPlayState: reactTimer.isRunning ? "running" : "paused"
            }} />

        <Box position="relative">
            {children}
        </Box>
    </Flex>
}