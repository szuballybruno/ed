import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './Course';

@Entity()
export class CourseCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // parent category 
    @Column({ nullable: true })
    parentCategoryId: number;

    @ManyToOne(_ => CourseCategory, x => x.childCategories)
    @JoinColumn({ name: 'parent_category_id' })
    parentCategory: CourseCategory;

    // child categories 
    @OneToMany(_ => CourseCategory, x => x.parentCategory, { cascade: true })
    @JoinColumn()
    childCategories: CourseCategory[];

    // courses
    @OneToMany(_ => Course, x => x.category)
    @JoinColumn()
    categoryCourses: Course[];

    // courses
    @OneToMany(_ => Course, x => x.subCategory)
    @JoinColumn()
    subCategoryCourses: Course[];
}