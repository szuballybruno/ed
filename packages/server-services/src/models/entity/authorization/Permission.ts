import { Column, Entity, PrimaryGeneratedColumn } from '../../MyORM';
import { XViewColumn } from '@episto/x-orm';
import { PermissionCodeType, PermissionScopeType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';

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
}