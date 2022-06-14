import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne } from '../../../services/XORM/XORMDecorators';
import { User } from '../User';
import { VideoVersion } from '../video/VideoVersion';
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

    //
    // TO ONE
    //

    // video 
    @Column()
    videoVersionId: number;
    @XManyToOne<VideoPlaybackSample>()(() => VideoVersion, x => x.videoPlaybackSamples)
    @XJoinColumn<VideoPlaybackSample>('videoVersionId')
    videoVersion: Relation<VideoVersion>;

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