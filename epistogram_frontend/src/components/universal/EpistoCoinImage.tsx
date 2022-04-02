import { CSSProperties } from 'react';
import { getAssetUrl } from '../../static/frontendHelpers';

export const EpistoConinImage = (props: { style?: CSSProperties }) => {

    return <img
        width="25px"
        height="25px"
        src={getAssetUrl('/images/epistoCoin.png')}
        style={props.style}
        alt="" />;
};