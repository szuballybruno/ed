import { ReactNode } from 'react';
import { EpistoFlex2, EpistoFlex2Props } from '../../controls/EpistoFlex';

export const AbsoluteFlexOverlay = (props: {
    children: ReactNode,
    isVisible: boolean,
    hasPointerEvents?: boolean
} & EpistoFlex2Props) => {

    const { children, isVisible, hasPointerEvents, ...css } = props;

    return <EpistoFlex2
        id="questionnaireOverlay"
        position="absolute"
        width="100%"
        height="100%"
        top="0"
        align="center"
        justify="center"
        transition="0.3s"
        opacity={isVisible ? 1 : 0}
        pointerEvents={isVisible && hasPointerEvents ? 'all' : 'none'}
        {...css}>

        <EpistoFlex2
            width='100vw'
            height='100vh'
            position='fixed'
            top='0' />

        {isVisible && children}
    </EpistoFlex2>;
};
