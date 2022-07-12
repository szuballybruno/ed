import { Flex, useMediaQuery } from '@chakra-ui/react';
import { ImproveYourselfSection } from './learningInsights/ImproveYourselfSection';
import { LearningStatistics } from './learningInsights/LearningStatistics';
import { LearningStatisticsOverview } from './learningInsights/LearningStatisticsOverview';
import { LearningStatisticsSeciton } from './learningInsights/LearningStatisticsSeciton';
import { DashboardSection } from './universal/DashboardSection';
import { PersonalityAssessment } from './learningInsights/PersonalityAssessment';
import { Id } from '../shared/types/versionId';

export const LearningInsightsOverview = () => {

    const [isSmallerThan1400] = useMediaQuery('(min-width: 1400px)');

    return <Flex
        flex='1'
        direction="column"
        pb="40px"
        minWidth={isSmallerThan1400 ? '1060px' : undefined}>

        <DashboardSection
            title='Statisztikád'
            background="var(--transparentWhite70)"
            borderRadius="6px"
            showDivider
            className="largeSoftShadow"
            marginBottom="10px">

            <LearningStatistics userId={Id.create<'User'>(0)} />
        </DashboardSection>

        <DashboardSection
            title='Egyedi tanulási analízised'
            background="var(--transparentWhite70)"
            borderRadius="6px"
            showDivider
            className="largeSoftShadow"
            marginBottom="10px">

            <PersonalityAssessment />
        </DashboardSection>

        <DashboardSection
            title='Hozd ki magadból a maximumot'
            background="var(--transparentWhite70)"
            borderRadius="6px"
            showDivider
            className="largeSoftShadow"
            marginBottom="10px">

            <ImproveYourselfSection />
        </DashboardSection>
    </Flex>;
};
