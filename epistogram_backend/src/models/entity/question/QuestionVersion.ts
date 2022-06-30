import { Column, Entity, PrimaryGeneratedColumn, Relation } from "typeorm";
import { XJoinColumn, XManyToOne, XOneToMany, XViewColumn } from "../../../services/XORM/XORMDecorators";
import { AnswerVersion } from "../answer/AnswerVersion";
import { ExamVersion } from "../exam/ExamVersion";
import { GivenAnswer } from "../GivenAnswer";
import { PersonalityTraitCategory } from "../PersonalityTraitCategory";
import { VideoVersion } from "../video/VideoVersion";
import { Question } from "./Question";
import { QuestionData } from "./QuestionData";

@Entity()
export class QuestionVersion {

    @PrimaryGeneratedColumn()
    @XViewColumn()
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
    @XViewColumn()
    videoVersionId: number | null;
    @XManyToOne<QuestionVersion>()(() => VideoVersion, x => x.questionVersions)
    @XJoinColumn<QuestionVersion>('videoVersionId')
    videoVersion: Relation<VideoVersion>;

    // exam 
    @Column({ nullable: true })
    @XViewColumn()
    examVersionId: number | null;
    @XManyToOne<QuestionVersion>()(() => ExamVersion, x => x.questionVersions)
    @XJoinColumn<QuestionVersion>('examVersionId')
    examVersion: Relation<ExamVersion>;

    // question 
    @Column()
    @XViewColumn()
    questionId: number;
    @XManyToOne<QuestionVersion>()(() => Question, x => x.questionVersions)
    @XJoinColumn<QuestionVersion>('questionId')
    question: Relation<Question>;

    // question data 
    @Column()
    @XViewColumn()
    questionDataId: number;
    @XManyToOne<QuestionVersion>()(() => QuestionData, x => x.questionVersions)
    @XJoinColumn<QuestionVersion>('questionDataId')
    questionData: Relation<QuestionData>;

    // category
    @Column({ nullable: true })
    @XViewColumn()
    personalityTraitCategoryId: number | null;
    @XManyToOne<QuestionVersion>()(() => PersonalityTraitCategory, x => x.questionVersions)
    @XJoinColumn<QuestionVersion>('personalityTraitCategoryId')
    personalityTraitCategory: Relation<PersonalityTraitCategory> | null;
}