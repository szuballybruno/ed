import { DeleteDateColumn, ViewColumn, ViewEntity } from 'typeorm';
import { IsDeletedFlag } from '../../services/ORMConnectionService/ORMConnectionDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CompanyView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    companyId: number;

    @IsDeletedFlag('bool')
    @DeleteDateColumn()
    isDeleted: Date;

    @ViewColumn()
    companyName: string;

    @ViewColumn()
    canManage: boolean;
}