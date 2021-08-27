import { BoxProps, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

export const SlidesDisplay = (props: {
    slides: ReactNode[],
    index: number
}) => {

    return (
        <Flex>
            {props.slides[props.index]}
        </Flex>
    );
}