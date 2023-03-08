import { OverallScoreRatingType, PerformanceRatingType } from '@episto/commontypes';
import { PropsWithChildren, useMemo } from 'react';
import { EpistoIcons } from '../../static/EpistoIcons';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';

export const useUserPerformanceDisplayValues = (rating: PerformanceRatingType) => {

    return useMemo(() => {

        if (rating === 'very_bad')
            return {
                label: 'Rossz',
                desc: 'Sokszor rosszul válaszol',
                color: '#ff5e00'
            };

        if (rating === 'bad')
            return {
                label: 'Átlag alatti',
                desc: 'Néha rosszul válaszol',
                color: '#ffbc00'
            };

        if (rating === 'good')
            return {
                label: 'Jó',
                desc: 'Sokszor jól válaszol',
                color: '#66e57b'
            };

        if (rating === 'very_good')
            return {
                label: 'Kitűnő',
                desc: 'Szinte hibátlan válaszokat ad',
                color: '#22eb44'
            };

        return {
            label: 'Átlagos',
            desc: 'Átlagosan teljesít',
            color: '#65cbb8'
        };
    }, [rating]);
};

export const PerformanceChip = ({ value, children, ...props }: { rating: OverallScoreRatingType, value: number } & PropsWithChildren) => {

    const rating: OverallScoreRatingType = props.rating;
    const { color, label, desc } = useUserPerformanceDisplayValues(rating);
    const showStar = rating === 'very_good' && !children;

    return (
        <EpistoFlex2
            borderRadius='5px'
            padding='5px'
            color='white'
            background={color}>

            <EpistoFont
                tooltip={`${desc} - százalékos érték: ${value}%`}>
                {label}
            </EpistoFont>

            {showStar && <EpistoIcons.Star
                style={{
                    marginLeft: '2px'
                }} />}

            {children}
        </EpistoFlex2>
    );
};