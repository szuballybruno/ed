import { Flex } from "@chakra-ui/react"
import { ReactNode } from "react"

export const AbsoluteFlexOverlay = (props: {
    children: ReactNode,
    isVisible: boolean,
    hasPointerEvents?: boolean
}) => {

    return <Flex
        id="questionnaireOverlay"
        position="absolute"
        width="100%"
        height="100%"
        top="0"
        align="center"
        justify="center"
        transition="0.3s"
        opacity={props.isVisible ? 1 : 0}
        pointerEvents={props.isVisible && props.hasPointerEvents ? "all" : "none"}>
        {props.isVisible && props.children}
    </Flex>
}