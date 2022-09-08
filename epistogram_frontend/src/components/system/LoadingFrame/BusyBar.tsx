import { LinearProgress } from '@mui/material';
import { EpistoFlex2 } from '../../controls/EpistoFlex';

export const BusyBar = ({
    isBusy
}: {
    isBusy: boolean
}) => {

    return (
        <EpistoFlex2
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
        </EpistoFlex2>
    );
};

