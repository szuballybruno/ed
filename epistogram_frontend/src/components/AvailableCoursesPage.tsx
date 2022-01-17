import { Box, Flex, GridItem, useMediaQuery } from "@chakra-ui/react";
import { Select, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React from "react";
import { useHistory } from "react-router";
import { useStartCourse, useUserCourses } from "../services/api/courseApiService";
import { useNavigation } from "../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../services/core/notifications";
import { distinct } from "../static/frontendHelpers";
import { translatableTexts } from "../static/translatableTexts";
import { ContentPane } from "./ContentPane";
import { LeftPane } from "./LeftPane";
import { PageRootContainer } from "./PageRootContainer";
import { LoadingFrame } from "./system/LoadingFrame";
import CourseTile from "./universal/CourseTile";
import { EpistoButton } from "./controls/EpistoButton";
import { EpistoGrid } from "./controls/EpistoGrid";
import { EpistoSearch } from "./universal/EpistoSearch";

const AvailableCoursesPage = () => {

    const history = useHistory()

    const [searchText, setSearchText] = React.useState("");
    const [searchCategory, setSearchCategory] = React.useState("");
    const [isFeatured, setIsFeatured] = React.useState(false);
    const [isRecommended, setIsRecommended] = React.useState(false);

    const { courses, coursesState, coursesError } = useUserCourses();
    const { startCourseAsync, startCourseState } = useStartCourse();

    const { navigate, navigateToPlayer, navigateToCourseDetails } = useNavigation();
    const showError = useShowErrorDialog();

    const [isSmallerThan1400] = useMediaQuery('(min-width: 1400px)');

    const clearFilters = () => {
        setSearchCategory("");
        setSearchText("");
        setIsFeatured(false);
        setIsRecommended(false);
    }

    const categoryOptions = distinct(courses
        .map((course, index) => course.subCategoryName));

    const navigateToDetailsPage = (courseId: number, currentItemDescriptior: string | null) => {

        navigateToCourseDetails(courseId, currentItemDescriptior ?? undefined);
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

    return <PageRootContainer>

        <LeftPane>

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
                                    height: 40,
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
        </LeftPane>

        <ContentPane>

            <Flex
                id="coursesPanelRoot"
                direction="column"
                align="stretch"
                width="100%"
                minW={isSmallerThan1400 ? "1060px" : undefined}>

                {/* search */}
                <Flex
                    id="courseSearchRoot"
                    direction="row"
                    align="center"
                    justify="space-between"
                    w="100%"
                    p="0 0 20px 0">

                    {/* toggle buttons */}
                    <ToggleButtonGroup
                        className="mildShadow"
                        style={{
                            background: "var(--transparentWhite70)",
                            height: 40,
                            border: "none",
                            flex: 2
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

                    <EpistoSearch flex="5" h="40px" mx="10px" />

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
                            color: "3F3F3F",
                            flex: 1
                        }}>
                        <option value={10}>{translatableTexts.availableCourses.sortOptions.aToZ}</option>
                        <option value={20}>{translatableTexts.availableCourses.sortOptions.zToA}</option>
                        <option value={30}>{translatableTexts.availableCourses.sortOptions.newToOld}</option>
                        <option value={30}>{translatableTexts.availableCourses.sortOptions.oldToNew}</option>
                    </Select>
                </Flex>

                {/* courses */}
                <LoadingFrame loadingState={[coursesState, startCourseState]} error={[coursesError]}>

                    <Box id="scrollContainer" className="whall">

                        <EpistoGrid auto="fill" gap="15" minColumnWidth="250px">
                            {courses
                                .map((course, index) => {

                                    return <GridItem
                                        className="roundBorders"
                                        background="var(--transparentWhite70)">

                                        <CourseTile
                                            course={course}
                                            key={index}>

                                            <Flex mb="10px">

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
        </ContentPane>
    </PageRootContainer >
}

export default AvailableCoursesPage
