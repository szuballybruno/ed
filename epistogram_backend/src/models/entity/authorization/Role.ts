import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
}