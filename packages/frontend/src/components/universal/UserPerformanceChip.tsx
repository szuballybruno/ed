import { TempoRatingType } from '@episto/commontypes';
import { PropsWithChildren, useMemo } from 'react';
import { EpistoIcons } from '../../static/EpistoIcons';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';

export const useUserPerformanceDisplayValues = (rating: TempoRatingType) => {

    return useMemo(() => {

        if (rating === 'bad')
            return {
                text: 'Lassú',
                color: '#ffbc00'
            };

        if (rating === 'very_bad')
            return {
                text: 'Nagyon lassú',
                color: '#ff5e00'
            };

        if (rating === 'good')
            return {
                text: 'Gyors',
                color: '#66e57b'
            };

        if (rating === 'very_good')
            return {
                text: 'Nagyon gyors',
                color: '#22eb44'
            };

        return {
            text: 'Átlagos',
            color: '#65cbb8'
        };
    }, [rating]);
};

export const PerformanceRatingChip = ({ value, children, ...props }: { rating: TempoRatingType, value: number } & PropsWithChildren) => {

    const rating: TempoRatingType = props.rating;
    const { color, text } = useUserPerformanceDisplayValues(rating);
    const showStar = rating === 'very_good' && !children;

    return (
        <EpistoFlex2
            borderRadius='5px'
            padding='5px'
            color='white'
            background={color}>

            <EpistoFont
                tooltip={`${Math.round(value * 10) / 10 - 100}% ${value < 100 ? 'lemaradás' : 'előrehaladás'} a célhoz képest`}>
                {text}
            </EpistoFont>

            {showStar && <EpistoIcons.Star
                style={{
                    marginLeft: '2px'
                }} />}

            {children}
        </EpistoFlex2>
    );
};