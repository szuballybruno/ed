import { Column, DeleteDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from '../../MyORM';
import { DeletionDateColumn, XJoinColumn, XManyToOne, XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';
import { ActivationCode } from './ActivationCode';
import { CompanyOwnerBridge } from '../authorization/CompanyOwnerBridge';
import { PermissionAssignmentBridge } from '../authorization/PermissionAssignmentBridge';
import { Role } from '../authorization/Role';
import { RoleAssignmentBridge } from '../authorization/RoleAssignmentBridge';
import { CourseAccessBridge } from './CourseAccessBridge';
import { StorageFile } from './StorageFile';
import { User } from './User';

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'Company'>;

    @DeletionDateColumn()
    @DeleteDateColumn()
    @XViewColumn()
    deletionDate: Date | null;

    @Column()
    @XViewColumn()
    name: string;

    @Column()
    @XViewColumn()
    domain: string;

    @Column()
    @XViewColumn()
    productionDomainPrefix: string;

    @Column()
    @XViewColumn()
    isSurveyRequired: boolean;

    @Column({ type: 'varchar', nullable: true })
    @XViewColumn()
    legalName: string | null;

    @Column({ type: 'varchar', nullable: true })
    @XViewColumn()
    primaryColor: string | null;

    @Column({ type: 'varchar', nullable: true })
    @XViewColumn()
    secondaryColor: string | null;

    @Column({ type: 'varchar', nullable: true })
    @XViewColumn()
    backdropColor: string | null;

    @XViewColumn()
    @Column()
    isCustomDomainCompany: boolean;

    // TO ONE

    // logo file
    @Column({ nullable: true, type: 'int' })
    @XViewColumn()
    logoFileId: Id<'StorageFile'> | null;
    @XManyToOne<Company>()(() => StorageFile)
    @XJoinColumn<Company>('logoFileId')
    logoFile: StorageFile | null;

    // cover file
    @Column({ nullable: true, type: 'int' })
    @XViewColumn()
    coverFileId: Id<'StorageFile'> | null;
    @XManyToOne<Company>()(() => StorageFile)
    @XJoinColumn<Company>('coverFileId')
    coverFile: StorageFile | null;

    // TO MANY

    // users 
    @OneToMany(_ => User, user => user.company)
    @JoinColumn()
    users: User[];

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