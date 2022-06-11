import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { ExamData } from './exam/ExamData';
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

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(_ => User, x => x.examProgressBridges)
    user: Relation<User>;

    // video 
    @Column()
    examId: number;

    @JoinColumn({ name: 'exam_id' })
    @ManyToOne(_ => ExamData, x => x.userProgressBridges)
    exam: Relation<ExamData>;
}