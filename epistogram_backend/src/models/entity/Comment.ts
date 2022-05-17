import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsDeletedFlag } from '../../services/ORMConnectionService/ORMConnectionDecorators';
import { User } from './User';
import { Like as Like } from './Like';
import { Video } from './Video';

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    creationDate: Date;

    @Column()
    text: string;

    @Column({ default: false })
    isQuestion: boolean;

    @Column({ default: false })
    isAnonymous: boolean;

    @Column({ type: 'int', nullable: true })
    parentCommentId: number | null;

    // users
    @Column()
    userId: number;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(_ => User, x => x.comments)
    user: User;

    // video
    @Column()
    videoId: number;

    @JoinColumn({ name: 'video_id' })
    @ManyToOne(_ => Video, x => x.comments)
    video: Video;

    // likes
    @OneToMany(_ => Like, x => x.user)
    @JoinColumn()
    likes: Like[];
}