import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { getJoinColumnName } from '../../../utilities/helpers';
import { Company } from '../Company';
import { User } from '../User';
import { Permission } from './Permission';

@Entity()
export class PermissionAssignmentBridge {

    @PrimaryGeneratedColumn()
    id: number;

    // permission
    @Column()
    permissionId: number;

    @ManyToOne(_ => Permission, x => x.permissionAssignmentBridges)
    @JoinColumn(getJoinColumnName(PermissionAssignmentBridge, 'permissionId'))
    permission: Permission;

    // user 
    @Column({ type: 'int', nullable: true })
    userId: number | null;

    @ManyToOne(_ => User, x => x.roleAssignmentBridges)
    @JoinColumn(getJoinColumnName(PermissionAssignmentBridge, 'userId'))
    user: User | null;

    // company 
    @Column({ type: 'int', nullable: true })
    companyId: number | null;

    @ManyToOne(_ => Company, x => x.permissionAssignmentBridges)
    @JoinColumn(getJoinColumnName(PermissionAssignmentBridge, 'companyId'))
    company: Company | null;

    // context company 
    @Column({ type: 'int', nullable: true })
    contextCompanyId: number | null;

    @ManyToOne(_ => Company, x => x.contextPermissionAssignmentBridges)
    @JoinColumn(getJoinColumnName(PermissionAssignmentBridge, 'contextCompanyId'))
    contextCompany: Company | null;
}