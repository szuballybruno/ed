import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Permission } from './Permission';
import { Role as Role } from './Role';

@Entity()
export class RolePermissionBridge {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    // TO ONE

    // role 
    @Column()
    @XViewColumn()
    roleId: number;
    @ManyToOne(_ => Role, x => x.rolePermissionBridges)
    @JoinColumn({ name: 'role_id' })
    role: Relation<Role>;

    // permission
    @Column()
    @XViewColumn()
    permissionId: number;
    @ManyToOne(_ => Permission, x => x.rolePermissionBridges)
    @JoinColumn({ name: 'permission_id' })
    permission: Relation<Permission>;
}