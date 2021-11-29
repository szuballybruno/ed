import { Flex } from "@chakra-ui/layout";
import { ApartmentTwoTone, Edit, Email, Equalizer, Task, WorkTwoTone } from "@mui/icons-material";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import DeleteIcon from '@mui/icons-material/Delete';
import DesktopAccessDisabledIcon from '@mui/icons-material/DesktopAccessDisabled';
import React, { ReactNode, useContext, useState } from "react";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { AdminPageUserDTO } from "../../../models/shared_models/AdminPageUserDTO";
import { apiRoutes } from "../../../models/shared_models/types/apiRoutes";
import { useUserListQuery } from "../../../services/adminPageUsersService";
import { httpPostAsync } from "../../../services/httpClient";
import { useNavigation } from "../../../services/navigatior";
import { useShowErrorDialog } from "../../../services/notifications";
import { EpistoDialog, useEpistoDialogLogic } from "../../EpistoDialog";
import { FloatAddButton } from "../../FloatAddButton";
import { CurrentUserContext } from "../../system/AuthenticationFrame";
import { LoadingFrame } from "../../system/LoadingFrame";
import { ProfileImage } from "../../ProfileImage";
import { EpistoButton } from "../../universal/EpistoButton";
import { FlexList } from "../../universal/FlexList";
import { FlexListItem } from "../../universal/FlexListItem";
import { FlexListTitleSubtitle } from "../../universal/FlexListTitleSubtitle";
import { FloatChip } from "../../universal/FloatChip";
import { AdminListEditHeader } from "../AdminListEditHeader";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import { getRoleName } from "../../../frontendHelpers";

