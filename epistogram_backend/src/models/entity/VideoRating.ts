import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { User } from './User';
import { VideoData } from './video/VideoData';

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
    videoId: number;

    @ManyToOne(_ => VideoData, x => x.videoPlaybackSamples)
    @JoinColumn({ name: 'video_id' })
    video: Relation<VideoData>;

    // user
    @Column()
    userId: number;

    @ManyToOne(_ => User, x => x.videoPlaybackSamples)
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;
}