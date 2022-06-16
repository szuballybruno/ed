import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { XOneToMany } from '../../../services/XORM/XORMDecorators';
import { UserSessionActivity } from '../UserSessionActivity';
import { ExamVersion } from './ExamVersion';

@Entity()
export class Exam {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isPretest: boolean;

    @Column()
    isSignup: boolean;

    // exam versions
    @XOneToMany<Exam>()(() => ExamVersion, x => x.exam)
    examVersions: ExamVersion[];
}