import { Flex } from '@chakra-ui/react';
import { PropsWithChildren } from '../../../static/frontendHelpers';
import { EpistoFont } from '../../controls/EpistoFont';
import { FullscreenOverlay } from '../../universal/FullscreenOverlay';

export const GlobalErrorOverlay = ({
    children,
    error,
    visible
}: {
    visible: boolean,
    error: any
} & PropsWithChildren) => {


    return (
        <FullscreenOverlay
            visible={visible}
            overlayContent={<Flex
                align="center"
                justify="center"
                zIndex="200"
                className="whall">

                <Flex
                    p="30px"
                    bg="white">

                    <EpistoFont>
                        {error?.message ?? 'An unknown technical error occured. Try refreshing the page, or coming back later.'}
                    </EpistoFont>
                </Flex>
            </Flex>}>

            {children}
        </FullscreenOverlay>
    );
};