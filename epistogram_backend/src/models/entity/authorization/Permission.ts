import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionCodeType, PermissionScopeType, RoleScopeType } from '../../../shared/types/sharedTypes';
import { PermissionAssignmentBridge } from './PermissionAssignmentBridge';
import { RolePermissionBridge } from './RolePermissionBridge';

@Entity()
export class Permission {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    code: PermissionCodeType;

    @Column({ type: 'text' })
    scope: PermissionScopeType;

    // rolePermissionBridges
    @JoinColumn()
    @OneToMany(_ => RolePermissionBridge, x => x.permission)
    rolePermissionBridges: RolePermissionBridge[];

    // assingments
    @JoinColumn()
    @OneToMany(_ => PermissionAssignmentBridge, x => x.permission)
    permissionAssignmentBridges: PermissionAssignmentBridge[];
}