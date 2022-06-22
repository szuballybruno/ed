import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { User } from '../User';
import { VideoVersion } from '../video/VideoVersion';
import { VideoPlaybackSession } from './VideoPlaybackSession';

@Entity()
export class VideoSeekEvent {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

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
    videoVersionId: number;
    @XManyToOne<VideoSeekEvent>()(() => VideoVersion, x => x.videoSeekEvents)
    @XJoinColumn<VideoSeekEvent>('videoVersionId')
    videoVersion: Relation<VideoVersion>;

    // user
    @Column()
    @XViewColumn()
    userId: number;
    @XManyToOne<VideoSeekEvent>()(() => User, x => x.videoSeekEvents)
    @XJoinColumn<VideoSeekEvent>('userId')
    user: Relation<User>;

    // playback session
    @Column()
    @XViewColumn()
    videoPlaybackSessionId: number;
    @XManyToOne<VideoSeekEvent>()(() => VideoPlaybackSession, x => x.videoSeekEvents)
    @XJoinColumn<VideoSeekEvent>('videoPlaybackSessionId')
    videoPlaybackSession: Relation<VideoPlaybackSession>;
}