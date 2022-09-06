import {CourseCategory} from '../../models/entity/CourseCategory';
import {getSeedList} from '../../services/sqlServices/SeedService';
import {Id} from '../../shared/types/versionId';

export const getCourseCategoriesSeedData = () => getSeedList<CourseCategory>()({


    // MAIN CATEGORY: software development
    course_category_software_development: {
        name: 'Szoftverfejlesztés',
        parentCategoryId: null
    },

    // SUBCATEGORIES for software development
    course_category_software_development_sub_web_development: {
        name: 'Webfejlesztés',
        parentCategoryId: Id.create<'CourseCategory'>(1)
    },
    course_category_software_development_sub_data_science: {
        name: 'Data Science',
        parentCategoryId: Id.create<'CourseCategory'>(1)
    },
    course_category_software_development_sub__mobile_development: {
        name: 'Mobil fejlesztés',
        parentCategoryId: Id.create<'CourseCategory'>(1)
    },
    course_category_software_development_sub_software_testing: {
        name: 'Szoftvertesztelés',
        parentCategoryId: Id.create<'CourseCategory'>(1)
    },
    course_category_software_development_sub_developer_tools: {
        name: 'Fejlesztői eszközök',
        parentCategoryId: Id.create<'CourseCategory'>(1)
    },
    course_category_software_development_sub_programming_languages: {
        name: 'Programnyelvek',
        parentCategoryId: Id.create<'CourseCategory'>(1)
    },

    // MAIN CATEGORY: businesses
    course_category_2: {
        name: 'Üzlet és vállalkozás',
        parentCategoryId: null
    },

    // SUBCATEGORIES for businesses
    course_category_businesses_sub_business: {
        name: 'Vállalkozás',
        parentCategoryId: Id.create<'CourseCategory'>(2)
    },
    course_category_businesses_sub_management: {
        name: 'Management',
        parentCategoryId: Id.create<'CourseCategory'>(2)
    },
    course_category_businesses_sub_communication: {
        name: 'Kommunikáció',
        parentCategoryId: Id.create<'CourseCategory'>(2)
    },
    course_category_businesses_sub_sales: {
        name: 'Sales',
        parentCategoryId: Id.create<'CourseCategory'>(2)
    },
    course_category_businesses_sub_strategies: {
        name: 'Stratégia',
        parentCategoryId: Id.create<'CourseCategory'>(2)
    },
    course_category_businesses_sub_project_management: {
        name: 'Project management',
        parentCategoryId: Id.create<'CourseCategory'>(2)
    },
    course_category_businesses_sub_business_law: {
        name: 'Üzleti jog',
        parentCategoryId: Id.create<'CourseCategory'>(2)
    },
    course_category_businesses_sub_business_analysis: {
        name: 'Üzleti analízis',
        parentCategoryId: Id.create<'CourseCategory'>(2)
    },
    course_category_businesses_sub_human_resources: {
        name: 'Emberi erőforrások',
        parentCategoryId: Id.create<'CourseCategory'>(2)
    },
    course_category_businesses_sub_e_commerce: {
        name: 'E-Commerce',
        parentCategoryId: Id.create<'CourseCategory'>(2)
    },
    course_category_businesses_sub_property_investment: {
        name: 'Ingatlanbefektetés',
        parentCategoryId: Id.create<'CourseCategory'>(2)
    },

    // MAIN CATEGORY: financials
    course_category_financials: {
        name: 'Pénzügyek',
        parentCategoryId: null
    },

    // MAIN CATEGORY: IT and software
    course_category_it_and_software: {
        name: 'IT és szoftverek',
        parentCategoryId: null
    },

    // MAIN CATEGORY: Office applications
    course_category_office_applications: {
        name: 'Irodai alkalmazások',
        parentCategoryId: null
    },

    // MAIN CATEGORY: Self development, soft skills
    course_category_self_development_soft_skills: {
        name: 'Önfejlesztés, softskillek',
        parentCategoryId: null
    },

    // MAIN CATEGORY: Design and multimedia
    course_category_design_and_multimedia: {
        name: 'Design és multimédia',
        parentCategoryId: null
    },

    // MAIN CATEGORY: Marketing
    course_category_marketing: {
        name: 'Marketing',
        parentCategoryId: null
    },

    // MAIN CATEGORY: Lifestyle
    course_category_lifestyle: {
        name: 'Életmód',
        parentCategoryId: null
    },

    // MAIN CATEGORY: Language learning
    course_category_language_learning: {
        name: 'Nyelvtanulás',
        parentCategoryId: null
    },

});

export type CourseCategoriesSeedDataType = ReturnType<typeof getCourseCategoriesSeedData>;
