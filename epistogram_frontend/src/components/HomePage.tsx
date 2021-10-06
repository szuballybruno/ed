import { Box, Flex } from '@chakra-ui/layout';
import React, { useContext } from 'react';
import { applicationRoutes } from '../configuration/applicationRoutes';
import { mockTasks } from '../mockData';
import { useOverviewPageDTO } from "../services/dataService";
import { DashoardLeftItemGroup } from "./dashboard/dashboard_components/DashBoardSpacers";
import { CurrentUserContext } from "./HOC/AuthenticationFrame";
import { LoadingFrame } from "./HOC/LoadingFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "./HOC/MainPanels";
import Navbar from "./navbar/Navbar";
import { PractiseQuestions } from './PractiseQuestions';
import { Tasks } from './Tasks';
import { TipOfTheDay } from './TipOfTheDay';
import { CourseItemList, CourseItemView } from "./universal/CourseItemList";
import { CourseProgressBar } from './universal/CourseProgressBar';
import { DashboardSection } from './universal/DashboardSection';
import ListItem from './universal/listItem/ListItem';

const HomePage = () => {

    const user = useContext(CurrentUserContext);
    const { pageDTO, status, error } = useOverviewPageDTO();

    const currentItem = pageDTO?.currentCourseItems
        .filter(x => x.state == "current")[0];

    const currentItemThumbnailUrl = currentItem?.thumbnailUrl;
    const hasCurrentItem = !!currentItem;
    const hasCurrentCourse = hasCurrentItem;
    const courseItems = pageDTO?.currentCourseItems;
    const recommendedCourses = pageDTO?.recommendedCourses;

    return <MainWrapper>

        <Navbar />

        <ContentWrapper>
            <LoadingFrame loadingState={status} error={error} onlyRenderIfLoaded={true}>
                <LeftPanel align="stretch" justify="stretch">

                    {/* courses progress */}
                    <DashoardLeftItemGroup title="Haladás a kurzusaiddal">
                        <Flex direction="column" p="10px">
                            <CourseProgressBar value={12} label="Excel kurzus" mb="5px" />
                            <CourseProgressBar value={45} label="Java mesterkurzus" mb="5px" />
                        </Flex>
                    </DashoardLeftItemGroup>

                    {/* active item */}
                    <DashoardLeftItemGroup title={hasCurrentItem ? "Folytatom" : "Új tanfolyam kiválasztása"}>
                        {hasCurrentItem
                            ? <Box padding="10px">
                                <CourseItemView courseItem={currentItem!} />
                            </Box>

                            : <ListItem
                                mainTitle={"Tanfolyamkereső"}
                                subTitle={"Válaszd ki a legszimpatikusabb tanfolyamot"}
                                thumbnailUrl={currentItemThumbnailUrl}
                                to={applicationRoutes.availableCoursesRoute.route} />}
                    </DashoardLeftItemGroup>

                    {/* current course */}
                    {hasCurrentCourse &&
                        <DashoardLeftItemGroup
                            title={"Jelenlegi kurzus"}
                            flex="1"
                            overflow="hidden">

                            <CourseItemList courseItems={courseItems!} />
                        </DashoardLeftItemGroup>}

                </LeftPanel>
                <RightPanel>
                    <Flex direction="column">

                        <DashboardSection title="Gyakorolj!" minHeight="300px">
                            <Flex>

                                {/* test your knowledge */}
                                <Box flexBasis="66.6%">
                                    <PractiseQuestions />
                                </Box>

                                {/* divider */}
                                <Box bg="var(--mildGrey)" width="1px" m="15px" />

                                {/* tip of the day */}
                                <Box flexBasis="33.3%" p="20px">
                                    <TipOfTheDay />
                                </Box>
                            </Flex>
                        </DashboardSection>

                        {/* current tasks */}
                        <DashboardSection title="Feladatok">
                            <Tasks currentTasks={mockTasks} className="whall" />
                        </DashboardSection>

                    </Flex>
                </RightPanel>
            </LoadingFrame>
        </ContentWrapper>
    </MainWrapper>
};

export default HomePage;
