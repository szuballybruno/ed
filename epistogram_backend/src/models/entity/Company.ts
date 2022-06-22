import { Column, DeleteDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsDeletedFlag, XOneToMany, XViewColumn } from '../../services/XORM/XORMDecorators';
import { ActivationCode } from './ActivationCode';
import { CompanyOwnerBridge } from './authorization/CompanyOwnerBridge';
import { PermissionAssignmentBridge } from './authorization/PermissionAssignmentBridge';
import { Role } from './authorization/Role';
import { RoleAssignmentBridge } from './authorization/RoleAssignmentBridge';
import { CourseAccessBridge } from './CourseAccessBridge';
import { User } from './User';

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    @XViewColumn()
    deletionDate: Date | null;

    @Column()
    @XViewColumn()
    name: string;

    // TO MANY

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
    @XOneToMany<Company>()(() => CompanyOwnerBridge, x => x.company)
    companyOwnerBridges: CompanyOwnerBridge[];

    // ownedRoles
    @JoinColumn()
    @XOneToMany<Company>()(() => Role, x => x.company)
    ownedRoles: Role[];

    // course access bridges
    @JoinColumn()
    @OneToMany(_ => CourseAccessBridge, x => x.company)
    courseAccessBridges: CourseAccessBridge[];
}