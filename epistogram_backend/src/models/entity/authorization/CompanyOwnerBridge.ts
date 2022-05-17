import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { getJoinColumnName } from '../../../utilities/helpers';
import { Company } from '../Company';
import { User } from '../User';

@Entity()
export class CompanyOwnerBridge {

    @PrimaryGeneratedColumn()
    id: number;

    // user 
    @Column()
    userId: number;

    @ManyToOne(_ => User, x => x.companyOwnerBridges)
    @JoinColumn(getJoinColumnName(CompanyOwnerBridge, 'userId'))
    user: Relation<User>;

    // company 
    @Column()
    companyId: number;

    @ManyToOne(_ => Company, x => x.companyOwnerBridges)
    @JoinColumn(getJoinColumnName(CompanyOwnerBridge, 'companyId'))
    company: Relation<Company>;
}