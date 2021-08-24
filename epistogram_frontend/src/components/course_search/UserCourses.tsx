import { FormControl, Grid, Select, Typography } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import React from "react";
import menuItems from "../../configuration/menuItems.json";
import { LoadingFrame } from "../../HOC/loading_frame/LoadingFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "../../HOC/mainPanels/MainPanels";
import { GetUserCoursesDTO } from "../../models/shared_models/GetUserCoursesDTO";
import { useUserCourses } from "../../services/courseService";
import AdminDashboardHeader from "../administration/universal/adminDashboardHeader/AdminDashboardHeader";
import AdminDashboardSearch from "../administration/universal/searchBar/AdminDashboardSearch";
import CourseTile from "../universal/atomic/courseTile/CourseTile";
import Navbar from "../universal/navigation/navbar/AllNavbar";
import classes from "./courseSearchMain.module.scss";

const UserCourses = () => {

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

    const categoryOptions = courses
        .map((course, index) => course.category);

    return <MainWrapper>
        <Navbar showHighlightedButton={true} menuItems={menuItems["user"]} showLastButton={true} showSwitchButton={false} showNavigation={true} />
        <ContentWrapper>

            <LeftPanel>
                <div className={classes.categoriesContainer}>
                    <div className={classes.categoriesTitle}>
                        <Typography variant={"h4"}>Kategóriák</Typography>
                    </div>

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
                </div>
            </LeftPanel>

            <RightPanel>

                <AdminDashboardHeader titleText={""} />
                <AdminDashboardSearch
                    searchChangeHandler={(x, value) => setSearchText(value)}
                    name={"searchData"}
                    title={"Kurzusok"}
                    className={classes.searchBar} />

                <div className={classes.courseOptionsContainer}>
                    <div className={classes.courseLeftOptionsContainer}>
                        <ToggleButtonGroup
                            classes={{
                                root: classes.filterSelectorButtonGroupRoot
                            }}
                            size={"small"}>

                            {/* recommended */}
                            <ToggleButton
                                onClick={() => setIsRecommended(!isRecommended)}
                                selected={isRecommended}
                                classes={{
                                    root: classes.filterSelectorButtonRoot,
                                    selected: classes.filterSelectorButtonSelected
                                }}>
                                Neked ajánljuk
                            </ToggleButton>

                            {/* featured */}
                            <ToggleButton
                                onClick={() => setIsFeatured(!isFeatured)}
                                selected={isFeatured}
                                classes={{
                                    root: classes.filterSelectorButtonRoot,
                                    selected: classes.filterSelectorButtonSelected
                                }}>
                                Kiemelt
                            </ToggleButton>

                            {/* show all */}
                            <ToggleButton
                                onClick={() => clearFilters()}
                                selected={isRecommended && isFeatured}
                                classes={{
                                    root: classes.filterSelectorButtonRoot,
                                    selected: classes.filterSelectorButtonSelected
                                }}>
                                Mind
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className={classes.courseRightOptionsContainer}>
                        <FormControl variant={"outlined"} className={classes.sortFormControl} size={"small"}>
                            <Select
                                native
                                onChange={() => { }}
                                className={classes.sortFormControl}
                                inputProps={{
                                    name: 'A-Z',
                                    id: 'outlined-age-native-simple',
                                }}

                                classes={{
                                    root: classes.sortFormControlRoot,
                                    select: classes.sortFormControlSelect,
                                }}
                            >
                                <option value={10}>A-Z</option>
                                <option value={20}>Z-A</option>
                                <option value={30}>Új-Régi</option>
                                <option value={30}>Régi-Új</option>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                {/* courses */}
                <LoadingFrame loadingState={[status]} error={[error]}>
                    <Grid container spacing={3} className={classes.courseItemsContainer}>
                        {courses
                            .map((course: any, index) => {
                                return <CourseTile course={course} itemIndex={index} key={index} />
                            })}
                    </Grid>
                </LoadingFrame>

            </RightPanel>
        </ContentWrapper>
    </MainWrapper>
}

export default UserCourses
