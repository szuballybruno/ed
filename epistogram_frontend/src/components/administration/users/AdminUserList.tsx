import { Flex } from '@chakra-ui/react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { AdminPageUserDTO } from '../../../shared/dtos/admin/AdminPageUserDTO';
import { Id } from '../../../shared/types/versionId';
import { useRouteParams } from '../../../static/locationHelpers';
import { EpistoSearch } from '../../controls/EpistoSearch';
import { ProfileImage } from '../../ProfileImage';
import { FlexList } from '../../universal/FlexList';
import { FlexListItem } from '../../universal/FlexListItem';
import { FlexListTitleSubtitle } from '../../universal/FlexListTitleSubtitle';

export const AdminUserList = (props: {
    users: AdminPageUserDTO[],
    navigationFunction: (userId: Id<'User'>) => void
}) => {

    const userId = useRouteParams(applicationRoutes.administrationRoute.usersRoute.editRoute)
        .getValue(x => x.userId, 'int');

    const { users, navigationFunction } = props;

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
                            className="square40" />}
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