import { Box, BoxProps, Flex, FlexProps } from '@chakra-ui/layout';
import { Typography } from '@mui/material';
import React, { useContext } from 'react';
import { tipOfTheDay, useOverviewPageDTO } from "../../services/dataService";
import { EpistoHeader } from "../administration/universal/EpistoHeader";
import { DevelopmentLineChart } from '../DevelopmentLineChart';
import { CurrentUserContext } from "../HOC/AuthenticationFrame";
import { LoadingFrame } from "../HOC/LoadingFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "../HOC/MainPanels";
import { Tasks } from '../Tasks';
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

const OverviewPage = () => {

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
                            ? <CourseItemView courseItem={currentItem!} />

                            : <ListItem mainTitle={"Tanfolyamkereső"}
                                subTitle={"Válaszd ki a legszimpatikusabb tanfolyamot"}
                                thumbnailUrl={currentItemThumbnailUrl}
                                to={"/kurzusok"} />}
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
                    <EpistoGrid minColumnWidth="400px" columnGap="10">
                        {/* <Flex direction="column" align="flex-start" justify="flex-start" wrap="wrap"> */}

                        {/* test your knowledge */}
                        <DashboardCard title="A nap kerdese" >

                            <VideoQuestionnaire
                                answerSessionId={-1}
                                onAnswered={() => { }}
                                question={pageDTO?.testQuestionDTO!} />
                        </DashboardCard>

                        {/* greeting */}
                        <DashboardCard title="Haladj előre!">
                            <Box p="20px">
                                <EpistoText
                                    allowedLines={4}
                                    text="Current video that you were watching but left watch this video, please, videos are good, watch this!!!" />
                                <FlexImage height="300px" width="100%" url="https://i.stack.imgur.com/z3pLU.png"></FlexImage>
                            </Box>
                        </DashboardCard>

                        {/* current tasks */}
                        <DashboardCard title="Feladatok">
                            <Tasks currentTasks={pageDTO?.currentTasks!} className="whall" />
                        </DashboardCard>

                        {/* development chart */}
                        <DashboardCard title="Fejlődési görbém az elmúlt 90 napban" >
                            <DevelopmentLineChart data={pageDTO?.developmentChartData!} />
                        </DashboardCard>

                        {/* tip of the day */}
                        <DashboardCard title="Napi tipped" >
                            <Typography variant={"h6"} fontSize="16px">{tipOfTheDay}</Typography>
                        </DashboardCard>
                        {/* </Flex> */}
                    </EpistoGrid>
                </RightPanel>
            </LoadingFrame>
        </ContentWrapper>
    </MainWrapper>
};

export default OverviewPage;
