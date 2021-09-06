import { BoxProps, Flex, FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export const SlidesDisplay = (props: FlexProps & {
    slides: (() => JSX.Element)[],
    index: number
}) => {

    const { slides, index, ...flex } = props;

    return (
        <Flex id="slidesDisplayRoot" {...flex}>
            {slides[index]()}
        </Flex>
    );
}