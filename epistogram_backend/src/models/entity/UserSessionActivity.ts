import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne, XViewColumn } from '../../services/XORM/XORMDecorators';
import { SessionActivityType } from '../../shared/types/sharedTypes';
import { ActivitySession } from './ActivitySession';
import { ExamVersion } from './exam/ExamVersion';
import { VideoVersion } from './video/VideoVersion';

@Entity()
export class UserSessionActivity {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    @XViewColumn()
    creationDate: Date;

    @Column({ type: 'text' })
    @XViewColumn()
    type: Relation<SessionActivityType>;

    // TO ONE

    // video 
    @Column({ nullable: true })
    @XViewColumn()
    videoVersionId: number;
    @XManyToOne<UserSessionActivity>()(() => VideoVersion, x => x.userSessionActivities)
    @XJoinColumn<UserSessionActivity>('videoVersionId')
    videoVersion: Relation<VideoVersion>;

    // exam 
    @Column({ nullable: true })
    @XViewColumn()
    examVersionId: number | null;
    @XManyToOne<UserSessionActivity>()(() => ExamVersion, x => x.userSessionActivities)
    @XJoinColumn<UserSessionActivity>('examVersionId')
    examVersion: Relation<ExamVersion> | null;

    // user
    @Column()
    @XViewColumn()
    activitySessionId: number;
    @ManyToOne(_ => ActivitySession, x => x.activities)
    @JoinColumn({ name: 'activity_session_id' })
    activitySession: Relation<ActivitySession>;
}