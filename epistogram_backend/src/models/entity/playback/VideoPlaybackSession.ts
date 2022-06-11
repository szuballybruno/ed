import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne, XOneToMany } from '../../../services/XORM/XORMDecorators';
import { User } from '../User';
import { VideoData } from '../video/VideoData';
import { VideoPlaybackSample } from './VideoPlaybackSample';
import { VideoSeekEvent } from './VideoSeekEvent';

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

    @XManyToOne<VideoPlaybackSession>()(() => VideoData, x => x.videoPlaybackSessions)
    @XJoinColumn<VideoPlaybackSession>('videoId')
    video: Relation<VideoData>;

    // user
    @Column()
    userId: number;

    @XManyToOne<VideoPlaybackSession>()(() => User, x => x.videoPlaybackSessions)
    @XJoinColumn<VideoPlaybackSession>('userId')
    user: Relation<User>;

    // video playback samples
    @XOneToMany<VideoPlaybackSession>()(() => VideoPlaybackSample, x => x.videoPlaybackSession)
    videoPlaybackSamples: Relation<VideoPlaybackSample>[];

    // video seek events
    @XOneToMany<VideoPlaybackSession>()(() => VideoSeekEvent, x => x.videoPlaybackSession)
    videoSeekEvents: Relation<VideoSeekEvent>[];
}