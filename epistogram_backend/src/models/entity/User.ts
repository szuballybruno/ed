import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { IsDeletedFlag, XOneToMany } from '../../services/XORM/XORMDecorators';
import { getJoinColumnInverseSide } from '../../utilities/helpers';
import { RegistrationType } from '../Types';
import { ActivitySession } from './ActivitySession';
import { AnswerSession } from './AnswerSession';
import { CompanyOwnerBridge } from './authorization/CompanyOwnerBridge';
import { Role } from './authorization/Role';
import { RoleAssignmentBridge } from './authorization/RoleAssignmentBridge';
import { CoinTransaction } from './CoinTransaction';
import { Comment } from './Comment';
import { Company } from './Company';
import { CourseData } from './course/CourseData';
import { CourseAccessBridge } from './CourseAccessBridge';
import { CourseRatingQuestionUserAnswer } from './courseRating/CourseRatingQuestionUserAnswer';
import { DailyTipOccurrence } from './DailyTipOccurrence';
import { DiscountCode } from './DiscountCode';
import { Event } from './Event';
import { JobTitle } from './JobTitle';
import { PrequizUserAnswer } from './prequiz/PrequizUserAnswer';
import { StorageFile } from './StorageFile';
import { Task } from './Task';
import { TeacherInfo } from './TeacherInfo';
import { Like } from './Like';
import { UserCourseBridge } from './UserCourseBridge';
import { UserExamProgressBridge } from './UserExamProgressBridge';
import { UserVideoProgressBridge } from './UserVideoProgressBridge';
import { VideoPlaybackSample } from './playback/VideoPlaybackSample';
import { VideoRating } from './VideoRating';
import { VideoPlaybackSession } from './playback/VideoPlaybackSession';
import { VideoSeekEvent } from './playback/VideoSeekEvent';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date | null;

    @Column({ default: false })
    isGod: boolean;

    @Column()
    isInvitationAccepted: boolean;

    @Column({ type: 'text' })
    registrationType: RegistrationType;

    // a trusted user has been invited to use the application,
    // users can join without invitation but they will be considered untrusted, 
    // thus cannot access the application, except the unprotected parts
    @Column()
    isTrusted: boolean;

    @Column()
    email: string;

    @Column({ nullable: true })
    username: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: 'text', nullable: true })
    phoneNumber: string | null;

    @Column({ type: 'text', nullable: true })
    userDescription: string | null;

    @Column({ type: 'text', nullable: true })
    linkedInUrl: string | null;

    @Column({ type: 'text', nullable: true })
    password: string;

    // tokens 
    @Column({ type: 'text', nullable: true })
    refreshToken: string | null;

    @Column({ type: 'text', nullable: true })
    resetPasswordToken: string | null;

    @Column({ type: 'text', nullable: true })
    invitationToken: string | null;

    // Avatar file
    @Column({ type: 'int', nullable: true })
    avatarFileId: number | null;

    @ManyToOne(() => StorageFile, sf => sf.users)
    @JoinColumn({ name: 'avatar_file_id' })
    avatarFile: Relation<StorageFile> | null;

    // company 
    @Column()
    companyId: number;

    @ManyToOne(() => Company, x => x.users)
    @JoinColumn({ name: 'company_id' })
    company: Relation<Company>;

    // job title 
    @Column({ nullable: true, type: 'number' })
    jobTitleId: number | null;

    @ManyToOne(_ => JobTitle, x => x.users)
    @JoinColumn({ name: 'job_title_id' })
    jobTitle: Relation<JobTitle> | null;

    // teacher info
    @OneToOne(_ => TeacherInfo, x => x.user)
    teacherInfo: Relation<TeacherInfo>;

    // Tasks
    @OneToMany(() => Task, task => task.user)
    @JoinColumn()
    tasks: Relation<Task>[];

    // teacher
    @OneToMany(() => CourseData, course => course.teacher)
    @JoinColumn()
    teachedCourses: Relation<CourseData>[];

    // comment
    @OneToMany(() => Comment, comment => comment.user)
    @JoinColumn()
    comments: Relation<Comment>[];

    // answer sessions
    @OneToMany(_ => AnswerSession, as => as.user)
    @JoinColumn()
    answerSessions: Relation<AnswerSession>[];

    // video playback samples 
    @OneToMany(_ => VideoPlaybackSample, x => x.user)
    @JoinColumn()
    videoPlaybackSamples: Relation<VideoPlaybackSample>[];

    // video seek events 
    @XOneToMany<User>()(() => VideoSeekEvent, x => x.user)
    @JoinColumn()
    videoSeekEvents: Relation<VideoSeekEvent>[];

    // user course bridges 
    @OneToMany(_ => UserCourseBridge, x => x.user)
    @JoinColumn()
    userCourseBridges: Relation<UserCourseBridge>[];

    // likes
    @OneToMany(_ => Like, x => x.comment)
    @JoinColumn()
    likes: Relation<Like>[];

    // coin acquires 
    @JoinColumn()
    @OneToMany(_ => CoinTransaction, x => x.activitySession)
    coinAcquires: Relation<CoinTransaction>[];

    // sessions
    @JoinColumn()
    @OneToMany(_ => ActivitySession, x => x.user)
    activitySessions: Relation<ActivitySession>[];

    // events 
    @JoinColumn()
    @OneToMany(_ => Event, x => x.user)
    events: Relation<Event>[];

    // courseAccessBridges
    @JoinColumn()
    @OneToMany(_ => CourseAccessBridge, x => x.user)
    courseAccessBridges: Relation<CourseAccessBridge>[];

    // discountCodes
    @JoinColumn()
    @OneToMany(_ => DiscountCode, x => x.user)
    discountCodes: Relation<DiscountCode>[];

    // ratings
    @JoinColumn()
    @OneToMany(_ => VideoRating, x => x.user)
    videoRatings: Relation<VideoRating>[];

    // dailyTipOccurrences
    @JoinColumn()
    @OneToMany(_ => DailyTipOccurrence, x => x.user)
    dailyTipOccurrences: Relation<DailyTipOccurrence>[];

    // answers 
    @OneToMany(_ => PrequizUserAnswer, x => x.question)
    @JoinColumn()
    prequizAnswers: Relation<PrequizUserAnswer>[];

    // courseRatingAnswers
    @OneToMany(_ => CourseRatingQuestionUserAnswer, x => x.user)
    @JoinColumn()
    courseRatingAnswers: Relation<CourseRatingQuestionUserAnswer>[];

    // videoProgressBridges
    @JoinColumn()
    @OneToMany(_ => UserVideoProgressBridge, x => x.user)
    videoProgressBridges: Relation<UserVideoProgressBridge>[];

    // videoProgressBridges
    @JoinColumn()
    @OneToMany(_ => UserExamProgressBridge, x => x.user)
    examProgressBridges: Relation<UserExamProgressBridge>[];

    // role assingments
    @JoinColumn()
    @OneToMany(_ => RoleAssignmentBridge, x => x.assigneeUser)
    roleAssignmentBridges: Relation<RoleAssignmentBridge>[];

    // companyOwnerBridges
    @JoinColumn()
    @OneToMany(_ => CompanyOwnerBridge, x => x.user)
    companyOwnerBridges: Relation<CompanyOwnerBridge>[];

    // video playback samples 
    @OneToMany(_ => VideoPlaybackSession, x => x.user)
    @JoinColumn()
    videoPlaybackSessions: Relation<VideoPlaybackSession>[];
}