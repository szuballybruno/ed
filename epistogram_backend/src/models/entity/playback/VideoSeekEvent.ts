import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne } from '../../../services/XORM/XORMDecorators';
import { User } from '../User';
import { VideoData } from '../video/VideoData';
import { VideoPlaybackSession } from './VideoPlaybackSession';

@Entity()
export class VideoSeekEvent {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    creationDate: Date;

    @Column({ type: 'double precision' })
    fromSeconds: number;

    @Column({ type: 'double precision' })
    toSeconds: number;

    @Column()
    isForward: boolean;

    // video 
    @Column()
    videoId: number;

    @XManyToOne<VideoSeekEvent>()(() => VideoData, x => x.videoSeekEvents)
    @XJoinColumn<VideoSeekEvent>('videoId')
    video: Relation<VideoData>;

    // user
    @Column()
    userId: number;

    @XManyToOne<VideoSeekEvent>()(() => User, x => x.videoSeekEvents)
    @XJoinColumn<VideoSeekEvent>('userId')
    user: Relation<User>;

    // playback session
    @Column()
    videoPlaybackSessionId: number;

    @XManyToOne<VideoSeekEvent>()(() => VideoPlaybackSession, x => x.videoSeekEvents)
    @XJoinColumn<VideoSeekEvent>('videoPlaybackSessionId')
    videoPlaybackSession: Relation<VideoPlaybackSession>;
}