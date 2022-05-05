import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { getJoinColumnName } from '../../../utilities/helpers';
import { Company } from '../Company';
import { User } from '../User';
import { RoleAssignmentBridge } from './RoleAssignmentBridge';
import { RolePermissionBridge } from './RolePermissionBridge';

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // permissions
    @JoinColumn()
    @OneToMany(_ => RolePermissionBridge, x => x.role, { cascade: true })
    rolePermissionBridges: RolePermissionBridge[];

    // assingments
    @JoinColumn()
    @OneToMany(_ => RoleAssignmentBridge, x => x.role)
    roleAssignmentBridges: RoleAssignmentBridge[];

    // owner user 
    @Column({ type: 'int', nullable: true })
    ownerUserId: number;

    @JoinColumn(getJoinColumnName(Role, 'ownerUserId'))
    @ManyToOne(_ => User, x => x.ownedRoles)
    ownerUser: User;

    // owner company 
    @Column({ type: 'int', nullable: true })
    ownerCompanyId: number;

    @JoinColumn(getJoinColumnName(Role, 'ownerCompanyId'))
    @ManyToOne(_ => Company, x => x.ownedRoles)
    ownerCompany: Company;
}