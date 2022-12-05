import { XJoinColumn, XManyToOne, XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';
import { Column, Entity, PrimaryGeneratedColumn } from '../../MyORM';
import { AnswerSession } from './AnswerSession';

@Entity()
export class ExamCompletion {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'AnswerSession'>;

    @Column({ type: 'timestamptz' })
    @XViewColumn()
    completionDate: Date;

    //
    // TO ONE
    //

    // answer session 
    @Column()
    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;
    @XManyToOne<ExamCompletion>()(() => AnswerSession)
    @XJoinColumn<ExamCompletion>('answerSessionId')
    answerSession: AnswerSession;
}