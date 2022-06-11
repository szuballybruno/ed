import { Column, Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne, XOneToMany } from '../../../services/XORM/XORMDecorators';
import { AnswerSession } from '../AnswerSession';
import { CoinTransaction } from '../CoinTransaction';
import { Comment } from '../Comment';
import { Module } from '../module/Module';
import { VideoPlaybackSample } from '../playback/VideoPlaybackSample';
import { VideoPlaybackSession } from '../playback/VideoPlaybackSession';
import { VideoSeekEvent } from '../playback/VideoSeekEvent';
import { Question } from '../question/Question';
import { QuestionVersion } from '../question/QuestionVersion';
import { UserSessionActivity } from '../UserSessionActivity';
import { UserVideoProgressBridge } from '../UserVideoProgressBridge';
import { VideoRating } from '../VideoRating';

@Entity()
export class VideoVersion {

    @PrimaryGeneratedColumn()
    id: number;

    //
    // TO MANY
    //

    // questions
    @XOneToMany<VideoVersion>()(QuestionVersion, x => x.videoVersion)
    questionVersions: Relation<QuestionVersion>[];

    // user session activity
    @XOneToMany<VideoVersion>()(UserSessionActivity, x => x.videoVersion)
    userSessionActivities: UserSessionActivity[];

    // comment
    @XOneToMany<VideoVersion>()(Comment, x => x.videoVersion)
    comments: Comment[];

    // answer sessions
    @XOneToMany<VideoVersion>()(AnswerSession, as => as.videoVersion)
    answerSessions: Relation<AnswerSession>[];

    // video playback samples 
    @XOneToMany<VideoVersion>()(VideoPlaybackSample, x => x.videoVersion)
    videoPlaybackSamples: Relation<VideoPlaybackSample>[];

    // video seek events 
    @XOneToMany<VideoVersion>()(VideoSeekEvent, x => x.videoVersion)
    videoSeekEvents: Relation<VideoSeekEvent>[];

    // video playback sessions 
    @XOneToMany<VideoVersion>()(VideoPlaybackSession, x => x.videoVersion)
    videoPlaybackSessions: Relation<VideoPlaybackSession>[];

    // coin acquires 
    @XOneToMany<VideoVersion>()(CoinTransaction, x => x.videoVersion)
    coinAcquires: Relation<CoinTransaction>[];

    // ratings
    @XOneToMany<VideoVersion>()(VideoRating, x => x.videoVersion)
    videoRatings: Relation<VideoRating>[];

    // userProgressBridges
    @XOneToMany<VideoVersion>()(UserVideoProgressBridge, x => x.videoVersion)
    userProgressBridges: Relation<UserVideoProgressBridge>[];

    //
    // TO ONE
    //

    // module
    @Column()
    moduleId: number;

    @XManyToOne<VideoVersion>()(Module, x => x.videoVersions)
    @XJoinColumn<VideoVersion>('moduleId')
    module: Relation<Module>;
}