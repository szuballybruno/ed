import { PersonalityChartDataDTO } from '@episto/communication';
import wrap from 'word-wrap';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoRadarChart } from './EpistoRadarChart';

export const PersonalityChart = (props: {
    data: PersonalityChartDataDTO,
    isSmallDesktop?: boolean
}) => {

    const { data: personalityData, isSmallDesktop } = props;

    const traitNames = personalityData
        .traits
        .map(x => wrap(x.traitName, { width: 20 }));

    const traitValues = personalityData
        .traits
        .map(x => x.traitScore);

    const traitAreas = [{
        name: translatableTexts.learningOverview.usersAverage,
        value: [3, 4, 5, 7, 4, 2, 4, 5, 4, 4]
    }, {
        name: translatableTexts.learningOverview.yourLearningAnalysis,
        value: traitValues
    }];

    return <EpistoRadarChart
        style={{
            display: 'flex',
            flex: '1',
            justifyContent: 'center',
            width: '100%',
            minWidth: isSmallDesktop ? '100%' : '500px'
        }}
        title=""
        areas={traitAreas}
        radarIndicators={traitNames
            .map(traitName => ({
                name: traitName,
                color: '#00352F',
                max: 7
            }))
        } />;
};
