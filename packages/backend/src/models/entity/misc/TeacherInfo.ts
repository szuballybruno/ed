import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';
import { User } from './User';

@Entity()
export class TeacherInfo {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'TeacherInfo'>;

    @Column()
    @XViewColumn()
    skills: string;

    @Column()
    @XViewColumn()
    courseCount: number;

    @Column()
    @XViewColumn()
    videoCount: number;

    @Column()
    @XViewColumn()
    studentCount: number;

    @Column({ type: 'double precision' })
    @XViewColumn()
    rating: number;

    @Column()
    @XViewColumn()
    description: string;

    @Column()
    @XViewColumn()
    badges: string;

    // TO ONE

    // user 
    @Column()
    @XViewColumn()
    userId: Id<'User'>;
    @OneToOne(_ => User, x => x.teacherInfo)
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;
}