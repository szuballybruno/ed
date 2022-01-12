import { Flex } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/react';
import { Typography } from '@mui/material';
import { applicationRoutes } from '../configuration/applicationRoutes';
import { useOverviewPageDTO } from '../services/api/miscApiService';
import { useNavigation } from '../services/core/navigatior';
import { translatableTexts } from '../static/translatableTexts';
import { DailyTip } from './DailyTip';
import { EpistoHeader } from './EpistoHeader';
import { PractiseQuestions } from './PractiseQuestions';
import { StatsSummary } from "./StatsSummary";
import { LoadingFrame } from "./system/LoadingFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "./system/MainPanels";
import { CourseItemView } from './universal/CourseItemList';
import { CourseProgressDisplay } from './universal/CourseProgressDisplay';
import { DashboardSection } from './universal/DashboardSection';
import { EpistoButton } from './universal/EpistoButton';

const HomePage = () => {

    const { pageDTO, status, error } = useOverviewPageDTO();
    const { navigate } = useNavigation();

    console.log(pageDTO?.currentCourseProgress?.title)

    return <MainWrapper>

        <ContentWrapper>

            <LoadingFrame loadingState={status} error={error}>

                <LeftPanel>

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
                    <Flex>
                        <EpistoButton
                            variant="colored"
                            onClick={() => navigate(applicationRoutes.availableCoursesRoute.route)}>

                            <Box>

                                <EpistoHeader
                                    text={translatableTexts.homePage.availableCoursesLinkTitle}
                                    style={{ textTransform: "none" }} />

                                <Typography
                                    style={{ textTransform: "none" }}>

                                    {translatableTexts.homePage.availableCoursesText}
                                </Typography>
                            </Box>
                        </EpistoButton>
                    </Flex>
                </LeftPanel>

                <RightPanel>

                    <Flex direction="column">

                        <Flex wrap="wrap">

                            {/* test your knowledge */}
                            <DashboardSection
                                title={translatableTexts.homePage.practiseTitle}
                                background="var(--transparentIntenseBlue)"
                                className="largeSoftShadow roundBorders"
                                color="white"
                                minHeight="300px"
                                minWidth="500px"
                                m="0 5px 10px 0"
                                flex="3">

                                <PractiseQuestions />
                            </DashboardSection>

                            {/* tip of the day */}
                            <DashboardSection
                                title={translatableTexts.homePage.tipOfTheDay}
                                background="var(--transparentWhite70)"
                                borderRadius="6px"
                                className="largeSoftShadow"
                                minHeight="30px"
                                minWidth="300px"
                                m="0 0 10px 5px"
                                flex="2">

                                <DailyTip />
                            </DashboardSection>

                        </Flex>

                        {/* stats */}
                        <Flex>
                            <StatsSummary />
                        </Flex>

                    </Flex>
                </RightPanel>
            </LoadingFrame>
        </ContentWrapper>
    </MainWrapper>
};

export default HomePage;
