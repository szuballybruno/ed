import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CourseOrganization } from "./CourseOrganization";
import { Exam } from "./Exam";
import { User } from "./User";
import { Video } from "./Video";

@Entity()
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    category: string;

    @Column()
    courseGroup: string;

    @Column()
    permissionLevel: string;

    @Column()
    colorOne: string;

    @Column()
    colorTwo: string;

    // Course's organizations
    @OneToMany(() => CourseOrganization, co => co.course)
    @JoinColumn()
    courseOrganizations: CourseOrganization[];

    // videos 
    @OneToMany(type => Video, video => video.course, { cascade: true })
    @JoinColumn()
    videos: Video[];

    // exams
    @OneToMany(type => Exam, exam => exam.course, { cascade: true })
    @JoinColumn()
    exams: Exam[];

    @Column()
    teacherId: number

    @ManyToOne(() => User, teacher => teacher.teachedCourses)
    @JoinColumn({ name: "teacherId" })
    teacher: User
}