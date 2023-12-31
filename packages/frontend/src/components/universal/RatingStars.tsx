import { useState } from 'react';
import { Environment } from '../../static/Environemnt';
import { isNullOrUndefined, iterate } from '../../static/frontendHelpers';
import { EpistoFlex2 } from '../controls/EpistoFlex';

export const RatingStars = (props: {
    setSelectedIndex: (index: number) => void,
    selectedIndex: number | null,
    iconUrl?: string
}) => {

    const { setSelectedIndex, selectedIndex, iconUrl } = props;

    const [isHovered, setIsHovered] = useState({
        hovered: false,
        index: 0
    });

    return <>
        <EpistoFlex2>
            {iterate(5, (index) => (
                <img
                    key={index}
                    onMouseEnter={() => { setIsHovered({ hovered: true, index: index }); }}
                    onMouseLeave={() => setIsHovered({ hovered: false, index: 0 })}
                    onClick={() => setSelectedIndex(index)}
                    src={iconUrl ? iconUrl : Environment.getAssetUrl('images/star3D.png')}
                    alt=""
                    className="square30"
                    style={{
                        padding: '3px',
                        cursor: 'pointer',
                        objectFit: 'contain',
                        filter: isNullOrUndefined(selectedIndex)
                            ? (isHovered.hovered && index <= isHovered.index)
                                ? undefined
                                : 'saturate(0) opacity(0.5)'
                            : (selectedIndex! >= index) || (isHovered.hovered && index <= isHovered.index)
                                ? undefined
                                : 'saturate(0) opacity(0.5)'

                    }} />
            ))}
        </EpistoFlex2>
    </>;
};