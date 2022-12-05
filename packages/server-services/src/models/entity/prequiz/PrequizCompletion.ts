import {Column, Entity, PrimaryGeneratedColumn} from '../../MyORM';
import {XJoinColumn, XManyToOne, XViewColumn} from '@episto/x-orm';
import {Id} from '@episto/commontypes';
import {Course} from '../course/Course';
import {User} from '../misc/User';

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
