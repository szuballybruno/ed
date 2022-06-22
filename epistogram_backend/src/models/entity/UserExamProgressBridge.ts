import { Column, Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne, XViewColumn } from '../../services/XORM/XORMDecorators';
import { ExamVersion } from './exam/ExamVersion';
import { User } from './User';

@Entity()
export class UserExamProgressBridge {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    @Column({ nullable: true, type: 'timestamptz' })
    @XViewColumn()
    completionDate: Date;

    // TO ONE

    // user 
    @Column()
    @XViewColumn()
    userId: number;
    @XManyToOne<UserExamProgressBridge>()(() => User, x => x.examProgressBridges)
    @XJoinColumn<UserExamProgressBridge>('userId')
    user: Relation<User>;

    // exam version
    @Column()
    @XViewColumn()
    examVersionId: number;
    @XManyToOne<UserExamProgressBridge>()(() => ExamVersion, x => x.userProgressBridges)
    @XJoinColumn<UserExamProgressBridge>('examVersionId')
    examVersion: Relation<ExamVersion>;
}