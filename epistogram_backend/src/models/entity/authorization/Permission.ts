import { Column, Entity, PrimaryGeneratedColumn } from '../../MyORM';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { PermissionCodeType, PermissionScopeType } from '../../../shared/types/sharedTypes';
import { Id } from '../../../shared/types/versionId';

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