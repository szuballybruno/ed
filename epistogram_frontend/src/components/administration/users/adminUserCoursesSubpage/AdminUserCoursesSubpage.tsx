import { useCallback, useEffect, useState } from 'react';
import { applicationRoutes } from '../../../../configuration/applicationRoutes';
import { ButtonType } from '../../../../models/types';
import { UserApiService } from '../../../../services/api/userApiService';
import { useUserAssignedCourses } from '../../../../services/api/userStatsApiService';
import { showNotification } from '../../../../services/core/notifications';
import { LocalStorageService } from '../../../../services/core/storageService';
import { UserCourseStatsDTO } from '../../../../shared/dtos/UserCourseStatsDTO';
import { Id } from '../../../../shared/types/versionId';
import { EpistoDataGrid } from '../../../controls/EpistoDataGrid';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoSwitch } from '../../../controls/EpistoSwitch';
import { useXMutatorNew } from '../../../lib/XMutator/XMutatorReact';
import { useSetBusy } from '../../../system/LoadingFrame/BusyBarContext';
import { AdminSubpageHeader } from '../../AdminSubpageHeader';
import { useAdminCourseContentDialogLogic } from '../adminCourseContentDialog/AdminCourseContentDialogLogic';
import { AdminUserCourseContentDialog } from '../adminCourseContentDialog/AdminUserCourseContentDialog';
import { UserCoursesRowType, useUserCoursesColumns } from './AdminUserCoursesColumns';

export const AdminUserCoursesSubpage = ({
    tabMenuItems,
    headerButtons,
    userId
}: {
    tabMenuItems: any[],
    headerButtons: ButtonType[],
    userId: Id<'User'>
}) => {

    const { usersRoute } = applicationRoutes.administrationRoute;

    const [editModeEnabled, setEditModeEnabled] = useState(LocalStorageService
        .readStorage('editModeEnabled') === 'true');

    const { userEditData } = UserApiService
        .useEditUserData(userId);

    const {
        userAssignedCourses,
        userAssignedCoursesState,
        userAssignedCoursesError,
        refetchUserAssignedCourses
    } = useUserAssignedCourses(userId, editModeEnabled);

    const { saveUserCourses, saveUserCoursesState } = UserApiService
        .useSaveUserAssignedCourses();

    useSetBusy(useUserAssignedCourses, userAssignedCoursesState, userAssignedCoursesError);

    const [{ mutatedItems, mutations }, mutatorFunctions] = useXMutatorNew(UserCourseStatsDTO, 'courseId', UserCourseStatsDTO.name);

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
    const columns = useUserCoursesColumns({
        handleOpenUserCourseDetailsDialog: (x) => console.log(x),
        hideStats: editModeEnabled,
        mutatorFunctions
    });

    const { adminCourseContentDialogLogic } = useAdminCourseContentDialogLogic();

    return (
        <AdminSubpageHeader
            direction="row"
            tabMenuItems={tabMenuItems}
            headerContent={<>
                <EpistoSwitch
                    checked={editModeEnabled}
                    setChecked={setEditModeEnabled}
                    label={editModeEnabled ? 'Disable editing' : 'Enable editing'} />
            </>}
            headerButtons={headerButtons
                .concat(editModeEnabled
                    ? [{
                        title: 'Save',
                        action: handleSaveUserCourses,
                    }]
                    : [])}>

            <AdminUserCourseContentDialog
                dialogLogic={adminCourseContentDialogLogic} />

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
        </AdminSubpageHeader>
    );
};