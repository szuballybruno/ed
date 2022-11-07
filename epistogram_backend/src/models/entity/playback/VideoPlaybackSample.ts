import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XJoinColumn, XManyToOne, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { User } from '../misc/User';
import { VideoVersion } from '../video/VideoVersion';
import { VideoPlaybackSession } from './VideoPlaybackSession';

@Entity()
export class VideoPlaybackSample {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'VideoPlaybackSample'>;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    @XViewColumn()
    creationDate: Date;

    @Column({ type: 'double precision' })
    @XViewColumn()
    fromSeconds: number;

    @Column({ type: 'double precision' })
    @XViewColumn()
    toSeconds: number;

    //
    // TO ONE
    //

    // video 
    @Column()
    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;
    @XManyToOne<VideoPlaybackSample>()(() => VideoVersion, x => x.videoPlaybackSamples)
    @XJoinColumn<VideoPlaybackSample>('videoVersionId')
    videoVersion: Relation<VideoVersion>;

    // user
    @Column()
    @XViewColumn()
    userId: Id<'User'>;
    @XManyToOne<VideoPlaybackSample>()(() => User, x => x.videoPlaybackSamples)
    @XJoinColumn<VideoPlaybackSample>('userId')
    user: Relation<User>;

    // playback session
    @Column()
    @XViewColumn()
    videoPlaybackSessionId: Id<'VideoPlaybackSession'>;
    @XManyToOne<VideoPlaybackSample>()(() => VideoPlaybackSession, x => x.videoPlaybackSamples)
    @XJoinColumn<VideoPlaybackSample>('videoPlaybackSessionId')
    videoPlaybackSession: Relation<VideoPlaybackSession>;
}