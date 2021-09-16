import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./Answer";
import { Exam } from "./Exam";
import { QuestionAnswer } from "./QuestionAnswer";
import { Video } from "./Video";

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    questionText: string;

    @Column({ nullable: true })
    imageUrl: string;

    @Column({ default: false })
    isSignupQuestion: boolean;

    @Column({ nullable: true })
    showUpTimeSeconds: number;

    // answers
    @OneToMany(type => Answer, answer => answer.question, { cascade: true })
    @JoinColumn()
    answers: Answer[];

    // question answers
    @OneToMany(() => QuestionAnswer, qa => qa.question)
    @JoinColumn()
    questionAnswers: QuestionAnswer[]

    // video 
    @Column({ nullable: true })
    videoId: number;

    @ManyToOne(() => Video, v => v.questions)
    @JoinColumn({ name: "videoId" })
    video: Video;

    // exam 
    @Column({ nullable: true })
    examId: number | null;

    @ManyToOne(_ => Exam, e => e.questions)
    @JoinColumn({ name: "examId" })
    exam: Exam | null;
}