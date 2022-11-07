import { EpistoHeader } from '../EpistoHeader';

export const LearningStatisticsOverview = () => {

    const statistics = [
        {
            title: 'Haladásom'
        },
        {
            title: 'Ismétlésre ajánlott videók'
        },
        {
            title: 'Ismétlésre ajánlott kérdések'
        },
        {
            title: 'Megtekintett videók száma'
        },
        {
            title: 'Aktívan eltöltött idő'
        },
        {
            title: 'Megválaszolt kérdések száma'
        },
        {
            title: 'Helyes válaszok aránya'
        },
        {
            title: 'Céges rangsor'
        }
    ];

    return <EpistoHeader text={'Statisztikám'}>

    </EpistoHeader>;
};