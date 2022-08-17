import { Permission } from '../../src/models/entity/authorization/Permission';
import { RoleService } from '../../src/services/RoleService';
import { ChangeSet } from '../../src/shared/dtos/changeSet/ChangeSet';
import { UserPermissionDTO } from '../../src/shared/dtos/role/UserPermissionDTO';
import { instantiate } from '../../src/shared/logic/sharedLogic';
import { permissionCodes } from '../../src/shared/types/PermissionCodesType';
import { PermissionCodeType } from '../../src/shared/types/sharedTypes';
import { Id } from '../../src/shared/types/versionId';
import { ServiceProvider } from '../../src/startup/servicesDI';
import {JestLogger} from './jestLogger';

/**
 * Tests callback function (endpoint)
 * with no permissions and with given permissions
 *
 * @param assignablePermissions
 * @param serviceProvider
 * @param callbackFn
 */
export const permissionTesterWrapper = async (
    assignablePermissions: PermissionCodeType[],
    serviceProvider: ServiceProvider,
    callbackFn: (
        permissionCodeType?: PermissionCodeType[]
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
    JestLogger.logMain('Adding ACCESS_APPLICATION and ' + JSON.stringify(assignablePermissions) + ' permissions to user');
    await roleService
        ._savePermissionsAsync(
            assigneeUserId,
            {
                newItems: [
                    ...assignablePermissions.map(x => {

                        const currentPermission = getPermissionFromCode(x);

                        if (!currentPermission)
                            return;

                        return instantiate<UserPermissionDTO>({
                                permissionId: currentPermission.id,
                                permissionCode: currentPermission.code,
                                assigneeUserId: assigneeUserId,
                                contextCompanyId: currentPermission.scope === 'COMPANY' ? Id.create<'Company'>(2) : null,
                                contextCourseId: currentPermission.scope === 'COURSE' ? Id.create<'Course'>(10) : null,
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
