import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XJoinColumn, XManyToOne, XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';
import { User } from '../misc/User';
import { VideoVersion } from '../video/VideoVersion';
import { VideoPlaybackSession } from './VideoPlaybackSession';

@Entity()
export class VideoSeekEvent {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'VideoSeekEvent'>;

    @CreateDateColumn({ default: 'now()', type: 'timestamptz' })
    @XViewColumn()
    creationDate: Date;

    @Column({ type: 'double precision' })
    @XViewColumn()
    fromSeconds: number;

    @Column({ type: 'double precision' })
    @XViewColumn()
    toSeconds: number;

    @Column()
    @XViewColumn()
    isForward: boolean;

    //
    // TO ONE
    //

    // video 
    @Column()
    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;
    @XManyToOne<VideoSeekEvent>()(() => VideoVersion, x => x.videoSeekEvents)
    @XJoinColumn<VideoSeekEvent>('videoVersionId')
    videoVersion: Relation<VideoVersion>;

    // user
    @Column()
    @XViewColumn()
    userId: Id<'User'>;
    @XManyToOne<VideoSeekEvent>()(() => User, x => x.videoSeekEvents)
    @XJoinColumn<VideoSeekEvent>('userId')
    user: Relation<User>;

    // playback session
    @Column()
    @XViewColumn()
    videoPlaybackSessionId: Id<'VideoPlaybackSession'>;
    @XManyToOne<VideoSeekEvent>()(() => VideoPlaybackSession, x => x.videoSeekEvents)
    @XJoinColumn<VideoSeekEvent>('videoPlaybackSessionId')
    videoPlaybackSession: Relation<VideoPlaybackSession>;
}