import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { PropsWithChildren } from '../../static/frontendHelpers';

export const FullscreenOverlay = ({
    children,
    visible,
    overlayContent
}: {
    visible: boolean,
    overlayContent: ReactNode
} & PropsWithChildren) => {

    return (
        <Flex
            id={FullscreenOverlay.name}
            position='relative'
            className="whall">

            {children}

            {visible && <Box
                className="whall"
                pos="absolute"
                zIndex={visible ? 1000 : undefined}>

                <Box
                    id="Background"
                    className="whall"
                    position="absolute"
                    bg="black"
                    opacity="0.4" />

                {overlayContent}
            </Box>}
        </Flex>
    );
};