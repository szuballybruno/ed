import { Responsivity } from '../../helpers/responsivity';
import { gradientBackgroundGenerator } from '../../services/core/gradientBackgroundGenerator';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoGrid } from '../controls/EpistoGrid';

export const GenericBackground = (props: {
    customBaseColor?: string,
    isFixed?: boolean,
    isFullscreenSized?: boolean
}) => {

    const { customBaseColor, isFixed, isFullscreenSized } = props;

    const { isMobile } = Responsivity
        .useIsMobileView();

    const isIPhone = Responsivity
        .useIsIPhone();

    const defaultMobileColor = 'rgba(80, 150, 255, 0.1)';
    const defaultDesktopColor = 'rgba(0, 100, 255, 0.1)';

    const getRgbFromRgba = (rgb: string) => {

        const regex = /\(([^()]*)(,[^()]*)\)/gm;
        const regexColor = regex.exec(rgb);
        return regexColor ? regexColor[1] : undefined;
    };

    /* Getting r,g,b values without the alpha */
    const defaultMobileBaseColor = getRgbFromRgba(defaultMobileColor);
    const plainCustomBaseColor = customBaseColor ? getRgbFromRgba(customBaseColor) : '0,100,255';

    /* You can set a custom color e.g. for a company */
    const currentColor = (() => {

        if (isIPhone && customBaseColor)
            return 'rgb(' + plainCustomBaseColor + ')';

        if (customBaseColor)
            return 'rgb(' + plainCustomBaseColor + ')';

        if (isIPhone && !customBaseColor)
            return 'rgb(' + defaultMobileBaseColor + ')';

        if (isMobile)
            return defaultMobileColor;

        return defaultDesktopColor;
    })();

    /* Gradient is generated from the current color */
    const gradients = gradientBackgroundGenerator(currentColor);

    /* iPhone hates every type of gradients */
    if (isIPhone)
        return <EpistoFlex2
            backdropFilter="blur(5px)"
            position={isFixed ? 'absolute' : undefined}
            top={isFixed ? '0' : undefined}
            width={isFullscreenSized ? '100vw' : '100%'}
            height={isFullscreenSized ? '100vh' : '100%'}
            opacity='40%'
            background={'linear-gradient(49deg,' + currentColor + ', white)'} />;

    return (
        <EpistoGrid
            bgColor={isMobile ? 'var(--transparentWhite10)' : 'white'}
            position={'absolute'}
            top={'0'}
            width={'100vw'}
            height={'100vh'}
            filter="blur(50px)"
            minColumnWidth={'33%'}
            gap='0px'
            className="whall"
            gridTemplateColumns="repeat(3, 1fr)"
            auto={'fill'}>

            {gradients
                .map((gradient, index) => {
                    return <EpistoFlex2
                        key={index}
                        padding="20px"
                        filter="blur(8px)"
                        background={gradient}>

                    </EpistoFlex2>;
                })}
        </EpistoGrid>
    );
};