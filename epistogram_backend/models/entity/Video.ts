import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @Column()
    orderIndex: number;

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