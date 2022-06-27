
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
    module_cyber_1: {
    },

    // canva course pretest module
    module_canva_pretest_1: {
    },
    module_canva_1: {
    },

    // obs course pretest module
    module_obs_pretest_1: {
    },
    module_obs_1: {
    },
    module_obs_2: {
    },
    module_obs_3: {
    },

    // excel course pretest module
    module_excel_pretest_1: {
    },
    module_excel_bevez: {
    },
    module_excel_ism_fuggv: {
    },
    module_excel_3: {
    },
    module_excel_4: {
    },
    module_excel_5: {
    },
    module_excel_6: {
    },
    module_excel_7: {
    },
    module_excel_8: {
    },
    module_excel_9: {
    },
    module_excel_10: {
    },

    // word course pretest module
    module_word_pretest_1: {
    },
    module_word_1: {
    },
    module_word_2: {
    },
    module_word_3: {
    },
    module_word_4: {
    },
    module_word_5: {
    },
    module_word_6: {
    },
    module_word_7: {
    },
    module_word_8: {
    },

    // powerPoint course pretest module
    module_powerPoint_pretest_1: {
    },
    module_pp_1: {
    },
    module_pp_2: {
    },
    module_pp_3: {
    },
    module_pp_4: {
    },
    module_pp_5: {
    },
    module_pp_6: {
    },
    module_pp_7: {
    },
});

export type ModulesSeedDataType = ReturnType<typeof getModulesSeedData>;