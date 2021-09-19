import { Flex, FlexProps } from "@chakra-ui/react";

export const FlexList = (props: FlexProps) => {

    return <Flex
        id="courseItemListContainer"
        direction="column"
        overflowY="scroll"
        {...props}>
        {props.children}
    </Flex>;
}