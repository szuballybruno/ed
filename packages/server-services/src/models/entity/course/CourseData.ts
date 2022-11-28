import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from '../../MyORM';
import { XOneToMany, XViewColumn } from '@episto/x-orm';
import { CourseVisibilityType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { CourseCategory } from '../misc/CourseCategory';
import { StorageFile } from '../misc/StorageFile';
import { User } from '../misc/User';
import { CourseVersion } from './CourseVersion';

@Entity()
export class CourseData {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'CourseData'>;

    @UpdateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    @XViewColumn()
    modificationDate: Date;

    @Column()
    @XViewColumn()
    title: string;

    @Column()
    @XViewColumn()
    shortDescription: string;

    @Column()
    @XViewColumn()
    description: string;

    @Column({ type: 'double precision' })
    @XViewColumn()
    difficulty: number;

    @Column({ type: 'double precision' })
    @XViewColumn()
    benchmark: number;

    @Column()
    @XViewColumn()
    previouslyCompletedCount: number;

    @Column()
    @XViewColumn()
    language: string;

    @Column()
    @XViewColumn()
    technicalRequirements: string;

    @Column()
    @XViewColumn()
    requirementsDescription: string;

    @Column()
    @XViewColumn()
    isFeatured: boolean;

    @Column()
    @XViewColumn()
    isPrecourseSurveyRequired: boolean;

    @Column()
    @XViewColumn()
    skillBenefits: string;

    @Column()
    humanSkillBenefits: string;

    @Column()
    @XViewColumn()
    humanSkillBenefitsDescription: string;

    @XViewColumn()
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
    @XViewColumn()
    categoryId: Id<'CourseCategory'>;
    @ManyToOne(() => CourseCategory, x => x.categoryCourses)
    @JoinColumn({ name: 'category_id' })
    category: Relation<CourseCategory>;

    // course sub category
    @Column()
    @XViewColumn()
    subCategoryId: Id<'CourseCategory'>;
    @ManyToOne(() => CourseCategory, x => x.subCategoryCourses)
    @JoinColumn({ name: 'sub_category_id' })
    subCategory: CourseCategory;

    // teacher
    @Column()
    @XViewColumn()
    teacherId: Id<'User'>;
    @ManyToOne(() => User, teacher => teacher.teachedCourses)
    @JoinColumn({ name: 'teacher_id' })
    teacher: Relation<User>;

    // coverFile
    @Column({ nullable: true })
    @XViewColumn()
    coverFileId: Id<'StorageFile'> | null;
    @ManyToOne(_ => StorageFile)
    @JoinColumn({ name: 'cover_file_id' })
    coverFile: Relation<StorageFile>;
}