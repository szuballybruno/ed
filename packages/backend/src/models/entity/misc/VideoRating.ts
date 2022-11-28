import { Column, Entity, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XJoinColumn, XManyToOne, XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';
import { User } from './User';
import { VideoVersion } from '../video/VideoVersion';

@Entity()
export class VideoRating {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'VideoRating'>;

    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    experience: number | null;

    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    difficulty: number | null;

    // TO ONE

    // video 
    @Column()
    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;
    @XManyToOne<VideoRating>()(() => VideoVersion, x => x.videoRatings)
    @XJoinColumn<VideoRating>('videoVersionId')
    videoVersion: Relation<VideoVersion>;

    // user
    @Column()
    @XViewColumn()
    userId: Id<'User'>;
    @XManyToOne<VideoRating>()(() => User, x => x.videoRatings)
    @XJoinColumn<VideoRating>('userId')
    user: Relation<User>;
}