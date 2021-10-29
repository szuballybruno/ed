import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PractiseQuestionView } from "../views/PractiseQuestionView";
import { Answer } from "./Answer";
import { Exam } from "./Exam";
import { QuestionAnswer } from "./QuestionAnswer";
import { QuestionCategory } from "./QuestionCategory";
import { QuestionType } from "./QuestionType";
import { Video } from "./Video";

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    questionText: string;

    @Column({ nullable: true })
    imageUrl: string;

    @Column({ nullable: true, type: "integer" })
    orderIndex: number | null;

    @Column({ nullable: true, type: "double precision" })
    showUpTimeSeconds: number;

    // practise question view
    @OneToOne(_ => PractiseQuestionView, x => x.question)
    practiseQuestionView: PractiseQuestionView;

    // category
    @Column({ nullable: true })
    categoryId: number;

    @ManyToOne(_ => QuestionCategory, x => x.questions)
    @JoinColumn({ name: "categoryId" })
    category: QuestionCategory | null;

    // type 
    @Column({ default: 1 })
    typeId: number;

    @ManyToOne(_ => QuestionType, x => x.questions)
    @JoinColumn({ name: "typeId" })
    type: QuestionType;

    // answers
    @OneToMany(type => Answer, answer => answer.question, { onDelete: "CASCADE", cascade: true })
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