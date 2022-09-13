import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { getJoinColumnName } from '../../../utilities/helpers';
import { Company } from './Company';
import { Course } from '../course/Course';
import { User } from './User';

@Entity()
export class CourseAccessBridge {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'CourseAccessBridge'>;

    // course
    @Column()
    @XViewColumn()
    courseId: Id<'Course'>;
    @ManyToOne(_ => Course, course => course.userAccessBridges)
    @JoinColumn({ name: 'course_id' })
    course: Relation<Course>;

    // user 
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    userId: Id<'User'> | null;
    @ManyToOne(_ => User, x => x.courseAccessBridges)
    @JoinColumn(getJoinColumnName(CourseAccessBridge, 'userId'))
    user: Relation<User>;

    // company 
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    companyId: Id<'Company'> | null;
    @ManyToOne(_ => Company, x => x.courseAccessBridges)
    @JoinColumn(getJoinColumnName(CourseAccessBridge, 'companyId'))
    company: Relation<Company>;
}