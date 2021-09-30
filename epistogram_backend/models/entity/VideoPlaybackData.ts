import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Video } from "./Video";

@Entity()
export class VideoPlaybackData {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    watchedPercent: number;

    @Column()
    isWatched: boolean;

    // video 
    @Column()
    videoId: number;

    @ManyToOne(_ => Video, x => x.videoPlaybackDatas)
    @JoinColumn({ name: "videoId" })
    video: Video;

    // user
    @Column()
    userId: number;

    @ManyToOne(_ => User, x => x.videoPlaybackDatas)
    @JoinColumn({ name: "userId" })
    user: User;
}