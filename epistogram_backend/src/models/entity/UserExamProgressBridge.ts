import { Column, Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne } from '../../services/XORM/XORMDecorators';
import { ExamVersion } from './exam/ExamVersion';
import { User } from './User';

@Entity()
export class ExamCompletion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: 'timestamptz' })
    completionDate: Date;

    // user 
    @Column()
    userId: number;
    @XManyToOne<ExamCompletion>()(User, x => x.examProgressBridges)
    @XJoinColumn<ExamCompletion>('userId')
    user: Relation<User>;

    // exam version
    @Column()
    examVersionId: number;
    @XManyToOne<ExamCompletion>()(ExamVersion, x => x.userProgressBridges)
    @XJoinColumn<ExamCompletion>('examVersionId')
    examVersion: Relation<ExamVersion>;
}