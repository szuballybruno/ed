import { Box, Container, Flex } from "@chakra-ui/react";
import {  Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { getAssetUrl, getQueryParam } from "../../frontendHelpers";
import { useCourseDetails, useStartCourse } from "../../services/courseService";
import { useNavigation } from "../../services/navigatior";
import { showNotification, useShowErrorDialog } from "../../services/notifications";
import { MainWrapper } from "../HOC/MainPanels";
import Navbar from "../navbar/Navbar";
import { EpistoButton } from "../universal/EpistoButton";
import { courseDummyData } from "./mockData";
import { TabPanel } from "./TabPanel";
import {FlexListItem} from "../universal/FlexListItem";
import {FlexListTitleSubtitle} from "../universal/FlexListTitleSubtitle";
import { CourseDetailsRequirementsSection } from "./CourseDetailsRequirementsSection";
import {CourseDetailsSummarySection} from "./CourseDetailsSummarySection";
import {CourseDetailsContentSection} from "./CourseDetailsContentSection";
import {CourseDetailsTeacherSection} from "./CourseDetailsTeacherSection";
import {CourseDetailsRatingSection} from "./CourseDetailsRatingSection";
import {CourseDetailsBriefingInfoItem} from "./CourseDetailsBriefingInfoItem";

const CourseDetailsPage = () => {

    const params = useParams<{ courseId: string }>();
    const courseId = parseInt(params.courseId);
    const [currentTab, setCurrentTab] = useState(0);
    const { navigateToPlayer } = useNavigation();
    const showError = useShowErrorDialog();
    const { startCourseAsync } = useStartCourse();
    const currentItemDescriptior = getQueryParam("code");

    const { courseDetails } = useCourseDetails(courseId);
    const thumbnailURL = courseDetails?.thumbnailURL;
    const title = courseDetails?.title;
    const subCategory = courseDetails?.subCategoryName;

    const mockRecommendedCourses = [{
        title: "Kurzus 1",
        subTitle: "Kurzus 2"
    },{
        title: "Kurzus 1",
        subTitle: "Kurzus 2"
    },{
        title: "Kurzus 1",
        subTitle: "Kurzus 2"
    },{
        title: "Kurzus 1",
        subTitle: "Kurzus 2"
    },{
        title: "Kurzus 1",
        subTitle: "Kurzus 2"
    },{
        title: "Kurzus 1",
        subTitle: "Kurzus 2"
    }]

    const mockCourseDetails = [
        {
            icon: getAssetUrl("/course_page_icons/right_panel_course_lenght.svg"),
            detailName: "Kurzus hossza",
            detailValue: "4h 12m"
        },{
            icon: getAssetUrl("/course_page_icons/right_panel_sections.svg"),
            detailName: "Témakörök száma",
            detailValue: "12"
        },{
            icon: getAssetUrl("/course_page_icons/right_panel_videos.svg"),
            detailName: "Videók száma",
            detailValue: "119"
        },{
            icon: getAssetUrl("/course_page_icons/right_panel_questions.svg"),
            detailName: "Tudást felmérő kérdések",
            detailValue: "187"
        },{
            icon: getAssetUrl("/course_page_icons/right_panel_language.svg"),
            detailName: "Nyelv",
            detailValue: "magyar"
        },{
            icon: getAssetUrl("/course_page_icons/right_panel_enrolled.svg"),
            detailName: "Hányan végezték el eddig",
            detailValue: "4139"
        },{
            icon: getAssetUrl("/course_page_icons/right_panel_updated.svg"),
            detailName: "Legutolsó frissítés dátuma",
            detailValue: "2021. 11. 14."
        }
    ]

    const playCourseAsync = async () => {

        try {

            if (currentItemDescriptior) {

                navigateToPlayer(currentItemDescriptior);
            }
            else {

                const { text: firstItemDescriptor } = await startCourseAsync(courseId);

                if (firstItemDescriptor) {

                    navigateToPlayer(firstItemDescriptor);
                }
                else {

                    showNotification("A kurzus jelenleg nem indítható, ez annak lehet a jele, hogy folyamatban van a feltöltése, kérjük próbáld meg később!", "warning");
                }
            }
        }
        catch (e) {

            showError(e);
        }
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const a11yProps = (index: number) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <MainWrapper>
            <Navbar />
            <Flex position={"relative"} id="rightPanel"
                p={0}
                flex="1"
                overflowX="hidden"
                overflowY="scroll"
                direction="column">

                {/* Title */}

                <Flex
                    w={"100%"}
                    pl={110}
                    pb={10}
                    direction={"row"}
                    justifyContent={"flex-start"}
                    alignItems={"flex-end"}
                    minH={140}
                    h={140}>
                    <Typography variant={"h4"}>{title}</Typography>
                </Flex>

                <Flex direction={"row"} px={100} w={"100%"} minH={1200} h={"100%"} mb={100}>
                    <Flex flex={"1 1 0"} direction={"column"} mr={30}>

                        {/* Overview */}

                        <Container pr={20} pt={20}>
                            {courseDummyData.upperOverviewBelowTitle}
                        </Container>

                        {/* Briefing info items */}

                        <Flex direction={"row"} mt={20} w={"100%"} justifyContent={"space-evenly"}>
                            <CourseDetailsBriefingInfoItem icon={getAssetUrl("/course_page_icons/about_category.svg")} title={"Kategória"} subTitle={subCategory} />
                            <CourseDetailsBriefingInfoItem iconComponent={<Flex w={50}
                                                                   h={50}
                                                                   className={"circle"}
                                                                   border="2px solid var(--epistoTeal)"
                                                                   bg="var(--deepBlue)"
                                                                   color="white"
                                                                   alignItems={"center"}
                                                                   justifyContent={"center"}>
                                <Typography>
                                    OM
                                </Typography>
                            </Flex>} title={"Kategória"} subTitle={subCategory} />

                            <CourseDetailsBriefingInfoItem icon={getAssetUrl("/course_page_icons/about_difficulty.svg")} title={"Nehézség"} subTitle={"6.9/10 pont"} />
                            <CourseDetailsBriefingInfoItem icon={getAssetUrl("/course_page_icons/about_learning_experience.svg")} title={"Tanulási élmény"} subTitle={"4.5/5.0 pont"} />
                        </Flex>

                        {/* Tabs and sections */}

                        <Box w={"100%"} mt={30} mb={50}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={currentTab} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Áttekintés" {...a11yProps(0)} />
                                    <Tab label="Követelmények" {...a11yProps(1)} />
                                    <Tab label="Tartalom" {...a11yProps(2)} />
                                    <Tab label="Az oktatóról" {...a11yProps(3)} />
                                    <Tab label="Értékelések" {...a11yProps(3)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={currentTab} index={0}>
                                <CourseDetailsSummarySection
                                    whatCanYouLearnFromCourseList={courseDummyData.whatCanYouLearnFromCourseList}
                                    overviewSectionShortDescription={courseDummyData.overviewSectionShortDescription}
                                    whatSkillsTheCourseImprovingDescription={courseDummyData.whatSkillsTheCourseImprovingDescription}
                                />
                            </TabPanel>
                            <TabPanel value={currentTab} index={1}>
                                <CourseDetailsRequirementsSection />
                            </TabPanel>
                            <TabPanel value={currentTab} index={2}>
                                <CourseDetailsContentSection />
                            </TabPanel>
                            <TabPanel value={currentTab} index={3}>
                                <CourseDetailsTeacherSection />
                            </TabPanel>
                            <TabPanel value={currentTab} index={4}>
                                <CourseDetailsRatingSection />
                            </TabPanel>
                        </Box>


                    </Flex>

                    {/* Right section */}

                    <Flex direction={"column"} w={400}>
                        <Flex
                            direction={"column"}
                            alignItems={"center"}
                            margin={10}
                            boxSizing={"border-box"}
                            bg={"white"}
                            h={580}
                            borderWidth={1}
                            borderRadius={10}
                            shadow={"#00000024 0px 0px 5px 0px"}>
                            <Flex w={"100%"} height={230} justifyContent={"center"} p={10}>
                                <img src={thumbnailURL} style={{
                                    borderRadius: 5,
                                    objectFit: "cover"
                                }} alt={""} />
                            </Flex>

                            {/* Course details list */}

                            {mockCourseDetails.map(course => <FlexListItem
                                w={"100%"}
                                px={15}
                                h={40}
                                thumbnailContent={<img src={course.icon} style={{
                                    borderRadius: 5,
                                    height: 22,
                                    objectFit: "cover"
                                }} alt={""} />}
                                midContent={<Flex flex={1} p={5}>
                                    <Typography>{course.detailName}</Typography>
                                </Flex>}
                                endContent={<Flex direction={"row"} mx={4} justifyContent={"space-between"} alignItems={"center"}>
                                    <Typography>{course.detailValue}</Typography>
                                </Flex>}
                            />)}

                            {/* start coures */}
                            <EpistoButton
                                style={{ flex: "1", color: "var(--epistoTeal)", maxHeight: 40, marginTop: 15, marginBottom: 15 }}
                                variant="outlined"
                                onClick={playCourseAsync}
                                icon={
                                    <img
                                        src={getAssetUrl("/icons/play2.svg")}
                                        alt=""
                                        style={{
                                            width: "25px",
                                            height: "25px",
                                            marginRight: "5px"
                                        }} />
                                }>
                                Elkezdem a kurzust
                            </EpistoButton>

                        </Flex>

                        {/* Recommended courses section */}
                        <Flex direction={"column"} w={400}>
                            <Flex
                                direction={"column"}
                                alignItems={"center"}
                                margin={10}
                                boxSizing={"border-box"}
                                bg={"white"}
                                h={500}
                                borderWidth={1}
                                borderRadius={10}
                                shadow={"#00000024 0px 0px 5px 0px"}>
                                <Flex w={"100%"} height={60} justifyContent={"center"} alignItems={"center"} p={10}>
                                    <Typography>Ezek a kurzusok is érdekelhetnek</Typography>
                                </Flex>

                                {mockRecommendedCourses.map(course => [
                                    <FlexListItem
                                        w={"100%"}
                                        midContent={
                                            <FlexListTitleSubtitle title={course.title} subTitle={course.subTitle} />
                                        } />
                                ])}

                            </Flex>
                        </Flex>

                    </Flex>
                </Flex>


                {/* Background shapes */}
                <Flex
                    _before={{
                        position: "absolute",
                        content: `""`,
                        top: -400,
                        left: 500,
                        width: 1000,
                        height: 1000,
                        borderRadius: "50%",
                        backgroundColor: "#EFF9FFFF",
                    }}
                    position={"absolute"}
                    top={0}
                    left={0}
                    w={"70%"}
                    h={300}
                    bg={"#eff9ff"}
                    zIndex={-1}
                    backgroundClip={"padding-box"} />

            </Flex>

        </MainWrapper>
    );
};

export default CourseDetailsPage;
