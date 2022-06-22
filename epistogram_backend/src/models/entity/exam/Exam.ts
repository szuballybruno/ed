import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { ExamVersion } from './ExamVersion';

@Entity()
export class Exam {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    @Column()
    @XViewColumn()
    isPretest: boolean;

    @Column()
    @XViewColumn()
    isSignup: boolean;

    // TO MANY

    // exam versions
    @XOneToMany<Exam>()(() => ExamVersion, x => x.exam)
    examVersions: ExamVersion[];
}