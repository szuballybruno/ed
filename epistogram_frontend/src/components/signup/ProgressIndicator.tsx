import {LinearProgress, LinearProgressProps} from '@mui/material';
import {EpistoDiv} from '../controls/EpistoDiv';
import {EpistoFont} from '../controls/EpistoFont';

export const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
    return <EpistoDiv >
        <EpistoDiv width="100%"
            mr='1px' >
            <LinearProgress variant={'determinate'}
                {...props} />
        </EpistoDiv>
        <EpistoDiv minWidth='35px'>

            <EpistoFont fontSize={'fontNormal14'}>
                {`${Math.round(props.value)}%`}
            </EpistoFont>
        </EpistoDiv>
    </EpistoDiv>;
};
