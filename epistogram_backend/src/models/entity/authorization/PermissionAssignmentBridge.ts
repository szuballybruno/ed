import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { getJoinColumnName } from '../../../utilities/helpers';
import { Company } from '../Company';
import { Course } from '../Course';
import { Group } from '../Group';
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

    // ASSIGNEE

    // user 
    @Column({ type: 'int', nullable: true })
    assigneeUserId: number | null;

    @ManyToOne(_ => User, x => x.roleAssignmentBridges)
    @JoinColumn(getJoinColumnName(PermissionAssignmentBridge, 'assigneeUserId'))
    assigneeUser: User | null;

    // company 
    @Column({ type: 'int', nullable: true })
    assigneeCompanyId: number | null;

    @ManyToOne(_ => Company, x => x.permissionAssignmentBridges)
    @JoinColumn(getJoinColumnName(PermissionAssignmentBridge, 'assigneeCompanyId'))
    assigneeCompany: Company | null;

    // CONTEXTS 

    // context company 
    @Column({ type: 'int', nullable: true })
    contextCompanyId: number | null;

    @ManyToOne(_ => Company, x => x.contextPermissionAssignmentBridges)
    @JoinColumn(getJoinColumnName(PermissionAssignmentBridge, 'contextCompanyId'))
    contextCompany: Company | null;

    // context course
    @Column({ type: 'int', nullable: true })
    contextCourseId: number | null;

    @ManyToOne(_ => Course, x => x.contextPermissionAssignmentBridges)
    @JoinColumn(getJoinColumnName(PermissionAssignmentBridge, 'contextCourseId'))
    contextCourse: Course | null;

    // context group
    @Column({ type: 'int', nullable: true })
    contextGroupId: number | null;

    @ManyToOne(_ => Group, x => x.contextPermissionAssignmentBridges)
    @JoinColumn(getJoinColumnName(PermissionAssignmentBridge, 'contextGroupId'))
    contextGroup: Group | null;
}