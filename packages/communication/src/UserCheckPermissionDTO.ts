import { Id, PermissionCodeType } from "@episto/commontypes";

export class UserCheckPermissionDTO {
    permissionCode: PermissionCodeType;
    contextCompanyId: Id<'Company'> | null;
    contextCourseId: Id<'Course'> | null;
}