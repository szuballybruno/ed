import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { IsDeletedFlag, XJoinColumn, XManyToOne, XViewColumn } from '../../services/XORM/XORMDecorators';
import { AnswerGivenAnswerBridge } from './AnswerGivenAnswerBridge';
import { AnswerSession } from './AnswerSession';
import { CoinTransaction } from './CoinTransaction';
import { GivenAnswerStreak } from './GivenAnswerStreak';
import { QuestionVersion } from './question/QuestionVersion';

@Entity()
export class GivenAnswer {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    @XViewColumn()
    deletionDate: Date;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    @XViewColumn()
    creationDate: Date;

    @Column()
    @XViewColumn()
    isCorrect: boolean;

    @Column({ type: 'double precision' })
    @XViewColumn()
    elapsedSeconds: number;

    @Column({ default: false })
    @XViewColumn()
    isPractiseAnswer: boolean;

    //
    // TO ONE
    //

    // question version
    @Column()
    @XViewColumn()
    questionVersionId: number;
    @XManyToOne<GivenAnswer>()(() => QuestionVersion, x => x.givenAnswers)
    @XJoinColumn<GivenAnswer>('questionVersionId')
    questionVersion: Relation<QuestionVersion>;

    // answer session
    @Column()
    @XViewColumn()
    answerSessionId: number;
    @ManyToOne(_ => AnswerSession, x => x.givenAnswers)
    @JoinColumn({ name: 'answer_session_id' })
    answerSession: Relation<AnswerSession>;

    // givenAnswerStreakBridges
    @Column({ nullable: true, type: 'int' })
    @XViewColumn()
    givenAnswerStreakId: number | null;
    @JoinColumn({ name: 'given_answer_streak_id' })
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