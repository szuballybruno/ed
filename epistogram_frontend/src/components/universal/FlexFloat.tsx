import { Flex, FlexProps } from "@chakra-ui/react"
import { ReactNode } from "react"

export const FlexFloat = (props: FlexProps & { elevation?: number }) => {

    const { elevation, ...flexProps } = props;

    return <Flex {...flexProps} boxShadow={`0 0 ${elevation ?? 8}px #0000001f`}>
        {props.children}
    </Flex>
}