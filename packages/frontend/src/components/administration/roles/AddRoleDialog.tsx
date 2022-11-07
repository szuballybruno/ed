import { ArrowUpward } from '@mui/icons-material';
import { useCreateRole } from '../../../services/api/rolesApiService';
import { usePostCallback } from '../../../static/frontendHelpers';
import { EpistoDialogLogicType } from '../../universal/epistoDialog/EpistoDialogTypes';
import { EditRoleControl } from './EditRoleControl';

export const AddRoleDialog = (props: {
    logic: EpistoDialogLogicType,
    onSave: () => void,
}) => {

    const { logic, onSave } = props;

    const { createRoleAsync, createRoleState } = useCreateRole();

    const createRoleCallback = usePostCallback(createRoleAsync, [logic.closeDialog, onSave]);

    return (
        <EditRoleControl
            logic={logic}
            saveState={[createRoleState]}
            error={[]}
            onSave={createRoleCallback}
            saveButton={{
                title: 'Létrehozás',
                icon: <ArrowUpward></ArrowUpward>
            }} />
    );
};