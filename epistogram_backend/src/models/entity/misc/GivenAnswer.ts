import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation
} from '../../MyORM';
import {IsDeletedFlag, XJoinColumn, XManyToOne, XViewColumn} from '../../../services/XORM/XORMDecorators';
import {Id} from '../../../shared/types/versionId';
import {AnswerGivenAnswerBridge} from './AnswerGivenAnswerBridge';
import {AnswerSession} from './AnswerSession';
import {GivenAnswerStreak} from './GivenAnswerStreak';
import {QuestionVersion} from '../question/QuestionVersion';
import {CoinTransaction} from './CoinTransaction';

@Entity()
export class GivenAnswer {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'GivenAnswer'>;

    @IsDeletedFlag()
    @DeleteDateColumn()
    @XViewColumn()
    deletionDate: Date | null;

    @CreateDateColumn({default: () => 'now()', type: 'timestamptz'})
    @XViewColumn()
    creationDate: Date;

    @Column({type: 'double precision'})
    @XViewColumn()
    elapsedSeconds: number;

    @Column({default: false})
    @XViewColumn()
    isPractiseAnswer: boolean;

    @Column()
    @XViewColumn()
    isCorrect: boolean;

    @Column()
    @XViewColumn()
    score: number;

    @Column()
    @XViewColumn()
    maxScore: number;

    //
    // TO ONE
    //

    // question version
    @Column()
    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;
    @XManyToOne<GivenAnswer>()(() => QuestionVersion, x => x.givenAnswers)
    @XJoinColumn<GivenAnswer>('questionVersionId')
    questionVersion: Relation<QuestionVersion>;

    // answer session
    @Column()
    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;
    @ManyToOne(_ => AnswerSession, x => x.givenAnswers)
    @JoinColumn({name: 'answer_session_id'})
    answerSession: Relation<AnswerSession>;

    // givenAnswerStreakBridges
    @Column({nullable: true, type: 'int'})
    @XViewColumn()
    givenAnswerStreakId: Id<'GivenAnswerStreak'> | null;
    @JoinColumn({name: 'given_answer_streak_id'})
    @ManyToOne(_ => GivenAnswerStreak, x => x.givenAnswers)
    givenAnswerStreak: GivenAnswerStreak;

    //
    // TO MANY
    //

    // answer bridges
    @OneToMany(_ => AnswerGivenAnswerBridge, x => x.givenAnswer)
    @JoinColumn()
    answerBridges: AnswerGivenAnswerBridge[];

    // coin acquires
    @JoinColumn()
    @OneToMany(_ => CoinTransaction, x => x.givenAnswer)
    coinAcquires: CoinTransaction[];
}
