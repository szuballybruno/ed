import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { CoinTransaction } from './CoinTransaction';
import { GivenAnswer } from './GivenAnswer';
import { User } from './User';

@Entity()
export class GivenAnswerStreak {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<GivenAnswerStreak>;

    @Column()
    @XViewColumn()
    isFinalized: boolean;

    // TO ONE

    // user 
    @Column()
    @XViewColumn()
    userId: Id<User>;
    @ManyToOne(_ => User, x => x.activitySessions)
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;

    // TO MANY

    // given answers
    @JoinColumn()
    @OneToMany(_ => GivenAnswer, x => x.givenAnswerStreak)
    givenAnswers: Relation<GivenAnswer>[];

    // coin acquires 
    @JoinColumn()
    @OneToMany(_ => CoinTransaction, x => x.activitySession)
    coinAcquires: Relation<CoinTransaction>[];
}