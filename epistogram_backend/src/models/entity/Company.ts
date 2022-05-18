import { Column, DeleteDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsDeletedFlag } from '../../services/ORMConnectionService/ORMConnectionDecorators';
import { getJoinColumnInverseSide } from '../../utilities/helpers';
import { ActivationCode } from './ActivationCode';
import { CompanyOwnerBridge } from './authorization/CompanyOwnerBridge';
import { Role } from './authorization/Role';
import { RoleAssignmentBridge } from './authorization/RoleAssignmentBridge';
import { User } from './User';
import { CourseAccessBridge } from './CourseAccessBridge';
import { PermissionAssignmentBridge } from './authorization/PermissionAssignmentBridge';

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date | null;

    @Column()
    name: string;

    // users 
    @OneToMany(_ => User, user => user.company)
    @JoinColumn()
    users: User[];

    // activation codes 
    @JoinColumn()
    @OneToMany(_ => ActivationCode, x => x.company)
    activationCodes: ActivationCode[];

    // role assingments
    @JoinColumn()
    @OneToMany(_ => RoleAssignmentBridge, x => x.assigneeCompany)
    roleAssignmentBridges: RoleAssignmentBridge[];

    // context role assingments
    @JoinColumn()
    @OneToMany(_ => RoleAssignmentBridge, x => x.contextCompany)
    contextRoleAssignmentBridges: RoleAssignmentBridge[];

    // permission assingments
    @JoinColumn()
    @OneToMany(_ => PermissionAssignmentBridge, x => x.assigneeCompany)
    permissionAssignmentBridges: PermissionAssignmentBridge[];

    // permission assingments context
    @JoinColumn()
    @OneToMany(_ => PermissionAssignmentBridge, x => x.contextCompany)
    contextPermissionAssignmentBridges: PermissionAssignmentBridge[];

    // companyOwnerBridges
    @JoinColumn()
    @OneToMany(_ => CompanyOwnerBridge, getJoinColumnInverseSide<Company>()(x => x.company))
    companyOwnerBridges: CompanyOwnerBridge[];

    // ownedRoles
    @JoinColumn()
    @OneToMany(_ => Role, getJoinColumnInverseSide<Company>()(x => x.company))
    ownedRoles: Role[];

    // course access bridges
    @JoinColumn()
    @OneToMany(_ => CourseAccessBridge, x => x.company)
    courseAccessBridges: CourseAccessBridge[];
}