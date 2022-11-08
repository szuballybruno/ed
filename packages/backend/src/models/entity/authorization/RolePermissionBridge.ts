import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';
import { Permission } from './Permission';
import { Role as Role } from './Role';

@Entity()
export class RolePermissionBridge {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'RolePermissionBridge'>;

    // TO ONE

    // role 
    @Column()
    @XViewColumn()
    roleId: Id<'Role'>;
    @ManyToOne(_ => Role, x => x.rolePermissionBridges)
    @JoinColumn({ name: 'role_id' })
    role: Relation<Role>;

    // permission
    @Column()
    @XViewColumn()
    permissionId: Id<'Permission'>;
    @ManyToOne(_ => Permission)
    @JoinColumn({ name: 'permission_id' })
    permission: Relation<Permission>;
}