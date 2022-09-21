import { LinearProgress, LinearProgressProps } from '@mui/material';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';

export const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
    return <EpistoFlex2
        align='center'
        flex='1'>

        <EpistoFlex2
            flex='1'
            align='center'
            minWidth="calc(100% - 35px)"
            h='10px'
            mr='5px'>

            <LinearProgress
                style={{
                    width: '100%'
                }}
                variant={'determinate'}
                {...props} />
        </EpistoFlex2>
        <EpistoFlex2 minWidth='35px'>

            <EpistoFont fontSize={'fontNormal14'}>
                {`${Math.round(props.value)}%`}
            </EpistoFont>
        </EpistoFlex2>
    </EpistoFlex2 >;
};
