import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { XJoinColumn, XOneToMany } from '../../../services/XORM/XORMDecorators';
import { AnswerSession } from '../AnswerSession';
import { Module } from '../module/Module';
import { QuestionVersion } from '../question/QuestionVersion';
import { UserExamProgressBridge } from '../UserExamProgressBridge';
import { UserSessionActivity } from '../UserSessionActivity';

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

    // user session activity
    @XOneToMany<ExamVersion>()(UserSessionActivity, x => x.examVersion)
    userSessionActivities: UserSessionActivity[];

    // answer sessions
    @XOneToMany<ExamVersion>()(AnswerSession, x => x.examVersion)
    answerSessions: AnswerSession[];

    // userProgressBridges
    @XOneToMany<ExamVersion>()(UserExamProgressBridge, x => x.examVersion)
    userProgressBridges: UserExamProgressBridge[];

    // 
    // TO ONE
    //

    // module
    @Column({ type: 'int', nullable: true })
    moduleId: number | null;

    @ManyToOne(_ => Module, x => x.examVersions)
    @XJoinColumn<ExamVersion>('moduleId')
    module: Module | null;
}