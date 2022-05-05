import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsDeletedFlag } from '../../services/ORMConnectionService/ORMConnectionDecorators';
import { AnswerSession } from './AnswerSession';
import { CoinTransaction } from './CoinTransaction';
import { Course } from './Course';
import { CourseModule } from './CourseModule';
import { Question } from './Question';
import { StorageFile } from './StorageFile';
import { UserSessionActivity } from './UserSessionActivity';
import { UserVideoProgressBridge } from './UserVideoProgressBridge';
import { VideoPlaybackSample } from './VideoPlaybackSample';
import { VideoRating } from './VideoRating';

@Entity()
export class Video {

    @PrimaryGeneratedColumn()
    id: number;
    
    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date;

    @Column()
    title: string;

    @Column({ nullable: true })
    subtitle: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    orderIndex: number;

    @Column({ type: 'double precision' })
    lengthSeconds: number;

    // video file
    @Column({ nullable: true })
    videoFileId: number;

    @ManyToOne(type => StorageFile, s => s.videos, { cascade: true })
    @JoinColumn({ name: 'video_file_id' })
    videoFile: StorageFile;

    // thumbnail file
    @Column({ nullable: true })
    thumbnailFileId: number;

    @OneToOne(type => StorageFile, { cascade: true })
    @JoinColumn({ name: 'thumbnail_file_id' })
    thumbnailFile: StorageFile;

    // questions
    @OneToMany(type => Question, q => q.video, { onDelete: 'CASCADE', cascade: true })
    @JoinColumn()
    questions: Question[];

    // course
    @Column()
    courseId: number;

    @ManyToOne(type => Course, course => course.videos)
    @JoinColumn({ name: 'course_id' })
    course: Course;

    // user session activity
    @OneToMany(_ => UserSessionActivity, as => as.video)
    @JoinColumn()
    userSessionActivities: UserSessionActivity[];

    // answer sessions
    @OneToMany(_ => AnswerSession, as => as.video)
    @JoinColumn()
    answerSessions: AnswerSession[];

    // video playback samples 
    @OneToMany(_ => VideoPlaybackSample, x => x.video)
    @JoinColumn()
    videoPlaybackSamples: VideoPlaybackSample[];

    // module
    @Column()
    moduleId: number;

    @ManyToOne(_ => CourseModule, x => x.videos)
    @JoinColumn({ name: 'module_id' })
    module: CourseModule;

    // coin acquires 
    @JoinColumn()
    @OneToMany(_ => CoinTransaction, x => x.activitySession)
    coinAcquires: CoinTransaction[];

    // ratings
    @JoinColumn()
    @OneToMany(_ => VideoRating, x => x.video)
    videoRatings: VideoRating[];

    // userProgressBridges
    @JoinColumn()
    @OneToMany(_ => UserVideoProgressBridge, x => x.video)
    userProgressBridges: UserVideoProgressBridge[];
}