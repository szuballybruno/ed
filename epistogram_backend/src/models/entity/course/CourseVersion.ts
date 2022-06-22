import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { XJoinColumn, XManyToOne, XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { ModuleVersion } from '../module/ModuleVersion';
import { Course } from './Course';
import { CourseData } from './CourseData';

@Entity()
export class CourseVersion {

    @XViewColumn()
    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

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
    courseId: number;
    @XManyToOne<CourseVersion>()(() => Course, x => x.courseVersions)
    @XJoinColumn<CourseVersion>('courseId')
    course: Course;

    @Column()
    @XViewColumn()
    courseDataId: number;
    @XManyToOne<CourseVersion>()(() => CourseData, x => x.courseVersions)
    @XJoinColumn<CourseVersion>('courseDataId')
    courseData: CourseData;
}