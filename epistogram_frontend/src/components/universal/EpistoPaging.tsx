import { Box, Flex, FlexProps } from '@chakra-ui/react';

export const EpistoPaging = (props: FlexProps & {
    slides: ((isCurrent: boolean) => JSX.Element)[],
    index: number,
    alwaysRender?: boolean,
}) => {

    const { slides, index, alwaysRender, ...flex } = props;

    const renderSlides = () => slides
        .map((x, xi) => {

            const isCurrent = xi === index;

            return <Box
                key={xi}
                className="whall"
                display={isCurrent ? undefined : 'none'}>

                {x(isCurrent)}
            </Box>;
        });

    const renderCurrentSlide = slides[index](true);

    return (
        <Flex id="slidesDisplayRoot"
{...flex}>
            {alwaysRender
                ? renderSlides()
                : renderCurrentSlide}
        </Flex>
    );
};