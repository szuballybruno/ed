import { Box, Flex, GridItem } from "@chakra-ui/react";
import { Select, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { distinct, getAssetUrl } from "../static/frontendHelpers";
import { useNavigation } from "../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../services/core/notifications";
import { translatableTexts } from "../static/translatableTexts";
import { LoadingFrame } from "./system/LoadingFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "./system/MainPanels";
import Navbar from "./navbar/Navbar";
import CourseTile from "./universal/CourseTile";
import { EpistoButton } from "./universal/EpistoButton";
import { EpistoGrid } from "./universal/EpistoGrid";
import { EpistoSearch } from "./universal/EpistoSearch";
import classes from "./css/courseSearchMain.module.scss";
import { applicationRoutes } from "../configuration/applicationRoutes";
import { useUserCourses, useStartCourse } from "../services/api/courseApiService";
import { CurrentUserContext } from "./system/AuthenticationFrame";

const AvailableCoursesPage = () => {

    const history = useHistory()

    const homeUrl = applicationRoutes.rootHomeRoute.route;

    const [searchText, setSearchText] = React.useState("");
    const [searchCategory, setSearchCategory] = React.useState("");
    const [isFeatured, setIsFeatured] = React.useState(false);
    const [isRecommended, setIsRecommended] = React.useState(false);

    const { courses, coursesState, coursesError } = useUserCourses();
    const { startCourseAsync, startCourseState } = useStartCourse();

    const { navigate, navigateToPlayer } = useNavigation();
    const showError = useShowErrorDialog();

    const user = useContext(CurrentUserContext);

    const clearFilters = () => {
        setSearchCategory("");
        setSearchText("");
        setIsFeatured(false);
        setIsRecommended(false);
    }

    const categoryOptions = distinct(courses
        .map((course, index) => course.subCategoryName));

    const navigateToDetailsPage = (courseId: number, currentItemDescriptior: string | null) => {

        navigate(applicationRoutes.availableCoursesRoute.courseDetailsRoute.route, { courseId }, { code: currentItemDescriptior });
    }

    const playCourse = async (courseId: number, currentItemDescriptior: string | null) => {

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

    return <MainWrapper>



        <ContentWrapper>

            <LeftPanel
                boxShadow="3px 0px 15px 5px rgba(0,0,0,0.1)"
                direction="column"
                align="stretch">
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

                {/* categories  */}
                <Flex direction="column">

                    {/* categories title */}
                    <Typography
                        variant="overline"
                        style={{ margin: "10px" }}>

                        {translatableTexts.availableCourses.categoriesTitle}
                    </Typography>

                    {/* categories list */}
                    <ToggleButtonGroup
                        style={{
                            flex: 1,
                            textAlign: "left"
                        }}
                        orientation={"vertical"}>

                        {categoryOptions
                            .map((categoryOption, index) => {
                                return <ToggleButton
                                    value={categoryOption}
                                    style={{
                                        textAlign: "left",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        paddingLeft: "10px",
                                        border: "none"
                                    }}
                                    onClick={() => {
                                        setSearchCategory(categoryOption)
                                    }}
                                    key={index}>
                                    <Flex
                                        className="roundBorders"
                                        boxShadow="inset -1px -1px 2px 1px rgba(0,0,0,0.10)"
                                        p="3px"
                                        h="30px"
                                        m="2px 10px 2px 0px"
                                        bgColor="var(--epistoTeal)" />
                                    {categoryOption}
                                </ToggleButton>
                            })}
                    </ToggleButtonGroup>
                </Flex>
            </LeftPanel>

            <RightPanel
                padding="30px"
                background="radial-gradient(farthest-corner at 300px 300px, rgba(177,208,242,0.7) 33%, white 100%)">

                <Navbar />

                <Flex id="coursesPanelRoot" direction="column" px="20px">

                    {/* search */}
                    <Box id="courseSearchRoot" p="20px 10px" direction="column">

                        <EpistoSearch width="100%" />

                        {/* search */}
                        <Flex justify="space-between" mt="20px" align="center">

                            {/* toggle buttons */}
                            <ToggleButtonGroup
                                className="mildShadow"
                                style={{
                                    background: "var(--transparentWhite70)",
                                    height: 40,
                                    border: "none"
                                }}
                                sx={{
                                    "& .MuiButtonBase-root": {
                                        border: "none"
                                    }
                                }}
                                size={"small"}>

                                {/* recommended */}
                                <ToggleButton
                                    onClick={() => setIsRecommended(!isRecommended)}
                                    selected={isRecommended}
                                    value="recommended"
                                    style={{ width: "100%", whiteSpace: "nowrap", padding: "15px" }}>

                                    {translatableTexts.availableCourses.recommendedForYou}
                                </ToggleButton>

                                {/* featured */}
                                <ToggleButton
                                    onClick={() => setIsFeatured(!isFeatured)}
                                    selected={isFeatured}
                                    value="featured"
                                    style={{ width: "100%", whiteSpace: "nowrap", padding: "15px" }}>

                                    {translatableTexts.availableCourses.highlighted}
                                </ToggleButton>

                                {/* show all */}
                                <ToggleButton
                                    onClick={() => clearFilters()}
                                    selected={isRecommended && isFeatured}
                                    value="showAll"
                                    style={{ width: "100%", whiteSpace: "nowrap", padding: "15px" }}>

                                    {translatableTexts.availableCourses.all}
                                </ToggleButton>
                            </ToggleButtonGroup>

                            <Select
                                native
                                onChange={() => { }}
                                className="roundBorders fontSmall mildShadow"
                                inputProps={{
                                    name: 'A-Z',
                                    id: 'outlined-age-native-simple',
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        border: "none"
                                    }
                                }}
                                style={{
                                    background: "var(--transparentWhite70)",
                                    border: "none",
                                    height: "40px",
                                    color: "3F3F3F"
                                }}>
                                <option value={10}>{translatableTexts.availableCourses.sortOptions.aToZ}</option>
                                <option value={20}>{translatableTexts.availableCourses.sortOptions.zToA}</option>
                                <option value={30}>{translatableTexts.availableCourses.sortOptions.newToOld}</option>
                                <option value={30}>{translatableTexts.availableCourses.sortOptions.oldToNew}</option>
                            </Select>
                        </Flex>
                    </Box>

                    {/* courses */}
                    <LoadingFrame loadingState={[coursesState, startCourseState]} error={[coursesError]}>
                        <Box id="scrollContainer" className="whall" p="10px">
                            <EpistoGrid auto="fit" gap="15" minColumnWidth="300px">
                                {courses
                                    .map((course, index) => {

                                        return <GridItem
                                            className="roundBorders"
                                            background="var(--transparentWhite70)">
                                            <CourseTile
                                                course={course}
                                                key={index}>

                                                <Flex my="10px">

                                                    {/* details */}
                                                    <EpistoButton
                                                        onClick={() => navigateToDetailsPage(course.courseId, course.firstItemCode)}
                                                        style={{ flex: "1" }}>
                                                        {translatableTexts.availableCourses.courseDataSheet}
                                                    </EpistoButton>

                                                    {/* start course */}
                                                    <EpistoButton
                                                        onClick={() => playCourse(course.courseId, course.firstItemCode)}
                                                        variant="colored"
                                                        style={{ flex: "1" }}>

                                                        {translatableTexts.availableCourses.startCourse}
                                                    </EpistoButton>
                                                </Flex>
                                            </CourseTile>
                                        </GridItem>
                                    })}
                            </EpistoGrid>
                        </Box>
                    </LoadingFrame>
                </Flex>
            </RightPanel>
        </ContentWrapper>
    </MainWrapper >
}

export default AvailableCoursesPage
