import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Answer } from "./Answer";
import { AnswerSession } from "./AnswerSession";
import { Exam } from "./Exam";
import { Question } from "./Question";
import { User } from "./User";
import { Video } from "./Video";

@Entity()
export class QuestionAnswer {

    @PrimaryGeneratedColumn()
    id: number;

    // question
    @Column()
    questionId: number;

    @ManyToOne(type => Question, question => question.questionAnswers)
    @JoinColumn({ name: "questionId" })
    question: Question;

    // answer
    @Column()
    answerId: number;

    @ManyToOne(type => Answer, answer => answer.questionAnswers)
    @JoinColumn({ name: "answerId" })
    answer: Answer;

    // answer session
    @Column()
    answerSessionId: number;

    @ManyToOne(_ => AnswerSession, as => as.questionAnswers)
    @JoinColumn({ name: "answerSessionId" })
    answerSession: AnswerSession;
}