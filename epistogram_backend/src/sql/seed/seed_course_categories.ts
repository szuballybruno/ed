import { CourseCategory } from '../../models/entity/CourseCategory';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const getCourseCategoriesSeedData = () => getSeedList<CourseCategory>()({

    course_category_1: {
        name: 'IT',
        parentCategoryId: null
    },
    course_category_2: {
        name: 'Hálózatok',
        parentCategoryId: 1
    },
    course_category_3: {
        name: 'Szoftverfejlesztés',
        parentCategoryId: 1
    },
    course_category_4: {
        name: 'E-Commerce',
        parentCategoryId: 1
    },
    course_category_5: {
        name: 'Irodai alkalmazások',
        parentCategoryId: 1
    },
    course_category_6: {
        name: 'Általános IT',
        parentCategoryId: 1
    },
    course_category_7: {
        name: 'Biztonság',
        parentCategoryId: 1
    },
    course_category_8: {
        name: 'Önfejlesztés',
        parentCategoryId: 1
    },
    course_category_9: {
        name: 'Média',
        parentCategoryId: 1
    },
    course_category_10: {
        name: 'Marketing',
        parentCategoryId: 1
    }
});

export type CourseCategoriesSeedDataType = ReturnType<typeof getCourseCategoriesSeedData>;