import { useEffect, useMemo, useState } from 'react';
import { useRoleAssignCompanies } from '../../../../services/api/companyApiService';
import { CourseApiService } from '../../../../services/api/courseApiService';
import { useAssignablePermissions } from '../../../../services/api/rolesApiService';
import { AssignablePermissionDTO } from '../../../../shared/dtos/AssignablePermissionDTO';
import { RoleAssignCompanyDTO } from '../../../../shared/dtos/company/RoleAssignCompanyDTO';
import { CoursePermissionAssignDTO } from '../../../../shared/dtos/CoursePermissionAssignDTO';
import { UserPermissionDTO } from '../../../../shared/dtos/role/UserPermissionDTO';
import { userPermissionsEqual } from '../../../../shared/logic/sharedLogic';
import { ArrayBuilder, usePaging } from '../../../../static/frontendHelpers';
import { SegmentedButton } from '../../../controls/SegmentedButton';
import { EpistoDialogLogicType } from '../../../universal/epistoDialog/EpistoDialogTypes';
import { AssignAuthItemDialog, SelectType } from './AssignAuthItemDialog';

export const AssignPermissionDialog = (props: {
    dialgoLogic: EpistoDialogLogicType,
    userId: number,
    onAdd: (role: UserPermissionDTO) => void,
    assignedPermissions: UserPermissionDTO[]
}) => {

    const { dialgoLogic, assignedPermissions, userId, onAdd } = props;

    const [selectedCompany, setSelectedCompany] = useState<RoleAssignCompanyDTO | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<CoursePermissionAssignDTO | null>(null);
    const [selectedPermission, setSelectedPermission] = useState<AssignablePermissionDTO | null>(null);
    
    const paging = usePaging(['Company level permissions', 'Course level permissions']);

    // http
    const { roleAssignCompanies } = useRoleAssignCompanies();
    const { permissionAssignCourses } = CourseApiService.usePermissionAssignCourses(userId);
    const { assignablePermissionList } = useAssignablePermissions(
        userId, 
        paging.currentIndex === 1 ? selectedCourse?.id ?? null : null, 
        paging.currentIndex === 0 ? selectedCompany?.id ?? null : null);

    // init permission selector
    useEffect(() => {

        setSelectedPermission(assignablePermissionList.firstOrNull());
    }, [assignablePermissionList]);

    // assemble permission dto 
    const permissionDTO = useMemo((): UserPermissionDTO | undefined => {

        if (!selectedPermission)
            return;

        return {
            contextCompanyId: selectedCompany?.id ?? null,
            contextCompanyName: selectedCompany?.name ?? null,
            permissionId: selectedPermission.permissionId,
            permissionCode: selectedPermission.permissionCode,
            assigneeUserId: userId,
            contextCourseId: selectedCourse?.id ?? null,
            contextCourseName: selectedCourse?.title ?? null,
            parentRoleId: null,
            parentRoleName: null,
            permissionAssignmentBridgeId: -1
        };
    }, [selectedCompany, selectedPermission]);

    // check for role conflicts 
    const isRoleConflicting = useMemo(() => {

        if (!permissionDTO)
            return false;

        return assignedPermissions
            .any(x => userPermissionsEqual(permissionDTO, x));
    }, [assignedPermissions, permissionDTO]);

    const selects = useMemo((): SelectType<any>[] => {

        return new ArrayBuilder<SelectType<any>>()
            .addIf(paging.currentIndex === 0, {
                title: 'Company',
                selectedValue: selectedCompany ?? undefined,
                getCompareKey: x => x.id + '',
                onSelected: setSelectedCompany,
                getDisplayValue: x => x.name,
                items: roleAssignCompanies
            } as SelectType<RoleAssignCompanyDTO>)
            .addIf(paging.currentIndex === 1, {
                title: 'Course',
                selectedValue: selectedCourse ?? undefined,
                getCompareKey: x => x.id + '',
                onSelected: setSelectedCourse,
                getDisplayValue: x => x.title,
                items: permissionAssignCourses
            } as SelectType<CoursePermissionAssignDTO>)
            .add({
                title: 'Permission',
                selectedValue: selectedPermission ?? undefined,
                getCompareKey: x => x.permissionId + '',
                onSelected: setSelectedPermission,
                getDisplayValue: x => x.permissionCode,
                items: assignablePermissionList
            } as SelectType<AssignablePermissionDTO>)
            .getArray();
    }, [
        paging,
        selectedCompany,
        setSelectedCompany,
        roleAssignCompanies,
        selectedPermission,
        setSelectedPermission,
        assignablePermissionList,
        selectedCourse,
        setSelectedCourse,
        permissionAssignCourses
    ]);

    return <AssignAuthItemDialog
        dialgoLogic={dialgoLogic}
        conflictError={isRoleConflicting ? 'Permission already assigned!' : null}
        isAddDisabled={isRoleConflicting || !permissionDTO}
        selects={selects}
        onAdd={() => {

            if (!permissionDTO)
                return;

            onAdd(permissionDTO);
        }}
        title="Assign a permission..."
        userId={userId} >

        <SegmentedButton
            paging={paging} />;

    </AssignAuthItemDialog>;
};