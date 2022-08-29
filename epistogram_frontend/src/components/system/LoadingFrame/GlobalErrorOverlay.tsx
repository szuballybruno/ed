import { Box, Flex } from '@chakra-ui/react';
import { PropsWithChildren } from '../../../static/frontendHelpers';
import { EpistoFont } from '../../controls/EpistoFont';

export const GlobalErrorOverlay = ({
    children,
    error,
    visible
}: {
    visible: boolean,
    error: any
} & PropsWithChildren) => {


    return (
        <Flex
            id={GlobalErrorOverlay.name}
            position='relative'
            className="whall">

            {children}

            {visible && <Flex
                className="whall"
                position="absolute"
                align="center"
                justify="center"
                zIndex="2">

                <Box
                    className="whall"
                    position="absolute"
                    bg="black"
                    opacity="0.1" />

                <Flex
                    align="center"
                    justify="center"
                    background="white"
                    zIndex="200"
                    p="30px">

                    <EpistoFont>
                        {error?.message ?? 'An unknown technical error occured. Try refreshing the page, or coming back later.'}
                    </EpistoFont>
                </Flex>
            </Flex>}
        </Flex>
    );
};