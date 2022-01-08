import { Box, Flex } from '@chakra-ui/layout';
import { Typography } from '@mui/material';
import { useContext } from 'react';
import { applicationRoutes } from '../configuration/applicationRoutes';
import { useCourseProgressShortDtos } from '../services/api/courseApiService';
import { useOverviewPageDTO } from '../services/api/miscApiService';
import { useNavigation } from '../services/core/navigatior';
import { getAssetUrl } from '../static/frontendHelpers';
import { translatableTexts } from '../static/translatableTexts';
import { DailyTip } from './DailyTip';
import { DashoardLeftItemGroup } from "./dashboard/dashboard_components/DashBoardSpacers";
import Navbar from "./navbar/Navbar";
import { PractiseQuestions } from './PractiseQuestions';
import { StatsSummary } from "./StatsSummary";
import { CurrentUserContext } from './system/AuthenticationFrame';
import { LoadingFrame } from "./system/LoadingFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "./system/MainPanels";
import { CourseItemList, CourseItemView } from "./universal/CourseItemList";
import { CourseProgressBar } from './universal/CourseProgressBar';
import { DashboardSection } from './universal/DashboardSection';
import ListItem from './universal/listItem/ListItem';

const HomePage = () => {

    const { navigate } = useNavigation();
    const homeUrl = applicationRoutes.rootHomeRoute.route;
    const { pageDTO, status, error } = useOverviewPageDTO();
    const user = useContext(CurrentUserContext);
    const modules = pageDTO?.modules ?? [];

    const currentItem = modules
        .flatMap(x => x.items)
        .filter(x => x.state === "current")[0];

    const currentItemThumbnailUrl = currentItem?.thumbnailUrl;
    const hasCurrentItem = !!currentItem;

    const hasCurrentCourse = hasCurrentItem;

    const { courseProgressShortDtos } = useCourseProgressShortDtos();

    return <MainWrapper>



        <ContentWrapper>

            <LoadingFrame loadingState={status} error={error} onlyRenderIfLoaded={true}>
                <LeftPanel align="stretch" justify="stretch">
                    {/* logo link */}
                    <Flex w="100%" alignItems={"center"} justifyContent="flex-start" mb="20px">
                        <img
                            src={getAssetUrl("/images/logo.svg")}
                            style={{
                                height: "50px",
                                objectFit: "cover",
                                cursor: "pointer",
                                margin: "10px 10px",
                                padding: 0
                            }}
                            alt=""
                            onClick={() => {

                                if (user?.userActivity?.canAccessApplication)
                                    navigate(homeUrl);
                            }} />
                    </Flex>

                    <Flex
                        className='roundBorders'
                        mx="10px"
                        direction="column">
                        {courseProgressShortDtos
                            .map(x =>
                                <DashoardLeftItemGroup title={x.courseTitle}>

                                    <CourseProgressBar
                                        value={x.progressPercentage}
                                        label={x.courseTitle}
                                        mb="5px" />
                                </DashoardLeftItemGroup>)}

                        <Flex
                            direction="column"
                            mt="5px">

                            {hasCurrentItem
                                && <Box justify="space-between">
                                    <CourseItemView courseItem={currentItem!} />
                                </Box>}

                            {hasCurrentItem
                                && <Box>
                                    <CourseItemView courseItem={currentItem!} />
                                </Box>}

                            {hasCurrentItem
                                && <Box>
                                    <CourseItemView courseItem={currentItem!} />
                                </Box>}
                        </Flex>
                    </Flex>

                </LeftPanel>
                <RightPanel
                    padding="30px"
                    background="radial-gradient(farthest-corner at 300px 300px, rgba(177,208,242,0.7) 33%, white 100%)">

                    <Navbar />

                    <Flex direction="column">

                        <Flex wrap="wrap" px="20px">

                            {/* test your knowledge */}
                            <DashboardSection
                                title={translatableTexts.homePage.practiseTitle}
                                background="var(--transparentIntenseBlue)"
                                className="largeSoftShadow roundBorders"
                                color="white"
                                minHeight="300px"
                                minWidth="500px"
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
                                flex="2">

                                <DailyTip />
                            </DashboardSection>

                        </Flex>

                        <Flex mx="5px">

                            <StatsSummary />
                        </Flex>

                    </Flex>
                </RightPanel>
            </LoadingFrame>
        </ContentWrapper>
    </MainWrapper>
};

export default HomePage;
