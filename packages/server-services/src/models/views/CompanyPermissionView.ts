import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class CompanyPermissionView {

    @XViewColumn()
    assigneeCompanyId: Id<'AssigneeCompany'>;

    @XViewColumn()
    contextCompanyId: Id<'ContextCompany'>;

    @XViewColumn()
    contextCourseId: Id<'ContextCourse'>;

    @XViewColumn()
    roleId: Id<'Role'>;

    @XViewColumn()
    permissionId: Id<'Permission'>;
}