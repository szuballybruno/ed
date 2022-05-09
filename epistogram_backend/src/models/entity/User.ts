import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsDeletedFlag } from '../../services/ORMConnectionService/ORMConnectionDecorators';
import { RegistrationType } from '../Types';
import { ActivitySession } from './ActivitySession';
import { AnswerSession } from './AnswerSession';
import { CoinTransaction } from './CoinTransaction';
import { Course } from './Course';
import { CourseRatingQuestionUserAnswer } from './courseRating/CourseRatingQuestionUserAnswer';
import { DailyTipOccurrence } from './DailyTipOccurrence';
import { DiscountCode } from './DiscountCode';
import { Event } from './Event';
import { JobTitle } from './JobTitle';
import { Company } from './Company';
import { PrequizUserAnswer } from './prequiz/PrequizUserAnswer';
import { Role } from './authorization/Role';
import { StorageFile } from './StorageFile';
import { Task } from './Task';
import { TeacherInfo } from './TeacherInfo';
import { CourseAccessBridge } from './CourseAccessBridge';
import { UserCourseBridge } from './UserCourseBridge';
import { UserExamProgressBridge } from './UserExamProgressBridge';
import { UserVideoProgressBridge } from './UserVideoProgressBridge';
import { VideoPlaybackSample } from './VideoPlaybackSample';
import { VideoRating } from './VideoRating';
import { RoleAssignmentBridge } from './authorization/RoleAssignmentBridge';
import { CompanyOwnerBridge } from './authorization/CompanyOwnerBridge';
import { getJoinColumnInverseSide } from '../../utilities/helpers';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date;

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

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    userDescription: string;

    @Column({ nullable: true })
    linkedInUrl: string;

    @Column({ nullable: true })
    password: string;

    // tokens 
    @Column({ nullable: true, type: 'text' })
    refreshToken: string | null;

    @Column({ nullable: true, type: 'text' })
    resetPasswordToken: string | null;

    @Column({ nullable: true, type: 'text' })
    invitationToken: string | null;

    // Avatar file
    @Column({ nullable: true })
    avatarFileId: number;

    @ManyToOne(() => StorageFile, sf => sf.users)
    @JoinColumn({ name: 'avatar_file_id' })
    avatarFile: StorageFile | null;

    // company 
    @Column()
    companyId: number;

    @ManyToOne(() => Company, x => x.users)
    @JoinColumn({ name: 'company_id' })
    company: Company;

    // job title 
    @Column({ nullable: true, type: 'number' })
    jobTitleId: number | null;

    @ManyToOne(_ => JobTitle, x => x.users)
    @JoinColumn({ name: 'job_title_id' })
    jobTitle: JobTitle | null;

    // teacher info
    @OneToOne(_ => TeacherInfo, x => x.user)
    teacherInfo: TeacherInfo;

    // Tasks
    @OneToMany(() => Task, task => task.user)
    @JoinColumn()
    tasks: Task[];

    // teacher
    @OneToMany(() => Course, course => course.teacher)
    @JoinColumn()
    teachedCourses: Course[];

    // answer sessions
    @OneToMany(_ => AnswerSession, as => as.user)
    @JoinColumn()
    answerSessions: AnswerSession[];

    // video playback samples 
    @OneToMany(_ => VideoPlaybackSample, x => x.user)
    @JoinColumn()
    videoPlaybackSamples: VideoPlaybackSample[];

    // user course bridges 
    @OneToMany(_ => UserCourseBridge, x => x.user)
    @JoinColumn()
    userCourseBridges: UserCourseBridge[];

    // coin acquires 
    @JoinColumn()
    @OneToMany(_ => CoinTransaction, x => x.activitySession)
    coinAcquires: CoinTransaction[];

    // sessions
    @JoinColumn()
    @OneToMany(_ => ActivitySession, x => x.user)
    activitySessions: ActivitySession[];

    // events 
    @JoinColumn()
    @OneToMany(_ => Event, x => x.user)
    events: Event[];

    // courseAccessBridges
    @JoinColumn()
    @OneToMany(_ => CourseAccessBridge, x => x.user)
    courseAccessBridges: CourseAccessBridge[];

    // discountCodes
    @JoinColumn()
    @OneToMany(_ => DiscountCode, x => x.user)
    discountCodes: DiscountCode[];

    // ratings
    @JoinColumn()
    @OneToMany(_ => VideoRating, x => x.user)
    videoRatings: VideoRating[];

    // dailyTipOccurrences
    @JoinColumn()
    @OneToMany(_ => DailyTipOccurrence, x => x.user)
    dailyTipOccurrences: DailyTipOccurrence[];

    // answers 
    @OneToMany(_ => PrequizUserAnswer, x => x.question)
    @JoinColumn()
    prequizAnswers: PrequizUserAnswer[];

    // courseRatingAnswers
    @OneToMany(_ => CourseRatingQuestionUserAnswer, x => x.user)
    @JoinColumn()
    courseRatingAnswers: CourseRatingQuestionUserAnswer[];

    // videoProgressBridges
    @JoinColumn()
    @OneToMany(_ => UserVideoProgressBridge, x => x.user)
    videoProgressBridges: UserVideoProgressBridge[];

    // videoProgressBridges
    @JoinColumn()
    @OneToMany(_ => UserExamProgressBridge, x => x.user)
    examProgressBridges: UserExamProgressBridge[];

    // role assingments
    @JoinColumn()
    @OneToMany(_ => RoleAssignmentBridge, x => x.user)
    roleAssignmentBridges: RoleAssignmentBridge[];

    // companyOwnerBridges
    @JoinColumn()
    @OneToMany(_ => CompanyOwnerBridge, getJoinColumnInverseSide<User>()(x => x.user))
    companyOwnerBridges: CompanyOwnerBridge[];
}