import { Flex, FlexProps, Image } from '@chakra-ui/react';
import React, { ReactNode, useEffect } from 'react';

export const PageRootContainer = (props: {
    children: ReactNode,
    backgoundImageSrc?: string,
    noBackground?: boolean,
    noMaxWidth?: boolean
} & FlexProps) => {

    const { children, noMaxWidth, noBackground, backgoundImageSrc, ...css } = props;

    useEffect(() => {

        document.title = "EpistoGram";
    }, []);

    return <Flex
        background={backgoundImageSrc || noBackground
            ? undefined
            : "var(--gradientBlueBackground)"}
        id="pageRootContainer"
        maxWidth={noMaxWidth ? undefined : "1920px"}
        margin="0 auto"
        position="relative"
        overflow="hidden"
        className="whall"
        {...css}>

        {(!noBackground && backgoundImageSrc) && <Image
            position="absolute"
            top="0"
            objectFit="cover"
            className="whall"
            src={backgoundImageSrc} />}

        {props.children}

    </Flex>
};
