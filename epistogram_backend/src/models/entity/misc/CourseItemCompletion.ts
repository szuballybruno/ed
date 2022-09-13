import { Column, Entity, PrimaryGeneratedColumn } from '../../MyORM';
import { XJoinColumn, XManyToOne, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { AnswerSession } from './AnswerSession';
import { ExamVersion } from '../exam/ExamVersion';
import { User } from './User';
import { VideoVersion } from '../video/VideoVersion';

@Entity()
export class CourseItemCompletion {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'AnswerSession'>;

    @Column({ type: 'timestamptz' })
    @XViewColumn()
    completionDate: Date;

    //
    // TO ONE
    //

    // exam
    @Column({ nullable: true })
    @XViewColumn()
    examVersionId: Id<'ExamVersion'> | null;
    @XManyToOne<CourseItemCompletion>()(() => ExamVersion)
    @XJoinColumn<CourseItemCompletion>('examVersionId')
    examVersion: ExamVersion | null;

    // video 
    @Column({ nullable: true })
    @XViewColumn()
    videoVersionId: Id<'VideoVersion'> | null;
    @XManyToOne<CourseItemCompletion>()(() => VideoVersion)
    @XJoinColumn<CourseItemCompletion>('videoVersionId')
    videoVersion: VideoVersion | null;

    // user 
    @Column()
    @XViewColumn()
    userId: Id<'User'>;
    @XManyToOne<CourseItemCompletion>()(() => User)
    @XJoinColumn<CourseItemCompletion>('userId')
    user: User;

    // answer session 
    @Column({ nullable: true, type: 'int' })
    @XViewColumn()
    answerSessionId: Id<'AnswerSession'> | null;
    @XManyToOne<CourseItemCompletion>()(() => AnswerSession)
    @XJoinColumn<CourseItemCompletion>('answerSessionId')
    answerSession: AnswerSession | null;
}