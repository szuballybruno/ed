import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useRoleAssignCompanies } from '../../../../services/api/companyApiService';
import { useAssignablePermissions, useAssignableRoles } from '../../../../services/api/rolesApiService';
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

    const { roleAssignCompanies } = useRoleAssignCompanies();

    const [selectedCompany, setSelectedCompany] = useState<RoleAssignCompanyDTO | null>(null);
    const selectedCompanyId = selectedCompany?.id ?? null;
    const selectedRoleId = 1;

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
                        selectedValue={selectedCompany ?? undefined}
                        getCompareKey={x => x.id + ''}
                        onSelected={setSelectedCompany}
                        getDisplayValue={x => x.name}
                        items={roleAssignCompanies} />
                </EpistoLabel>

                <EpistoButton
                    variant="colored"
                    onClick={() => {
                        onAdd({
                            contextCompanyId: selectedCompanyId!,
                            roleId: selectedRoleId
                        } as UserRoleDTO);
                    }}>

                    Add
                </EpistoButton>
            </Flex>
        </EpistoDialog>
    );
};