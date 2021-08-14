import React, { useEffect } from "react";
import Navbar from "../universal/navigation/navbar/AllNavbar";
import menuItems from "../../configuration/menuItems.json";
import classes from "./courseSearchMain.module.scss"
import { useState } from "@hookstate/core";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import instance from "../../services/axiosInstance";
import applicationRunningState from "../../store/application/applicationRunningState";
import { FailedComponent, LoadingComponent, NullComponent } from "../../HOC/loading_frame/loadingComponents/LoadingComponent";
import { LoadingFrame } from "../../HOC/loading_frame/LoadingFrame";
import CourseTile from "../universal/atomic/courseTile/CourseTile";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "../../HOC/mainPanels/MainPanels";
import Cookies from "universal-cookie";
import AdminDashboardHeader from "../administration/universal/adminDashboardHeader/AdminDashboardHeader";
import AdminDashboardSearch from "../administration/universal/searchBar/AdminDashboardSearch";
import { FormControl, Grid, Select, Typography } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { course } from "../../store/types/course";

const CourseSearch = () => {
    const cookies = new Cookies();

    const app = useState(applicationRunningState)
    const courses = useState([{
        _id: "",
        name: "",
        category: "",
        group: "",
        creatorId: "",
        teacherId: "",
        supervisorId: "",
        organizationId: "",
        teacherName: "",
        courseLength: 0,
        colorOne: "",
        colorTwo: "",
        items: [
            {
                _id: "",
                type: "",
                title: "",
                subTitle: "",
                url: "",
                length: 0,
                description: "",
                thumbnailUrl: "",
                teacherName: "",
                courseName: "",
                showAutomaticOverlay: false,
                overlays: [{
                    _id: "",
                    type: 0,
                    question: "",
                    timecode: 0,
                    answers: [{
                        _id: "",
                        answer: ""
                    }],
                    validAnswer: ""
                }],
            }
        ],
        thumbnailUrl: ""
    }])
    const courseCategories = useState([] as string[])
    const currentQuery = useState({
        searchData: "",
        category: "",
        featured: "",
        isRecommended: ""
    })

    const setLoadingOnRequest = (config: AxiosRequestConfig) => {
        app.loadingIndicator.set("loading")
        return config
    }

    const setLoadingOnResponse = (response: AxiosResponse) => {
        if (response) {
            app.loadingIndicator.set("succeeded")
        } else {
            app.loadingIndicator.set("failed")
        }
        return response
    }

    const fetchCourses = () => {
        instance.get("courses", {
            params: {
                userId: cookies.get("userId"),
                searchData: currentQuery.searchData.get(),
                category: currentQuery.category.get(),
                featured: currentQuery.featured.get(),
                isRecommended: currentQuery.isRecommended.get()
            }
        }).then((res) => {
            if (res.data) {
                courses.set(res.data)
            }
        }).catch((e) => {
            return e
        })
    }

    const searchChangeHandler = (name: string, value: string) => {
        app.selectedCourseCategory.set(value)
        currentQuery[name as keyof typeof currentQuery].set(value)
        fetchCourses()
    }
    const everyCourseButton = () => {
        currentQuery.category.set("")
        currentQuery.featured.set("")
        currentQuery.isRecommended.set("")
        app.selectedCourseCategory.set("")
        fetchCourses()
    }

    useEffect(() => {
        const requestInterceptor = instance.interceptors.request.use(setLoadingOnRequest)
        const responseInterceptor = instance.interceptors.response.use(setLoadingOnResponse)

        instance.get("courses/?userId=" + cookies.get("userId")).then((res) => {
            if (res.data) {
                courses.set(res.data)

                let adat: string
                res.data.map((data: course, index: number) => {
                    if (index === 0) {
                        adat = data.category
                        courseCategories[index].set(data.category)
                    } else if (adat !== data.category) {
                        courseCategories[index].set(data.category)
                    }
                    app.selectedCourseCategory.set("")
                    return adat = data.category
                })
                app.loadingIndicator.set("succeeded")
            } else {
                app.loadingIndicator.set("failed")
            }
        }).catch((e) => {
            return e
        })

        instance.interceptors.request.eject(requestInterceptor)
        instance.interceptors.response.eject(responseInterceptor)
        // eslint-disable-next-line
    }, [])

    const loadingState = useState(applicationRunningState).loadingIndicator.get();

    return <MainWrapper>
        <Navbar showHighlightedButton={true} menuItems={menuItems["user"]} showLastButton={true} showSwitchButton={false} showNavigation={true} />
        <ContentWrapper>

            <LeftPanel>
                <div className={classes.categoriesContainer}>
                    <div className={classes.categoriesTitle}>
                        <Typography variant={"h4"}>Kategóriák</Typography>
                    </div>

                    <LoadingFrame loadingState={loadingState}>

                        <ToggleButtonGroup className={classes.categoriesList}>
                            {
                                courseCategories.get().map((data, index) => {
                                    return <ToggleButton name={"category"}
                                        className={app.selectedCourseCategory.get() === data ? `${classes.categoriesListItem} ${classes.categoriesListItemSelected}` : `${classes.categoriesListItem}`}
                                        value={data}
                                        onClick={(e) => searchChangeHandler(e.currentTarget.name, e.currentTarget.value)}
                                        key={index}>
                                        {data}
                                    </ToggleButton>
                                })
                            }
                        </ToggleButtonGroup>

                    </LoadingFrame>
                </div>
            </LeftPanel>

            <RightPanel>
                <AdminDashboardHeader titleText={""} />
                <AdminDashboardSearch searchChangeHandler={searchChangeHandler} name={"searchData"} title={"Kurzusok"} className={classes.searchBar} />
                <div className={classes.courseOptionsContainer}>
                    <div className={classes.courseLeftOptionsContainer}>
                        <ToggleButtonGroup classes={{
                            root: classes.filterSelectorButtonGroupRoot
                        }} size={"small"}>
                            <ToggleButton onClick={() => {
                                currentQuery.featured.set("")
                                searchChangeHandler("isRecommended", "true")
                            }}
                                selected={currentQuery.isRecommended.get() === "true"}
                                classes={{
                                    root: classes.filterSelectorButtonRoot,
                                    selected: classes.filterSelectorButtonSelected
                                }}>
                                Neked ajánljuk
                            </ToggleButton>
                            <ToggleButton onClick={() => {
                                currentQuery.isRecommended.set("")
                                searchChangeHandler("featured", "true")
                            }}
                                selected={currentQuery.featured.get() === "true"}
                                classes={{
                                    root: classes.filterSelectorButtonRoot,
                                    selected: classes.filterSelectorButtonSelected
                                }}>
                                Kiemelt
                            </ToggleButton>
                            <ToggleButton onClick={everyCourseButton}
                                selected={currentQuery.isRecommended.get() !== "true" && currentQuery.featured.get() !== "true"}
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
                <LoadingFrame loadingState={loadingState}>
                    <Grid container spacing={3} className={classes.courseItemsContainer}>
                        {
                            courses.get().map((data: any, index) => {
                                return <CourseTile item={data} itemIndex={index} key={index} />
                            })
                        }
                    </Grid>
                </LoadingFrame>
            </RightPanel>
        </ContentWrapper>
    </MainWrapper>
}

export default CourseSearch
