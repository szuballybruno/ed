import { Column, Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne, XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { ExamVersion } from './exam/ExamVersion';
import { User } from './User';

@Entity()
export class UserExamProgressBridge {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'UserExamProgressBridge'>;

    @Column({ nullable: true, type: 'timestamptz' })
    @XViewColumn()
    completionDate: Date;

    // TO ONE

    // user 
    @Column()
    @XViewColumn()
    userId: Id<'User'>;
    @XManyToOne<UserExamProgressBridge>()(() => User, x => x.examProgressBridges)
    @XJoinColumn<UserExamProgressBridge>('userId')
    user: Relation<User>;

    // exam version
    @Column()
    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;
    @XManyToOne<UserExamProgressBridge>()(() => ExamVersion, x => x.userProgressBridges)
    @XJoinColumn<UserExamProgressBridge>('examVersionId')
    examVersion: Relation<ExamVersion>;
}