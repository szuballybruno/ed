import { Column, Entity, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XJoinColumn, XManyToOne, XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { EntityType } from '../../../services/XORM/XORMTypes';
import { Id } from '../../../shared/types/versionId';
import { AnswerSession } from '../misc/AnswerSession';
import { Comment } from '../misc/Comment';
import { ModuleVersion } from '../module/ModuleVersion';
import { VideoPlaybackSample } from '../playback/VideoPlaybackSample';
import { VideoPlaybackSession } from '../playback/VideoPlaybackSession';
import { VideoSeekEvent } from '../playback/VideoSeekEvent';
import { QuestionVersion } from '../question/QuestionVersion';
import { UserSessionActivity } from '../misc/UserSessionActivity';
import { UserVideoProgressBridge } from '../misc/UserVideoProgressBridge';
import { VideoRating } from '../misc/VideoRating';
import { Video } from './Video';
import { VideoData } from './VideoData';

@Entity()
export class VideoVersion extends EntityType<'VideoVersion'> {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'VideoVersion'>;

    //
    // TO MANY
    //

    // questions
    @XOneToMany<VideoVersion>()(() => QuestionVersion, x => x.videoVersion)
    questionVersions: Relation<QuestionVersion>[];

    // user session activity
    @XOneToMany<VideoVersion>()(() => UserSessionActivity, x => x.videoVersion)
    userSessionActivities: UserSessionActivity[];

    // comment
    @XOneToMany<VideoVersion>()(() => Comment, x => x.videoVersion)
    comments: Comment[];

    // answer sessions
    @XOneToMany<VideoVersion>()(() => AnswerSession, x => x.videoVersion)
    answerSessions: Relation<AnswerSession>[];

    // video playback samples 
    @XOneToMany<VideoVersion>()(() => VideoPlaybackSample, x => x.videoVersion)
    videoPlaybackSamples: Relation<VideoPlaybackSample>[];

    // video seek events 
    @XOneToMany<VideoVersion>()(() => VideoSeekEvent, x => x.videoVersion)
    videoSeekEvents: Relation<VideoSeekEvent>[];

    // video playback sessions 
    @XOneToMany<VideoVersion>()(() => VideoPlaybackSession, x => x.videoVersion)
    videoPlaybackSessions: Relation<VideoPlaybackSession>[];

    // ratings
    @XOneToMany<VideoVersion>()(() => VideoRating, x => x.videoVersion)
    videoRatings: Relation<VideoRating>[];

    // userProgressBridges
    @XOneToMany<VideoVersion>()(() => UserVideoProgressBridge, x => x.videoVersion)
    userProgressBridges: Relation<UserVideoProgressBridge>[];

    //
    // TO ONE
    //

    // module
    @Column({ type: 'int' })
    @XViewColumn()
    moduleVersionId: Id<'ModuleVersion'>;
    @XManyToOne<VideoVersion>()(() => ModuleVersion, x => x.videoVersions)
    @XJoinColumn<VideoVersion>('moduleVersionId')
    moduleVersion: Relation<ModuleVersion>;

    // video 
    @Column({ type: 'int' })
    @XViewColumn()
    videoId: Id<'Video'>;
    @XManyToOne<VideoVersion>()(() => Video, x => x.videoVersions)
    @XJoinColumn<VideoVersion>('videoId')
    video: Relation<Video>;

    // video data
    @Column({ type: 'int' })
    @XViewColumn()
    videoDataId: Id<'VideoData'>;
    @XManyToOne<VideoVersion>()(() => VideoData, x => x.videoVersions)
    @XJoinColumn<VideoVersion>('videoDataId')
    videoData: Relation<VideoData>;
}