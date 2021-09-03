import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Exam } from "./Exam";
import { User } from "./User";
import { Video } from "./Video";
import {Organization} from "./Organization";
import {QuestionAnswer} from "./QuestionAnswer";
import {CourseOrganization} from "./CourseOrganization";

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
    courseOrganizations: CourseOrganization[]

    @OneToMany(type => User, user => user.currentCourse)
    @JoinColumn()
    users: User[];

    @OneToMany(type => Video, video => video.course, { cascade: true })
    @JoinColumn()
    videos: Video[];

    @OneToMany(type => Exam, exam => exam.course, { cascade: true })
    @JoinColumn()
    exams: Exam[];
}