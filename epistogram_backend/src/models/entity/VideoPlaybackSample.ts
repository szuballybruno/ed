import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Video } from './Video';

@Entity()
export class VideoPlaybackSample {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    creationDate: Date;

    @Column({ type: 'double precision' })
    fromSeconds: number;

    @Column({ type: 'double precision' })
    toSeconds: number;

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