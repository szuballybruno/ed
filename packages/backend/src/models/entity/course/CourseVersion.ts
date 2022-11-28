import { Column, Entity, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XJoinColumn, XManyToOne, XOneToMany, XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';
import { ModuleVersion } from '../module/ModuleVersion';
import { Course } from './Course';
import { CourseData } from './CourseData';

@Entity()
export class CourseVersion {

    @XViewColumn()
    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'CourseVersion'>;

    // 
    // TO MANY 
    //

    // modules 
    @XOneToMany<CourseVersion>()(() => ModuleVersion, x => x.courseVersion)
    moduleVersions: ModuleVersion[];

    //
    // TO ONE 
    // 

    // course 
    @Column()
    @XViewColumn()
    courseId: Id<'Course'>;
    @XManyToOne<CourseVersion>()(() => Course, x => x.courseVersions)
    @XJoinColumn<CourseVersion>('courseId')
    course: Course;

    @Column()
    @XViewColumn()
    courseDataId: Id<'CourseData'>;
    @XManyToOne<CourseVersion>()(() => CourseData, x => x.courseVersions)
    @XJoinColumn<CourseVersion>('courseDataId')
    courseData: Relation<CourseData>;
}