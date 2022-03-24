import { Flex } from '@chakra-ui/layout';
import { useMediaQuery } from '@chakra-ui/react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useOverviewPageDTO } from '../../services/api/miscApiService';
import { useNavigation } from '../../services/core/navigatior';
import { translatableTexts } from '../../static/translatableTexts';
import { ContentPane } from '../ContentPane';
import { RecommendedQuota } from './RecommendedQuota';
import { LeftPane } from '../LeftPane';
import { PageRootContainer } from '../PageRootContainer';
import { PractiseQuestions } from './PractiseQuestions';
import { StatsSummary } from "./StatsSummary";
import { LoadingFrame } from "../system/LoadingFrame";
import { CourseItemView } from '../universal/CourseItemList';
import { CourseProgressDisplay } from './CourseProgressDisplay';
import { DashboardSection } from '../universal/DashboardSection';
import { FlexListItem } from '../universal/FlexListItem';
import { FlexListTitleSubtitle } from '../universal/FlexListTitleSubtitle';
import { useActiveCourses } from '../../services/api/userProgressApiService';
import { usePaging } from '../../static/frontendHelpers';
import { useXDialogLogic, XDialog } from '../lib/XDialog/XDialog';
import { useState } from 'react';
import { EpistoButton } from '../controls/EpistoButton';

const HomePage = () => {

    const { pageDTO, status, error } = useOverviewPageDTO();
    const { navigate } = useNavigation();

    const [isSmallerThan1400] = useMediaQuery('(min-width: 1400px)');

    const { activeCourses } = useActiveCourses();
    const activeCoursesPaging = usePaging(activeCourses);

    const logic = useXDialogLogic("asd");

    return <PageRootContainer>

        <EpistoButton onClick={() => logic.setIsOpen(true)}>
            open close
        </EpistoButton>

        <XDialog logic={logic}>
            <Flex
                pos="relative"
                width="90%"
                height="90%"
                bg="white">

            </Flex>
        </XDialog>

        <LoadingFrame
            width="100%"
            error={error}>

            <LeftPane>

                {/* current course items and progress */}
                {pageDTO?.currentCourseProgress && <Flex
                    className='roundBorders'
                    mx="10px"
                    direction="column">

                    <CourseProgressDisplay
                        value={pageDTO.currentCourseProgress.progressPercentage}
                        label={pageDTO.currentCourseProgress.title}
                        continueItemCode={pageDTO.currentCourseProgress.continueItemCode}
                        mb="5px" />

                    <Flex
                        direction="column"
                        mt="5px">

                        {(pageDTO.currentCourseProgress.nextItems ?? [])
                            .map(x => (
                                <CourseItemView courseItem={x} />))}
                    </Flex>
                </Flex>}

                {/* no current course  */}
                {!pageDTO?.currentCourseProgress && <FlexListItem
                    px="10"
                    onClick={() => navigate(applicationRoutes.availableCoursesRoute.route)}
                    midContent={<Flex>

                        <Flex
                            className="roundBorders"
                            boxShadow="inset -1px -1px 2px 1px rgba(0,0,0,0.10)"
                            p="3px"
                            m="7px 10px 7px 0px"
                            bgColor={"var(--epistoTeal)"} />

                        <FlexListTitleSubtitle title={translatableTexts.homePage.availableCoursesLinkTitle} subTitle={translatableTexts.homePage.availableCoursesText} />
                    </Flex>} />}
            </LeftPane>

            <ContentPane>

                <Flex
                    direction="column"
                    minWidth={isSmallerThan1400 ? "1060px" : undefined}>

                    <Flex wrap="wrap">

                        {/* test your knowledge */}
                        <DashboardSection
                            title={translatableTexts.homePage.practiseTitle}
                            background="var(--transparentIntenseBlue85)"
                            className="largeSoftShadow roundBorders"
                            //boxShadow="inset -1px -1px 7px rgba(0,0,0,0.20)"
                            color="white"
                            showDivider
                            minHeight="200px"
                            m="0 5px 10px 0"
                            flex="3 3 550px">

                            <PractiseQuestions />
                        </DashboardSection>

                        {/* tip of the day */}
                        <DashboardSection
                            title={translatableTexts.homePage.recommendedQuota}
                            background="var(--transparentWhite70)"
                            borderRadius="6px"
                            showDivider
                            className="largeSoftShadow"
                            minHeight="30px"
                            marginBottom="10px"
                            flex="2 2 300px">

                            <RecommendedQuota activeCoursesPaging={activeCoursesPaging} />
                        </DashboardSection>
                    </Flex>

                    {/* stats */}
                    <Flex pb="40px">
                        <StatsSummary courseId={activeCoursesPaging?.currentItem?.courseId ?? null} />
                    </Flex>

                </Flex>
            </ContentPane>
        </LoadingFrame>
    </PageRootContainer>
};

export default HomePage;
