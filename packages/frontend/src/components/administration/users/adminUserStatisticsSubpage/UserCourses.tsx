import { Id } from '@episto/commontypes';
import { AdminUserCourseDTO } from '@episto/communication';
import { useCallback, useEffect, useState } from 'react';
import { AdminApiService } from '../../../../services/api/AdminApiService';
import { showNotification } from '../../../../services/core/notifications';
import { LocalStorageService } from '../../../../services/core/storageService';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoDataGrid } from '../../../controls/EpistoDataGrid';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoSwitch } from '../../../controls/EpistoSwitch';
import { useXMutatorNew } from '../../../lib/XMutator/XMutatorReact';
import { useSetBusy } from '../../../system/LoadingFrame/BusyBarContext';
import { useAdminCourseContentDialogLogic } from '../adminCourseContentDialog/AdminCourseContentDialogLogic';
import { AdminUserCourseContentDialog } from '../adminCourseContentDialog/AdminUserCourseContentDialog';
import { UserCoursesRowType, useUserCoursesColumns } from './UserCoursesColumns';

export const UserCourses = ({
    userId
}: {
    userId: Id<'User'>
}) => {

    const [editModeEnabled, setEditModeEnabled] = useState(LocalStorageService
        .readStorage('editModeEnabled') === 'true');

    const {
        userAssignedCourses,
        userAssignedCoursesState,
        userAssignedCoursesError,
        refetchUserAssignedCourses
    } = AdminApiService
        .useUserAssignedCourses(userId, editModeEnabled);

    const { saveUserCourses, saveUserCoursesState } = AdminApiService
        .useSaveUserAssignedCourses();

    useSetBusy(AdminApiService.useUserAssignedCourses, userAssignedCoursesState, userAssignedCoursesError);
    useSetBusy(AdminApiService.useSaveUserAssignedCourses, saveUserCoursesState);

    const [{ mutatedItems, mutations }, mutatorFunctions] = useXMutatorNew(AdminUserCourseDTO, 'courseId', AdminUserCourseDTO.name);

    /**
     * Handle save user courses 
     */
    const handleSaveUserCourses = useCallback(async () => {

        await saveUserCourses({ mutations, userId });
        showNotification('Saved');
        await refetchUserAssignedCourses();
    }, [saveUserCourses, mutations, userId, refetchUserAssignedCourses]);

    /**
     * Initialize mutator 
     */
    useEffect(() => {

        mutatorFunctions
            .setOriginalItems(userAssignedCourses);
    }, [userAssignedCourses, mutatorFunctions]);

    /**
     * Write edit settings to local storage
     */
    useEffect(() => {

        LocalStorageService
            .writeStorage('editModeEnabled', editModeEnabled);
    }, [editModeEnabled]);

    const rows = mutatedItems
        .map((dto, index): UserCoursesRowType => ({
            ...dto,
            moreDetails: index
        }));
    const getRowKey = useCallback((row: UserCoursesRowType) => row.courseId, []);

    const { adminCourseContentDialogLogic } = useAdminCourseContentDialogLogic();

    const columns = useUserCoursesColumns({
        handleOpenUserCourseDetailsDialog: (courseId) => {
            adminCourseContentDialogLogic.openDialog({ courseId, userId });
        },
        hideStats: editModeEnabled,
        mutatorFunctions
    });
    return (
        <EpistoFlex2
            flex="1"
            direction="column">

            <AdminUserCourseContentDialog
                dialogLogic={adminCourseContentDialogLogic} />

            {/* header */}
            <EpistoFlex2
                justify="flex-end">

                <EpistoSwitch
                    checked={editModeEnabled}
                    setChecked={setEditModeEnabled}
                    label={`Szerkesztés mód: ${editModeEnabled ? 'bekapcsolva' : 'kikapcsolva'}`} />

                {editModeEnabled && <EpistoButton
                    onClick={handleSaveUserCourses}>
                    Save
                </EpistoButton>}
            </EpistoFlex2>

            {/* content */}
            <EpistoFlex2
                flex="1">

                {/* courses grid */}
                {rows.length > 0 && <EpistoDataGrid
                    getKey={getRowKey}
                    rows={rows}
                    columns={columns} />}

                {/* no data yet */}
                {rows.length === 0 && <EpistoFlex2
                    flex='1'
                    align='center'
                    justify='center'>

                    A felhasználó még egyetlen kurzust sem kezdett el
                </EpistoFlex2>}
            </EpistoFlex2>
        </EpistoFlex2>
    );
};