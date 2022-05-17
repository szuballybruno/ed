import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { SessionActivityType } from '../../shared/types/sharedTypes';
import { ActivitySession } from './ActivitySession';

@Entity()
export class UserSessionActivity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    creationDate: Date;

    @Column({ type: 'text' })
    type: Relation<SessionActivityType>;

    // user
    @Column()
    activitySessionId: number;

    @ManyToOne(_ => ActivitySession, x => x.activities)
    @JoinColumn({ name: 'activity_session_id' })
    activitySession: Relation<ActivitySession>;
}