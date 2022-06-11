import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { IsDeletedFlag } from '../../services/XORM/XORMDecorators';
import { PrincipalId } from '../../utilities/ActionParams';
import { Comment } from './Comment';
import { CourseData } from './course/CourseData';
import { User } from './User';

@Entity()
export class Like {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    creationDate: Date;

    // user
    @Column()
    userId: number;

    @ManyToOne(_ => User, x => x.likes)
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;

    // comment
    @Column()
    commentId: number;

    @ManyToOne(_ => Comment, x => x.likes)
    @JoinColumn({ name: 'comment_id' })
    comment: Relation<CourseData>;
}