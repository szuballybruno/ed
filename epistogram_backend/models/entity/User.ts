import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./Course";
import { Exam } from "./Exam";
import { Organization } from "./Organization";
import { QuestionAnswer } from "./QuestionAnswer";
import { StorageFile } from "./StorageFile";
import { Task } from "./Task";
import { Video } from "./Video";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    timeOfAdd: Date;

    @Column({ nullable: true })
    isActive: boolean;

    @Column()
    isInvitedOnly: boolean;

    @Column({ nullable: true })
    invitationToken: string;

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

    @Column()
    role: string;

    @Column()
    jobTitle: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    refreshToken: string;

    // Avatar file
    @Column({ nullable: true })
    avatarFileId: number;

    @ManyToOne(() => StorageFile, sf => sf.users)
    @JoinColumn({ name: 'avatarFileId' })
    avatarFile: StorageFile

    // Organization 
    @Column()
    organizationId: number;

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
    currentExam: Exam | null

    // Tasks
    @OneToMany(() => Task, task => task.user)
    @JoinColumn()
    tasks: Task[]

    // question answers
    @OneToMany(() => QuestionAnswer, qa => qa.answer)
    @JoinColumn()
    questionAnswers: QuestionAnswer[]
}