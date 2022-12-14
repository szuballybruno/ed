import { UserPerformanceRating } from '@episto/commontypes';
import { useMemo } from 'react';
import { ChipSmall } from '../administration/courses/ChipSmall';

export const useUserPerformanceDisplayValues = (rating: UserPerformanceRating) => {

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

export const UserPerformanceChip = ({ performance }: { performance: UserPerformanceRating }) => {

    const { color, text } = useUserPerformanceDisplayValues(performance);

    return (
        <ChipSmall
            text={text}
            color={color} />
    );
};