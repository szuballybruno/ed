import { Flex, FlexProps } from "@chakra-ui/react"
import { ReactNode } from "react"

export const FlexFloat = (props: FlexProps & { elevation?: number }) => {

    const { elevation, ...flexProps } = props;

    return <Flex
        id="flexFloat"
        borderRadius="10px"
        boxShadow={`0 0 ${elevation ?? 8}px #0000001f`}
        bg="white"
        {...flexProps} >
        {props.children}
    </Flex>
}