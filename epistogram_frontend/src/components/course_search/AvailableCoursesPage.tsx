import { Box, Flex, GridItem } from "@chakra-ui/react";
import { Select, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React from "react";
import { distinct } from "../../frontendHelpers";
import { GetUserCoursesDTO } from "../../models/shared_models/GetUserCoursesDTO";
import { useUserCourses } from "../../services/courseService";
import { LoadingFrame } from "../HOC/LoadingFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "../HOC/MainPanels";
import CourseTile from "../universal/CourseTile";
import { EpistoGrid } from "../universal/EpistoGrid";
import { EpistoSearch } from "../universal/EpistoSearch";
import Navbar from "../navbar/Navbar";
import classes from "./courseSearchMain.module.scss";
import { EpistoButton } from "../universal/EpistoButton";
import { httpPostAsync } from "../../services/httpClient";
import { useNavigation } from "../../services/navigatior";
import { translatableTexts } from "../../translatableTexts";

const AvailableCoursesPage = () => {

    const [searchText, setSearchText] = React.useState("");
    const [searchCategory, setSearchCategory] = React.useState("");
    const [isFeatured, setIsFeatured] = React.useState(false);
    const [isRecommended, setIsRecommended] = React.useState(false);

    const getCoursesDTO = {
        searchText: searchText,
        searchCategory: searchCategory,
        isFeatured: isFeatured,
        isRecommended: isRecommended
    } as GetUserCoursesDTO;

    const { courses, status, error } = useUserCourses(getCoursesDTO);

    const { navigateToPlayer } = useNavigation();

    const clearFilters = () => {
        setSearchCategory("");
        setSearchText("");
        setIsFeatured(false);
        setIsRecommended(false);
    }

    const categoryOptions = distinct(courses
        .map((course, index) => course.category));

    return <MainWrapper>

        <Navbar />

        <ContentWrapper>

            <LeftPanel direction="column" align="stretch">

                {/* categories  */}
                <Flex direction="column">

                    {/* categories title */}
                    <Typography
                        style={{ margin: "20px", textAlign: "center" }}
                        variant={"h4"}>

                        {translatableTexts.availableCourses.categoriesTitle}
                    </Typography>

                    {/* categories list */}
                    <ToggleButtonGroup className={classes.categoriesList}>
                        {categoryOptions
                            .map((categoryOption, index) => {
                                return <ToggleButton
                                    name={"category"}
                                    className={searchCategory === categoryOption ? `${classes.categoriesListItem} ${classes.categoriesListItemSelected}` : `${classes.categoriesListItem}`}
                                    value={categoryOption}
                                    onClick={x => setSearchCategory(x.currentTarget.value)}
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
                    <LoadingFrame overflow="hidden" loadingState={[status]} error={[error]}>
                        <Box id="scrollContainer" overflowY="scroll" className="whall" p="10px">
                            <EpistoGrid auto="fit" gap="15" minColumnWidth="300px">
                                {courses
                                    .map((course: any, index) => {

                                        const playCourse = async () => {

                                            await httpPostAsync(`/course/start-course?courseId=${course.courseId}`);
                                            navigateToPlayer(course.firstItemCode);
                                        }

                                        return <GridItem height="350px" >
                                            <CourseTile course={course} key={index} >
                                                <Flex mt="10px">

                                                    {/* details */}
                                                    <EpistoButton
                                                        onClick={() => window.location.href = "https://epistogram.com/excel/"}
                                                        style={{ flex: "1" }}>

                                                        {translatableTexts.availableCourses.courseDataSheet}
                                                    </EpistoButton>

                                                    {/* start course */}
                                                    <EpistoButton
                                                        onClick={playCourse}
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

// // <Grid id="gridFlex" wrap="wrap" className="whall">
//                             {courses
//                                 .map((course: any, index) => {
//                                     return <Box bg="red" flexBasis="33%" padding="10px">

//                                         <Box bg="grey" className="whall"></Box>
//                                         {/* <CourseTile course={course} itemIndex={index} key={index} /> */}
//                                     </Box>
//                                 })}
//                         </Flex>
