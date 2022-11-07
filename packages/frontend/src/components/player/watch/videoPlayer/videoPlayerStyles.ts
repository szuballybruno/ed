import { CSSProperties } from 'react';
import { EpistoDivProps } from '../../../controls/EpistoDiv';

export const videoPlayerStyles = {

    fullScreenRootPropsMobile: {
        bottom: 0,
        display: 'block',
        left: 0,
        position: 'fixed',
        background: 'black',
        right: 0,
        top: 0,
        zIndex: 21
    } as EpistoDivProps,

    fullScreenRootPropsDesktop: {
        position: 'relative',
        background: 'green'
    } as EpistoDivProps,

    videoWrapperPropsMobile: {
        top: '0',
        left: '0',
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        background: 'black'
    } as EpistoDivProps,

    videoWrapperPropsDesktop: {
        className: 'whall',
        background: 'black',
        position: 'relative'
    } as EpistoDivProps,

    videoPlayerControlIconStyle: {
        width: '70px',
        height: '70px',
        color: 'white'
    } as CSSProperties
};