import { Column, Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne, XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { ModuleVersion } from '../module/ModuleVersion';
import { Course } from './Course';
import { CourseData } from './CourseData';

@Entity()
export class CourseVersion {

    @XViewColumn()
    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<CourseVersion>;

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
    courseId: Id<Course>;
    @XManyToOne<CourseVersion>()(() => Course, x => x.courseVersions)
    @XJoinColumn<CourseVersion>('courseId')
    course: Course;

    @Column()
    @XViewColumn()
    courseDataId: Id<CourseData>;
    @XManyToOne<CourseVersion>()(() => CourseData, x => x.courseVersions)
    @XJoinColumn<CourseVersion>('courseDataId')
    courseData: Relation<CourseData>;
}