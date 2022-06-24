import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { getJoinColumnName } from '../../../utilities/helpers';
import { Company } from '../Company';
import { Course } from '../course/Course';
import { Group } from '../Group';
import { User } from '../User';
import { Permission } from './Permission';

@Entity()
export class PermissionAssignmentBridge {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    // permission
    @Column()
    @XViewColumn()
    permissionId: number;

    // TO MANY

    @ManyToOne(_ => Permission, x => x.permissionAssignmentBridges)
    @JoinColumn(getJoinColumnName(PermissionAssignmentBridge, 'permissionId'))
    permissions: Relation<Permission>[];

    // TO ONE

    // user 
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    assigneeUserId: number | null;
    @ManyToOne(_ => User, x => x.roleAssignmentBridges)
    @JoinColumn(getJoinColumnName(PermissionAssignmentBridge, 'assigneeUserId'))
    assigneeUser: User | null;

    // company 
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    assigneeCompanyId: number | null;
    @ManyToOne(_ => Company, x => x.permissionAssignmentBridges)
    @JoinColumn(getJoinColumnName(PermissionAssignmentBridge, 'assigneeCompanyId'))
    assigneeCompany: Company | null;

    // group
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    assigneeGroupId: number | null;
    @ManyToOne(_ => Group, x => x.contextPermissionAssignmentBridges)
    @JoinColumn(getJoinColumnName(PermissionAssignmentBridge, 'assigneeGroupId'))
    assigneeGroup: Group | null;

    // context company 
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    contextCompanyId: number | null;
    @ManyToOne(_ => Company, x => x.contextPermissionAssignmentBridges)
    @JoinColumn(getJoinColumnName(PermissionAssignmentBridge, 'contextCompanyId'))
    contextCompany: Company | null;

    // context course
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    contextCourseId: number | null;
    @ManyToOne(_ => Course, x => x.contextPermissionAssignmentBridges)
    @JoinColumn(getJoinColumnName(PermissionAssignmentBridge, 'contextCourseId'))
    contextCourse: Course | null;
}