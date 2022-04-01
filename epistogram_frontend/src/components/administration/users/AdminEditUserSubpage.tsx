import { Add } from "@mui/icons-material";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { ButtonType } from "../../../models/types";
import { deleteUserAsync, useEditUserData, useSaveUser } from "../../../services/api/userApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications";
import { AdminPageUserDTO } from "../../../shared/dtos/admin/AdminPageUserDTO";
import { UserEditDTO } from "../../../shared/dtos/UserEditDTO";
import { useIntParam } from "../../../static/locationHelpers";
import { EpistoDialog, useEpistoDialogLogic } from "../../EpistoDialog";
import { AdminBreadcrumbsHeader, BreadcrumbLink } from "../AdminBreadcrumbsHeader";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { AdminEditUserControl } from "./AdminEditUserControl";
import { AdminUserList } from "./AdminUserList";

export const AdminEditUserSubpage = (props: {
    users: AdminPageUserDTO[],
    refetchUsersFunction: () => void
}) => {

    const { users, refetchUsersFunction } = props;

    const editedUserId = useIntParam("userId")!;
    const { userEditData, refetchEditUserData } = useEditUserData(editedUserId);
    const { saveUserAsync } = useSaveUser();
    const showError = useShowErrorDialog();
    const { navigate } = useNavigation();
    const navigateToAddUser = () => navigate(applicationRoutes.administrationRoute.usersRoute.addRoute.route);
    const navigateToUserCourses = () => navigate(`${applicationRoutes.administrationRoute.usersRoute.route}/${editedUserId}/courses`);
    const location = useLocation();

    const handleSaveUserAsync = async (dto: UserEditDTO) => {

        try {

            await saveUserAsync(dto);
            showNotification("A változtatások sikeresen mentésre kerültek.");
            refetchEditUserData();
        }
        catch (e) {

            showError(e);
        }
    };

    const deleteWaningDialogLogic = useEpistoDialogLogic("delwarn");

    const showDeleteUserDialog = (user: UserEditDTO | null) => {
        if (!user)
            return;

        deleteWaningDialogLogic
            .openDialog({
                title: "Biztosan törlöd a felhasználót?",
                description: `${user.lastName} ${user.firstName} nevű felhasználó visszavonhatatlanul törölve lesz!`,
                buttons: [
                    {
                        title: "Törlés",
                        action: async () => {

                            try {

                                await deleteUserAsync(user.id);
                                await refetchUsersFunction();
                            }
                            catch (e) {

                                showError(e);
                            }
                        }
                    }
                ]
            });
    };

    const bulkEditButtons = [
        {
            title: "Hozzáadás",
            icon: <Add
                style={{
                    margin: "0 3px 0 0",
                    padding: "0 0 1px 0"
                }} />,
            action: () => navigateToAddUser()
        }
    ] as ButtonType[];

    const checkIfCurrentUserFromUrl = () => {
        const isUserFound = users.some(user => user.id === editedUserId);

        if (!isUserFound && users[0]) {
            navigate(applicationRoutes.administrationRoute.usersRoute.route + "/" + users[0].id + "/edit");
        }
    };
    checkIfCurrentUserFromUrl();



    return <AdminBreadcrumbsHeader
        viewSwitchChecked={location.pathname === applicationRoutes.administrationRoute.usersRoute.route}
        viewSwitchFunction={() => {
            navigate(applicationRoutes.administrationRoute.usersRoute.route);
        }}
        breadcrumbs={[
            <BreadcrumbLink
                key={1}
                title="Felhasználók"
                iconComponent={applicationRoutes.administrationRoute.usersRoute.icon}
                to={applicationRoutes.administrationRoute.usersRoute.route + "/a/edit"} />,
            <BreadcrumbLink
                key={2}
                title={userEditData?.lastName + " " + userEditData?.firstName}
                isCurrent />
        ]}>

        <AdminUserList
            users={users}
            navigationFunction={(userId) => {
                navigate(applicationRoutes.administrationRoute.usersRoute.editRoute.route, { userId: userId });
            }} />

        <AdminSubpageHeader
            direction="row"
            headerButtons={bulkEditButtons}
            tabMenuItems={
                [
                    applicationRoutes.administrationRoute.usersRoute.editRoute,
                    applicationRoutes.administrationRoute.usersRoute.statsRoute,
                    applicationRoutes.administrationRoute.usersRoute.courseContentRoute
                ]
                    .concat(userEditData?.isTeacher ? applicationRoutes.administrationRoute.usersRoute.teacherInfoRoute : [])}>

            <EpistoDialog logic={deleteWaningDialogLogic} />

            <AdminEditUserControl
                editDTO={userEditData}
                showDeleteUserDialog={showDeleteUserDialog}
                saveUserAsync={handleSaveUserAsync} />

        </AdminSubpageHeader>
    </AdminBreadcrumbsHeader>;
};

export default AdminEditUserSubpage;
