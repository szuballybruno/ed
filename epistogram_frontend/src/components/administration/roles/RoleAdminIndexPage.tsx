import { Flex } from '@chakra-ui/react';
import { Add, Delete } from '@mui/icons-material';
import { memo } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useRolesList } from '../../../services/api/rolesApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFont } from '../../controls/EpistoFont';
import { LoadingFrame } from '../../system/LoadingFrame';
import { AdminSubpageHeader } from '../AdminSubpageHeader';

export const RoleAdminIndexPage = memo(() => {

    const { navigateWithParams } = useNavigation();
    const editRoute = applicationRoutes.administrationRoute.companiesRoute.editRoute;

    // http
    const { refetchRolesList, rolesList, rolesListError, rolesListState } = useRolesList();

    return (
        <LoadingFrame
            loadingState={[rolesListState]}
            error={rolesListError}
            className='whall'
            direction='column'>

            <AdminSubpageHeader
                direction="column"
                pb="20px"
                tabMenuItems={[
                    applicationRoutes.administrationRoute.companiesRoute.indexRoute
                ]}
                headerButtons={[
                    {
                        title: 'Add',
                        icon: <Add></Add>,
                        action: () => console.log('asd')
                    }
                ]}>

                {rolesList
                    .map((role, index) => (
                        <Flex
                            key={index}
                            align='center'>

                            <EpistoFont>
                                {role.roleName}
                            </EpistoFont>

                            {/* <EpistoButton
                                onClick={() => navigateWithParams(editRoute, { companyId: role.id })}>
                                <Edit></Edit>
                            </EpistoButton> */}

                            <EpistoButton
                                onClick={() => console.log('del')}>
                                <Delete />
                            </EpistoButton>
                        </Flex>
                    ))}

            </AdminSubpageHeader>
        </LoadingFrame>
    );
});