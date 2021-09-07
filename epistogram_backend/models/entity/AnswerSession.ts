import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exam } from "./Exam";
import { QuestionAnswer } from "./QuestionAnswer";
import { User } from "./User";
import { Video } from "./Video";

@Entity()
export class AnswerSession {

    @PrimaryGeneratedColumn()
    id: number;

    // quesiton answers
    @OneToMany(_ => QuestionAnswer, qa => qa.answerSession)
    @JoinColumn()
    questionAnswers: QuestionAnswer[];

    // exam
    @Column({ nullable: true })
    examId: number | null;

    @ManyToOne(_ => Exam, e => e.answerSessions)
    @JoinColumn({ name: "examId" })
    exam: Exam | null;

    // video 
    @Column({ nullable: true })
    videoId: number | null;

    @ManyToOne(_ => Video, e => e.answerSessions)
    @JoinColumn({ name: "videoId" })
    video: Video | null;

    // user 
    @Column({ nullable: true })
    userId: number | null;

    @ManyToOne(_ => User, e => e.answerSessions)
    @JoinColumn({ name: "userId" })
    user: User | null;
}