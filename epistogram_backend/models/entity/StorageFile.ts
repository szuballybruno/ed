import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./Course";
import { User } from "./User";
import { Video } from "./Video";

@Entity()
export class StorageFile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pending: boolean;

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
}