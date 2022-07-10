import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { PermissionCodeType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';
import { Permission } from '../entity/authorization/Permission';
import { Role } from '../entity/authorization/Role';
import { RoleAssignmentBridge } from '../entity/authorization/RoleAssignmentBridge';
import { Comment } from '../entity/Comment';
import { Company } from '../entity/Company';
import { Course } from '../entity/course/Course';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserPermissionView {

    @ViewColumn()
    @XViewColumn()
    assigneeUserId: Id<User>;

    @ViewColumn()
    @XViewColumn()
    contextCompanyId: Id<Company> | null;

    @ViewColumn()
    @XViewColumn()
    contextCompanyName: string | null;

    @ViewColumn()
    @XViewColumn()
    contextCourseId: Id<Course> | null;

    @ViewColumn()
    @XViewColumn()
    contextCourseName: string | null;

    @ViewColumn()
    @XViewColumn()
    contextCommentId: Id<Comment> | null;

    @ViewColumn()
    @XViewColumn()
    permissionId: Id<Permission>;

    @ViewColumn()
    @XViewColumn()
    permissionCode: PermissionCodeType;

    @ViewColumn()
    @XViewColumn()
    assignmentBridgeId: Id<RoleAssignmentBridge> | null;

    @ViewColumn()
    @XViewColumn()
    parentRoleId: Id<Role> | null;

    @ViewColumn()
    @XViewColumn()
    parentRoleName: string | null;
}