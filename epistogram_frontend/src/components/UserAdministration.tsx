import { Box, Flex } from "@chakra-ui/layout";
import { ApartmentTwoTone, Email, WorkTwoTone } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useContext, useState } from "react";
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
import { Checkbox, Typography } from "@mui/material";

export const UserAdministration = () => {

    const user = useContext(CurrentUserContext)!;
    const userId = user.id;
    const [searchText, setSearchText] = React.useState("");
    const { users, usersStatus, usersError, refetchUsers } = useUserListQuery(userId, searchText);
    const { navigate } = useNavigation();
    const navigateToAddUser = () => navigate(applicationRoutes.administrationRoute.usersRoute.addRoute.route);

    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

    const isAllUsersSelected = !users.some(user => !selectedUserIds.some(uid => uid === user.id));

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

    return <Flex flex="1" direction="column" bg="white">

        {/* admin header */}
        <AministrationSubpageHeader>
            <Flex justify="flex-end" align="center" marginTop="20px">

                <Flex
                    align="center"
                    onClick={() => selectAllOrNone(!isAllUsersSelected)}
                    cursor="pointer">
                    <Checkbox
                        checked={isAllUsersSelected} />

                    <Typography>
                        Összes kijelölése
                    </Typography>
                </Flex>

                <Box flex="1" />

                <EpistoSearch mr="10px" width="300px"></EpistoSearch>

                <EpistoSelect
                    items={[]}
                    onSelected={x => { }}
                    selectedValue="1"
                    getCompareKey={x => x}
                    defaultValue="Rendezés..."></EpistoSelect>
            </Flex>
        </AministrationSubpageHeader>

        <LoadingFrame loadingState={usersStatus} error={usersError}>

            {/* user list */}
            <FlexList className="whall">
                {users
                    .map((user, index) => {

                        const chips = [
                            {
                                name: user.email,
                                icon: <Email />
                            },
                            {
                                name: user.organizationName,
                                icon: <ApartmentTwoTone />
                            },
                            {
                                name: user.jobTitle,
                                icon: <WorkTwoTone />
                            }
                        ]

                        return <FlexListItem
                            key={index}
                            thumbnailUrl={user.avatarUrl!}
                            background="white"
                            p="20px"
                            thumbnailBasis="80px"
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