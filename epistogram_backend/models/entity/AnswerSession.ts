import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exam } from "./Exam";
import { GivenAnswer } from "./GivenAnswer";
import { User } from "./User";
import { Video } from "./Video";

@Entity()
export class AnswerSession {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    isPractiseAnswerSession: boolean;

    @Column({ default: false })
    isSignupAnswerSession: boolean;

    // given answers
    @OneToMany(_ => GivenAnswer, x => x.answerSession)
    @JoinColumn()
    givenAnswers: GivenAnswer[];

    // exam
    @Column({ nullable: true })
    examId: number | null;

    @ManyToOne(_ => Exam, e => e.answerSessions)
    @JoinColumn({ name: "exam_id" })
    exam: Exam | null;

    // video 
    @Column({ nullable: true })
    videoId: number | null;

    @ManyToOne(_ => Video, e => e.answerSessions)
    @JoinColumn({ name: "video_id" })
    video: Video | null;

    // user 
    @Column({ nullable: true })
    userId: number | null;

    @ManyToOne(_ => User, e => e.answerSessions)
    @JoinColumn({ name: "user_id" })
    user: User | null;
}