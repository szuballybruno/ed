import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserActivityFlatView } from "../views/UserActivityFlatView";
import { AnswerSession } from "./AnswerSession";
import { Course } from "./Course";
import { Exam } from "./Exam";
import { Organization } from "./Organization";
import { Role } from "./Role";
import { StorageFile } from "./StorageFile";
import { Task } from "./Task";
import { UserCourseBridge } from "./UserCourseBridge";
import { Video } from "./Video";
import { VideoPlaybackData } from "./VideoPlaybackData";
import { VideoPlaybackSample } from "./VideoPlaybackSample";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @DeleteDateColumn()
    deletionDate: Date;

    @Column()
    isPendingInvitation: boolean;

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

    @Column({ nullable: true, type: "text" })
    jobTitle: string | null;

    @Column({ default: false })
    isTeacher: boolean;

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
    @JoinColumn({ name: "roleId" })
    role: Role;

    // Avatar file
    @Column({ nullable: true })
    avatarFileId: number;

    @ManyToOne(() => StorageFile, sf => sf.users)
    @JoinColumn({ name: 'avatarFileId' })
    avatarFile: StorageFile | null

    // Organization 
    @Column({ nullable: true, type: "number" })
    organizationId: number | null;

    @ManyToOne(() => Organization, organization => organization.users)
    @JoinColumn({ name: 'organizationId' })
    organization: Organization

    // Current video
    @Column({ nullable: true })
    currentVideoId: number | null;

    @ManyToOne(() => Video, video => video.users)
    @JoinColumn({ name: 'currentVideoId' })
    currentVideo: Video | null

    // Current exam
    @Column({ nullable: true })
    currentExamId: number | null;

    @ManyToOne(() => Exam, exam => exam.users)
    @JoinColumn({ name: 'currentExamId' })
    currentExam: Exam | null;

    // course 
    @Column({ nullable: true })
    currentCourseId: number | null;

    @ManyToOne(_ => Course, x => x.users)
    @JoinColumn({ name: "currentCourseId" })
    currentCourse: Course;

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
}