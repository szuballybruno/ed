import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./Course";
import { Organization } from "./Organization";
import { Video } from "./Video";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    timeOfAdd: Date;

    @Column({ nullable: true })
    isActive: boolean;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    username: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    userDescription: string;

    @Column({ nullable: true })
    linkedInUrl: string;

    @Column({ nullable: true })
    role: string;

    @Column({ nullable: true })
    innerRole: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    refreshToken: string;

    // Organization 
    @Column({ nullable: false })
    organizationId: number;

    @ManyToOne(() => Organization, organization => organization.users)
    @JoinColumn({ name: 'organizationId' })
    organization: Organization

    // Current course
    @Column({ nullable: true })
    currentCourseId: number;

    @ManyToOne(() => Course, course => course.users)
    @JoinColumn({ name: 'currentCourseId' })
    currentCourse: Course

    // Current course
    @Column({ nullable: true })
    currentVideoId: number;

    @ManyToOne(() => Video, video => video.users)
    @JoinColumn({ name: 'currentVideoId' })
    currentVideo: Video
}