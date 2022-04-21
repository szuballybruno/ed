import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { getJoinColumnName } from '../../../utilities/helpers';
import { Company } from '../Company';
import { User } from '../User';
import { Role } from './Role';

@Entity()
export class RoleAssignmentBridge {

    @PrimaryGeneratedColumn()
    id: number;

    // role 
    @Column()
    roleId: number;

    @ManyToOne(_ => Role, x => x.roleAssignmentBridges)
    @JoinColumn(getJoinColumnName(RoleAssignmentBridge, 'roleId'))
    role: Role;

    // user 
    @Column({ type: 'int', nullable: true })
    userId: number;

    @ManyToOne(_ => User, x => x.roleAssignmentBridges)
    @JoinColumn(getJoinColumnName(RoleAssignmentBridge, 'userId'))
    user: User;

    // company 
    @Column({ type: 'int', nullable: true })
    companyId: number;

    @ManyToOne(_ => Company, x => x.roleAssignmentBridges)
    @JoinColumn(getJoinColumnName(RoleAssignmentBridge, 'companyId'))
    company: User;
}