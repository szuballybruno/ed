import { Column, Entity, PrimaryGeneratedColumn } from '../../MyORM';
import { XJoinColumn, XManyToOne, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { CourseVersion } from '../course/CourseVersion';
import { User } from './User';

@Entity()
export class CourseCompletion {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'CourseCompletion'>;

    // TO ONE

    @Column()
    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;
    @XManyToOne<CourseCompletion>()(() => CourseVersion)
    @XJoinColumn<CourseCompletion>('courseVersionId')
    courseVersion: CourseVersion;

    @Column()
    @XViewColumn()
    userId: Id<'User'>;
    @XManyToOne<CourseCompletion>()(() => User)
    @XJoinColumn<CourseCompletion>('userId')
    user: User;
}