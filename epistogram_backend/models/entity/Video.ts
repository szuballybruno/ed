import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AnswerSession } from "./AnswerSession";
import { Course } from "./Course";
import { Question } from "./Question";
import { StorageFile } from "./StorageFile";
import { User } from "./User";

@Entity()
export class Video {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    subtitle: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    orderIndex: number;

    // video file
    @Column({ nullable: true })
    videoFileId: number;

    @ManyToOne(type => StorageFile, s => s.videos, { cascade: true })
    @JoinColumn({ name: "videoFileId" })
    videoFile: StorageFile;

    // thumbnail file
    @Column({ nullable: true })
    thumbnailFileId: number;

    @OneToOne(type => StorageFile, { cascade: true })
    @JoinColumn({ name: "thumbnailFileId" })
    thumbnailFile: StorageFile

    // questions
    @OneToMany(type => Question, q => q.video, { cascade: true })
    @JoinColumn()
    questions: Question[];

    // users 
    @OneToMany(type => User, user => user.currentVideo)
    @JoinColumn()
    users: User[];

    // course
    @Column()
    courseId: number;

    @ManyToOne(type => Course, course => course.videos)
    @JoinColumn({ name: "courseId" })
    course: Course

    // answer sessions
    @OneToMany(_ => AnswerSession, as => as.video)
    @JoinColumn()
    answerSessions: AnswerSession[];
}