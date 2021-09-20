import { Box } from '@chakra-ui/layout';
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
import { EpistoText } from '../universal/EpistoText';
import { FlexFloat } from '../universal/FlexFloat';
import Navbar from "../universal/navigation/navbar/Navbar";
import { VideoQuestionnaire } from '../universal/VideoQuestionnaire';
import { DashoardLeftItemGroup } from "./dashboard_components/DashBoardSpacers";

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

                    {/* test your knowledge */}
                    <EpistoHeader text="A nap kerdese" />
                    <FlexFloat margin="0 20px 20px 20px" width="550px" alignSelf="center">
                        <VideoQuestionnaire
                            answerSessionId={-1}
                            onAnswered={() => { }}
                            question={pageDTO?.testQuestionDTO!} />
                    </FlexFloat>

                    {/* current tasks */}
                    <EpistoHeader text="Feladatok" />
                    <FlexFloat margin="0 20px 20px 20px">
                        <Tasks currentTasks={pageDTO?.currentTasks!} />
                    </FlexFloat>

                    {/* tip of the day */}
                    <EpistoHeader text="Napi tipped" />
                    <FlexFloat margin="0 20px 20px 20px">
                        <Typography variant={"h6"}>{tipOfTheDay}</Typography>
                    </FlexFloat>

                    {/* development chart */}
                    <EpistoHeader text="Fejlődési görbém az elmúlt 90 napban" />
                    <FlexFloat margin="0 20px 20px 20px" height="600px">
                        <DevelopmentLineChart data={pageDTO?.developmentChartData!} />
                    </FlexFloat>
                </RightPanel>
            </LoadingFrame>
        </ContentWrapper>
    </MainWrapper>
};

export default OverviewPage;
