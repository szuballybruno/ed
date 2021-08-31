import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./Course";
import { StorageFile } from "./StorageFile";
import { User } from "./User";

@Entity()
export class Video {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    subtitle: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    orderIndex: number;

    // video file
    @Column({ nullable: true })
    videoFileId: number;

    @ManyToOne(type => StorageFile, s => s.videos)
    @JoinColumn({ name: "videoFileId" })
    videoFile: StorageFile

    // thumbnail file
    // @Column({ nullable: true })
    // thumbnailFileId: number;

    // @OneToMany(type => StorageFile, f => f.videos)
    // @JoinColumn({ name: "thumbnailFileId" })
    // thumbnailFile: StorageFile

    // -> users 
    @OneToMany(type => User, user => user.currentVideo)
    @JoinColumn()
    users: User[];

    // -> course
    @Column()
    courseId: number;

    @ManyToOne(type => Course, course => course.videos)
    @JoinColumn({ name: "courseId" })
    course: Course
}