import { ReactNode, useEffect } from 'react';
import { gradientBackgroundGenerator } from '../services/core/gradientBackgroundGenerator';
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

    const gradients = gradientBackgroundGenerator('rgba(0, 100, 255, 0.1)');

    return <EpistoFlex2
        id="pageRootContainer"
        maxWidth={noMaxWidth ? undefined : '1920px'}
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
                position="absolute"
                top={0}
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
