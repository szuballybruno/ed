import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { IsDeletedFlag, XViewColumn } from '../../services/XORM/XORMDecorators';
import { Comment } from './Comment';
import { CourseData } from './course/CourseData';
import { User } from './User';

@Entity()
export class Like {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    @XViewColumn()
    deletionDate: Date;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    @XViewColumn()
    creationDate: Date;

    // TO ONE 

    // user
    @Column()
    @XViewColumn()
    userId: number;
    @ManyToOne(_ => User, x => x.likes)
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;

    // comment
    @Column()
    @XViewColumn()
    commentId: number;
    @ManyToOne(_ => Comment, x => x.likes)
    @JoinColumn({ name: 'comment_id' })
    comment: Relation<CourseData>;
}