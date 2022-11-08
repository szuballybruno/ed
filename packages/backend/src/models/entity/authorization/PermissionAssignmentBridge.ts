import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from '../../MyORM';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';
import { getJoinColumnName } from '../../../utilities/helpers';
import { Company } from '../misc/Company';
import { Course } from '../course/Course';
import { Group } from '../misc/Group';
import { User } from '../misc/User';

@Entity()
export class PermissionAssignmentBridge {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'PermissionAssignmentBridge'>;

    // TO ONE

    // permission
    @Column({ type: 'int' })
    @XViewColumn()
    permissionId: Id<'Permission'>;

    // user 
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    assigneeUserId: Id<'User'> | null;
    @ManyToOne(_ => User, x => x.roleAssignmentBridges)
    @JoinColumn(getJoinColumnName(PermissionAssignmentBridge, 'assigneeUserId'))
    assigneeUser: User | null;

    // company 
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    assigneeCompanyId: Id<'Company'> | null;
    @ManyToOne(_ => Company, x => x.permissionAssignmentBridges)
    @JoinColumn(getJoinColumnName(PermissionAssignmentBridge, 'assigneeCompanyId'))
    assigneeCompany: Company | null;

    // group
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    assigneeGroupId: Id<'Group'> | null;
    @ManyToOne(_ => Group, x => x.contextPermissionAssignmentBridges)
    @JoinColumn(getJoinColumnName(PermissionAssignmentBridge, 'assigneeGroupId'))
    assigneeGroup: Group | null;

    // context company 
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    contextCompanyId: Id<'Company'> | null;
    @ManyToOne(_ => Company, x => x.contextPermissionAssignmentBridges)
    @JoinColumn(getJoinColumnName(PermissionAssignmentBridge, 'contextCompanyId'))
    contextCompany: Company | null;

    // context course
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    contextCourseId: Id<'Course'> | null;
    @ManyToOne(_ => Course, x => x.contextPermissionAssignmentBridges)
    @JoinColumn(getJoinColumnName(PermissionAssignmentBridge, 'contextCourseId'))
    contextCourse: Course | null;
}