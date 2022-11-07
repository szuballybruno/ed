import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from '../../MyORM';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { CourseData } from '../course/CourseData';

@Entity()
export class CourseCategory {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'CourseCategory'>;

    @Column()
    @XViewColumn()
    name: string;

    // TO ONE

    // parent category 
    @Column({ nullable: true })
    @XViewColumn()
    parentCategoryId: Id<'CourseCategory'> | null;
    @ManyToOne(_ => CourseCategory, x => x.childCategories)
    @JoinColumn({ name: 'parent_category_id' })
    parentCategory: CourseCategory;

    // TO MANY

    // child categories 
    @OneToMany(_ => CourseCategory, x => x.parentCategory, { cascade: true })
    @JoinColumn()
    childCategories: CourseCategory[];

    // courses
    @OneToMany(_ => CourseData, x => x.category)
    @JoinColumn()
    categoryCourses: CourseData[];

    // courses
    @OneToMany(_ => CourseData, x => x.subCategory)
    @JoinColumn()
    subCategoryCourses: CourseData[];
}