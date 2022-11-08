import { Save } from '@mui/icons-material';
import { useRoleEditData, useSaveRole } from '../../../services/api/rolesApiService';
import { Id } from '@episto/commontypes';
import { usePostCallback } from '../../../static/frontendHelpers';
import { } from '../../universal/epistoDialog/EpistoDialog';
import { EpistoDialogLogicType } from '../../universal/epistoDialog/EpistoDialogTypes';
import { EditRoleControl } from './EditRoleControl';

export const EditRoleDialog = (props: {
    logic: EpistoDialogLogicType<{ roleId: Id<'Role'> }>,
    onSave: () => void,
}) => {

    const { logic, onSave } = props;

    const roleId = logic.params?.roleId;

    // http
    const { roleEditData, roleEditDataError, roleEditDataState } = useRoleEditData(roleId!, !!roleId);
    const { saveRoleAsync, saveRoleState } = useSaveRole();

    const handleSaveRole = usePostCallback(saveRoleAsync, [onSave, logic.closeDialog]);

    return (
        <EditRoleControl
            logic={logic}
            roleEditData={roleEditData ?? undefined}
            error={[roleEditDataError]}
            saveState={[roleEditDataState, saveRoleState]}
            onSave={x => handleSaveRole(x)}
            saveButton={{
                title: 'Mentés',
                icon: <Save></Save>
            }} />
    );
};