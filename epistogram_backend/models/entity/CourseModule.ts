import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./Course";
import { DailyTipOccurrence } from "./DailyTipOccurrence";
import { Exam } from "./Exam";
import { StorageFile } from "./StorageFile";
import { Video } from "./Video";

@Entity()
export class CourseModule {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    orderIndex: number;

    // course 
    @Column({ nullable: true })
    courseId: number;

    @ManyToOne(_ => Course, x => x.modules)
    @JoinColumn({ name: "courseId" })
    course: Course;

    // exams
    @OneToMany(_ => Exam, x => x.module)
    @JoinColumn()
    exams: Exam[];

    // videos
    @OneToMany(_ => Video, x => x.module)
    @JoinColumn()
    videos: Video[];
}