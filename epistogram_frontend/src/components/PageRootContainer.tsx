import { Flex, FlexProps, Image } from '@chakra-ui/react';
import React, { ReactNode, useEffect } from 'react';
import { gradientBackgroundGenerator } from '../services/core/gradientBackgroundGenerator';
import { EpistoGrid } from './controls/EpistoGrid';

export const PageRootContainer = (props: {
    children: ReactNode,
    backgoundImageSrc?: string,
    noBackground?: boolean,
    noMaxWidth?: boolean
} & FlexProps) => {

    const { children, noMaxWidth, noBackground, backgoundImageSrc, ...css } = props;

    useEffect(() => {

        document.title = 'EpistoGram';
    }, []);

    const gradients = gradientBackgroundGenerator();

    return <Flex
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
                gap={'0'}
                gridTemplateColumns="repeat(3, 1fr)"
                auto={'fill'}>

                {gradients
                    .map((gradient, index) => {
                        return <Flex
                            key={index}
                            padding="20px"
                            filter="blur(8px)"
                            background={gradient}>

                        </Flex>;
                    })}
            </EpistoGrid>}

        {(!noBackground && backgoundImageSrc) && <Image
            position="absolute"
            top="0"
            objectFit="cover"
            className="whall"
            src={backgoundImageSrc} />}

        {props.children}

    </Flex>;
};
