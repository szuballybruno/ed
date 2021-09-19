import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./Answer";
import { AnswerSession } from "./AnswerSession";
import { Question } from "./Question";

@Entity()
export class QuestionAnswer {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    creationDate: Date;

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