import { Column, Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne, XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { AnswerSession } from '../AnswerSession';
import { Comment } from '../Comment';
import { ModuleVersion } from '../module/ModuleVersion';
import { VideoPlaybackSample } from '../playback/VideoPlaybackSample';
import { VideoPlaybackSession } from '../playback/VideoPlaybackSession';
import { VideoSeekEvent } from '../playback/VideoSeekEvent';
import { QuestionVersion } from '../question/QuestionVersion';
import { UserSessionActivity } from '../UserSessionActivity';
import { UserVideoProgressBridge } from '../UserVideoProgressBridge';
import { VideoRating } from '../VideoRating';
import { Video } from './Video';
import { VideoData } from './VideoData';

@Entity()
export class VideoVersion {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

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
    @Column()
    @XViewColumn()
    moduleVersionId: number;
    @XManyToOne<VideoVersion>()(() => ModuleVersion, x => x.videoVersions)
    @XJoinColumn<VideoVersion>('moduleVersionId')
    moduleVersion: Relation<ModuleVersion>;

    // video 
    @Column()
    @XViewColumn()
    videoId: number;
    @XManyToOne<VideoVersion>()(() => Video, x => x.videoVersions)
    @XJoinColumn<VideoVersion>('videoId')
    video: Video;

    // video data
    @Column()
    @XViewColumn()
    videoDataId: number;
    @XManyToOne<VideoVersion>()(() => VideoData, x => x.videoVersions)
    @XJoinColumn<VideoVersion>('videoDataId')
    videoData: VideoData;
}