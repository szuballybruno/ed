import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { IsDeletedFlag } from '../../services/XORM/XORMDecorators';
import { User } from './User';
import { Like as Like } from './Like';
import { VideoData } from './video/VideoData';

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date | null;

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
    user: Relation<User>;

    // video
    @Column()
    videoId: number;

    @JoinColumn({ name: 'video_id' })
    @ManyToOne(_ => VideoData, x => x.comments)
    video: Relation<VideoData>;

    // likes
    @OneToMany(_ => Like, x => x.user)
    @JoinColumn()
    likes: Relation<Like>[];
}