
import { ModuleVersion } from '../../models/entity/module/ModuleVersion';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { CourseVersionsSeedDataType } from './seed_course_versions';
import { ModulesSeedDataType } from './seed_modules';
import { ModuleDatasSeedDataType } from './seed_module_datas';

export const getModuleVersionsSeedData = (
    courseVersions: CourseVersionsSeedDataType,
    moduleDatas: ModuleDatasSeedDataType,
    modules: ModulesSeedDataType
) => getSeedList<ModuleVersion>()({

    module_version_SIGNUP_MODULE: {
        courseVersionId: null,
        moduleDataId: moduleDatas.module_data_SIGNUP_MODULE.id,
        moduleId: modules.module_SIGNUP_MODULE.id
    },

    // insta course pretest module version
    module_version_insta_pretest_1: {
        courseVersionId: courseVersions.course_version_insta.id,
        moduleDataId: moduleDatas.module_data_insta_pretest_1.id,
        moduleId: modules.module_insta_pretest_1.id
    },

    // google ads course pretest module version
    module_version_google_ads_pretest_1: {
        courseVersionId: courseVersions.course_version_google_ads.id,
        moduleDataId: moduleDatas.module_data_google_ads_pretest_1.id,
        moduleId: modules.module_google_ads_pretest_1.id
    },

    // python course pretest module version
    module_version_python_pretest_1: {
        courseVersionId: courseVersions.course_version_python.id,
        moduleDataId: moduleDatas.module_data_python_pretest_1.id,
        moduleId: modules.module_python_pretest_1.id
    },

    // linkedin course pretest module version
    module_version_linked_in_pretest_1: {
        courseVersionId: courseVersions.course_version_linked_in.id,
        moduleDataId: moduleDatas.module_data_linked_in_pretest_1.id,
        moduleId: modules.module_linked_in_pretest_1.id
    },

    // cyber course pretest module version
    module_version_cyber_pretest_1: {
        courseVersionId: courseVersions.course_version_cyber.id,
        moduleDataId: moduleDatas.module_data_cyber_pretest_1.id,
        moduleId: modules.module_cyber_pretest_1.id
    },

    module_version_cyber_1: {
        courseVersionId: courseVersions.course_version_cyber.id,
        moduleDataId: moduleDatas.module_data_cyber_1.id,
        moduleId: modules.module_cyber_1.id
    },

    // canva course pretest module version
    module_version_canva_pretest_1: {
        courseVersionId: courseVersions.course_version_canva.id,
        moduleDataId: moduleDatas.module_data_canva_pretest_1.id,
        moduleId: modules.module_canva_pretest_1.id
    },

    // obs course pretest module version
    module_version_obs_pretest_1: {
        courseVersionId: courseVersions.course_version_obs.id,
        moduleDataId: moduleDatas.module_data_obs_pretest_1.id,
        moduleId: modules.module_obs_pretest_1.id
    },

    module_version_obs_1: {
        courseVersionId: courseVersions.course_version_obs.id,
        moduleDataId: moduleDatas.module_data_3.id,
        moduleId: modules.module_obs_1.id
    },

    module_version_obs_2: {
        courseVersionId: courseVersions.course_version_obs.id,
        moduleDataId: moduleDatas.module_data_7.id,
        moduleId: modules.module_obs_2.id
    },

    module_version_obs_3: {
        courseVersionId: courseVersions.course_version_obs.id,
        moduleDataId: moduleDatas.module_data_8.id,
        moduleId: modules.module_obs_3.id
    },

    // excel course pretest module version
    module_version_excel_pretest_1: {
        courseVersionId: courseVersions.course_version_excel.id,
        moduleDataId: moduleDatas.module_data_excel_pretest_1.id,
        moduleId: modules.module_excel_pretest_1.id
    },

    module_version_excel_1: {
        courseVersionId: courseVersions.course_version_excel.id,
        moduleDataId: moduleDatas.module_data_excel_1.id,
        moduleId: modules.module_excel_1.id
    },

    module_version_excel_2: {
        courseVersionId: courseVersions.course_version_excel.id,
        moduleDataId: moduleDatas.module_data_excel_3.id,
        moduleId: modules.module_excel_2.id
    },

    module_version_excel_3: {
        courseVersionId: courseVersions.course_version_excel.id,
        moduleDataId: moduleDatas.module_data_excel_4.id,
        moduleId: modules.module_excel_3.id
    },

    module_version_excel_4: {
        courseVersionId: courseVersions.course_version_excel.id,
        moduleDataId: moduleDatas.module_data_excel_5.id,
        moduleId: modules.module_excel_4.id
    },

    module_version_excel_5: {
        courseVersionId: courseVersions.course_version_excel.id,
        moduleDataId: moduleDatas.module_data_excel_6.id,
        moduleId: modules.module_excel_5.id
    },

    module_version_excel_6: {
        courseVersionId: courseVersions.course_version_excel.id,
        moduleDataId: moduleDatas.module_data_excel_7.id,
        moduleId: modules.module_excel_6.id
    },

    module_version_excel_7: {
        courseVersionId: courseVersions.course_version_excel.id,
        moduleDataId: moduleDatas.module_data_excel_8.id,
        moduleId: modules.module_excel_7.id
    },

    module_version_excel_8: {
        courseVersionId: courseVersions.course_version_excel.id,
        moduleDataId: moduleDatas.module_data_excel_9.id,
        moduleId: modules.module_excel_8.id
    },

    module_version_excel_9: {
        courseVersionId: courseVersions.course_version_excel.id,
        moduleDataId: moduleDatas.module_data_excel_10.id,
        moduleId: modules.module_excel_9.id
    },

    module_version_excel_10: {
        courseVersionId: courseVersions.course_version_excel.id,
        moduleDataId: moduleDatas.module_data_excel_11.id,
        moduleId: modules.module_excel_10.id
    },

    // word course pretest module version
    module_version_word_pretest_1: {
        courseVersionId: courseVersions.course_version_word.id,
        moduleDataId: moduleDatas.module_data_word_pretest_1.id,
        moduleId: modules.module_word_pretest_1.id
    },

    module_version_word_1: {
        courseVersionId: courseVersions.course_version_word.id,
        moduleDataId: moduleDatas.module_data_word_1.id,
        moduleId: modules.module_word_1.id
    },

    module_version_word_2: {
        courseVersionId: courseVersions.course_version_word.id,
        moduleDataId: moduleDatas.module_data_word_2.id,
        moduleId: modules.module_word_2.id
    },

    module_version_word_3: {
        courseVersionId: courseVersions.course_version_word.id,
        moduleDataId: moduleDatas.module_data_word_3.id,
        moduleId: modules.module_word_3.id
    },

    module_version_word_4: {
        courseVersionId: courseVersions.course_version_word.id,
        moduleDataId: moduleDatas.module_data_word_4.id,
        moduleId: modules.module_word_4.id
    },

    module_version_word_5: {
        courseVersionId: courseVersions.course_version_word.id,
        moduleDataId: moduleDatas.module_data_word_5.id,
        moduleId: modules.module_word_5.id
    },

    module_version_word_6: {
        courseVersionId: courseVersions.course_version_word.id,
        moduleDataId: moduleDatas.module_data_word_6.id,
        moduleId: modules.module_word_6.id
    },

    module_version_word_7: {
        courseVersionId: courseVersions.course_version_word.id,
        moduleDataId: moduleDatas.module_data_word_7.id,
        moduleId: modules.module_word_7.id
    },

    module_version_word_8: {
        courseVersionId: courseVersions.course_version_word.id,
        moduleDataId: moduleDatas.module_data_word_8.id,
        moduleId: modules.module_word_8.id
    },

    // powerPoint course pretest module version
    module_version_powerPoint_pretest_1: {
        courseVersionId: courseVersions.course_version_powerPoint.id,
        moduleDataId: moduleDatas.module_data_powerPoint_pretest_1.id,
        moduleId: modules.module_powerPoint_pretest_1.id
    },

    module_version_pp_1: {
        courseVersionId: courseVersions.course_version_powerPoint.id,
        moduleDataId: moduleDatas.module_data_54.id,
        moduleId: modules.module_pp_1.id
    },

    module_version_pp_2: {
        courseVersionId: courseVersions.course_version_powerPoint.id,
        moduleDataId: moduleDatas.module_data_55.id,
        moduleId: modules.module_pp_2.id
    },

    module_version_pp_3: {
        courseVersionId: courseVersions.course_version_powerPoint.id,
        moduleDataId: moduleDatas.module_data_56.id,
        moduleId: modules.module_pp_3.id
    },

    module_version_pp_4: {
        courseVersionId: courseVersions.course_version_powerPoint.id,
        moduleDataId: moduleDatas.module_data_57.id,
        moduleId: modules.module_pp_4.id
    },

    module_version_pp_5: {
        courseVersionId: courseVersions.course_version_powerPoint.id,
        moduleDataId: moduleDatas.module_data_58.id,
        moduleId: modules.module_pp_5.id
    },

    module_version_pp_6: {
        courseVersionId: courseVersions.course_version_powerPoint.id,
        moduleDataId: moduleDatas.module_data_59.id,
        moduleId: modules.module_pp_6.id
    },

    module_version_pp_7: {
        courseVersionId: courseVersions.course_version_powerPoint.id,
        moduleDataId: moduleDatas.module_data_60.id,
        moduleId: modules.module_pp_7.id
    },
});

export type ModulesVersionsSeedDataType = ReturnType<typeof getModuleVersionsSeedData>;