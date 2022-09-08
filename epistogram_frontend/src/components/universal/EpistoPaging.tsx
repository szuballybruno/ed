import { EpistoDiv } from '../controls/EpistoDiv';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';

export const EpistoPaging = (props: EpistoFlex2Props & {
    slides: ((isCurrent: boolean) => JSX.Element)[],
    index: number,
    alwaysRender?: boolean,
}) => {

    const { slides, index, alwaysRender, ...flex } = props;

    const renderSlides = () => slides
        .map((x, xi) => {

            const isCurrent = xi === index;

            return <EpistoDiv
                key={xi}
                className="whall"
                display={isCurrent ? undefined : 'none'}>

                {x(isCurrent)}
            </EpistoDiv>;
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