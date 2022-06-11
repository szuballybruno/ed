import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { XJoinColumn, XManyToOne, XOneToMany } from '../../../services/XORM/XORMDecorators';
import { AnswerSession } from '../AnswerSession';
import { ModuleData } from '../module/ModuleData';
import { ModuleVersion } from '../module/ModuleVersion';
import { QuestionVersion } from '../question/QuestionVersion';
import { UserExamProgressBridge } from '../UserExamProgressBridge';
import { UserSessionActivity } from '../UserSessionActivity';
import { Exam } from './Exam';
import { ExamData } from './ExamData';

@Entity()
export class ExamVersion {

    @PrimaryGeneratedColumn()
    id: number;

    // 
    // TO MANY
    //

    // questions 
    @XOneToMany<ExamVersion>()(QuestionVersion, x => x.examVersion)
    questionVersions: QuestionVersion[];

    // answer sessions
    @XOneToMany<ExamVersion>()(AnswerSession, x => x.examVersion)
    answerSessions: AnswerSession[];

    // userProgressBridges
    @XOneToMany<ExamVersion>()(UserExamProgressBridge, x => x.examVersion)
    userProgressBridges: UserExamProgressBridge[];

    // 
    // TO ONE
    //

    @Column()
    examDataId: number;
    @XManyToOne<ExamVersion>()(ExamData, x => x.examVersions)
    @XJoinColumn<ExamVersion>('examDataId')
    examData: ExamData;

    // module
    @Column({ type: 'int', nullable: true })
    moduleVersionId: number | null;
    @ManyToOne(_ => ModuleVersion, x => x.examVersions)
    @XJoinColumn<ExamVersion>('moduleVersionId')
    moduleVersion: ModuleVersion;

    // exam
    @Column()
    examId: number;
    @XManyToOne<ExamVersion>()(Exam, x => x.examVersions)
    @XJoinColumn<ExamVersion>('examId')
    exam: Exam;
}