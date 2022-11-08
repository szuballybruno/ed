import { Column, Entity, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XJoinColumn, XManyToOne, XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';
import { AnswerVersion } from '../answer/AnswerVersion';
import { ExamVersion } from '../exam/ExamVersion';
import { GivenAnswer } from '../misc/GivenAnswer';
import { PersonalityTraitCategory } from '../misc/PersonalityTraitCategory';
import { VideoVersion } from '../video/VideoVersion';
import { Question } from './Question';
import { QuestionData } from './QuestionData';

@Entity()
export class QuestionVersion {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'QuestionVersion'>;

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
    videoVersionId: Id<'VideoVersion'> | null;
    @XManyToOne<QuestionVersion>()(() => VideoVersion, x => x.questionVersions)
    @XJoinColumn<QuestionVersion>('videoVersionId')
    videoVersion: Relation<VideoVersion>;

    // exam 
    @Column({ nullable: true })
    @XViewColumn()
    examVersionId: Id<'ExamVersion'> | null;
    @XManyToOne<QuestionVersion>()(() => ExamVersion, x => x.questionVersions)
    @XJoinColumn<QuestionVersion>('examVersionId')
    examVersion: Relation<ExamVersion>;

    // question 
    @Column()
    @XViewColumn()
    questionId: Id<'Question'>;
    @XManyToOne<QuestionVersion>()(() => Question, x => x.questionVersions)
    @XJoinColumn<QuestionVersion>('questionId')
    question: Relation<Question>;

    // question data 
    @Column()
    @XViewColumn()
    questionDataId: Id<'QuestionData'>;
    @XManyToOne<QuestionVersion>()(() => QuestionData, x => x.questionVersions)
    @XJoinColumn<QuestionVersion>('questionDataId')
    questionData: Relation<QuestionData>;

    // category
    @Column({ nullable: true })
    @XViewColumn()
    personalityTraitCategoryId: Id<'PersonalityTraitCategory'> | null;
    @XManyToOne<QuestionVersion>()(() => PersonalityTraitCategory, x => x.questionVersions)
    @XJoinColumn<QuestionVersion>('personalityTraitCategoryId')
    personalityTraitCategory: Relation<PersonalityTraitCategory> | null;
}