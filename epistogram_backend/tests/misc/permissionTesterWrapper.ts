import { Permission } from '../../src/models/entity/authorization/Permission';
import { RoleService } from '../../src/services/RoleService';
import { ChangeSet } from '../../src/shared/dtos/changeSet/ChangeSet';
import { UserPermissionDTO } from '../../src/shared/dtos/role/UserPermissionDTO';
import { instantiate } from '../../src/shared/logic/sharedLogic';
import { permissionCodes } from '../../src/shared/types/PermissionCodesType';
import { PermissionCodeType } from '../../src/shared/types/sharedTypes';
import { Id } from '../../src/shared/types/versionId';
import { ServiceProvider } from '../../src/startup/servicesDI';
import { PrincipalId } from '../../src/utilities/XTurboExpress/ActionParams';

export const permissionTesterWrapper = async (

    serviceProvider: ServiceProvider,
    callbackFn: (
        permissionCodeType: PermissionCodeType
    ) => Promise<void>
) => {

    const roleService = serviceProvider.getService(RoleService);

    const permissions = Object.values(permissionCodes) as any as Permission[];

    const assigneeUserId = Id.create<'User'>(2);
    const principalId = new PrincipalId(1);

    await roleService
        ._flushUserPermissionsAndRolesAsync(assigneeUserId);

    for (let i = 0; i < permissions.length; i++) {
        console.log(permissions[i].code);

        const {
            id,
            code,
            scope
        } = permissions[i];

        // adds the current permission to user
        await roleService
            ._savePermissionsAsync(
                assigneeUserId,
                {
                    newItems: [
                        instantiate<UserPermissionDTO>({
                            permissionId: id,
                            permissionCode: code,
                            assigneeUserId: assigneeUserId,
                            contextCompanyId: scope === 'COMPANY' ? Id.create<'Company'>(1) : null,
                            contextCourseId: scope === 'COURSE' ? Id.create<'Course'>(1) : null,
                            contextCompanyName: '',
                            contextCourseName: '',
                            parentRoleId: null,
                            parentRoleName: null,
                            permissionAssignmentBridgeId: null
                        })
                    ],
                    deletedItems: []
                } as ChangeSet<UserPermissionDTO>
            );


        await callbackFn(code as PermissionCodeType);

        // removes all the permissions from user
        await roleService
            ._flushUserPermissionsAndRolesAsync(assigneeUserId);
    }
};