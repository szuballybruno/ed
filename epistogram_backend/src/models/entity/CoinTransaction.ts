import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { ActivitySession } from './ActivitySession';
import { ActivityStreak } from './ActivityStreak';
import { GivenAnswer } from './GivenAnswer';
import { GivenAnswerStreak } from './GivenAnswerStreak';
import { ShopItem } from './ShopItem';
import { User } from './User';
import { Video } from './video/Video';

@Entity()
export class CoinTransaction {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    @XViewColumn()
    creationDate: Date;

    @Column()
    @XViewColumn()
    amount: number;

    @Column({ default: false })
    @XViewColumn()
    isGifted: boolean;

    // TO ONE

    //
    // user  
    //
    @Column()
    @XViewColumn()
    userId: number;
    @ManyToOne(_ => User, x => x.coinAcquires)
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;

    //
    // user session activity 
    //
    @Column({ nullable: true, type: 'int' })
    @XViewColumn()
    activitySessionId: number;
    @JoinColumn({ name: 'activity_session_id' })
    @ManyToOne(_ => ActivitySession, x => x.coinAcquires)
    activitySession: Relation<ActivitySession> | null;

    //
    // video 
    //
    @Column({ nullable: true, type: 'int' })
    @XViewColumn()
    videoId: number;
    @JoinColumn({ name: 'video_id' })
    @ManyToOne(_ => Video, x => x.coinAcquires)
    video: Relation<Video> | null;

    //
    // given answer  
    //
    @Column({ nullable: true, type: 'int' })
    @XViewColumn()
    givenAnswerId: number;
    @JoinColumn({ name: 'given_answer_id' })
    @ManyToOne(_ => GivenAnswer, x => x.coinAcquires)
    givenAnswer: Relation<GivenAnswer> | null;

    //
    // given answer streak 
    //
    @Column({ nullable: true, type: 'int' })
    @XViewColumn()
    givenAnswerStreakId: number;
    @JoinColumn({ name: 'given_answer_streak_id' })
    @ManyToOne(_ => GivenAnswerStreak, x => x.coinAcquires)
    givenAnswerStreak: Relation<GivenAnswerStreak> | null;

    // 
    // activity streak
    //
    @Column({ nullable: true, type: 'int' })
    @XViewColumn()
    activityStreakId: number;
    @JoinColumn({ name: 'activity_streak_id' })
    @ManyToOne(_ => ActivityStreak, x => x.coinAcquires)
    activityStreak: Relation<ActivityStreak> | null;

    // 
    // shop item 
    //
    @Column({ nullable: true, type: 'int' })
    @XViewColumn()
    shopItemId: number;
    @JoinColumn({ name: 'shop_item_id' })
    @ManyToOne(_ => ShopItem, x => x.coinAcquires)
    shopItem: Relation<ShopItem> | null;
}