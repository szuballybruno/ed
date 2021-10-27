import { Box, Flex, GridItem } from "@chakra-ui/react";
import { Select, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React from "react";
import { useHistory } from "react-router";
import { distinct } from "../frontendHelpers";
import { useStartCourse, useUserCourses } from "../services/courseService";
import { useNavigation } from "../services/navigatior";
import { showNotification, useShowErrorDialog } from "../services/notifications";
import { translatableTexts } from "../translatableTexts";
import { LoadingFrame } from "./HOC/LoadingFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "./HOC/MainPanels";
import Navbar from "./navbar/Navbar";
import CourseTile from "./universal/CourseTile";
import { EpistoButton } from "./universal/EpistoButton";
import { EpistoGrid } from "./universal/EpistoGrid";
import { EpistoSearch } from "./universal/EpistoSearch";
import classes from "./css/courseSearchMain.module.scss";

const AvailableCoursesPage = () => {

    const history = useHistory()

    const [searchText, setSearchText] = React.useState("");
    const [searchCategory, setSearchCategory] = React.useState("");
    const [isFeatured, setIsFeatured] = React.useState(false);
    const [isRecommended, setIsRecommended] = React.useState(false);

    const { courses, status, error } = useUserCourses();
    const { startCourseAsync, startCourseState } = useStartCourse();

    const { navigateToPlayer } = useNavigation();
    const showError = useShowErrorDialog();

    const clearFilters = () => {
        setSearchCategory("");
        setSearchText("");
        setIsFeatured(false);
        setIsRecommended(false);
    }

    const categoryOptions = distinct(courses
        .map((course, index) => course.subCategoryName));

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

                    showNotification("A kurzus jelenleg nem indítható, ez annak lehet a jele, hogy folyamatban van a feltöltése, kérjük próbáld meg később!");
                }
            }
        }
        catch (e) {

            showError(e);
        }
    }

    return <MainWrapper>

        <Navbar />

        <ContentWrapper>

            <LeftPanel direction="column" align="stretch">

                {/* categories  */}
                <Flex direction="column">

                    {/* categories title */}
                    <Typography
                        style={{ margin: "40px 20px", textAlign: "center" }}
                        variant={"h4"}>

                        {translatableTexts.availableCourses.categoriesTitle}
                    </Typography>

                    {/* categories list */}
                    <ToggleButtonGroup className={classes.categoriesList} orientation={"vertical"}>
                        {categoryOptions
                            .map((categoryOption, index) => {
                                return <ToggleButton
                                    className={searchCategory === categoryOption ? `${classes.categoriesListItem} ${classes.categoriesListItemSelected}` : `${classes.categoriesListItem}`}
                                    value={categoryOption}
                                    style={{
                                        alignItems: "flex-start",
                                        paddingLeft: "30px",
                                    }}
                                    onClick={() => {
                                        setSearchCategory(categoryOption)
                                    }}
                                    key={index}>
                                    {categoryOption}
                                </ToggleButton>
                            })}
                    </ToggleButtonGroup>
                </Flex>
            </LeftPanel>

            <RightPanel noPadding={true}>
                <Flex id="coursesPanelRoot" direction="column" overflow="hidden" className="whall">

                    {/* search */}
                    <Box id="courseSearchRoot" p="20px" direction="column">

                        <EpistoSearch width="100%" />

                        {/* search */}
                        <Flex justify="space-between" mt="20px" align="center">

                            {/* toggle buttons */}
                            <ToggleButtonGroup
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
                                className={classes.sortFormControl}
                                inputProps={{
                                    name: 'A-Z',
                                    id: 'outlined-age-native-simple',
                                }}
                                style={{
                                    height: "40px"
                                }}>
                                <option value={10}>{translatableTexts.availableCourses.sortOptions.aToZ}</option>
                                <option value={20}>{translatableTexts.availableCourses.sortOptions.zToA}</option>
                                <option value={30}>{translatableTexts.availableCourses.sortOptions.newToOld}</option>
                                <option value={30}>{translatableTexts.availableCourses.sortOptions.oldToNew}</option>
                            </Select>
                        </Flex>
                    </Box>

                    {/* courses */}
                    <LoadingFrame overflow="hidden" loadingState={[status, startCourseState]} error={[error]}>
                        <Box id="scrollContainer" overflowY="scroll" className="whall" p="10px">
                            <EpistoGrid auto="fit" gap="15" minColumnWidth="300px">
                                {courses
                                    .map((course, index) => {

                                        return <GridItem>
                                            <CourseTile course={course} key={index} >
                                                <Flex mt="10px">

                                                    {/* details */}

                                                    <EpistoButton
                                                        onClick={() => {
                                                            history.push(`/courses/${course.courseId}`)
                                                        }}
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
