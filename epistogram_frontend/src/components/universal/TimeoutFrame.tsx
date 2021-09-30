import { Box, FlexProps } from "@chakra-ui/layout";
import { useTimer } from "../../frontendHelpers";

export const useTimeoutFrameLogic = (
    timeoutSeconds: number,
    onTimeoutEnd: () => void) => {

    const timer = useTimer(onTimeoutEnd, timeoutSeconds * 1000);

    return {
        timer,
        timeoutSeconds,
        isRunning: timer.isRunning,
        start: timer.start,
        stop: timer.stop,
        restart: timer.restart,
    }
}

export type TimeoutFrameLogicType = ReturnType<typeof useTimeoutFrameLogic>;

export const TimeoutFrame = (props: { logic: TimeoutFrameLogicType } & FlexProps) => {

    const { logic, children, ...css } = props;
    const { timeoutSeconds, isRunning } = logic;

    const pauseTimeout = () => {

        logic.timer.stop();
    }

    const resumeTimeout = () => {

        logic.timer.start();
    }

    return <Box
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
                animationName: "rightSlideAnimation",
                animationDuration: `${timeoutSeconds}s`,
                animationTimingFunction: "linear",
                animationPlayState: isRunning ? "running" : "paused"
            }} />

        <Box position="relative">
            {children}
        </Box>
    </Box>
}