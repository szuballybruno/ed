import { Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useNavigation } from "../../../services/core/navigatior";
import { AdminPageUserDTO } from "../../../shared/dtos/admin/AdminPageUserDTO";
import { useIntParam } from "../../../static/locationHelpers";
import { EpistoSearch } from "../../controls/EpistoSearch";
import { ProfileImage } from "../../ProfileImage";
import { CurrentUserContext } from "../../system/AuthenticationFrame";
import { FlexList } from "../../universal/FlexList";
import { FlexListItem } from "../../universal/FlexListItem";
import { FlexListTitleSubtitle } from "../../universal/FlexListTitleSubtitle";

export const AdminUserList = (props: {
    users: AdminPageUserDTO[],
    navigationFunction: (userId: number) => void
}) => {
    const userId = useIntParam("userId")!;

    const user = useContext(CurrentUserContext)!;
    const currentUserId = user.id;
    const { navigate } = useNavigation();

    const administrationRoutes = applicationRoutes.administrationRoute;

    //const [searchText, setSearchText] = useState<string | null>(null);

    const { users, navigationFunction } = props;


    /* const handleSearch = (value: string) => {

        if (value === "")
            setSearchText(null);

        if (value.length > 2)
            setSearchText(value);
    } */



    return <Flex
        className="roundBorders"
        direction="column"
        minW="350px"
        flexBasis="350px"
        mr="5px"
        background="var(--transparentWhite90)">

        <EpistoSearch
            background="white"
            boxShadow="inset 0px -2px 10px -5px #33333315"
            borderRadius="7px 0 0 0"
            onChange={(x) => {

                //if (handleSearch)
                //handleSearch(x.target.value)
            }} />

        {/* user list */}
        <FlexList
            className="whall roundBorders"
            pt="5px"
            h="100%">

            {users
                .map((user, index) => {

                    return <FlexListItem
                        onClick={() => navigationFunction(user.id)}
                        key={index}
                        thumbnailContent={<ProfileImage
                            mx="5px"
                            url={user.avatarUrl}
                            lastName={user.lastName}
                            firstName={user.firstName}
                            className="square60" />}
                        midContent={<FlexListTitleSubtitle
                            isSelected={user.id === userId}
                            title={`${user.name}`}
                            subTitle={user.email}
                        />}
                    />;
                })}
        </FlexList>
    </Flex>;
};