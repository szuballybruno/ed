import { Flex } from '@chakra-ui/react';
import { useAssignableRoles } from '../../../../services/api/rolesApiService';
import { LoadingFrame } from '../../../system/LoadingFrame';

export const PermissionAssignerControl = (props: {}) => {

    const { assignableRolesList, assignableRolesListError, assignableRolesListState } = useAssignableRoles();

    return (
        <LoadingFrame>
            {assignableRolesList
                .map((x, i) => (
                    <Flex key={i}>
                        {x.isRole
                            ? x.roleName
                            : x.permissionCode}
                    </Flex>
                ))}
        </LoadingFrame>
    );
};