import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from '../../MyORM';
import { XJoinColumn, XManyToOne, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';
import { ExamVersion } from '../exam/ExamVersion';
import { GivenAnswer } from './GivenAnswer';
import { User } from './User';
import { VideoVersion } from '../video/VideoVersion';

@Entity()
export class AnswerSession {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'AnswerSession'>;

    @Column({ type: 'timestamptz' })
    @XViewColumn()
    startDate: Date;

    @Column()
    @XViewColumn()
    isPractise: boolean;

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
    examVersionId: Id<'ExamVersion'> | null;
    @XManyToOne<AnswerSession>()(() => ExamVersion, e => e.answerSessions)
    @XJoinColumn<AnswerSession>('examVersionId')
    examVersion: ExamVersion | null;

    // video 
    @Column({ nullable: true })
    @XViewColumn()
    videoVersionId: Id<'VideoVersion'> | null;
    @XManyToOne<AnswerSession>()(() => VideoVersion, x => x.answerSessions)
    @XJoinColumn<AnswerSession>('videoVersionId')
    videoVersion: VideoVersion | null;

    // user 
    @Column({ nullable: true })
    @XViewColumn()
    userId: Id<'User'> | null;
    @ManyToOne(_ => User, e => e.answerSessions)
    @JoinColumn({ name: 'user_id' })
    user: User | null;
}