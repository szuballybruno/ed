import { CourseCategory } from '../../models/entity/misc/CourseCategory';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { Id } from '../../shared/types/versionId';

export const getCourseCategoriesSeedData = () => getSeedList<CourseCategory>()({


    // MAIN CATEGORY: software development
    course_category_software_development: {
        name: 'Szoftverfejlesztés',
        parentCategoryId: null
    },

    // MAIN CATEGORY: businesses
    course_category_2: {
        name: 'Üzlet és vállalkozás',
        parentCategoryId: null
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


    // SUBCATEGORIES for businesses
    course_category_financials_sub_bookkeeping_and_accounting: {
        name: 'Könyvelés és számvitel',
        parentCategoryId: Id.create<'CourseCategory'>(3)
    },

    course_category_financials_sub_standards: {
        name: 'Szabványok',
        parentCategoryId: Id.create<'CourseCategory'>(3)
    },

    course_category_financials_sub_economy: {
        name: 'Közgazdaság',
        parentCategoryId: Id.create<'CourseCategory'>(3)
    },

    course_category_financials_sub_finances: {
        name: 'Pénzügy',
        parentCategoryId: Id.create<'CourseCategory'>(3)
    },

    course_category_financials_sub_investment_and_trading: {
        name: 'Befektetés és kereskedés',
        parentCategoryId: Id.create<'CourseCategory'>(3)
    },

    course_category_financials_sub_taxation: {
        name: 'Adózás',
        parentCategoryId: Id.create<'CourseCategory'>(3)
    },

    course_category_financials_sub_cryptocurrencies: {
        name: 'Kriptovaluták',
        parentCategoryId: Id.create<'CourseCategory'>(3)
    },


    // SUBCATEGORIES for IT and software
    course_category_it_and_software_sub_certificates: {
        name: 'Certifikációk',
        parentCategoryId: Id.create<'CourseCategory'>(4)
    },

    course_category_it_and_software_sub_network_and_security: {
        name: 'Hálózat és biztonság',
        parentCategoryId: Id.create<'CourseCategory'>(4)
    },

    course_category_it_and_software_sub_hardware: {
        name: 'Hardver',
        parentCategoryId: Id.create<'CourseCategory'>(4)
    },

    course_category_it_and_software_sub_operating_systems: {
        name: 'Operációs rendszerek',
        parentCategoryId: Id.create<'CourseCategory'>(4)
    },

    course_category_it_and_software_sub_other_it: {
        name: 'Egyéb IT',
        parentCategoryId: Id.create<'CourseCategory'>(4)
    },


    // SUBCATEGORIES for Office applications
    course_category_office_applications_sub_microsoft: {
        name: 'Microsoft',
        parentCategoryId: Id.create<'CourseCategory'>(5)
    },

    course_category_office_applications_sub_apple: {
        name: 'Apple',
        parentCategoryId: Id.create<'CourseCategory'>(5)
    },

    course_category_office_applications_sub_google: {
        name: 'Google',
        parentCategoryId: Id.create<'CourseCategory'>(5)
    },

    course_category_office_applications_sub_sap: {
        name: 'SAP',
        parentCategoryId: Id.create<'CourseCategory'>(5)
    },

    course_category_office_applications_sub_other_office_applications: {
        name: 'Egyéb irodai alkalmazások',
        parentCategoryId: Id.create<'CourseCategory'>(5)
    },


    // SUBCATEGORIES for Design and multimedia
    course_category_design_and_multimedia_sub_webdesign: {
        name: 'Webdesign',
        parentCategoryId: Id.create<'CourseCategory'>(7)
    },

    course_category_design_and_multimedia_sub_graphics_and_illustrations: {
        name: 'Grafika és illusztráció',
        parentCategoryId: Id.create<'CourseCategory'>(7)
    },

    course_category_design_and_multimedia_sub_graphics_softwares: {
        name: 'Grafikai szoftverek',
        parentCategoryId: Id.create<'CourseCategory'>(7)
    },

    course_category_design_and_multimedia_sub_ux_design: {
        name: 'UX Design',
        parentCategoryId: Id.create<'CourseCategory'>(7)
    },

    course_category_design_and_multimedia_sub_3D_and_animation: {
        name: '3D és animáció',
        parentCategoryId: Id.create<'CourseCategory'>(7)
    },

    course_category_design_and_multimedia_sub_interior_design: {
        name: 'Interior design',
        parentCategoryId: Id.create<'CourseCategory'>(7)
    },


    // SUBCATEGORIES for Marketing
    course_category_marketing_sub_digital_marketing: {
        name: 'Webdesign',
        parentCategoryId: Id.create<'CourseCategory'>(8)
    },

    course_category_marketing_sub_seo: {
        name: 'Keresőoptimalizálás (SEO)',
        parentCategoryId: Id.create<'CourseCategory'>(8)
    },

    course_category_marketing_sub_social_media_marketing: {
        name: 'Social Media Marketing',
        parentCategoryId: Id.create<'CourseCategory'>(8)
    },

    course_category_marketing_sub_branding: {
        name: 'Branding',
        parentCategoryId: Id.create<'CourseCategory'>(8)
    },

    course_category_marketing_sub_marketing_basics: {
        name: 'Marketing alapismeretek',
        parentCategoryId: Id.create<'CourseCategory'>(8)
    },

    course_category_marketing_sub_marketing_analytics_and_automating: {
        name: 'Marketing analítis és automatizálás',
        parentCategoryId: Id.create<'CourseCategory'>(8)
    },

    course_category_marketing_sub_PR: {
        name: 'PR',
        parentCategoryId: Id.create<'CourseCategory'>(8)
    },

    course_category_marketing_sub_paid_ads: {
        name: 'Fizetett hirdetések',
        parentCategoryId: Id.create<'CourseCategory'>(8)
    },


    // SUBCATEGORIES for Lifestyle
    course_category_lifestyle_sub_health_and_fitness: {
        name: 'Fizetett hirdetések',
        parentCategoryId: Id.create<'CourseCategory'>(9)
    },

    course_category_lifestyle_sub_arts: {
        name: 'Művészetek',
        parentCategoryId: Id.create<'CourseCategory'>(9)
    },

    course_category_lifestyle_sub_gaming: {
        name: 'Gaming',
        parentCategoryId: Id.create<'CourseCategory'>(9)
    },

    course_category_lifestyle_sub_beauty_care: {
        name: 'Szépségápolás',
        parentCategoryId: Id.create<'CourseCategory'>(9)
    },


    // SUBCATEGORIES for Language learning
    course_category_language_learning_sub_business_language_course: {
        name: 'Üzleti nyelvtanfolyam',
        parentCategoryId: Id.create<'CourseCategory'>(10)
    },

    course_category_language_learning_sub_conversational_language_skills: {
        name: 'Társalgási nyelvismeretek',
        parentCategoryId: Id.create<'CourseCategory'>(10)
    },


});

export type CourseCategoriesSeedDataType = ReturnType<typeof getCourseCategoriesSeedData>;
