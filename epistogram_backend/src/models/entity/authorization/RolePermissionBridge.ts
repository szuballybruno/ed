import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Permission } from './Permission';
import { Role as Role } from './Role';

@Entity()
export class RolePermissionBridge {

    @PrimaryGeneratedColumn()
    id: number;

    // role 
    @Column()
    roleId: number;

    @ManyToOne(_ => Role, x => x.rolePermissionBridges)
    @JoinColumn({ name: 'role_id' })
    role: Relation<Role>;

    // permission
    @Column()
    permissionId: number;

    @ManyToOne(_ => Permission, x => x.rolePermissionBridges)
    @JoinColumn({ name: 'permission_id' })
    permission: Relation<Permission>;
}