import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { XJoinColumn, XManyToOne } from '../../services/XORM/XORMDecorators';
import { AnswerSessionType } from '../../shared/types/sharedTypes';
import { ExamData } from './exam/ExamData';
import { ExamVersion } from './exam/ExamVersion';
import { GivenAnswer } from './GivenAnswer';
import { User } from './User';
import { VideoData } from './video/VideoData';
import { VideoVersion } from './video/VideoVersion';

@Entity()
export class AnswerSession {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: 'timestamptz' })
    startDate: Date | null;

    @Column({ nullable: true, type: 'timestamptz' })
    endDate: Date | null;

    @Column({ default: 'exam' as AnswerSessionType })
    type: AnswerSessionType;

    //
    // TO MANY
    //

    // given answers
    @OneToMany(_ => GivenAnswer, x => x.answerSession)
    @JoinColumn()
    givenAnswers: GivenAnswer[];

    //
    // TO ONE
    //

    // exam
    @Column({ nullable: true })
    examVersionId: number | null;
    @XManyToOne<AnswerSession>()(() => ExamVersion, e => e.answerSessions)
    @XJoinColumn<AnswerSession>('examVersionId')
    examVersion: ExamVersion | null;

    // video 
    @Column({ nullable: true })
    videoVersionId: number | null;
    @XManyToOne<AnswerSession>()(() => VideoVersion, x => x.answerSessions)
    @XJoinColumn<AnswerSession>('videoVersionId')
    videoVersion: VideoVersion | null;

    // user 
    @Column({ nullable: true })
    userId: number | null;
    @ManyToOne(_ => User, e => e.answerSessions)
    @JoinColumn({ name: 'user_id' })
    user: User | null;
}