import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {XJoinColumn, XManyToOne, XViewColumn} from '../../../services/XORM/XORMDecorators';
import {Id} from '../../../shared/types/versionId';
import {Course} from '../course/Course';
import {User} from '../User';

@Entity()
export class PrequizCompletion {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'PrequizCompletion'>;

    // TO ONE

    // course
    @Column()
    @XViewColumn()
    courseId: Id<'Course'>;
    @XManyToOne<PrequizCompletion>()(() => Course)
    @XJoinColumn<PrequizCompletion>('courseId')
    course: Course;

    // user
    @Column()
    @XViewColumn()
    userId: Id<'User'>;
    @XManyToOne<PrequizCompletion>()(() => User)
    @XJoinColumn<PrequizCompletion>('userId')
    user: User;
}
