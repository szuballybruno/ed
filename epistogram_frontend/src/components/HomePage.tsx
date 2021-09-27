import { Box, Flex } from '@chakra-ui/layout';
import React, { useContext } from 'react';
import { applicationRoutes } from '../configuration/applicationRoutes';
import { useOverviewPageDTO } from "../services/dataService";
import { CurrentUserContext } from "./HOC/AuthenticationFrame";
import { LoadingFrame } from "./HOC/LoadingFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "./HOC/MainPanels";
import Navbar from "./navbar/Navbar";
import { Tasks } from './Tasks';
import { TipOfTheDay } from './TipOfTheDay';
import { CourseItemList, CourseItemView } from "./universal/CourseItemList";
import { DashboardSection } from './universal/DashboardSection';
import ListItem from './universal/listItem/ListItem';
import { VideoQuestionnaire } from './universal/VideoQuestionnaire';
import { DashoardLeftItemGroup } from "./dashboard/dashboard_components/DashBoardSpacers";
import { PractiseQuestions } from './PractiseQuestions';

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

                        {/* test your knowledge */}
                        <DashboardSection title="A nap kerdese" minHeight="300px">
                            <PractiseQuestions />
                        </DashboardSection>

                        {/* tip of the day */}
                        <DashboardSection title="Napi tipped">
                            <TipOfTheDay />
                        </DashboardSection>

                        {/* current tasks */}
                        <DashboardSection title="Feladatok">
                            <Tasks currentTasks={pageDTO?.currentTasks!} className="whall" />
                        </DashboardSection>

                    </Flex>
                </RightPanel>
            </LoadingFrame>
        </ContentWrapper>
    </MainWrapper>
};

export default HomePage;
