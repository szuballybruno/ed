import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { getJoinColumnName } from '../../../utilities/helpers';
import { Company } from '../Company';
import { User } from '../User';

@Entity()
export class CompanyOwnerBridge {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'CompanyOwnerBridge'>;

    // TO ONE

    // user 
    @Column()
    @XViewColumn()
    userId: Id<'User'>;
    @ManyToOne(_ => User, x => x.companyOwnerBridges)
    @JoinColumn(getJoinColumnName(CompanyOwnerBridge, 'userId'))
    user: Relation<User>;

    // company 
    @Column()
    @XViewColumn()
    companyId: Id<'Company'>;
    @ManyToOne(_ => Company, x => x.companyOwnerBridges)
    @JoinColumn(getJoinColumnName(CompanyOwnerBridge, 'companyId'))
    company: Relation<Company>;
}