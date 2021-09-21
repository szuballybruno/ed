import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { FormControl, Select, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React from "react";
import { distinct } from "../../frontendHelpers";
import { LoadingFrame } from "../HOC/LoadingFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "../HOC/MainPanels";
import { GetUserCoursesDTO } from "../../models/shared_models/GetUserCoursesDTO";
import { useUserCourses } from "../../services/courseService";
import { AdminDashboardSearch } from "../administration/universal/searchBar/AdminDashboardSearch";
import CourseTile from "../universal/atomic/courseTile/CourseTile";
import Navbar from "../universal/navigation/navbar/Navbar";
import classes from "./courseSearchMain.module.scss";
import { EpistoGrid } from "../universal/EpistoGrid";
import { FloatSearch } from "../universal/FloatSearch";

const UserCoursesPage = () => {

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
                        Kategóriák
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
                    <Box id="courseSearchRoot" p="20px">

                        {/* search */}
                        <Flex justify="space-between">
                            <FloatSearch />
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
                                <option value={10}>A-Z</option>
                                <option value={20}>Z-A</option>
                                <option value={30}>Új-Régi</option>
                                <option value={30}>Régi-Új</option>
                            </Select>
                        </Flex>

                        {/* toggle buttons */}
                        <ToggleButtonGroup
                            style={{ marginTop: "20px", width: "100%" }}
                            size={"small"}>

                            {/* recommended */}
                            <ToggleButton
                                onClick={() => setIsRecommended(!isRecommended)}
                                selected={isRecommended}
                                value="recommended"
                                style={{ width: "100%" }}>
                                Neked ajánljuk
                            </ToggleButton>

                            {/* featured */}
                            <ToggleButton
                                onClick={() => setIsFeatured(!isFeatured)}
                                selected={isFeatured}
                                value="featured"
                                style={{ width: "100%" }}>
                                Kiemelt
                            </ToggleButton>

                            {/* show all */}
                            <ToggleButton
                                onClick={() => clearFilters()}
                                selected={isRecommended && isFeatured}
                                value="showAll"
                                style={{ width: "100%" }}>
                                Mind
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    {/* courses */}
                    <LoadingFrame overflow="hidden" loadingState={[status]} error={[error]}>
                        <Box id="scrollContainer" overflowY="scroll" className="whall" p="10px">
                            <EpistoGrid columnGap="15" minColumnWidth="300px">
                                {courses
                                    .map((course: any, index) => {
                                        return <GridItem height="350px" >

                                            <CourseTile course={course} itemIndex={index} key={index} />
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

export default UserCoursesPage

// // <Grid id="gridFlex" wrap="wrap" className="whall">
//                             {courses
//                                 .map((course: any, index) => {
//                                     return <Box bg="red" flexBasis="33%" padding="10px">

//                                         <Box bg="grey" className="whall"></Box>
//                                         {/* <CourseTile course={course} itemIndex={index} key={index} /> */}
//                                     </Box>
//                                 })}
//                         </Flex>
