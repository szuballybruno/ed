import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { XJoinColumn, XManyToOne, XOneToMany } from '../../../services/XORM/XORMDecorators';
import { ModuleVersion } from '../module/ModuleVersion';
import { Course } from './Course';

@Entity()
export class CourseVersion {

    @PrimaryGeneratedColumn()
    id: number;

    // 
    // TO MANY 
    //

    // modules 
    @XOneToMany<CourseVersion>()(ModuleVersion, x => x.courseVersion)
    moduleVersions: ModuleVersion[];

    //
    // TO ONE 
    // 

    // course 
    @Column()
    courseId: number;

    @XManyToOne<CourseVersion>()(Course, x => x.courseVersions)
    @XJoinColumn<CourseVersion>('courseId')
    course: Course;
}