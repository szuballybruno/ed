import { Flex } from "@chakra-ui/layout";
import { ApartmentTwoTone, Close, Edit, Email, Equalizer, Task, WorkTwoTone } from "@mui/icons-material";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import DeleteIcon from '@mui/icons-material/Delete';
import DesktopAccessDisabledIcon from '@mui/icons-material/DesktopAccessDisabled';
import { Button, Checkbox, Typography } from "@mui/material";
import React, { ReactNode, useContext, useState } from "react";
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { AdminPageUserDTO } from "../../models/shared_models/AdminPageUserDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { useUserListQuery } from "../../services/adminPageUsersService";
import { httpPostAsync } from "../../services/httpClient";
import { useNavigation } from "../../services/navigatior";
import { FloatAddButton } from "../FloatAddButton";
import { CurrentUserContext } from "../HOC/AuthenticationFrame";
import { DialogContext } from "../HOC/DialogFrame";
import { LoadingFrame } from "../HOC/LoadingFrame";
import IntersectionObserverWrap from "../IntersectionObserverWrapper";
import { ProfileImage } from "../ProfileImage";
import { EpistoButton } from "../universal/EpistoButton";
import { EpistoSearch } from "../universal/EpistoSearch";
import { EpistoSelect } from "../universal/EpistoSelect";
import { FlexList } from "../universal/FlexList";
import { FlexListItem } from "../universal/FlexListItem";
import { FlexListTitleSubtitle } from "../universal/FlexListTitleSubtitle";
import { FloatChip } from "../universal/FloatChip";
import { AdminSubpageHeader } from "./AdminSubpageHeader";

export const AdminUserListSubpage = () => {

    const user = useContext(CurrentUserContext)!;
    const currentUserId = user.id;
    const { users, usersStatus, usersError, refetchUsers } = useUserListQuery();
    const { navigate } = useNavigation();
    const navigateToAddUser = () => navigate(applicationRoutes.administrationRoute.usersRoute.addRoute.route);

    const administrationRoutes = applicationRoutes.administrationRoute;

    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
    const isAllUsersSelected = !users.some(user => !selectedUserIds.some(uid => uid === user.id));
    const isAnyUserSelected = selectedUserIds.length > 0;

    const dilaogContext = useContext(DialogContext);

    const showDeleteUserDialog = (user: AdminPageUserDTO) => {

        dilaogContext!.showDialog({
            title: "Biztonsan torlod a felhasznalot?",
            description: `A ${user.firstName} ${user.lastName} nevu felhasznalo visszavonhatatlanul torove lesz!`,

            firstButtonTitle: "Torles",
            firstButtonAction: async () => {

                await httpPostAsync(apiRoutes.userManagement.deleteUser, { userId: user.id });
                await refetchUsers();
            },

            secondButtonTitle: "Megse",
            secondButtonAction: dilaogContext!.closeDialog
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
            onClick: () => navigate(administrationRoutes.usersRoute.editRoute.route, { userId: user.id })
        },
        {
            name: "viewUserStatsButton",
            text: "Statisztika megjelenítése",
            onClick: () => navigate(administrationRoutes.usersRoute.statsRoute.route, { userId: user.id })
        },
        {
            name: "viewUserTasks",
            text: "Feladatok megtekintése",
            onclick: () => navigate(administrationRoutes.usersRoute.tasksRoute.route, { userId: user.id })
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

    return <Flex flex="1" direction="column" bgColor="white" maxW={"100%"}>

        {/* admin header */}
        <AdminSubpageHeader>
            <Flex direction="row" justifyContent="space-between" alignItems="center" h={60}>
                <Flex direction="row" alignItems="center" justifyContent="center" minW={60} h="100%">
                    <Checkbox checked={isAllUsersSelected} onClick={() => selectAllOrNone(!isAllUsersSelected)} />
                </Flex>

                {!isAllUsersSelected && <Flex
                    w={240}
                    minW={165}
                    h={"100%"}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                    onClick={() => selectAllOrNone(!isAllUsersSelected)}
                    cursor="pointer">

                    <Typography
                        style={{ marginLeft: "20px" }}>

                        Összes kijelölése
                    </Typography>
                </Flex>}

                {/* selected users label */}
                {isAnyUserSelected && <Flex
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    w={230}
                    minW={230}
                    h={"100%"}>
                    <Flex
                        direction={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        className="roundBorders"
                        bg="var(--epistoTeal)"
                        padding="0 12px 0 12px"
                        color="white"
                        height={30}
                        ml={10}>
                        <Typography>
                            {selectedUserIds.length} felhasználó kijelölve
                        </Typography>
                        <Close
                            onClick={() => setSelectedUserIds([])}
                            style={{
                                width: 18,
                                marginLeft: 5
                            }} />
                    </Flex>
                </Flex>}

                {selectedUserIds.length !== 1 && <Flex flex={1}></Flex>}

                {/* bulk edit buttons */}
                {(selectedUserIds.length === 1) && <IntersectionObserverWrap
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"flex-start"}>

                    {headerButtons
                        .map(x => <Button
                            size={"small"}
                            name={x.name}
                            key={x.name}
                            style={{
                                marginRight: "20px",
                                minWidth: "fit-content",
                                borderRadius: 7,
                                borderColor: "var(--mildGrey)",
                                color: "black"
                            }}
                            onClick={x.onClick}
                            variant={"outlined"}>
                            {x.text}
                        </Button>)}

                </IntersectionObserverWrap>}

                {/* search */}
                <Flex
                    h={"100%"}
                    direction={"row"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    w={140}
                    mx={10}>
                    <EpistoSearch w={140}></EpistoSearch>
                </Flex>

                {/* order by */}
                <Flex
                    direction={"row"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    h={"100%"}
                    mx={10}>
                    <EpistoSelect
                        minW={"fit-content"}
                        items={[]}
                        onSelected={x => { }}
                        selectedValue="1"
                        getCompareKey={x => x}
                        defaultValue="Rendezés...">

                    </EpistoSelect>
                </Flex>
            </Flex>
        </AdminSubpageHeader>

        <LoadingFrame loadingState={usersStatus} error={usersError} flex="1">

            {/* user list */}
            <FlexList className="whall">
                {users
                    .map((user, index) => {

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

                        if (user.jobTitle)
                            chips.push(
                                {
                                    name: user.jobTitle.name,
                                    icon: <WorkTwoTone />
                                })

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
                                    {chips
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

        </LoadingFrame>
    </Flex>
}
