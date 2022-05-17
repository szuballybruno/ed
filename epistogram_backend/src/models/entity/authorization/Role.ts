import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { IsDeletedFlag } from '../../../services/ORMConnectionService/ORMConnectionDecorators';
import { RoleScopeType } from '../../../shared/types/sharedTypes';
import { getJoinColumnName } from '../../../utilities/helpers';
import { Company } from '../Company';
import { RoleAssignmentBridge } from './RoleAssignmentBridge';
import { RolePermissionBridge } from './RolePermissionBridge';

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date;

    @Column({ type: 'text' })
    scope: RoleScopeType;

    @Column()
    name: string;

    // permissions
    @JoinColumn()
    @OneToMany(_ => RolePermissionBridge, x => x.role, { cascade: true })
    rolePermissionBridges: Relation<RolePermissionBridge>[];

    // assingments
    @JoinColumn()
    @OneToMany(_ => RoleAssignmentBridge, x => x.role)
    roleAssignmentBridges: Relation<RoleAssignmentBridge>[];

    // owner company 
    @Column({ type: 'int', nullable: true })
    companyId: number | null;

    @JoinColumn(getJoinColumnName(Role, 'companyId'))
    @ManyToOne(_ => Company, x => x.ownedRoles)
    company: Relation<Company>;
}