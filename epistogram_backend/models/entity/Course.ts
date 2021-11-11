import Module from "module";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CourseStateView } from "../views/CourseStateView";
import { CourseCategory } from "./CourseCategory";
import { CourseModule } from "./CourseModule";
import { Exam } from "./Exam";
import { StorageFile } from "./StorageFile";
import { User } from "./User";
import { UserCourseBridge } from "./UserCourseBridge";
import { Video } from "./Video";

@Entity()
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    // course state view
    @OneToOne(_ => CourseStateView, x => x.course)
    @JoinColumn()
    courseState: CourseStateView;

    // course category
    @Column()
    categoryId: number;

    @ManyToOne(() => CourseCategory, x => x.categoryCourses)
    @JoinColumn({ name: "categoryId" })
    category: CourseCategory;

    // course sub category
    @Column()
    subCategoryId: number;

    @ManyToOne(() => CourseCategory, x => x.subCategoryCourses)
    @JoinColumn({ name: "subCategoryId" })
    subCategory: CourseCategory;

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

    // modules 
    @OneToMany(_ => CourseModule, x => x.course)
    @JoinColumn()
    modules: Module[];
}