import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserRoleAssignCompanyView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    companyId: number;

    @ViewColumn()
    companyName: string;

    @ViewColumn()
    canAssign: boolean;
}