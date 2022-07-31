import { Permission } from '../../src/models/entity/authorization/Permission';
import { RoleService } from '../../src/services/RoleService';
import { ChangeSet } from '../../src/shared/dtos/changeSet/ChangeSet';
import { UserPermissionDTO } from '../../src/shared/dtos/role/UserPermissionDTO';
import { instantiate } from '../../src/shared/logic/sharedLogic';
import { permissionCodes } from '../../src/shared/types/PermissionCodesType';
import { PermissionCodeType } from '../../src/shared/types/sharedTypes';
import { Id } from '../../src/shared/types/versionId';
import { ServiceProvider } from '../../src/startup/servicesDI';

/**
 * Tests callback function (endpoint) with 
 * every permission possible one-by-one
 * 
 * @param serviceProvider 
 * @param callbackFn 
 */
export const permissionTesterWrapper = async (

    serviceProvider: ServiceProvider,
    callbackFn: (
        permissionCodeType: PermissionCodeType
    ) => Promise<void>
) => {

    // role service
    const roleService = serviceProvider.getService(RoleService);

    // all permissions
    const permissions = Object.values(permissionCodes) as any as Permission[];

    // current user -> needs to be the same as the login user in base.ts
    const assigneeUserId = Id.create<'User'>(3);

    // removes all permissions and roles from user
    // TODO: NOT WORKING WITH USER WITH ISGOD FLAG!!
    await roleService
        ._flushUserPermissionsAndRolesAsync(assigneeUserId);

    for (let i = 0; i < permissions.length; i++) {

        console.log(`Running with permission: ${permissions[i].code}`);

        const {
            id,
            code,
            scope
        } = permissions[i];

        // adds the current and access_application permission to user
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
                        }),
                        instantiate<UserPermissionDTO>({
                            permissionId: Id.create<'Permission'>(41),
                            permissionCode: 'ACCESS_APPLICATION',
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