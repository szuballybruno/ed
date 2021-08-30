import {AdminDashboardSearch} from "../../universal/searchBar/AdminDashboardSearch";
import classes from "../users.module.scss";
import {LoadingFrame} from "../../../../HOC/loading_frame/LoadingFrame";
import {AdminDashboardList} from "../../universal/adminDashboardList/AdminDashboardList";
import {AdministrationListItem} from "../../universal/adminDashboardSearchItem/AdministrationListItem";
import {NavLink} from "react-router-dom";
import {Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {AdminDashboardWrapper} from "../../universal/adminDashboardWrapper/AdminDashboardWrapper";
import React, {useContext} from "react";
import {CurrentUserContext} from "../../../../HOC/data_manager_frame/DataManagerFrame";
import {useUserListQuery} from "../../../../services/adminPageUsersService";
import {globalConfig} from "../../../../configuration/config";
import {getChipWithLabel} from "../../courses/courseList/CourseList";


//TODO: Implement the actions into the UserList component the same way as in CourseList
/*const actions = [
    {
        selectedComponent: "userTasks",
        icon: "list",
        onClick: () => {

        }
    },
    {
        selectedComponent: "editUser",
        icon: "edit",
        onClick: () => {

        }
    },
    {
        selectedComponent: "userStatistics",
        icon: "statistics",
        onClick: () => {

        }
    },
    {
        icon: "delete",
        onClick: (user) => {

            const url = `/users/deleteuser?userId=${user._id}`;
            httpDeleteAsync(url);
            // instance.delete().then(() => {
            //     return admin.users[index].set(none)
            // }).catch(e => console.error(e.toString()))
        }
    },
] as DashboardSearchItemAction[];*/

export const UserList = () => {
    const user = useContext(CurrentUserContext)!;
    const [searchText, setSearchText] = React.useState("");
    const { users, status } = useUserListQuery(user.userId, searchText);

    const getAvatarUrl = (userId: number | null) => {

        if (!userId)
            return "";

        return `${globalConfig.assetStorageUrl}/users/${userId}/avatar.png`;
    }

    return <AdminDashboardWrapper>
        <AdminDashboardSearch
            searchChangeHandler={(name, searchText) => setSearchText(searchText)}
            name="searchData"
            title="Felhasználók"
            className={classes.searchBar} />

        <LoadingFrame loadingState={status}>
            <AdminDashboardList>
                {users
                    .map((user, index) => {
                        return <AdministrationListItem
                            title={`${user.lastName} ${user.firstName}`}
                            profileImageUrl={getAvatarUrl(user.userId)}
                            chips={[
                                getChipWithLabel(index, user.email, "email"),
                                getChipWithLabel(index, user.organizationName, "organization"),
                                getChipWithLabel(index, user.jobTitle, "work")
                            ]}
                            key={index}
                            searchItemButtons={[]}
                        />
                    })}
            </AdminDashboardList>

            <NavLink to={"/admin/manage/users/add"}>
                <Fab color="primary"
                     aria-label="add"
                     style={{ position: "absolute", bottom: 45, right: 45 }}>
                    <Add />
                </Fab>
            </NavLink>

        </LoadingFrame>
    </AdminDashboardWrapper>
}