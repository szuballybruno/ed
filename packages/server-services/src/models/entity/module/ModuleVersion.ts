import { Column, Entity, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XJoinColumn, XManyToOne, XOneToMany, XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';
import { CourseVersion } from '../course/CourseVersion';
import { ExamVersion } from '../exam/ExamVersion';
import { VideoVersion } from '../video/VideoVersion';
import { Module } from './Module';
import { ModuleData } from './ModuleData';

@Entity()
export class ModuleVersion {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'ModuleVersion'>;

    // 
    // TO ONE
    // 

    // course 
    @Column({ nullable: true })
    @XViewColumn()
    courseVersionId: Id<'CourseVersion'> | null;
    @XManyToOne<ModuleVersion>()(() => CourseVersion, x => x.moduleVersions)
    @XJoinColumn<ModuleVersion>('courseVersionId')
    courseVersion: Relation<CourseVersion>;

    // module
    @Column()
    @XViewColumn()
    moduleId: Id<'Module'>;
    @XManyToOne<ModuleVersion>()(() => Module, x => x.moduleVersions)
    @XJoinColumn<ModuleVersion>('moduleId')
    module: Module;

    // module data
    @Column()
    @XViewColumn()
    moduleDataId: Id<'ModuleData'>;
    @XManyToOne<ModuleVersion>()(() => ModuleData, x => x.moduleVersions)
    @XJoinColumn<ModuleVersion>('moduleDataId')
    moduleData: ModuleData;

    //
    // TO MANY
    //

    // exams
    @XOneToMany<ModuleVersion>()(() => ExamVersion, x => x.moduleVersion)
    examVersions: ExamVersion[];

    // videos
    @XOneToMany<ModuleVersion>()(() => VideoVersion, x => x.moduleVersion)
    videoVersions: VideoVersion[];
}