import { Box, Flex } from "@chakra-ui/layout";
import { ApartmentTwoTone, Email, KeyboardVoice, Save, WorkTwoTone } from "@mui/icons-material";
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
import { AministrationSubpageHeader } from "./administration/universal/adminAddHeader/AministrationSubpageHeader";
import { Button, Checkbox, Typography } from "@mui/material";
import { ProfileImage } from "./ProfileImage";
import IntersectionObserverWrap from "./administration/universal/overflow/intersection-observer-wrapper";
import DesktopAccessDisabledIcon from '@mui/icons-material/DesktopAccessDisabled';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

export const UserAdministration = () => {

    const user = useContext(CurrentUserContext)!;
    const userId = user.id;
    const [searchText, setSearchText] = React.useState("");
    const { users, usersStatus, usersError, refetchUsers } = useUserListQuery(userId, searchText);
    const { navigate } = useNavigation();
    const navigateToAddUser = () => navigate(applicationRoutes.administrationRoute.usersRoute.addRoute.route);

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
        <AministrationSubpageHeader>
            <Flex flexDirection={"row"}>

                <Flex
                    align="center"
                    onClick={() => selectAllOrNone(!isAllUsersSelected)}
                    cursor="pointer"
                    mr="20px">
                    <Checkbox
                        checked={isAllUsersSelected} />

                    <Typography
                        style={{ marginLeft: "20px" }}
                        display={isAnyUserSelected ? "none" : undefined}>

                        Összes kijelölése
                    </Typography>
                </Flex>

                <Flex
                    display={selectedUserIds.length ? undefined : "none"}>
                    <Box
                        className="roundBorders"
                        bg="var(--epistoTeal)"
                        p="2px 12px 2px 12px"
                        color="white"
                        mr="20px"
                        alignSelf="center">
                        <Typography>
                            {selectedUserIds.length} felhasználó kijelölve
                        </Typography>
                    </Box>

                    {selectedUserIds.length && <EpistoSelect
                        items={[]}
                        onSelected={x => { }}
                        selectedValue="1"
                        getCompareKey={x => x}
                        defaultValue="Jogosultságok kezelése..."
                        mr="20px"></EpistoSelect>}

                </Flex>
                <IntersectionObserverWrap>
                    <EpistoButton
                        variant="outlined"
                        name="assignCourses"
                        style={{ marginRight: "20px", minWidth: "230px" }}>
                        Kurzusok hozzárendelése
                    </EpistoButton>
                    <EpistoButton
                        name="edit"
                        style={{ marginRight: "20px", minWidth: "230px" }}
                        variant={"outlined"}>
                        Szerkesztés
                    </EpistoButton>

                </IntersectionObserverWrap>

                <EpistoSearch mr="10px" width="200px"></EpistoSearch>

                <EpistoSelect
                    items={[]}
                    onSelected={x => { }}
                    selectedValue="1"
                    getCompareKey={x => x}
                    defaultValue="Rendezés..."></EpistoSelect>
            </Flex>
        </AministrationSubpageHeader>

        <LoadingFrame loadingState={usersStatus} error={usersError} flex="1">

            {/* user list */}
            <FlexList className="whall">
                {users
                    .map((user, index) => {

                        const chips = [] as { name: string, icon: ReactNode }[];

                        if (!user.userActivity.canAccessApplication)
                            chips.push({
                                name: "Nincs hozzaferese az applikaciohoz",
                                icon: <DesktopAccessDisabledIcon />
                            });

                        if (user.isPendingInvitation)
                            chips.push({
                                name: "A meghivas elfogadasra var",
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
                                url={user.avatarUrl}
                                lastName={user.lastName}
                                firstName={user.firstName}
                                className="square70"
                                margin="0 30px 0 20px" />}
                            background="white"
                            p="20px"
                            setIsChecked={x => setSelectedUser(user.id, x)}
                            isChecked={selectedUserIds.some(x => x === user.id)}
                            midContent={<FlexListTitleSubtitle
                                title={`${user.lastName} ${user.firstName}`}
                                subTitle={<Flex wrap="wrap" mt="10px">
                                    {chips
                                        .map((chip, index) => <FloatChip
                                            name={chip.name}
                                            icon={chip.icon}
                                            padding="5px" />)}
                                </Flex>}
                            />}
                            endContent={<Flex align="center">
                                {(userId != user.id) && <EpistoButton
                                    variant="colored"
                                    padding="5px"
                                    onClick={() => deleteUserAsync(user.id)}>
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
