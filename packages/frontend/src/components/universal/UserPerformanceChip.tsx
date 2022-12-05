import { UserPerformanceRating } from '@episto/commontypes';
import { ChipSmall } from '../administration/courses/ChipSmall';

export const UserPerformanceChip = ({ performance }: { performance: UserPerformanceRating }) => {

    const {
        color,
        text
    } = (() => {

        if (performance === 'very_bad')
            return {
                color: 'red',
                text: 'Atlag alatt'
            };

        if (performance === 'bad')
            return {
                color: 'red',
                text: 'Atlag alatt'
            };

        if (performance === 'good')
            return {
                color: 'red',
                text: 'Atlag alatt'
            };

        if (performance === 'very_good')
            return {
                color: 'red',
                text: 'Atlag alatt'
            };

        return {
            color: 'red',
            text: 'Atlag alatt'
        };
    })();

    return (
        <ChipSmall
            text={text}
            color={color} />
    );
};