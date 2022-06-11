import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne } from '../../services/XORM/XORMDecorators';
import { SessionActivityType } from '../../shared/types/sharedTypes';
import { ActivitySession } from './ActivitySession';
import { Exam } from './exam/Exam';
import { ExamData } from './exam/ExamData';
import { VideoData } from './video/VideoData';

@Entity()
export class UserSessionActivity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    creationDate: Date;

    @Column({ type: 'text' })
    type: Relation<SessionActivityType>;

    // video 
    @Column({ nullable: true })
    videoId: number;

    @ManyToOne(() => VideoData, v => v.questions)
    @JoinColumn({ name: 'video_id' })
    video: Relation<VideoData>;

    // exam 
    @Column({ nullable: true })
    examId: number | null;
    @XManyToOne<UserSessionActivity>()(Exam, e => e.userSessionActivities)
    @XJoinColumn<UserSessionActivity>('examId')
    exam: Relation<Exam> | null;

    // user
    @Column()
    activitySessionId: number;

    @ManyToOne(_ => ActivitySession, x => x.activities)
    @JoinColumn({ name: 'activity_session_id' })
    activitySession: Relation<ActivitySession>;
}