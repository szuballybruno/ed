import { Box, FlexProps } from '@chakra-ui/react';
import { EpistoFlex2 } from '../controls/EpistoFlex';

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

    const renderCurrentSlide = slides.length > 0
        ? slides[index](true)
        : <></>;

    return (
        <EpistoFlex2
            flex="1"
            id="slidesDisplayRoot"
            {...flex}>

            {alwaysRender
                ? renderSlides()
                : renderCurrentSlide}
        </EpistoFlex2>
    );
};