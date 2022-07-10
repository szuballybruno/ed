import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne, XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { User } from '../User';
import { VideoVersion } from '../video/VideoVersion';
import { VideoPlaybackSample } from './VideoPlaybackSample';
import { VideoSeekEvent } from './VideoSeekEvent';

@Entity()
export class VideoPlaybackSession {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<VideoPlaybackSession>;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    @XViewColumn()
    creationDate: Date;

    @Column({ default: () => 'now()', type: 'timestamptz' })
    @XViewColumn()
    lastUsageDate: Date;

    //
    // TO ONE
    // 

    // video 
    @Column()
    @XViewColumn()
    videoVersionId: Id<VideoVersion>;
    @XManyToOne<VideoPlaybackSession>()(() => VideoVersion, x => x.videoPlaybackSessions)
    @XJoinColumn<VideoPlaybackSession>('videoVersionId')
    videoVersion: Relation<VideoVersion>;

    // user
    @Column()
    @XViewColumn()
    userId: Id<User>;
    @XManyToOne<VideoPlaybackSession>()(() => User, x => x.videoPlaybackSessions)
    @XJoinColumn<VideoPlaybackSession>('userId')
    user: Relation<User>;

    //
    // TO MANY
    //

    // video playback samples
    @XOneToMany<VideoPlaybackSession>()(() => VideoPlaybackSample, x => x.videoPlaybackSession)
    videoPlaybackSamples: Relation<VideoPlaybackSample>[];

    // video seek events
    @XOneToMany<VideoPlaybackSession>()(() => VideoSeekEvent, x => x.videoPlaybackSession)
    videoSeekEvents: Relation<VideoSeekEvent>[];
}