import { Box, BoxProps, Flex, FlexProps } from '@chakra-ui/layout';
import { Typography } from '@mui/material';
import React, { useContext } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { tipOfTheDay, useOverviewPageDTO } from "../../services/dataService";
import { EpistoHeader } from "../administration/universal/EpistoHeader";
import { DevelopmentLineChart } from '../DevelopmentLineChart';
import { CurrentUserContext } from "../HOC/AuthenticationFrame";
import { LoadingFrame } from "../HOC/LoadingFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "../HOC/MainPanels";
import { Tasks } from '../Tasks';
import { TipOfTheDay } from '../TipOfTheDay';
import ListItem from "../universal/atomic/listItem/ListItem";
import { CourseItemList, CourseItemView } from "../universal/CourseItemList";
import { EpistoGrid } from '../universal/EpistoGrid';
import { EpistoText } from '../universal/EpistoText';
import { FlexFloat } from '../universal/FlexFloat';
import { FlexImage } from '../universal/FlexImage';
import Navbar from "../universal/navigation/navbar/Navbar";
import { VideoQuestionnaire } from '../universal/VideoQuestionnaire';
import { DashoardLeftItemGroup } from "./dashboard_components/DashBoardSpacers";

const DashboardCard = (props: FlexProps & { title: string }) => {

    const { title, children, ...css } = props;

    return <FlexFloat
        direction="column"
        borderRadius="none"
        p="10px"
        {...css}>
        <EpistoHeader text={title} showDivider variant="strongSub" />
        <Box className="whall">
            {children}
        </Box>
    </FlexFloat>
}

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

                            : <ListItem mainTitle={"Tanfolyamkereső"}
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
                    <EpistoGrid minColumnWidth="300px" columnGap="10">
                        {/* <Flex direction="column" align="flex-start" justify="flex-start" wrap="wrap"> */}

                        {/* test your knowledge */}
                        <DashboardCard title="A nap kerdese" gridColumnEnd="span 2" >

                            <VideoQuestionnaire
                                answerSessionId={-1}
                                onAnswered={() => { }}
                                question={pageDTO?.testQuestionDTO!} />
                        </DashboardCard>

                        {/* tip of the day */}
                        <DashboardCard title="Napi tipped">
                            <TipOfTheDay />
                        </DashboardCard>

                        {/* current tasks */}
                        <DashboardCard title="Feladatok" gridColumnEnd="span 2">
                            <Tasks currentTasks={pageDTO?.currentTasks!} className="whall" />
                        </DashboardCard>

                        {/* development chart */}
                        <DashboardCard title="Fejlődési görbém az elmúlt 90 napban" >
                            <DevelopmentLineChart data={pageDTO?.developmentChartData!} />
                        </DashboardCard>

                    </EpistoGrid>
                </RightPanel>
            </LoadingFrame>
        </ContentWrapper>
    </MainWrapper>
};

export default HomePage;
