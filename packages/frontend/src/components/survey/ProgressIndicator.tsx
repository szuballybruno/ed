import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoLinearProgressProps, EpistoProgressBar } from '../controls/EpistoProgressBar';

export const LinearProgressWithLabel = (props: EpistoLinearProgressProps & { value: number }) => {
    return <EpistoFlex2
        align='center'
        flex='1'>

        <EpistoFlex2
            flex='1'
            align='center'
            minWidth="calc(100% - 35px)"
            h='10px'
            mr='5px'>

            <EpistoProgressBar
                style={{
                    width: '100%'
                }}
                variant={'determinate'}
                {...props} />
        </EpistoFlex2>
        <EpistoFlex2 minWidth='35px'>

            <EpistoFont >
                {`${Math.round(props.value)}%`}
            </EpistoFont>
        </EpistoFlex2>
    </EpistoFlex2 >;
};
