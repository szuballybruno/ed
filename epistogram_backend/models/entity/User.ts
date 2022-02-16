import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RegistrationType } from "../Types";
import { UserActivityFlatView } from "../views/UserActivityFlatView";
import { ActivitySession } from "./ActivitySession";
import { AnswerSession } from "./AnswerSession";
import { CoinTransaction } from "./CoinTransaction";
import { Course } from "./Course";
import { CourseRatingQuestionUserAnswer } from "./courseRating/CourseRatingQuestionUserAnswer";
import { DailyTipOccurrence } from "./DailyTipOccurrence";
import { DiscountCode } from "./DiscountCode";
import { Event } from "./Event";
import { JobTitle } from "./JobTitle";
import { Organization } from "./Organization";
import { PrequizUserAnswer } from "./PrequizUserAnswer";
import { Role } from "./Role";
import { StorageFile } from "./StorageFile";
import { Task } from "./Task";
import { TeacherInfo } from "./TeacherInfo";
import { UserCourseAccessBridge } from "./UserCourseAccessBridge";
import { UserCourseBridge } from "./UserCourseBridge";
import { VideoPlaybackData } from "./VideoPlaybackData";
import { VideoPlaybackSample } from "./VideoPlaybackSample";
import { VideoRating } from "./VideoRating";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @DeleteDateColumn()
    deletionDate: Date;

    @Column()
    isInvitationAccepted: boolean;

    @Column({ type: "text" })
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
    @Column({ nullable: true, type: "text" })
    refreshToken: string | null;

    @Column({ nullable: true, type: "text" })
    resetPasswordToken: string | null;

    @Column({ nullable: true, type: "text" })
    invitationToken: string | null;

    // user activity 
    @OneToOne(_ => UserActivityFlatView, x => x.user)
    @JoinColumn({ name: "id" })
    userActivity: UserActivityFlatView;

    // user role
    @Column()
    roleId: number;

    @ManyToOne(_ => Role, x => x.users)
    @JoinColumn({ name: "role_id" })
    role: Role;

    // Avatar file
    @Column({ nullable: true })
    avatarFileId: number;

    @ManyToOne(() => StorageFile, sf => sf.users)
    @JoinColumn({ name: "avatar_file_id" })
    avatarFile: StorageFile | null

    // Organization 
    @Column({ nullable: true, type: "number" })
    organizationId: number | null;

    @ManyToOne(() => Organization, organization => organization.users)
    @JoinColumn({ name: "organization_id" })
    organization: Organization;

    // job title 
    @Column({ nullable: true, type: "number" })
    jobTitleId: number | null;

    @ManyToOne(_ => JobTitle, x => x.users)
    @JoinColumn({ name: "job_title_id" })
    jobTitle: JobTitle | null;

    // teacher info
    @OneToOne(_ => TeacherInfo, x => x.user)
    teacherInfo: TeacherInfo;

    // Tasks
    @OneToMany(() => Task, task => task.user)
    @JoinColumn()
    tasks: Task[]

    // teacher
    @OneToMany(() => Course, course => course.teacher)
    @JoinColumn()
    teachedCourses: Course[]

    // answer sessions
    @OneToMany(_ => AnswerSession, as => as.user)
    @JoinColumn()
    answerSessions: AnswerSession[];

    // video playback samples 
    @OneToMany(_ => VideoPlaybackSample, x => x.user)
    @JoinColumn()
    videoPlaybackSamples: VideoPlaybackSample[];

    // video playback datas 
    @OneToMany(_ => VideoPlaybackData, x => x.user)
    @JoinColumn()
    videoPlaybackDatas: VideoPlaybackData[];

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
    @OneToMany(_ => UserCourseAccessBridge, x => x.user)
    courseAccessBridges: UserCourseAccessBridge[];

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
}