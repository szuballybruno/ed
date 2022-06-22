
import { Module } from '../../models/entity/module/Module';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const getModulesSeedData = () => getSeedList<Module>()({

    module_SIGNUP_MODULE: {
    },

    // insta course pretest module
    module_insta_pretest_1: {
    },

    // google ads course pretest module
    module_google_ads_pretest_1: {
    },

    // python course pretest module
    module_python_pretest_1: {
    },

    // linkedin course pretest module
    module_linked_in_pretest_1: {
    },

    // cyber course pretest module
    module_cyber_pretest_1: {
    },
    module_4: {
    },

    // canva course pretest module
    module_canva_pretest_1: {
    },
    module_2: {
    },

    // obs course pretest module
    module_obs_pretest_1: {
    },
    module_3: {
    },
    module_7: {
    },
    module_8: {
    },

    // excel course pretest module
    module_excel_pretest_1: {
    },
    module_35: {
    },
    module_36: {
    },
    module_37: {
    },
    module_38: {
    },
    module_39: {
    },
    module_40: {
    },
    module_41: {
    },
    module_42: {
    },
    module_43: {
    },
    module_44: {
    },

    // word course pretest module
    module_word_pretest_1: {
    },
    module_45: {
    },
    module_47: {
    },
    module_48: {
    },
    module_49: {
    },
    module_50: {
    },
    module_51: {
    },
    module_52: {
    },
    module_53: {
    },

    // powerPoint course pretest module
    module_powerPoint_pretest_1: {
    },
    module_54: {
    },
    module_55: {
    },
    module_56: {
    },
    module_57: {
    },
    module_58: {
    },
    module_59: {
    },
    module_60: {
    },
});

export type ModulesSeedDataType = ReturnType<typeof getModulesSeedData>;