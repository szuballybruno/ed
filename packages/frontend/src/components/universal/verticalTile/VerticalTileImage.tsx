import { ReactNode } from 'react';
import { EpistoDiv } from '../../controls/EpistoDiv';

export const VerticalTileImage = (props: {
    imageUrl: string,
    badgeComponent: ReactNode
}) => {

    const {
        imageUrl,
        badgeComponent
    } = props;

    return <EpistoDiv
        flex="1"
        position="relative"
        minH='150px'
        maxH='150px'>

        {/* cover image */}
        <img
            className="whall roundBorders"
            style={{
                objectFit: 'cover',
            }}
            src={imageUrl}
            alt="" />

        {badgeComponent}
    </EpistoDiv>;

};