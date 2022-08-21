import {Permission} from '../../src/models/entity/authorization/Permission';
import {RoleService} from '../../src/services/RoleService';
import {ChangeSet} from '../../src/shared/dtos/changeSet/ChangeSet';
import {UserPermissionDTO} from '../../src/shared/dtos/role/UserPermissionDTO';
import {instantiate} from '../../src/shared/logic/sharedLogic';
import {
    GetParamByCodeType,
    GetPermissionScope,
    permissionCodes,
    PermissionScopeParamType
} from '../../src/shared/types/PermissionCodesType';
import {PermissionCodeType} from '../../src/shared/types/sharedTypes';
import {Id} from '../../src/shared/types/versionId';
import {ServiceProvider} from '../../src/startup/servicesDI';
import {JestLogger} from './jestLogger';

export type AssignablePermissionType = {
    permissionCode: PermissionCodeType,
    contextCompanyId: Id<'Company'> | null
    contextCommentId: Id<'Comment'> | null
    contextCourseId: Id<'Course'> | null
}

/**
 * Tests callback function (endpoint)
 * with no permissions and with given permissions
 *
 * @param assignablePermissions
 * @param serviceProvider
 * @param callbackFn
 * @param args
 */
export const permissionTesterWrapper = async (
    assignablePermissions: AssignablePermissionType[],
    serviceProvider: ServiceProvider,
    callbackFn: (
        assignedPermissions?: AssignablePermissionType[]
    ) => Promise<void>
) => {

    // role service
    JestLogger.logMain('Getting roleService');
    const roleService = serviceProvider.getService(RoleService);

    // all permissions
    JestLogger.logMain('Getting permissions');
    const permissions = Object.values(permissionCodes) as any as Permission[];

    // current user -> needs to be the same as the login user in base.ts
    const assigneeUserId = Id.create<'User'>(2);

    const getPermissionFromCode = (code: PermissionCodeType) => {

        return permissions.find(x => x.code === code);
    };

    // removes all permissions and roles from user
    // TODO: NOT WORKING WITH USER WITH ISGOD FLAG!!
    JestLogger.logMain('Flushing user permissions');
    await roleService
        ._flushUserPermissionsAndRolesAsync(assigneeUserId);

    JestLogger.logMain('Running callback fn without permissions');
    await callbackFn();

        // adds the current and access_application permission to user
    JestLogger.logMain('Adding ACCESS_APPLICATION and ' + JSON.stringify(assignablePermissions.map(x => x.permissionCode)) + ' permissions to user');
    await roleService
        ._savePermissionsAsync(
            assigneeUserId,
            {
                newItems: [
                    ...assignablePermissions.map(x => {

                        const currentPermission = getPermissionFromCode(x.permissionCode);

                        if (!currentPermission)
                            return;

                        return instantiate<UserPermissionDTO>({
                                permissionId: currentPermission.id,
                                permissionCode: currentPermission.code,
                                assigneeUserId: assigneeUserId,
                                contextCompanyId: x.contextCompanyId,
                                contextCourseId: x.contextCourseId,
                                contextCompanyName: '',
                                contextCourseName: '',
                                parentRoleId: null,
                                parentRoleName: null,
                                permissionAssignmentBridgeId: null
                            });
                        }),
                    instantiate<UserPermissionDTO>({
                        permissionId: getPermissionFromCode('ACCESS_APPLICATION')!.id,
                        permissionCode: 'ACCESS_APPLICATION',
                        assigneeUserId: assigneeUserId,
                        contextCompanyId: null,
                        contextCourseId: null,
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

    JestLogger.logMain('Running callback fn with: ' + assignablePermissions);
    await callbackFn(assignablePermissions);

    // removes all the permissions from user
    JestLogger.logMain('Flushing user permissions');
    await roleService
        ._flushUserPermissionsAndRolesAsync(assigneeUserId);

    };
