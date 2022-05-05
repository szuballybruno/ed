import { CSSProperties } from 'react';
import { Environment } from '../../static/Environemnt';

export const EpistoConinImage = (props: { style?: CSSProperties }) => {

    return <img
        width="25px"
        height="25px"
        src={Environment.getAssetUrl('/images/epistoCoin.png')}
        style={props.style}
        alt="" />;
};