import { useContext, useState } from "react";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useUserListQuery } from "../../../services/api/userApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { ProfileImage } from "../../ProfileImage";
import { CurrentUserContext } from "../../system/AuthenticationFrame";
import { LoadingFrame } from "../../system/LoadingFrame";
import { FlexList } from "../../universal/FlexList";
import { FlexListItem } from "../../universal/FlexListItem";
import { FlexListTitleSubtitle } from "../../universal/FlexListTitleSubtitle";
import { EpistoSearch } from "../../controls/EpistoSearch";
import { useParams } from "react-router-dom";

export const AdminUserList = (props: {
    currentUserPage?: "edit" | "statistics" | "teacherinfo"
}) => {
    const params = useParams<{ userId: string }>();
    const userId = parseInt(params.userId);

    const user = useContext(CurrentUserContext)!;
    const currentUserId = user.id;
    const { navigate } = useNavigation();

    const administrationRoutes = applicationRoutes.administrationRoute;

    const [searchText, setSearchText] = useState<string | null>(null);

    const { users, usersStatus, usersError, refetchUsers } = useUserListQuery(searchText);

    const { currentUserPage } = props


    const handleSearch = (value: string) => {

        if (value === "")
            setSearchText(null);

        if (value.length > 2)
            setSearchText(value);
    }

    const found = users.some(user => user.id === userId);

    if (!found && users[0]) {
        navigate(applicationRoutes.administrationRoute.usersRoute.route + "/" + users[0].id + "/" + currentUserPage)
    }

    return <LoadingFrame loadingState={usersStatus} error={usersError} direction="column" minW="350px" flexBasis="350px" >

        <EpistoSearch
            onChange={(x) => {

                if (handleSearch)
                    handleSearch(x.target.value)
            }} />

        {/* user list */}
        <FlexList
            background="var(--transparentWhite70)"
            className="whall roundBorders"
            h="100%"
            mt="5px">

            {users
                .map((user, index) => {

                    return <FlexListItem
                        onClick={() => navigate(administrationRoutes.usersRoute.editRoute.route, { userId: user.id })}
                        key={index}
                        thumbnailContent={<ProfileImage
                            mx="5px"
                            url={user.avatarUrl}
                            lastName={user.lastName}
                            firstName={user.firstName}
                            className="square60" />}
                        midContent={<FlexListTitleSubtitle
                            title={`${user.name}`}
                            subTitle={user.email}
                        />}
                    />
                })}
        </FlexList>
    </LoadingFrame >
}