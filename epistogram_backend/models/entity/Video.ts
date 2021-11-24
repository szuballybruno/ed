import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AnswerSession } from "./AnswerSession";
import { CoinAcquire } from "./CoinAcquire";
import { Course } from "./Course";
import { CourseModule } from "./CourseModule";
import { Question } from "./Question";
import { StorageFile } from "./StorageFile";
import { User } from "./User";
import { UserCourseBridge } from "./UserCourseBridge";
import { VideoPlaybackData } from "./VideoPlaybackData";
import { VideoPlaybackSample } from "./VideoPlaybackSample";

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

    @Column({ type: "double precision" })
    lengthSeconds: number;

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
    @OneToMany(type => Question, q => q.video, { onDelete: "CASCADE", cascade: true })
    @JoinColumn()
    questions: Question[];

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

    // video playback samples 
    @OneToMany(_ => VideoPlaybackSample, x => x.video)
    @JoinColumn()
    videoPlaybackSamples: VideoPlaybackSample[];

    // video playback datas 
    @OneToMany(_ => VideoPlaybackData, x => x.video)
    @JoinColumn()
    videoPlaybackDatas: VideoPlaybackData[];

    // module
    @Column()
    moduleId: number;

    @ManyToOne(_ => CourseModule, x => x.videos)
    @JoinColumn({ name: "moduleId" })
    module: CourseModule;

    // coin acquires 
    @JoinColumn()
    @OneToMany(_ => CoinAcquire, x => x.sessionActivity)
    coinAcquires: CoinAcquire[];
}