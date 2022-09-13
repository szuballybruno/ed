import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { IsDeletedFlag, XManyToOne, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { Like } from './Like';
import { User } from './User';
import { VideoVersion } from '../video/VideoVersion';

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'Comment'>;

    @IsDeletedFlag()
    @DeleteDateColumn()
    @XViewColumn()
    deletionDate: Date | null;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    @XViewColumn()
    creationDate: Date;

    @Column()
    @XViewColumn()
    text: string;

    @Column({ default: false })
    @XViewColumn()
    isQuestion: boolean;

    @Column({ default: false })
    @XViewColumn()
    isAnonymous: boolean;

    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    parentCommentId: Id<'Comment'> | null;

    // TO ONE

    // user
    @Column({ type: 'int' })
    @XViewColumn()
    userId: Id<'User'>;
    @JoinColumn({ name: 'user_id' })
    @ManyToOne(_ => User, x => x.comments)
    user: Relation<User>;

    // video
    @Column({ type: 'int' })
    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;
    @JoinColumn({ name: 'video_id' })
    @XManyToOne<Comment>()(() => VideoVersion, x => x.comments)
    videoVersion: Relation<VideoVersion>;

    // TO MANY

    // likes
    @OneToMany(_ => Like, x => x.user)
    @JoinColumn()
    likes: Relation<Like>[];
}