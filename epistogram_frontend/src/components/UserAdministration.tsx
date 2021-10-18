import { Box, Flex } from "@chakra-ui/layout";
import {
    ApartmentTwoTone,
    Close,
    Edit,
    Email,
    Equalizer,
    KeyboardVoice,
    Save,
    Task,
    WorkTwoTone
} from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import React, { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { applicationRoutes } from "../configuration/applicationRoutes";
import { useUserListQuery } from "../services/adminPageUsersService";
import { httpPostAsync } from "../services/httpClient";
import { useNavigation } from "../services/navigatior";
import { FloatAddButton } from "./FloatAddButton";
import { CurrentUserContext } from "./HOC/AuthenticationFrame";
import { LoadingFrame } from "./HOC/LoadingFrame";
import { EpistoButton } from "./universal/EpistoButton";
import { EpistoSelect } from "./universal/EpistoSelect";
import { FlexList } from "./universal/FlexList";
import { FlexListItem } from "./universal/FlexListItem";
import { FlexListTitleSubtitle } from "./universal/FlexListTitleSubtitle";
import { FloatChip } from "./universal/FloatChip";
import { EpistoSearch } from "./universal/EpistoSearch";
import { AdministrationSubpageHeader } from "./administration/universal/adminAddHeader/AdministrationSubpageHeader";
import { Button, Checkbox, Typography } from "@mui/material";
import { ProfileImage } from "./ProfileImage";
import IntersectionObserverWrap from "./administration/universal/overflow/intersection-observer-wrapper";
import DesktopAccessDisabledIcon from '@mui/icons-material/DesktopAccessDisabled';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import {Stat} from "@chakra-ui/react";

export const UserAdministration = () => {

    const user = useContext(CurrentUserContext)!;
    const userId = user.id;
    const [searchText, setSearchText] = React.useState("");
    const { users, usersStatus, usersError, refetchUsers } = useUserListQuery(userId, searchText);
    const { navigate } = useNavigation();
    const navigateToAddUser = () => navigate(applicationRoutes.administrationRoute.usersRoute.addRoute.route);

    const administrationRoutes = applicationRoutes.administrationRoute;

    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

    const isAllUsersSelected = !users.some(user => !selectedUserIds.some(uid => uid === user.id));
    const isAnyUserSelected = selectedUserIds.length > 0;

    const deleteUserAsync = async (userId: number) => {

        await httpPostAsync("users/delete-user", { userId });
        await refetchUsers();
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

    return <Flex flex="1" direction="column" bgColor="white" maxW={"100%"}>

        {/* admin header */}
        <AdministrationSubpageHeader>
            <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} h={60}>
                <Flex direction={"row"} alignItems={"center"} justifyContent={"center"} minW={60} h={"100%"}>
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

                {selectedUserIds.length > 0 &&
                <Flex
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
                        p="0 12px 0 12px"
                        color="white"
                        h={30}
                        ml={10}>
                        <Typography>
                            {selectedUserIds.length} felhasználó kijelölve
                        </Typography>
                        <Close onClick={() => {
                            setSelectedUserIds([])
                        }} style={{
                            width: 18,
                            marginLeft: 5
                        }} />
                    </Flex>
                </Flex>}

                {selectedUserIds.length !== 1 && <Flex flex={1}></Flex>}

                {(selectedUserIds.length === 1) && <IntersectionObserverWrap direction={"row"} alignItems={"center"} justifyContent={"flex-start"}>
                    <Button
                        size={"small"}
                        variant={"outlined"}
                        name={"edit"}
                        style={{
                            marginRight: "20px",
                            minWidth: "fit-content",
                            borderRadius: 7,
                            borderColor: "var(--mildGrey)",
                            color: "black"
                        }}
                        onClick={() => {
                            navigate(`${administrationRoutes.usersRoute.route}/${user.id}/edit`)
                        }}
                    >
                        Szerkesztés
                    </Button>
                    <Button
                        size={"small"}
                        name="remove"
                        style={{
                            marginRight: "20px",
                            minWidth: "fit-content",
                            borderRadius: 7,
                            borderColor: "var(--mildGrey)",
                            color: "black"
                        }}
                        variant={"outlined"}>
                        Törlés
                    </Button>
                    <Button
                        size={"small"}
                        name="stats"
                        style={{
                            marginRight: "20px",
                            minWidth: "fit-content",
                            borderRadius: 7,
                            borderColor: "var(--mildGrey)",
                            color: "black"
                        }}
                        variant={"outlined"}
                        onClick={() => {
                            navigate(`${administrationRoutes.usersRoute.route}/${user.id}/statistics`)
                        }}>
                        Statisztika megjelenítése
                    </Button>
                    <Button
                        size={"small"}
                        name="tasks"
                        style={{
                            marginRight: "20px",
                            minWidth: "fit-content",
                            borderRadius: 7,
                            borderColor: "var(--mildGrey)",
                            color: "black"
                        }}
                        variant={"outlined"}
                        onClick={() => {
                            navigate(`${administrationRoutes.usersRoute.route}/${user.id}/tasks`)
                        }}>
                        Feladatok megtekintése
                    </Button>

                </IntersectionObserverWrap>}

                <Flex
                    h={"100%"}
                    direction={"row"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    w={140}
                    mx={10}>
                    <EpistoSearch w={140}></EpistoSearch>
                </Flex>


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
        </AdministrationSubpageHeader>

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

                        chips.push(
                            {
                                name: user.jobTitle,
                                icon: <WorkTwoTone />
                            })

                        return <FlexListItem
                            key={index}
                            thumbnail={<ProfileImage
                                mt={10}
                                url={user.avatarUrl}
                                lastName={user.lastName}
                                firstName={user.firstName}
                                className="square70" />}
                            background="white"
                            setIsChecked={x => setSelectedUser(user.id, x)}
                            isChecked={selectedUserIds.some(x => x === user.id)}
                            midContent={<FlexListTitleSubtitle
                                title={`${user.lastName} ${user.firstName}`}
                                subTitle={<Flex wrap="wrap" my="10px">
                                    {chips
                                        .map((chip, index) => <FloatChip
                                            name={chip.name}
                                            icon={chip.icon}
                                            padding="5px" />)}
                                </Flex>}
                            />}
                            endContent={<Flex align="center" justifyContent={"flex-end"} h={"100%"} width={165} px={10}>
                                <EpistoButton
                                    variant={"colored"}
                                    onClick={() => {
                                        navigate(`${administrationRoutes.usersRoute.route}/${user.id}/edit`)
                                    }}
                                    style={{ width: 20 }}
                                >
                                    <Edit style={{ width: "20px", height: "20px" }} />
                                </EpistoButton>
                                <EpistoButton
                                    variant="colored"
                                    onClick={() => {
                                        navigate(`${administrationRoutes.usersRoute.route}/${user.id}/statistics`)
                                    }}
                                    style={{ width: 20, marginLeft: 5 }}
                                >
                                    <Equalizer style={{ width: "20px", height: "20px" }} />
                                </EpistoButton>
                                <EpistoButton
                                    variant="colored"
                                    onClick={() => {
                                        navigate(`${administrationRoutes.usersRoute.route}/${user.id}/tasks`)
                                    }}
                                    style={{ width: 20, marginLeft: 5 }}
                                >
                                    <Task style={{ width: "20px", height: "20px" }} />
                                </EpistoButton>
                                {(userId !== user.id) && <EpistoButton
                                    variant="colored"
                                    onClick={() => deleteUserAsync(user.id)}
                                    style={{ width: 20, marginLeft: 5 }}
                                >
                                    <DeleteIcon style={{ width: "20px", height: "20px" }}></DeleteIcon>
                                </EpistoButton>}
                            </Flex>}
                        />
                    })}
            </FlexList>

            <FloatAddButton onClick={navigateToAddUser} />

        </LoadingFrame>
    </Flex>
}
