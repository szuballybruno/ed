import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Video } from "./Video";

@Entity()
export class VideoPlaybackSample {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "numeric" })
    fromSeconds: number;

    @Column({ type: "numeric" })
    toSeconds: number;

    // video 
    @Column()
    videoId: number;

    @ManyToOne(_ => Video, x => x.videoPlaybackSamples)
    @JoinColumn({ name: "videoId" })
    video: Video;

    // user
    @Column()
    userId: number;

    @ManyToOne(_ => User, x => x.videoPlaybackSamples)
    @JoinColumn({ name: "userId" })
    user: User;
}