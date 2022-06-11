import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { XOneToMany } from '../../../services/XORM/XORMDecorators';
import { UserSessionActivity } from '../UserSessionActivity';
import { ExamVersion } from './ExamVersion';

@Entity()
export class Exam {

    @PrimaryGeneratedColumn()
    id: number;

    // exam versions
    @XOneToMany<Exam>()(ExamVersion, x => x.exam)
    examVersions: ExamVersion[];

    // user session activity
    @XOneToMany<ExamVersion>()(UserSessionActivity, x => x.exam)
    userSessionActivities: UserSessionActivity[];
}