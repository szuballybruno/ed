import { Save } from '@mui/icons-material';
import { useEffect } from 'react';
import { useRoleEditData, useSaveRole } from '../../../services/api/rolesApiService';
import { } from '../../universal/epistoDialog/EpistoDialog';
import { EpistoDialogLogicType } from '../../universal/epistoDialog/EpistoDialogTypes';
import { EditRoleControl } from './EditRoleControl';

export const EditRoleDialog = (props: {
    logic: EpistoDialogLogicType<{ roleId: number }>,
    onSave: () => void,
}) => {

    const { logic, onSave } = props;

    const roleId = logic.params?.roleId;

    // http
    const { roleEditData, roleEditDataError, roleEditDataState } = useRoleEditData(roleId!, !!roleId);
    const { saveRoleAsync, saveRoleState } = useSaveRole();

    useEffect(() => console.log('asd'), [roleEditData]);

    console.log(logic.params?.roleId);

    return (
        <EditRoleControl
            logic={logic}
            roleEditData={roleEditData ?? undefined}
            error={[roleEditDataError]}
            saveState={[roleEditDataState, saveRoleState]}
            onSave={x => saveRoleAsync({ roleId, ...x })}
            saveButton={{
                title: 'Save',
                icon: <Save></Save>
            }} />
    );
};