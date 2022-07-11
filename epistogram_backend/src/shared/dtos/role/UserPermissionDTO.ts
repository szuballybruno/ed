import { Permission } from '../../../models/entity/authorization/Permission';
import { Role } from '../../../models/entity/authorization/Role';
import { RoleAssignmentBridge } from '../../../models/entity/authorization/RoleAssignmentBridge';
import { Company } from '../../../models/entity/Company';
import { Course } from '../../../models/entity/course/Course';
import { User } from '../../../models/entity/User';
import { PermissionCodeType } from '../../types/sharedTypes';
import { Id } from '../../types/versionId';

export class UserPermissionDTO {
    permissionAssignmentBridgeId: Id<'RoleAssignmentBridge'> | null;
    permissionId: Id<'Permission'>;
    permissionCode: PermissionCodeType;
    assigneeUserId: Id<'User'>;
    contextCompanyId: Id<'Company'> | null;
    contextCompanyName: string | null;
    contextCourseId: Id<'Course'> | null;
    contextCourseName: string | null;
    parentRoleId: Id<'Role'> | null;
    parentRoleName: string | null;
}