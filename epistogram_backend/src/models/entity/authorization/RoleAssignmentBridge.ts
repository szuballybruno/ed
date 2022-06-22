import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { getJoinColumnName } from '../../../utilities/helpers';
import { Company } from '../Company';
import { User } from '../User';
import { Role } from './Role';

@Entity()
export class RoleAssignmentBridge {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    // TO ONE

    // role 
    @Column()
    @XViewColumn()
    roleId: number;
    @ManyToOne(_ => Role, x => x.roleAssignmentBridges)
    @JoinColumn(getJoinColumnName(RoleAssignmentBridge, 'roleId'))
    role: Relation<Role>;

    // user 
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    assigneeUserId: number | null;
    @ManyToOne(_ => User, x => x.roleAssignmentBridges)
    @JoinColumn(getJoinColumnName(RoleAssignmentBridge, 'assigneeUserId'))
    assigneeUser: Relation<User> | null;

    // company 
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    assigneeCompanyId: number | null;
    @ManyToOne(_ => Company, x => x.roleAssignmentBridges)
    @JoinColumn(getJoinColumnName(RoleAssignmentBridge, 'assigneeCompanyId'))
    assigneeCompany: Relation<Company> | null;

    // context company 
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    contextCompanyId: number | null;
    @ManyToOne(_ => Company, x => x.roleAssignmentBridges)
    @JoinColumn(getJoinColumnName(RoleAssignmentBridge, 'contextCompanyId'))
    contextCompany: Relation<Company> | null;
}