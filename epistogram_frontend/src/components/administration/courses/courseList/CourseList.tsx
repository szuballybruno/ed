import React, {JSXElementConstructor, ReactElement} from "react";
import classes from "./courseList.module.scss";

import {useAdministratedCourses} from "../../../../services/courseService";

import { AdminDashboardWrapper } from "../../universal/adminDashboardWrapper/AdminDashboardWrapper";
import { AdminDashboardSearch } from "../../universal/searchBar/AdminDashboardSearch";
import { AdminDashboardList } from "../../universal/adminDashboardList/AdminDashboardList";
import { AdministrationListItem } from "../../universal/adminDashboardSearchItem/AdministrationListItem";
import { SearchItemButton } from "../../universal/buttons/SearchItemButton";

import {NavLink} from "react-router-dom";

import {Chip, Fab} from "@material-ui/core";
import {
    AccessTimeTwoTone,
    Add,
    ApartmentTwoTone,
    CategoryTwoTone,
    Email,
    EqualizerTwoTone, MenuBookTwoTone,
    OndemandVideoTwoTone,
    PersonTwoTone, PictureInPictureTwoTone, PlayArrowTwoTone, ThumbsUpDownTwoTone, WorkTwoTone, EditTwoTone
} from "@material-ui/icons";


export const administrationChipIcons = {
    email: <Email />,
    organization: <ApartmentTwoTone />,
    work: <WorkTwoTone />,
    category: <CategoryTwoTone />,
    person: <PersonTwoTone />,
    video: <OndemandVideoTwoTone />,
    play: <PlayArrowTwoTone />,
    overlay: <PictureInPictureTwoTone />,
    length: <AccessTimeTwoTone />,
    read: <MenuBookTwoTone />,
    vote: <ThumbsUpDownTwoTone />,
}

export type AdministrationChipIconType = keyof typeof administrationChipIcons

export const getIconByName = (icons: {[iconName: string]: React.ReactNode}, iconName: string) => {
    return icons[iconName]
}

export const getChipWithLabel = (key: React.Key, label: string, iconName: AdministrationChipIconType) => {
    return <Chip key={key}
                 label={label}
                 variant={"outlined"}
                 size={"small"}
                 icon={getIconByName(administrationChipIcons, iconName) as ReactElement<any, string | JSXElementConstructor<any>> | undefined} />
}

export const CourseList = () => {

    const [searchText, setSearchText] = React.useState("");
    const { courses } = useAdministratedCourses(searchText);

    console.log(JSON.stringify(courses))

    return <AdminDashboardWrapper>

        {/* Filter the listed courses */}
        <AdminDashboardSearch
            searchChangeHandler={setSearchText}
            name={"searchData"}
            title={"kurzusok"}
            className={classes.searchBar} />

        {/* List of courses */}
        <AdminDashboardList>
            {courses && courses
                .map((course, index) => {
                    return <AdministrationListItem
                        title={course.title}
                        thumbnailUrl={course.thumbnailImageURL}
                        key={course.courseId}
                        chips={[
                            getChipWithLabel(index, course.category, "category"),
                            getChipWithLabel(index, course.teacherName, "person"),
                            getChipWithLabel(index, course.videosCount.toString(), "video"),
                        ]}
                        searchItemButtons={[
                            <SearchItemButton to={`courses/${course.courseId}`}>
                                <EditTwoTone />
                            </SearchItemButton>,
                            <SearchItemButton to={`courses/${course.courseId}/stats`}>
                                <EqualizerTwoTone />
                            </SearchItemButton>
                        ]} />
                })}
        </AdminDashboardList>

        {/* Add course button */}
        <NavLink to={"/admin/manage/courses/add"}>
            <Fab color="primary"
                 aria-label="add"
                 style={{ position: "absolute", bottom: 45, right: 45 }}>
                <Add />
            </Fab>
        </NavLink>

    </AdminDashboardWrapper>
}