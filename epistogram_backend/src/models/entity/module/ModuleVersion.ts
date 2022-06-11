import { Column, Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne, XOneToMany } from '../../../services/XORM/XORMDecorators';
import { CourseVersion } from '../course/CourseVersion';
import { ExamVersion } from '../exam/ExamVersion';
import { VideoVersion } from '../video/VideoVersion';
import { Module } from './Module';

@Entity()
export class ModuleVersion {

    @PrimaryGeneratedColumn()
    id: number;

    // 
    // TO ONE
    // 

    // course 
    @Column({ nullable: true })
    courseVersionId: number | null;

    @XManyToOne<ModuleVersion>()(CourseVersion, x => x.moduleVersions)
    @XJoinColumn<ModuleVersion>('courseVersionId')
    courseVersion: Relation<CourseVersion>;

    // module
    @Column()
    moduleId: number;

    @XManyToOne<ModuleVersion>()(Module, x => x.moduleVersions)
    @XJoinColumn<ModuleVersion>('moduleId')
    module: Module;

    //
    // TO MANY
    //

    // exams
    @XOneToMany<ModuleVersion>()(ExamVersion, x => x.moduleVersion)
    examVersions: ExamVersion[];

    // videos
    @XOneToMany<ModuleVersion>()(VideoVersion, x => x.moduleVersion)
    videoVersions: VideoVersion[];
}