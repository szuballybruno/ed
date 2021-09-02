import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./Answer";
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

    @Column()
    isSignupQuestion: boolean;

    // answers
    @OneToMany(type => Answer, answer => answer.question, { cascade: true })
    @JoinColumn()
    answers: Answer[];

    // question answers
    @OneToMany(() => QuestionAnswer, qa => qa.answer)
    @JoinColumn()
    questionAnswers: QuestionAnswer[]

    // video 
    @Column({ nullable: true })
    videoId: number;

    @ManyToOne(() => Video, v => v.questions)
    @JoinColumn({ name: "videoId" })
    video: Video;
}