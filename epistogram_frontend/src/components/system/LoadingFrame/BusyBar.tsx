import { Flex } from '@chakra-ui/react';
import { LinearProgress } from '@mui/material';

export const BusyBar = ({
    isBusy
}: {
    isBusy: boolean
}) => {

    return (
        <Flex
            position="absolute"
            top="0"
            left="0"
            width="100%"
            zIndex="1000"
            pointerEvents="none"
            id={BusyBar.name}>

            {isBusy && (
                <LinearProgress
                    color='inherit'
                    className='whall'
                    style={{
                        color: 'var(--deepBlue)',
                        height: 3
                    }} />
            )}
        </Flex>
    );
};

