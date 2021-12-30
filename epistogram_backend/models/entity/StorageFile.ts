import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./Course";
import { ShopItem } from "./ShopItem";
import { User } from "./User";
import { Video } from "./Video";

@Entity()
export class StorageFile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filePath: string;

    // videos
    @OneToMany(type => Video, v => v.videoFile)
    @JoinColumn()
    videos: Video[];

    // users
    @OneToMany(type => User, u => u.avatarFile)
    @JoinColumn()
    users: User[];

    // course
    @OneToMany(_ => Course, c => c.coverFile)
    @JoinColumn()
    courses: Course[];

    // shop items
    @OneToMany(_ => ShopItem, x => x.coverFile)
    @JoinColumn()
    shopItems: ShopItem[];
}