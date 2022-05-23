import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useRoleAssignCompanies } from '../../../../services/api/companyApiService';
import { useAssignablePermissions, useAssignableRoles } from '../../../../services/api/rolesApiService';
import { AssignableRoleDTO } from '../../../../shared/dtos/AssignableRoleDTO';
import { RoleAssignCompanyDTO } from '../../../../shared/dtos/company/RoleAssignCompanyDTO';
import { UserRoleDTO } from '../../../../shared/dtos/role/UserRoleDTO';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoLabel } from '../../../controls/EpistoLabel';
import { EpistoSelect } from '../../../controls/EpistoSelect';
import { EpistoDialog } from '../../../universal/epistoDialog/EpistoDialog';
import { EpistoDialogLogicType } from '../../../universal/epistoDialog/EpistoDialogTypes';

export const AssignRoleDialog = (props: {
    dialgoLogic: EpistoDialogLogicType,
    userId: number,
    onAdd: (role: UserRoleDTO) => void
}) => {

    const { dialgoLogic, userId, onAdd } = props;

    // http
    const { roleAssignCompanies } = useRoleAssignCompanies();

    const [selectedCompany, setSelectedCompany] = useState<RoleAssignCompanyDTO | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<RoleAssignCompanyDTO | null>(null);
    const [selectedRole, setSelectedRole] = useState<AssignableRoleDTO | null>(null);

    const selectedCompanyId = selectedCompany?.id ?? null;
    const selectedCourseId = selectedCompany?.id ?? null;
    const selectedRoleId = selectedCompany?.id ?? null;

    // http
    const { assignableRolesList } = useAssignableRoles(userId, selectedCompanyId);
    const { assignablePermissionList } = useAssignablePermissions(selectedCompanyId);

    return (
        <EpistoDialog
            logic={dialgoLogic}>

            <Flex
                direction="column"
                width="400px"
                py="50px"
                px="50px">

                <EpistoLabel
                    text="Company">

                    <EpistoSelect
                        selectedValue={selectedCompany ?? undefined}
                        getCompareKey={x => x.id + ''}
                        onSelected={setSelectedCompany}
                        getDisplayValue={x => x.name}
                        items={roleAssignCompanies} />
                </EpistoLabel>

                <EpistoLabel
                    text="Course">

                    <EpistoSelect
                        selectedValue={selectedCourse ?? undefined}
                        getCompareKey={x => x.id + ''}
                        onSelected={setSelectedCourse}
                        getDisplayValue={x => x.name}
                        items={[]} />
                </EpistoLabel>

                <EpistoLabel
                    text="Role">

                    <EpistoSelect
                        selectedValue={selectedRole ?? undefined}
                        getCompareKey={x => x.roleId + ''}
                        onSelected={setSelectedRole}
                        getDisplayValue={x => x.roleName}
                        items={assignableRolesList} />
                </EpistoLabel>

                <EpistoButton
                    variant="colored"
                    onClick={() => {

                        if (!selectedRole)
                            return;

                        if (!selectedCompany)
                            return;

                        onAdd({
                            contextCompanyId: selectedCompany.id,
                            contextCompanyName: selectedCompany.name,
                            roleId: selectedRole.roleId,
                            roleName: selectedRole.roleName,
                            assigneeUserId: userId,
                            ownerCompanyId: selectedRole.ownerCompanyId,
                            ownerCompanyName: selectedRole.ownerCompanyName,
                        });
                    }}>

                    Add
                </EpistoButton>
            </Flex>
        </EpistoDialog>
    );
};