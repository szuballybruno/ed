import { Column, Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne } from '../../services/XORM/XORMDecorators';
import { User } from './User';
import { VideoData } from './video/VideoData';
import { VideoVersion } from './video/VideoVersion';

@Entity()
export class VideoRating {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: true })
    experience: number | null;

    @Column({ type: 'int', nullable: true })
    difficulty: number | null;

    // video 
    @Column()
    videoVersionId: number;
    @XManyToOne<VideoRating>()(() => VideoVersion, x => x.videoRatings)
    @XJoinColumn<VideoRating>('videoVersionId')
    videoVersion: Relation<VideoVersion>;

    // user
    @Column()
    userId: number;
    @XManyToOne<VideoRating>()(() => User, x => x.videoRatings)
    @XJoinColumn<VideoRating>('userId')
    user: Relation<User>;
}