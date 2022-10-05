import { ReactNode, useEffect } from 'react';
import browser from '../services/core/browserSniffingService';
import { gradientBackgroundGenerator } from '../services/core/gradientBackgroundGenerator';
import { useIsMobileView } from '../static/frontendHelpers';
import { EpistoFlex2, EpistoFlex2Props } from './controls/EpistoFlex';
import { EpistoGrid } from './controls/EpistoGrid';
import { EpistoImage } from './controls/EpistoImage';

export const PageRootContainer = (props: {
    children: ReactNode,
    backgoundImageSrc?: string,
    noBackground?: boolean,
    noMaxWidth?: boolean
} & EpistoFlex2Props) => {

    const { children, noMaxWidth, noBackground, backgoundImageSrc, ...css } = props;

    useEffect(() => {

        document.title = 'EpistoGram';
    }, []);
    const isMobile = useIsMobileView();
    const isIPhone = browser.isIPhone;

    const gradients = gradientBackgroundGenerator(isMobile ? 'rgba(160, 200, 255, 0.1)' : 'rgba(0, 100, 255, 0.1)');

    return <EpistoFlex2
        id="pageRootContainer"
        maxWidth={noMaxWidth ? undefined : '1920px'}
        paddingTop={isIPhone ? '40px' : '0'}
        margin="0 auto"
        position="relative"
        overflow="hidden"
        className="whall"
        {...css}>

        {/* 3x3 Gradient Grid */}
        {backgoundImageSrc || noBackground
            ? undefined
            : <EpistoGrid
                bgColor={'white'}
                position="fixed"
                top={'0'}
                left={'0'}
                w="100vw"
                h="100vh"
                zIndex="-1"
                filter="blur(50px)"
                minColumnWidth={'33%'}
                gap='0px'
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
            </EpistoGrid>}

        {(!noBackground && backgoundImageSrc) && <EpistoImage
            position="absolute"
            top="0"
            objectFit="cover"
            className="whall"
            src={backgoundImageSrc} />}

        {props.children}

    </EpistoFlex2>;
};
