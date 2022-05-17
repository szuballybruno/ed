import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { ActivitySession } from './ActivitySession';
import { ActivityStreak } from './ActivityStreak';
import { GivenAnswer } from './GivenAnswer';
import { GivenAnswerStreak } from './GivenAnswerStreak';
import { ShopItem } from './ShopItem';
import { User } from './User';
import { Video } from './Video';

@Entity()
export class CoinTransaction {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    creationDate: Date;

    @Column()
    amount: number;

    @Column({ default: false })
    isGifted: boolean;

    //
    // user  
    //
    @Column()
    userId: number;

    @ManyToOne(_ => User, x => x.coinAcquires)
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;

    //
    // user session activity 
    //
    @Column({ nullable: true, type: 'integer' })
    activitySessionId: number;

    @JoinColumn({ name: 'activity_session_id' })
    @ManyToOne(_ => ActivitySession, x => x.coinAcquires)
    activitySession: Relation<ActivitySession> | null;

    //
    // video 
    //
    @Column({ nullable: true, type: 'integer' })
    videoId: number;

    @JoinColumn({ name: 'video_id' })
    @ManyToOne(_ => Video, x => x.coinAcquires)
    video: Relation<Video> | null;

    //
    // given answer  
    //
    @Column({ nullable: true, type: 'integer' })
    givenAnswerId: number;

    @JoinColumn({ name: 'given_answer_id' })
    @ManyToOne(_ => GivenAnswer, x => x.coinAcquires)
    givenAnswer: Relation<GivenAnswer> | null;

    //
    // given answer streak 
    //
    @Column({ nullable: true, type: 'integer' })
    givenAnswerStreakId: number;

    @JoinColumn({ name: 'given_answer_streak_id' })
    @ManyToOne(_ => GivenAnswerStreak, x => x.coinAcquires)
    givenAnswerStreak: Relation<GivenAnswerStreak> | null;

    // 
    // activity streak
    //
    @Column({ nullable: true, type: 'integer' })
    activityStreakId: number;

    @JoinColumn({ name: 'activity_streak_id' })
    @ManyToOne(_ => ActivityStreak, x => x.coinAcquires)
    activityStreak: Relation<ActivityStreak> | null;

    // 
    // shop item 
    //
    @Column({ nullable: true, type: 'integer' })
    shopItemId: number;

    @JoinColumn({ name: 'shop_item_id' })
    @ManyToOne(_ => ShopItem, x => x.coinAcquires)
    shopItem: Relation<ShopItem> | null;
}