export const AdminUserListSubpage = () => {

    const user = useContext(CurrentUserContext)!;
    const currentUserId = user.id;
    const { users, usersStatus, usersError, refetchUsers } = useUserListQuery();
    const { navigate } = useNavigation();
    const navigateToAddUser = () => navigate(applicationRoutes.administrationRoute.usersRoute.addRoute.route);
    const showError = useShowErrorDialog();

    const administrationRoutes = applicationRoutes.administrationRoute;

    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
    const isAllUsersSelected = !users.some(user => !selectedUserIds.some(uid => uid === user.id));

    const deleteWaningDialogLogic = useEpistoDialogLogic();

    const showDeleteUserDialog = (user: AdminPageUserDTO) => {

        deleteWaningDialogLogic
            .openDialog({
                title: "Biztosan törlöd a felhasználót?",
                description: `A ${user.firstName} ${user.lastName} nevű felhasználó visszavonhatatlanul törölve lesz!`,
                buttons: [
                    {
                        title: "Törlés",
                        action: async () => {

                            try {

                                await httpPostAsync(apiRoutes.userManagement.deleteUser, { userId: user.id });
                                await refetchUsers();
                            }
                            catch (e) {

                                showError(e);
                            }
                        }
                    }
                ]
            });
    }

    const setSelectedUser = (userId: number, isSelected: boolean) => {

        if (isSelected) {

            setSelectedUserIds([...selectedUserIds, userId]);
        }
        else {

            setSelectedUserIds(selectedUserIds.filter(x => x !== userId));
        }
    }

    const selectAllOrNone = (isAll: boolean) => {

        if (isAll) {

            setSelectedUserIds(users.map(x => x.id));
        } else {

            setSelectedUserIds([]);
        }
    }

    const headerButtons = [
        {
            name: "editUserButton",
            text: "Szerkesztés",
            onClick: () => navigate(administrationRoutes.usersRoute.editRoute.route, { userId: user.id }),
        },
        {
            name: "deleteUserButton",
            text: "Törlés",
            onClick: () => showDeleteUserDialog(users.filter(x => x.id === selectedUserIds[0])[0])
        },
        {
            name: "viewUserStatsButton",
            text: "Statisztika megjelenítése",
            onClick: () => navigate(administrationRoutes.usersRoute.statsRoute.route, { userId: user.id })
        },
        {
            name: "viewUserTasks",
            text: "Feladatok megtekintése",
            onClick: () => navigate(administrationRoutes.usersRoute.tasksRoute.route, { userId: user.id })
        }
    ]

    const rowButtons = [
        {
            icon: <Edit style={{ width: "20px", height: "20px" }} />,
            onClick: (user: AdminPageUserDTO) => navigate(administrationRoutes.usersRoute.editRoute.route, { userId: user.id })
        },
        {
            icon: <Equalizer style={{ width: "20px", height: "20px" }} />,
            onClick: (user: AdminPageUserDTO) => navigate(administrationRoutes.usersRoute.statsRoute.route, { userId: user.id })
        },
        {
            icon: <Task style={{ width: "20px", height: "20px" }} />,
            onClick: (user: AdminPageUserDTO) => navigate(administrationRoutes.usersRoute.tasksRoute.route, { userId: user.id })
        },
        {
            icon: <DeleteIcon style={{ width: "20px", height: "20px" }}></DeleteIcon>,
            getIsVisible: (userId: number) => currentUserId !== userId,
            onClick: (user: AdminPageUserDTO) => showDeleteUserDialog(user)
        },
    ]

    const getChips = (user: AdminPageUserDTO) => {

        const chips = [] as { name: string, icon: ReactNode }[];

        if (!user.userActivity.canAccessApplication)
            chips.push({
                name: "Nincs hozzáférése az applikációhoz",
                icon: <DesktopAccessDisabledIcon />
            });

        if (user.isPendingInvitation)
            chips.push({
                name: "A meghívás elfogadásra vár",
                icon: <Email />
            });

        chips.push(
            {
                name: user.email,
                icon: <AlternateEmailIcon />
            });

        chips.push(
            {
                name: user.organizationName,
                icon: <ApartmentTwoTone />
            });

        chips.push(
            {
                name: getRoleName(user.roleId),
                icon: <AccessibilityIcon />
            });

        if (user.jobTitle)
            chips.push(
                {
                    name: user.jobTitle.name,
                    icon: <WorkTwoTone />
                })

        return chips;
    }

    return <LoadingFrame loadingState={usersStatus} error={usersError} className="whall">

        {/* admin header */}
        <AdminSubpageHeader>
            <AdminListEditHeader
                headerButtons={headerButtons}
                isAllSelected={isAllUsersSelected}
                selectAllOrNone={selectAllOrNone}
                selectedIds={selectedUserIds}
                itemLabel="felhasználó" />

            <EpistoDialog logic={deleteWaningDialogLogic} />

            {/* user list */}
            <FlexList className="whall">
                {users
                    .map((user, index) => {

                        return <FlexListItem
                            key={index}
                            thumbnailContent={<ProfileImage
                                url={user.avatarUrl}
                                lastName={user.lastName}
                                firstName={user.firstName}
                                className="square70" />}
                            background="white"
                            setIsChecked={x => setSelectedUser(user.id, x)}
                            isChecked={selectedUserIds.some(x => x === user.id)}
                            midContent={<FlexListTitleSubtitle
                                title={`${user.lastName} ${user.firstName}`}
                                subTitle={<Flex wrap="wrap">
                                    {getChips(user)
                                        .map((chip, index) => <FloatChip
                                            name={chip.name}
                                            icon={chip.icon}
                                            padding="5px" />)}
                                </Flex>}
                            />}
                            endContent={<Flex
                                align="center"
                                justifyContent={"flex-end"}
                                h={"100%"}
                                width={165}
                                px={10}>

                                {/* go to edit */}
                                {rowButtons
                                    .filter(x => x?.getIsVisible ? x.getIsVisible(user.id) : true)
                                    .map(x => <EpistoButton
                                        variant={"colored"}
                                        onClick={() => x.onClick(user)}
                                        style={{ width: 20, margin: "3px" }}>

                                        {x.icon}
                                    </EpistoButton>)}
                            </Flex>}
                        />
                    })}
            </FlexList>

            <FloatAddButton onClick={navigateToAddUser} />
        </AdminSubpageHeader>
    </LoadingFrame>
}
