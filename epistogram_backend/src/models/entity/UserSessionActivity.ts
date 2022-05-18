import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { SessionActivityType } from '../../shared/types/sharedTypes';
import { ActivitySession } from './ActivitySession';
import { Exam } from './Exam';
import { Video } from './Video';

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

    @ManyToOne(() => Video, v => v.questions)
    @JoinColumn({ name: 'video_id' })
    video: Relation<Video>;

    // exam 
    @Column({ nullable: true })
    examId: number | null;

    @ManyToOne(_ => Exam, e => e.questions)
    @JoinColumn({ name: 'exam_id' })
    exam: Relation<Exam> | null;

    // user
    @Column()
    activitySessionId: number;

    @ManyToOne(_ => ActivitySession, x => x.activities)
    @JoinColumn({ name: 'activity_session_id' })
    activitySession: Relation<ActivitySession>;
}