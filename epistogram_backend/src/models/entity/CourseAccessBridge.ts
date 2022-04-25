import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { getJoinColumnName } from '../../utilities/helpers';
import { Company } from './Company';
import { Course } from './Course';
import { User } from './User';

@Entity()
export class CourseAccessBridge {

    @PrimaryGeneratedColumn()
    id: number;

    // course
    @Column()
    courseId: number;

    @ManyToOne(_ => Course, course => course.userAccessBridges)
    @JoinColumn({ name: 'course_id' })
    course: Course;

    // user 
    @Column({ type: 'int', nullable: true })
    userId: number | null;

    @ManyToOne(_ => User, x => x.courseAccessBridges)
    @JoinColumn(getJoinColumnName(CourseAccessBridge, 'userId'))
    user: User;

    // company 
    @Column({ type: 'int', nullable: true })
    companyId: number | null;

    @ManyToOne(_ => Company, x => x.courseAccessBridges)
    @JoinColumn(getJoinColumnName(CourseAccessBridge, 'companyId'))
    company: Company;
}