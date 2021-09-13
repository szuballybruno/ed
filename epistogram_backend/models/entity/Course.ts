import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CourseOrganization } from "./CourseOrganization";
import { Exam } from "./Exam";
import { StorageFile } from "./StorageFile";
import { User } from "./User";
import { Video } from "./Video";
import { CourseGroup } from "./CourseGroup";
import { CourseTag } from "./CourseTag";
import { UserCourseBridge } from "./UserCourseBridge";

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

    // Course's groups
    @OneToMany(() => CourseGroup, cg => cg.course)
    @JoinColumn()
    courseGroups: CourseGroup[];

    // Course's organizations

    @OneToMany(() => CourseTag, ct => ct.course)
    @JoinColumn()
    courseTags: CourseTag[];

    // videos 
    @OneToMany(type => Video, video => video.course, { cascade: true })
    @JoinColumn()
    videos: Video[];

    // exams
    @OneToMany(type => Exam, exam => exam.course, { cascade: true })
    @JoinColumn()
    exams: Exam[];

    // teacher
    @Column()
    teacherId: number

    @ManyToOne(() => User, teacher => teacher.teachedCourses)
    @JoinColumn({ name: "teacherId" })
    teacher: User;

    // coverFile
    @Column({ nullable: true })
    coverFileId: number | null;

    @ManyToOne(_ => StorageFile, x => x.courses, { cascade: true })
    @JoinColumn({ name: "coverFileId" })
    coverFile: StorageFile;

    // user course bridges 
    @OneToMany(_ => UserCourseBridge, x => x.course)
    @JoinColumn()
    userCourseBridges: UserCourseBridge[];
}