import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from 'typeorm';
import { XOneToMany } from '../../../services/XORM/XORMDecorators';
import { CourseVisibilityType } from '../../../shared/types/sharedTypes';
import { CourseCategory } from '../CourseCategory';
import { StorageFile } from '../StorageFile';
import { User } from '../User';
import { CourseVersion } from './CourseVersion';

@Entity()
export class CourseData {

    @PrimaryGeneratedColumn()
    id: number;

    @UpdateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    modificationDate: Date;

    @Column()
    title: string;

    @Column()
    shortDescription: string;

    @Column()
    description: string;

    @Column({ type: 'double precision' })
    difficulty: number;

    @Column({ type: 'double precision' })
    benchmark: number;

    @Column()
    previouslyCompletedCount: number;

    @Column()
    language: string;

    @Column()
    technicalRequirements: string;

    @Column()
    requirementsDescription: string;

    @Column()
    skillBenefits: string;

    @Column()
    humanSkillBenefits: string;

    @Column()
    humanSkillBenefitsDescription: string;

    @Column({ default: 'public', type: 'text' })
    visibility: CourseVisibilityType;

    //
    // TO MANY
    //

    @XOneToMany<CourseData>()(() => CourseVersion, x => x.courseData)
    courseVersions: CourseVersion[];

    //
    // TO ONE
    //

    // course category
    @Column()
    categoryId: number;

    @ManyToOne(() => CourseCategory, x => x.categoryCourses)
    @JoinColumn({ name: 'category_id' })
    category: Relation<CourseCategory>;

    // course sub category
    @Column()
    subCategoryId: number;

    @ManyToOne(() => CourseCategory, x => x.subCategoryCourses)
    @JoinColumn({ name: 'sub_category_id' })
    subCategory: CourseCategory;

    // teacher
    @Column()
    teacherId: number;

    @ManyToOne(() => User, teacher => teacher.teachedCourses)
    @JoinColumn({ name: 'teacher_id' })
    teacher: Relation<User>;

    // coverFile
    @Column({ nullable: true })
    coverFileId: number | null;

    @ManyToOne(_ => StorageFile, x => x.courses, { cascade: true })
    @JoinColumn({ name: 'cover_file_id' })
    coverFile: Relation<StorageFile>;
}