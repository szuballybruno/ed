import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne, XOneToMany } from '../../../services/XORM/XORMDecorators';
import { User } from '../User';
import { Video } from '../Video';
import { VideoPlaybackSample } from './VideoPlaybackSample';

@Entity()
export class VideoPlaybackSession {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    creationDate: Date;

    @Column({ default: () => 'now()', type: 'timestamptz' })
    lastUsageDate: Date;

    // video 
    @Column()
    videoId: number;

    @XManyToOne<VideoPlaybackSession>()(() => Video, x => x.videoPlaybackSessions)
    @XJoinColumn<VideoPlaybackSession>('videoId')
    video: Relation<Video>;

    // user
    @Column()
    userId: number;

    @XManyToOne<VideoPlaybackSession>()(() => User, x => x.videoPlaybackSessions)
    @XJoinColumn<VideoPlaybackSession>('userId')
    user: Relation<User>;

    // video playback samples
    @XOneToMany<VideoPlaybackSession>()(() => VideoPlaybackSample, x => x.videoPlaybackSession)
    @XJoinColumn<VideoPlaybackSession>('userId')
    videoPlaybackSamples: Relation<VideoPlaybackSample>[];
}