import { useMediaQuery } from '@chakra-ui/react';
import { Id } from '@episto/commontypes';
import { EpistoFlex2 } from './controls/EpistoFlex';
import { LearningStatistics } from './learningInsights/LearningStatistics';
import { PersonalityAssessment } from './learningInsights/PersonalityAssessment';
import { DashboardSection } from './universal/DashboardSection';
export const LearningInsightsOverview = () => {

    const [isSmallerThan1400] = useMediaQuery('(min-width: 1400px)');

    return <EpistoFlex2
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

        {/* <DashboardSection
            title='Hozd ki magadból a maximumot'
            background="var(--transparentWhite70)"
            borderRadius="6px"
            showDivider
            className="largeSoftShadow"
            marginBottom="10px">

            <ImproveYourselfSection />
        </DashboardSection> */}
    </EpistoFlex2>;
};
