import { DeleteDateColumn, ViewColumn, ViewEntity } from 'typeorm';
import { IsDeletedFlag, XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { Company } from '../entity/Company';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CompanyView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<User>;

    @ViewColumn()
    @XViewColumn()
    companyId: Id<Company>;

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