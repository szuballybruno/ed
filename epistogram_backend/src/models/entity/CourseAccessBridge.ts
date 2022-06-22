import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { getJoinColumnName } from '../../utilities/helpers';
import { Company } from './Company';
import { Course } from './course/Course';
import { User } from './User';

@Entity()
export class CourseAccessBridge {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    // course
    @Column()
    @XViewColumn()
    courseId: number;
    @ManyToOne(_ => Course, course => course.userAccessBridges)
    @JoinColumn({ name: 'course_id' })
    course: Relation<Course>;

    // user 
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    userId: number | null;
    @ManyToOne(_ => User, x => x.courseAccessBridges)
    @JoinColumn(getJoinColumnName(CourseAccessBridge, 'userId'))
    user: Relation<User>;

    // company 
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    companyId: number | null;
    @ManyToOne(_ => Company, x => x.courseAccessBridges)
    @JoinColumn(getJoinColumnName(CourseAccessBridge, 'companyId'))
    company: Relation<Company>;
}