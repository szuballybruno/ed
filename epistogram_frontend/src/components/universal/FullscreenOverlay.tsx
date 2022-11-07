import { ReactNode } from 'react';
import { PropsWithChildren } from '../../static/frontendHelpers';
import { EpistoDiv } from '../controls/EpistoDiv';
import { EpistoFlex2 } from '../controls/EpistoFlex';

export const FullscreenOverlay = ({
    children,
    visible,
    overlayContent
}: {
    visible: boolean,
    overlayContent: ReactNode
} & PropsWithChildren) => {

    return (
        <EpistoFlex2
            id={FullscreenOverlay.name}
            position='relative'
            className="whall">

            {children}

            {visible && <EpistoDiv
                className="whall"
                pos="absolute"
                zIndex={visible ? 1000 : undefined}>

                <EpistoDiv
                    id="Background"
                    className="whall"
                    position="absolute"
                    bg="black"
                    opacity="0.4" />

                {overlayContent}
            </EpistoDiv>}
        </EpistoFlex2>
    );
};