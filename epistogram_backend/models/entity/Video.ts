import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Course } from "./Course";
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
    url: string;

    @Column()
    length: number;

    @Column()
    thumbnailUrl: string;

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