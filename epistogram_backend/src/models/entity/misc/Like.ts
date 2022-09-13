import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { IsDeletedFlag, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { Comment } from './Comment';
import { CourseData } from '../course/CourseData';
import { User } from './User';

@Entity()
export class Like {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'Like'>;

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
    userId: Id<'User'>;
    @ManyToOne(_ => User, x => x.likes)
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;

    // comment
    @Column()
    @XViewColumn()
    commentId: Id<'Comment'>;
    @ManyToOne(_ => Comment, x => x.likes)
    @JoinColumn({ name: 'comment_id' })
    comment: Relation<CourseData>;
}