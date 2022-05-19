import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { IsDeletedFlag } from '../../services/ORMConnectionService/ORMConnectionDecorators';
import { Course } from './Course';
import { Exam } from './Exam';
import { StorageFile } from './StorageFile';
import { Video } from './Video';

@Entity()
export class CourseModule {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date | null;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    orderIndex: number;

    // course 
    @Column({ nullable: true })
    courseId: number | null;

    @ManyToOne(_ => Course, x => x.modules)
    @JoinColumn({ name: 'course_id' })
    course: Relation<Course>;

    // exams
    @OneToMany(_ => Exam, x => x.module)
    @JoinColumn()
    exams: Exam[];

    // videos
    @OneToMany(_ => Video, x => x.module)
    @JoinColumn()
    videos: Video[];

    // image file 
    @Column({ nullable: true, type: 'integer' })
    imageFileId: number | null;

    @OneToOne(_ => StorageFile, x => x.courseModule)
    @JoinColumn({ name: 'image_file_id' })
    imageFile: StorageFile | null;
}