import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XJoinColumn, XManyToOne, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { SessionActivityType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { ActivitySession } from './ActivitySession';
import { ExamVersion } from '../exam/ExamVersion';
import { VideoVersion } from '../video/VideoVersion';

@Entity()
export class UserSessionActivity {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'UserSessionActivity'>;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    @XViewColumn()
    creationDate: Date;

    @Column({ type: 'text' })
    @XViewColumn()
    type: Relation<SessionActivityType>;

    // TO ONE

    // video 
    @Column({ nullable: true, type: 'int' })
    @XViewColumn()
    videoVersionId: Id<'VideoVersion'> | null;
    @XManyToOne<UserSessionActivity>()(() => VideoVersion, x => x.userSessionActivities)
    @XJoinColumn<UserSessionActivity>('videoVersionId')
    videoVersion: Relation<VideoVersion>;

    // exam 
    @Column({ nullable: true, type: 'int' })
    @XViewColumn()
    examVersionId: Id<'ExamVersion'> | null;
    @XManyToOne<UserSessionActivity>()(() => ExamVersion, x => x.userSessionActivities)
    @XJoinColumn<UserSessionActivity>('examVersionId')
    examVersion: Relation<ExamVersion> | null;

    // user
    @Column({ type: 'int' })
    @XViewColumn()
    activitySessionId: Id<'ActivitySession'>;
    @ManyToOne(_ => ActivitySession, x => x.activities)
    @JoinColumn({ name: 'activity_session_id' })
    activitySession: Relation<ActivitySession>;
}