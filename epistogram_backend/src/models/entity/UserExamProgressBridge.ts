import { Column, Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne } from '../../services/XORM/XORMDecorators';
import { ExamVersion } from './exam/ExamVersion';
import { User } from './User';

@Entity()
export class UserExamProgressBridge {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: 'timestamptz' })
    completionDate: Date;

    // user 
    @Column()
    userId: number;
    @XManyToOne<UserExamProgressBridge>()(() => User, x => x.examProgressBridges)
    @XJoinColumn<UserExamProgressBridge>('userId')
    user: Relation<User>;

    // exam version
    @Column()
    examVersionId: number;
    @XManyToOne<UserExamProgressBridge>()(() => ExamVersion, x => x.userProgressBridges)
    @XJoinColumn<UserExamProgressBridge>('examVersionId')
    examVersion: Relation<ExamVersion>;
}