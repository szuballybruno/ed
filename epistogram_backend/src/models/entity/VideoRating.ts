import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Video } from './Video';

@Entity()
export class VideoRating {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: 'int' })
    experience: number | null;

    @Column({ nullable: true, type: 'int' })
    difficulty: number | null;

    // video 
    @Column()
    videoId: number;

    @ManyToOne(_ => Video, x => x.videoPlaybackSamples)
    @JoinColumn({ name: 'video_id' })
    video: Video;

    // user
    @Column()
    userId: number;

    @ManyToOne(_ => User, x => x.videoPlaybackSamples)
    @JoinColumn({ name: 'user_id' })
    user: User;
}