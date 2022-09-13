import { Column, Entity, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XJoinColumn, XManyToOne, XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { AnswerSession } from '../misc/AnswerSession';
import { ModuleVersion } from '../module/ModuleVersion';
import { QuestionVersion } from '../question/QuestionVersion';
import { UserSessionActivity } from '../misc/UserSessionActivity';
import { Exam } from './Exam';
import { ExamData } from './ExamData';

@Entity()
export class ExamVersion {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'ExamVersion'>;

    // 
    // TO MANY
    //

    // questions 
    @XOneToMany<ExamVersion>()(() => QuestionVersion, x => x.examVersion)
    questionVersions: QuestionVersion[];

    // answer sessions
    @XOneToMany<ExamVersion>()(() => AnswerSession, x => x.examVersion)
    answerSessions: AnswerSession[];

    // user session activity
    @XOneToMany<ExamVersion>()(() => UserSessionActivity, x => x.examVersion)
    userSessionActivities: UserSessionActivity[];

    // 
    // TO ONE
    //

    @Column()
    @XViewColumn()
    examDataId: Id<'ExamData'>;
    @XManyToOne<ExamVersion>()(() => ExamData, x => x.examVersions)
    @XJoinColumn<ExamVersion>('examDataId')
    examData: ExamData;

    // module
    @Column()
    @XViewColumn()
    moduleVersionId: Id<'ModuleVersion'>;
    @XManyToOne<ExamVersion>()(() => ModuleVersion, x => x.examVersions)
    @XJoinColumn<ExamVersion>('moduleVersionId')
    moduleVersion: Relation<ModuleVersion>;

    // exam
    @Column()
    @XViewColumn()
    examId: Id<'Exam'>;
    @XManyToOne<ExamVersion>()(() => Exam, x => x.examVersions)
    @XJoinColumn<ExamVersion>('examId')
    exam: Exam;
}