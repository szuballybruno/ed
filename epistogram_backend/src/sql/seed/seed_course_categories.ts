import { CourseCategory } from '../../models/entity/CourseCategory';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { Id } from '../../shared/types/versionId';

export const getCourseCategoriesSeedData = () => getSeedList<CourseCategory>()({

    course_category_1: {
        name: 'IT',
        parentCategoryId: null
    },
    course_category_2: {
        name: 'Hálózatok',
        parentCategoryId: Id.create<'CourseCategory'>(1)
    },
    course_category_3: {
        name: 'Szoftverfejlesztés',
        parentCategoryId: Id.create<'CourseCategory'>(1)
    },
    course_category_4: {
        name: 'E-Commerce',
        parentCategoryId: Id.create<'CourseCategory'>(1)
    },
    course_category_5: {
        name: 'Irodai alkalmazások',
        parentCategoryId: Id.create<'CourseCategory'>(1)
    },
    course_category_6: {
        name: 'Általános IT',
        parentCategoryId: Id.create<'CourseCategory'>(1)
    },
    course_category_7: {
        name: 'Biztonság',
        parentCategoryId: Id.create<'CourseCategory'>(1)
    },
    course_category_8: {
        name: 'Önfejlesztés',
        parentCategoryId: Id.create<'CourseCategory'>(1)
    },
    course_category_9: {
        name: 'Média',
        parentCategoryId: Id.create<'CourseCategory'>(1)
    },
    course_category_10: {
        name: 'Marketing',
        parentCategoryId: Id.create<'CourseCategory'>(1)
    }
});

export type CourseCategoriesSeedDataType = ReturnType<typeof getCourseCategoriesSeedData>;