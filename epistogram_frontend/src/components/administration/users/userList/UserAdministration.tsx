import { Box, Flex } from "@chakra-ui/layout";
import { Add, ApartmentTwoTone, Email, WorkTwoTone } from "@mui/icons-material";
import React, { useContext } from "react";
import { CurrentUserContext } from "../../../HOC/AuthenticationFrame";
import { LoadingFrame } from "../../../HOC/LoadingFrame";
import { useUserListQuery } from "../../../../services/adminPageUsersService";
import { useNavigation } from "../../../../services/navigatior";
import { EpistoButton } from "../../../universal/EpistoButton";
import { FlexList } from "../../../universal/FlexList";
import { FlexListItem } from "../../../universal/FlexListItem";
import { FlexListTitleSubtitle } from "../../../universal/FlexListTitleSubtitle";
import { FloatChip } from "../../../universal/FloatChip";
import { AdminDashboardWrapper } from "../../universal/adminDashboardWrapper/AdminDashboardWrapper";
import { AdminDashboardSearch } from "../../universal/searchBar/AdminDashboardSearch";
import classes from "../users.module.scss";
import DeleteIcon from '@mui/icons-material/Delete';
import { httpPostAsync } from "../../../../services/httpClient";
import { FloatSearch } from "../../../universal/FloatSearch";
import { administrationRoutes } from "../../AdministrationPage";
import { FloatAddButton } from "../../../FloatAddButton";

export const UserAdministration = () => {

    const user = useContext(CurrentUserContext)!;
    const userId = user.id;
    const [searchText, setSearchText] = React.useState("");
    const { users, usersStatus, usersError, refetchUsers } = useUserListQuery(userId, searchText);
    const { navigate } = useNavigation();
    const navigateToAddUser = () => navigate(administrationRoutes.usersRoute.addRoute.route);

    const deleteUserAsync = async (userId: number) => {

        await httpPostAsync("users/delete-user", { userId });
        await refetchUsers();
    }

    return <Flex flex="1" direction="column" bg="white">

        <Flex justify="flex-end" marginTop="20px">
            <FloatSearch margin="10px" width="300px"></FloatSearch>
        </Flex>

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