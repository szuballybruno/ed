import React from 'react';
import wrap from 'word-wrap';
import { PersonalityChartDataDTO } from '../../../shared/dtos/PersonalityChartDataDTO';
import { defaultCharts } from '../../../static/defaultChartOptions';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoRadarChart } from './EpistoRadarChart';

export const PersonalityChart = (props: {
    data: PersonalityChartDataDTO
}) => {

    const personalityData = props.data;

    const traitNames = personalityData
        .traits
        .map(x => wrap(x.traitName, { width: 20 }));

    const traitValues = personalityData
        .traits
        .map(x => x.traitScore);

    const traitAreas = [{
        name: translatableTexts.learningOverview.usersAverage,
        value: [3, 4, 5, 7, 4, 2, 4, 5, 4, 4],
    }, {
        name: translatableTexts.learningOverview.yourLearningAnalysis,
        value: traitValues
    }];

    return <EpistoRadarChart
        title=""
        areas={traitAreas}
        radarIndicators={traitNames
            .map(traitName => ({
                name: traitName,
                color: 'black',
                max: 7
            }))
        }
        options={defaultCharts.radar} />;
};