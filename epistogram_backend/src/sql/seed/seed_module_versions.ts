
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
    
    module_version_4: {
        courseVersionId: courseVersions.course_version_cyber.id,
        moduleDataId: moduleDatas.module_data_4.id,
        moduleId: modules.module_4.id
    },
    
    module_version_2: {
        courseVersionId: courseVersions.course_version_canva.id,
        moduleDataId: moduleDatas.module_data_2.id,
        moduleId: modules.module_2.id
    },
    
    module_version_3: {
        courseVersionId: courseVersions.course_version_obs.id,
        moduleDataId: moduleDatas.module_data_3.id,
        moduleId: modules.module_3.id
    },
    
    module_version_7: {
        courseVersionId: courseVersions.course_version_obs.id,
        moduleDataId: moduleDatas.module_data_7.id,
        moduleId: modules.module_7.id
    },
    
    module_version_8: {
        courseVersionId: courseVersions.course_version_obs.id,
        moduleDataId: moduleDatas.module_data_8.id,
        moduleId: modules.module_8.id
    },
    
    module_version_35: {
        courseVersionId: courseVersions.course_version_excel.id,
        moduleDataId: moduleDatas.module_data_35.id,
        moduleId: modules.module_35.id
    },
    
    module_version_36: {
        courseVersionId: courseVersions.course_version_excel.id,
        moduleDataId: moduleDatas.module_data_36.id,
        moduleId: modules.module_36.id
    },
    
    module_version_37: {
        courseVersionId: courseVersions.course_version_excel.id,
        moduleDataId: moduleDatas.module_data_37.id,
        moduleId: modules.module_37.id
    },
    
    module_version_38: {
        courseVersionId: courseVersions.course_version_excel.id,
        moduleDataId: moduleDatas.module_data_38.id,
        moduleId: modules.module_38.id
    },
    
    module_version_39: {
        courseVersionId: courseVersions.course_version_excel.id,
        moduleDataId: moduleDatas.module_data_39.id,
        moduleId: modules.module_39.id
    },
    
    module_version_40: {
        courseVersionId: courseVersions.course_version_excel.id,
        moduleDataId: moduleDatas.module_data_40.id,
        moduleId: modules.module_40.id
    },
    
    module_version_41: {
        courseVersionId: courseVersions.course_version_excel.id,
        moduleDataId: moduleDatas.module_data_41.id,
        moduleId: modules.module_41.id
    },
    
    module_version_42: {
        courseVersionId: courseVersions.course_version_excel.id,
        moduleDataId: moduleDatas.module_data_42.id,
        moduleId: modules.module_42.id
    },
    
    module_version_43: {
        courseVersionId: courseVersions.course_version_excel.id,
        moduleDataId: moduleDatas.module_data_43.id,
        moduleId: modules.module_43.id
    },
    
    module_version_44: {
        courseVersionId: courseVersions.course_version_excel.id,
        moduleDataId: moduleDatas.module_data_44.id,
        moduleId: modules.module_44.id
    },
    
    module_version_45: {
        courseVersionId: courseVersions.course_version_word.id,
        moduleDataId: moduleDatas.module_data_45.id,
        moduleId: modules.module_45.id
    },
    
    module_version_47: {
        courseVersionId: courseVersions.course_version_word.id,
        moduleDataId: moduleDatas.module_data_47.id,
        moduleId: modules.module_47.id
    },
    
    module_version_48: {
        courseVersionId: courseVersions.course_version_word.id,
        moduleDataId: moduleDatas.module_data_48.id,
        moduleId: modules.module_48.id
    },
    
    module_version_49: {
        courseVersionId: courseVersions.course_version_word.id,
        moduleDataId: moduleDatas.module_data_49.id,
        moduleId: modules.module_49.id
    },
    
    module_version_50: {
        courseVersionId: courseVersions.course_version_word.id,
        moduleDataId: moduleDatas.module_data_50.id,
        moduleId: modules.module_50.id
    },
    
    module_version_51: {
        courseVersionId: courseVersions.course_version_word.id,
        moduleDataId: moduleDatas.module_data_51.id,
        moduleId: modules.module_51.id
    },
    
    module_version_52: {
        courseVersionId: courseVersions.course_version_word.id,
        moduleDataId: moduleDatas.module_data_52.id,
        moduleId: modules.module_52.id
    },
    
    module_version_53: {
        courseVersionId: courseVersions.course_version_word.id,
        moduleDataId: moduleDatas.module_data_53.id,
        moduleId: modules.module_53.id
    },
    
    module_version_54: {
        courseVersionId: courseVersions.course_version_powerPoint.id,
        moduleDataId: moduleDatas.module_data_54.id,
        moduleId: modules.module_54.id
    },
    
    module_version_55: {
        courseVersionId: courseVersions.course_version_powerPoint.id,
        moduleDataId: moduleDatas.module_data_55.id,
        moduleId: modules.module_55.id
    },
    
    module_version_56: {
        courseVersionId: courseVersions.course_version_powerPoint.id,
        moduleDataId: moduleDatas.module_data_56.id,
        moduleId: modules.module_56.id
    },
    
    module_version_57: {
        courseVersionId: courseVersions.course_version_powerPoint.id,
        moduleDataId: moduleDatas.module_data_57.id,
        moduleId: modules.module_57.id
    },
    
    module_version_58: {
        courseVersionId: courseVersions.course_version_powerPoint.id,
        moduleDataId: moduleDatas.module_data_58.id,
        moduleId: modules.module_58.id
    },
    
    module_version_59: {
        courseVersionId: courseVersions.course_version_powerPoint.id,
        moduleDataId: moduleDatas.module_data_59.id,
        moduleId: modules.module_59.id
    },
    
    module_version_60: {
        courseVersionId: courseVersions.course_version_powerPoint.id,
        moduleDataId: moduleDatas.module_data_60.id,
        moduleId: modules.module_60.id
    },
});

export type ModulesVersionsSeedDataType = ReturnType<typeof getModuleVersionsSeedData>;