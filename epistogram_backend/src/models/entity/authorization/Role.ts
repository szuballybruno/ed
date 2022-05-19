import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { IsDeletedFlag } from '../../../services/ORMConnectionService/ORMConnectionDecorators';
import { getJoinColumnName } from '../../../utilities/helpers';
import { Company } from '../Company';
import { RoleAssignmentBridge } from './RoleAssignmentBridge';
import { RolePermissionBridge } from './RolePermissionBridge';

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date | null;

    @Column()
    name: string;

    @Column()
    isCustom: boolean;

    // permissions
    @JoinColumn()
    @OneToMany(_ => RolePermissionBridge, x => x.role, { cascade: true })
    rolePermissionBridges: Relation<RolePermissionBridge>[];

    // assingments
    @JoinColumn()
    @OneToMany(_ => RoleAssignmentBridge, x => x.role)
    roleAssignmentBridges: Relation<RoleAssignmentBridge>[];

    // owner company 
    @Column({ type: 'int', nullable: true })
    companyId: number | null;

    @JoinColumn(getJoinColumnName(Role, 'companyId'))
    @ManyToOne(_ => Company, x => x.ownedRoles)
    company: Relation<Company>;
}