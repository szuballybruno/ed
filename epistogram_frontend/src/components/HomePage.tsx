import { Box, Flex } from '@chakra-ui/layout';
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
                    <Flex w="100%" alignItems={"center"} justifyContent="flex-start" h="100px">
                        <img
                            src={getAssetUrl("/images/logo.svg")}
                            style={{
                                height: "60px",
                                objectFit: "cover",
                                cursor: "pointer",
                                margin: "20px 0",
                                padding: 0
                            }}
                            alt=""
                            onClick={() => {

                                if (user?.userActivity?.canAccessApplication)
                                    navigate(homeUrl);
                            }} />
                    </Flex>

                    {/* courses progress */}
                    <DashoardLeftItemGroup title={translatableTexts.homePage.courseProgress}>
                        <Flex direction="column" p="10px">
                            {courseProgressShortDtos
                                .map(x => <CourseProgressBar
                                    value={x.progressPercentage}
                                    label={x.courseTitle}
                                    mb="5px" />)}
                        </Flex>
                    </DashoardLeftItemGroup>

                    {/* active item */}
                    <DashoardLeftItemGroup
                        title={hasCurrentItem
                            ? translatableTexts.homePage.activeCourseContinue
                            : translatableTexts.homePage.activeCourseEmpty}>

                        {hasCurrentItem
                            ? <Box padding="10px">
                                <CourseItemView courseItem={currentItem!} />
                            </Box>

                            : <ListItem
                                mainTitle={translatableTexts.homePage.availableCoursesLinkTitle}
                                subTitle={translatableTexts.homePage.availableCoursesText}
                                thumbnailUrl={currentItemThumbnailUrl}
                                to={applicationRoutes.availableCoursesRoute.route} />}
                    </DashoardLeftItemGroup>

                    {/* current course */}
                    {hasCurrentCourse &&
                        <DashoardLeftItemGroup
                            title={translatableTexts.homePage.currentCourseTitle}
                            flex="1"
                            overflow="hidden">

                            <CourseItemList modules={modules} />
                        </DashoardLeftItemGroup>}

                </LeftPanel>
                <RightPanel
                    padding="5px"
                    background="radial-gradient(farthest-corner at 300px 300px, rgba(177,208,242,0.7) 33%, white 100%)">

                    <Navbar />

                    <Flex direction="column">

                        <Flex wrap="wrap" px="20px">

                            {/* test your knowledge */}
                            <DashboardSection
                                title={translatableTexts.homePage.practiseTitle}
                                background="#4561EED8"
                                borderRadius="6px"
                                className="largeSoftShadow"
                                color="white"
                                minHeight="300px"
                                minWidth="500px"
                                flex="2">

                                <PractiseQuestions />
                            </DashboardSection>

                            {/* tip of the day */}
                            <DashboardSection
                                title={translatableTexts.homePage.tipOfTheDay}
                                background="var(--transparentWhite70)"
                                borderRadius="6px"
                                className="largeSoftShadow"
                                minHeight="300px"
                                minWidth="300px"
                                flex="1">

                                <DailyTip />
                            </DashboardSection>

                        </Flex>

                        <DashboardSection title={translatableTexts.homePage.stats} mx="25px">
                            <StatsSummary />
                        </DashboardSection>
                    </Flex>
                </RightPanel>
            </LoadingFrame>
        </ContentWrapper>
    </MainWrapper>
};

export default HomePage;
