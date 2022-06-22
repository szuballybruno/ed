import { Column, Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne, XViewColumn } from '../../services/XORM/XORMDecorators';
import { User } from './User';
import { VideoVersion } from './video/VideoVersion';

@Entity()
export class VideoRating {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

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
    videoVersionId: number;
    @XManyToOne<VideoRating>()(() => VideoVersion, x => x.videoRatings)
    @XJoinColumn<VideoRating>('videoVersionId')
    videoVersion: Relation<VideoVersion>;

    // user
    @Column()
    @XViewColumn()
    userId: number;
    @XManyToOne<VideoRating>()(() => User, x => x.videoRatings)
    @XJoinColumn<VideoRating>('userId')
    user: Relation<User>;
}