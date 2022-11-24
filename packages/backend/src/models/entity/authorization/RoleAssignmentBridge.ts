import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';
import { getJoinColumnName } from '../../../utilities/helpers';
import { Company } from '../misc/Company';
import { User } from '../misc/User';
import { Role } from './Role';

@Entity()
export class RoleAssignmentBridge {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'RoleAssignmentBridge'>;

    // TO ONE

    // role 
    @Column()
    @XViewColumn()
    roleId: Id<'Role'>;
    @ManyToOne(_ => Role, x => x.roleAssignmentBridges)
    @JoinColumn(getJoinColumnName(RoleAssignmentBridge, 'roleId'))
    role: Relation<Role>;

    // user 
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    assigneeUserId: Id<'User'> | null;
    @ManyToOne(_ => User, x => x.roleAssignmentBridges)
    @JoinColumn(getJoinColumnName(RoleAssignmentBridge, 'assigneeUserId'))
    assigneeUser: Relation<User> | null;

    // company 
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    assigneeCompanyId: Id<'Company'> | null;
    @ManyToOne(_ => Company, x => x.roleAssignmentBridges)
    @JoinColumn(getJoinColumnName(RoleAssignmentBridge, 'assigneeCompanyId'))
    assigneeCompany: Relation<Company> | null;

    // context company 
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    contextCompanyId: Id<'Company'> | null;
    @ManyToOne(_ => Company, x => x.roleAssignmentBridges)
    @JoinColumn(getJoinColumnName(RoleAssignmentBridge, 'contextCompanyId'))
    contextCompany: Relation<Company> | null;
}