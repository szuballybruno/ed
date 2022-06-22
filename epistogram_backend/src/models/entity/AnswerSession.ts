import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { XJoinColumn, XManyToOne, XViewColumn } from '../../services/XORM/XORMDecorators';
import { ExamVersion } from './exam/ExamVersion';
import { GivenAnswer } from './GivenAnswer';
import { User } from './User';
import { VideoVersion } from './video/VideoVersion';

@Entity()
export class AnswerSession {

    @PrimaryGeneratedColumn()
@XViewColumn()
    id: number;

    @Column({ nullable: true, type: 'timestamptz' })
    @XViewColumn()
    startDate: Date | null;

    @Column({ nullable: true, type: 'timestamptz' })
    @XViewColumn()
    endDate: Date | null;

    @Column()
    @XViewColumn()
    isPractise: boolean;

    @Column()
    @XViewColumn()
    isCompleted: boolean;

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
    @XViewColumn()
    examVersionId: number | null;
    @XManyToOne<AnswerSession>()(() => ExamVersion, e => e.answerSessions)
    @XJoinColumn<AnswerSession>('examVersionId')
    examVersion: ExamVersion | null;

    // video 
    @Column({ nullable: true })
    @XViewColumn()
    videoVersionId: number | null;
    @XManyToOne<AnswerSession>()(() => VideoVersion, x => x.answerSessions)
    @XJoinColumn<AnswerSession>('videoVersionId')
    videoVersion: VideoVersion | null;

    // user 
    @Column({ nullable: true })
    @XViewColumn()
    userId: number | null;
    @ManyToOne(_ => User, e => e.answerSessions)
    @JoinColumn({ name: 'user_id' })
    user: User | null;
}