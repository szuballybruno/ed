import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { XJoinColumn, XManyToOne, XOneToMany } from "../../../services/XORM/XORMDecorators";
import { AnswerVersion } from "../answer/AnswerVersion";
import { ExamVersion } from "../exam/ExamVersion";
import { GivenAnswer } from "../GivenAnswer";
import { VideoVersion } from "../video/VideoVersion";
import { Question } from "./Question";
import { QuestionData } from "./QuestionData";

@Entity()
export class QuestionVersion {

    @PrimaryGeneratedColumn()
    id: number;

    //
    // TO MANY
    //

    // answers
    @XOneToMany<QuestionVersion>()(() => AnswerVersion, x => x.questionVersion)
    answerVersions: AnswerVersion[];

    // given answers
    @XOneToMany<QuestionVersion>()(() => GivenAnswer, x => x.questionVersion)
    givenAnswers: GivenAnswer[];

    //
    // TO ONE 
    //

    // video 
    @Column({ nullable: true })
    videoVersionId: number | null;
    @XManyToOne<QuestionVersion>()(() => VideoVersion, x => x.questionVersions)
    @XJoinColumn<QuestionVersion>('videoVersionId')
    videoVersion: VideoVersion;

    // exam 
    @Column({ nullable: true })
    examVersionId: number | null;
    @XManyToOne<QuestionVersion>()(() => ExamVersion, x => x.questionVersions)
    @XJoinColumn<QuestionVersion>('examVersionId')
    examVersion: ExamVersion;

    // question 
    @Column()
    questionId: number;
    @XManyToOne<QuestionVersion>()(() => Question, x => x.questionVersions)
    @XJoinColumn<QuestionVersion>('questionId')
    question: Question;

    // question data 
    @Column()
    questionDataId: number;
    @XManyToOne<QuestionVersion>()(() => QuestionData, x => x.questionVersions)
    @XJoinColumn<QuestionVersion>('questionDataId')
    questionData: QuestionData;
}