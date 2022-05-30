import { DeleteDateColumn, ViewColumn, ViewEntity } from 'typeorm';
import { IsDeletedFlag, XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CompanyView {

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    companyId: number;

    @IsDeletedFlag('bool')
    @DeleteDateColumn()
    isDeleted: Date;

    @ViewColumn()
    @XViewColumn()
    companyName: string;

    @ViewColumn()
    @XViewColumn()
    canManage: boolean;
}