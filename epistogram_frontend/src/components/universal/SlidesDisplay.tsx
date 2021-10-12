import { Box, BoxProps, Flex, FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export const SlidesDisplay = (props: FlexProps & {
    slides: (() => JSX.Element)[],
    index: number,
    alwaysRender?: boolean,
}) => {

    const { slides, index, alwaysRender, ...flex } = props;

    const renderSlides = () => slides
        .map((x, xi) => {

            return <Box
                className="whall"
                display={xi === index ? undefined : "none"}>

                {x()}
            </Box>
        })

    const renderCurrentSlide = slides[index]();

    return (
        <Flex id="slidesDisplayRoot" {...flex}>
            {alwaysRender ? renderSlides() : renderCurrentSlide}
        </Flex>
    );
}