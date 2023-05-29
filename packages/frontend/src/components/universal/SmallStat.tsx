import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';

export const SmallStat = (props: { title?: string, iconUrl: string, text: string }) => {

    return <EpistoFlex2
        align="center"
        title={props.title}
        mr='5px'>

        {/* icon */}
        <img
            src={props.iconUrl}
            alt={''}
            style={{
                width: 15,
                height: 15,
                margin: '0 2px 0 2px'
            }} />

        {/* spent time stat */}
        <EpistoFont
            textColor='eduptiveMildDarkGreen'>

            {props.text}
        </EpistoFont>
    </EpistoFlex2>;
};
