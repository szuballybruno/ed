import Module from 'module';
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsDeletedFlag } from '../../services/ORMConnectionService/ORMConnectionDecorators';
import { CourseVisibilityType } from '../../shared/types/sharedTypes';
import { CourseStateView } from '../views/CourseStateView';
import { CourseCategory } from './CourseCategory';
import { CourseModule } from './CourseModule';
import { CourseRatingGroup } from './courseRating/CourseRatingGroup';
import { CourseRatingQuestionUserAnswer } from './courseRating/CourseRatingQuestionUserAnswer';
import { Exam } from './Exam';
import { PrequizQuestion } from './prequiz/PrequizQuestion';
import { PrequizUserAnswer } from './prequiz/PrequizUserAnswer';
import { ShopItem } from './ShopItem';
import { StorageFile } from './StorageFile';
import { User } from './User';
import { UserCourseAccessBridge } from './UserCourseAccessBridge';
import { UserCourseBridge } from './UserCourseBridge';
import { Video } from './Video';

@Entity()
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @UpdateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    modificationDate: Date;

    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date;
    
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

    // course state view
    @OneToOne(_ => CourseStateView, x => x.course)
    @JoinColumn()
    courseState: CourseStateView;

    // course category
    @Column()
    categoryId: number;

    @ManyToOne(() => CourseCategory, x => x.categoryCourses)
    @JoinColumn({ name: 'category_id' })
    category: CourseCategory;

    // course sub category
    @Column()
    subCategoryId: number;

    @ManyToOne(() => CourseCategory, x => x.subCategoryCourses)
    @JoinColumn({ name: 'sub_category_id' })
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
    teacherId: number;

    @ManyToOne(() => User, teacher => teacher.teachedCourses)
    @JoinColumn({ name: 'teacher_id' })
    teacher: User;

    // coverFile
    @Column({ nullable: true })
    coverFileId: number | null;

    @ManyToOne(_ => StorageFile, x => x.courses, { cascade: true })
    @JoinColumn({ name: 'cover_file_id' })
    coverFile: StorageFile;

    // user course bridges 
    @OneToMany(_ => UserCourseBridge, x => x.course)
    @JoinColumn()
    userCourseBridges: UserCourseBridge[];

    // modules 
    @OneToMany(_ => CourseModule, x => x.course)
    @JoinColumn()
    modules: Module[];

    // courseAccessBridges
    @JoinColumn()
    @OneToMany(_ => UserCourseAccessBridge, x => x.course)
    userAccessBridges: UserCourseAccessBridge[];

    // shop items
    @ManyToOne(_ => ShopItem, x => x.course)
    @JoinColumn()
    shopItems: ShopItem[];

    // prequiz questions
    @OneToMany(_ => PrequizUserAnswer, x => x.course)
    @JoinColumn()
    prequizUserAnswers: PrequizUserAnswer[];

    // courseRatingUserAnswers
    @JoinColumn()
    @OneToMany(_ => CourseRatingQuestionUserAnswer, x => x.course)
    courseRatingUserAnswers: CourseRatingQuestionUserAnswer[];
}