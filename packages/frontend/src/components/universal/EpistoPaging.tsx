import { EpistoDiv } from '../controls/EpistoDiv';
import { EpistoFlex2 } from '../controls/EpistoFlex';

export const EpistoPaging = ({
    slides,
    index,
    alwaysRender
}: {
    slides: ((isCurrent: boolean) => JSX.Element)[],
    index: number,
    alwaysRender?: boolean,
}) => {

    const renderSlides = () => slides
        .map((x, index) => {

            const isCurrent = index === index;

            return <EpistoDiv
                id={`${EpistoPaging.name}.Slide_${index}`}
                key={index}
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
            id={EpistoPaging.name}
            className="whall"
            flex="1">

            {alwaysRender
                ? renderSlides()
                : renderCurrentSlide}
        </EpistoFlex2>
    );
};