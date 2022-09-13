import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { IsDeletedFlag, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { getJoinColumnName } from '../../../utilities/helpers';
import { Company } from '../misc/Company';
import { RoleAssignmentBridge } from './RoleAssignmentBridge';
import { RolePermissionBridge } from './RolePermissionBridge';

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'Role'>;

    @IsDeletedFlag()
    @DeleteDateColumn()
    @XViewColumn()
    deletionDate: Date | null;

    @Column()
    @XViewColumn()
    name: string;

    @Column()
    @XViewColumn()
    isCustom: boolean;

    // TO MANY

    // permissions
    @JoinColumn()
    @OneToMany(_ => RolePermissionBridge, x => x.role, { cascade: true })
    rolePermissionBridges: Relation<RolePermissionBridge>[];

    // assingments
    @JoinColumn()
    @OneToMany(_ => RoleAssignmentBridge, x => x.role)
    roleAssignmentBridges: Relation<RoleAssignmentBridge>[];

    // TO ONE

    // owner company 
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    companyId: Id<'Company'> | null;
    @JoinColumn(getJoinColumnName(Role, 'companyId'))
    @ManyToOne(_ => Company, x => x.ownedRoles)
    company: Relation<Company>;
}