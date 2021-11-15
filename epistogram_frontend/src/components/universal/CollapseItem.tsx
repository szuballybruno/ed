import { Box, Flex } from "@chakra-ui/layout"
import { CSSProperties, ReactNode } from "react"

export const CollapseItem = (props: {
    isOpen: boolean,
    header: ReactNode,
    children: ReactNode,
    style?: CSSProperties
}) => {

    const { header, children, style, isOpen } = props;

    return <Flex direction="column" style={style}>

        {header}

        <Box
            transition="0.3s"
            overflow="hidden"
            maxHeight={isOpen ? "999px" : "0px"}
            pl="20px">

            {children}
        </Box>
    </Flex>
}