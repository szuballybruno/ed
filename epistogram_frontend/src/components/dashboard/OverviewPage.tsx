import { Flex } from "@chakra-ui/layout";
import { Divider, Grid } from "@mui/material";
import React, { ReactNode, useContext } from 'react';
import { CurrentUserContext } from "../../HOC/AuthenticationFrame";
import { LoadingFrame } from "../../HOC/LoadingFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "../../HOC/MainPanels";
import { useOverviewPageDTO } from "../../services/dataService";
import AdminDashboardHeader from "../administration/universal/adminDashboardHeader/AdminDashboardHeader";
import ListItem from "../universal/atomic/listItem/ListItem";
import { CourseItemList, CourseItemView } from "../universal/CourseItemList";
import Navbar from "../universal/navigation/navbar/Navbar";
import { DashBoardRightSpacer, DashboardVerticalDivider, DashoardLeftItemGroup } from "./dashboard_components/DashBoardSpacers";
import { OverviewDashboard } from "./dashboard_components/OverviewDashboard/OverviewDashboard";
import ProfileStats from "./dashboard_components/ProfileStats/ProfileStats";
import RecommendedCourses from "./dashboard_components/RecommendedCourses/RecommendedCourses";
import classes from './userDashBoard.module.scss';

const OverviewSection = (props: { children: ReactNode, title: string }) => {

    return <>
        <AdminDashboardHeader titleText={props.title} />
        <Divider className={classes.divider} />
        {props.children}
    </>
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

                    {/* profile data */}
                    <ProfileStats user={user!} />

                    <DashboardVerticalDivider />

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

                    <OverviewSection title="Személyes tanulási asszisztens">
                        <OverviewDashboard dto={pageDTO!} />
                    </OverviewSection>

                    {/*<OverviewSection title="Szavazás">
                         <Votes />
                        {recommendedCourses === [] ? <DashBoardRightSpacer title={"Kurzusajánló"} /> : null}
                        {recommendedCourses === [] ? <RecommendedCourses courses={recommendedCourses} /> : null}
                        <DashBoardRightSpacer title={""} />
                    </OverviewSection>*/}

                </RightPanel>
            </LoadingFrame>
        </ContentWrapper>
    </MainWrapper>
};

export default OverviewPage;
