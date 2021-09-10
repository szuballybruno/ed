import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VideoPlaybackData {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    watchedPercent: number;

    // // video 
    // @Column()
    // videoId: number;

    // @ManyToOne(_ => Video, x => x.videoPlaybackData)
    // @JoinColumn({ name: "videoId" })
    // video: Video;

    // // user
    // @Column()
    // userId: number;

    // @ManyToOne(_ => User, x => x.videoPlaybackDatas)
    // @JoinColumn({ name: "userId" })
    // user: User;
}