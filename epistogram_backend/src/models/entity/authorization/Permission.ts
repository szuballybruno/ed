import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { PermissionCodeType, PermissionScopeType } from '../../../shared/types/sharedTypes';
import { Id } from '../../../shared/types/versionId';
import { PermissionAssignmentBridge } from './PermissionAssignmentBridge';
import { RolePermissionBridge } from './RolePermissionBridge';

@Entity()
export class Permission {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'Permission'>;

    @Column({ type: 'text' })
    @XViewColumn()
    code: PermissionCodeType;

    @Column({ type: 'text' })
    @XViewColumn()
    scope: PermissionScopeType;

    // TO MANY

    // rolePermissionBridges
    @JoinColumn()
    @OneToMany(_ => RolePermissionBridge, x => x.permission)
    rolePermissionBridges: RolePermissionBridge[];

    // assingments
    @JoinColumn()
    @OneToMany(_ => PermissionAssignmentBridge, x => x.permissions)
    permissionAssignmentBridges: PermissionAssignmentBridge[];
}