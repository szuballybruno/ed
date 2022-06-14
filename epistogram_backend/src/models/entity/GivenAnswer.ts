import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { IsDeletedFlag, XJoinColumn, XManyToOne } from '../../services/XORM/XORMDecorators';
import { AnswerGivenAnswerBridge } from './AnswerGivenAnswerBridge';
import { AnswerSession } from './AnswerSession';
import { CoinTransaction } from './CoinTransaction';
import { GivenAnswerStreak } from './GivenAnswerStreak';
import { QuestionVersion } from './question/QuestionVersion';

@Entity()
export class GivenAnswer {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date;
    
    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    creationDate: Date;

    @Column()
    isCorrect: boolean;

    @Column({ type: 'double precision' })
    elapsedSeconds: number;

    @Column({ default: false })
    isPractiseAnswer: boolean;

    //
    // TO ONE
    //

    // question version
    @Column()
    questionVersionId: number;
    @XManyToOne<GivenAnswer>()(() => QuestionVersion, x => x.givenAnswers)
    @XJoinColumn<GivenAnswer>('questionVersionId')
    questionVersion: Relation<QuestionVersion>;

    // answer session
    @Column()
    answerSessionId: number;
    @ManyToOne(_ => AnswerSession, x => x.givenAnswers)
    @JoinColumn({ name: 'answer_session_id' })
    answerSession: Relation<AnswerSession>;

    // givenAnswerStreakBridges
    @Column({ nullable: true, type: 'integer' })
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