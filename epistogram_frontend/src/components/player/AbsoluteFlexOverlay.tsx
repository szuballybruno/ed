import { Flex, FlexProps } from "@chakra-ui/react"
import { ReactNode } from "react"

export const AbsoluteFlexOverlay = (props: {
    children: ReactNode,
    isVisible: boolean,
    hasPointerEvents?: boolean
} & FlexProps) => {

    const { children, isVisible, hasPointerEvents, ...css } = props;

    return <Flex
        id="questionnaireOverlay"
        position="absolute"
        width="100%"
        height="100%"
        top="0"
        align="center"
        justify="center"
        transition="0.3s"
        opacity={isVisible ? 1 : 0}
        pointerEvents={isVisible && hasPointerEvents ? "all" : "none"}
        {...css}>
        {isVisible && children}
    </Flex>
}