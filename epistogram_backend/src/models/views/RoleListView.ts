import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class RoleListView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    companyId: number;

    @ViewColumn()
    companyName: string;

    @ViewColumn()
    roleId: number;

    @ViewColumn()
    roleName: string;

    @ViewColumn()
    isCompanyOwned: boolean;

    @ViewColumn()
    ownerName: string;
}