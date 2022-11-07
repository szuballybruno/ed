import { Column, Entity, PrimaryGeneratedColumn } from '../../MyORM';
import { XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { ExamVersion } from './ExamVersion';

@Entity()
export class Exam {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'Exam'>;

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