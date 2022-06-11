import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne } from '../../../services/XORM/XORMDecorators';
import { User } from '../User';
import { Video } from '../video/Video';
import { VideoPlaybackSession } from './VideoPlaybackSession';

@Entity()
export class VideoPlaybackSample {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    creationDate: Date;

    @Column({ type: 'double precision' })
    fromSeconds: number;

    @Column({ type: 'double precision' })
    toSeconds: number;

    // video 
    @Column()
    videoId: number;

    @XManyToOne<VideoPlaybackSample>()(() => Video, x => x.videoPlaybackSamples)
    @XJoinColumn<VideoPlaybackSample>('videoId')
    video: Relation<Video>;

    // user
    @Column()
    userId: number;

    @XManyToOne<VideoPlaybackSample>()(() => User, x => x.videoPlaybackSamples)
    @XJoinColumn<VideoPlaybackSample>('userId')
    user: Relation<User>;

    // playback session
    @Column()
    videoPlaybackSessionId: number;

    @XManyToOne<VideoPlaybackSample>()(() => VideoPlaybackSession, x => x.videoPlaybackSamples)
    @XJoinColumn<VideoPlaybackSample>('videoPlaybackSessionId')
    videoPlaybackSession: Relation<VideoPlaybackSession>;
}