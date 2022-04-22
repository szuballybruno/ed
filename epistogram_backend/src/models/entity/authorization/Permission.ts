import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionCodeType } from '../../../shared/types/sharedTypes';
import { RolePermissionBridge } from './RolePermissionBridge';

@Entity()
export class Permission {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    code: PermissionCodeType;

    // rolePermissionBridges
    @JoinColumn()
    @OneToMany(_ => RolePermissionBridge, x => x.permission)
    rolePermissionBridges: RolePermissionBridge[];
}