import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "./Video";

@Entity()
export class StorageFile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pending: boolean;

    @Column()
    url: string;

    // video 
    @OneToMany(type => Video, v => v.videoFile)
    @JoinColumn()
    videos: Video[];
}