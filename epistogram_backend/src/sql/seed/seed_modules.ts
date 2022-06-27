
import { Module } from '../../models/entity/module/Module';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const getModulesSeedData = () => getSeedList<Module>()({

    module_SIGNUP_MODULE: {
        isPretestModule: false
    },

    // insta course pretest module
    module_insta_pretest_1: {
        isPretestModule: true
    },

    // google ads course pretest module
    module_google_ads_pretest_1: {
        isPretestModule: true
    },

    // python course pretest module
    module_python_pretest_1: {
        isPretestModule: true
    },

    // linkedin course pretest module
    module_linked_in_pretest_1: {
        isPretestModule: true
    },

    // cyber course pretest module
    module_cyber_pretest_1: {
        isPretestModule: true
    },
    module_cyber_1: {
        isPretestModule: false
    },

    // canva course pretest module
    module_canva_pretest_1: {
        isPretestModule: true
    },
    module_canva_1: {
        isPretestModule: false
    },

    // obs course pretest module
    module_obs_pretest_1: {
        isPretestModule: true
    },
    module_obs_1: {
        isPretestModule: false
    },
    module_obs_2: {
        isPretestModule: false
    },
    module_obs_3: {
        isPretestModule: false
    },

    // excel course pretest module
    module_excel_pretest_1: {
        isPretestModule: true
    },
    module_excel_bevez: {
        isPretestModule: false
    },
    module_excel_ism_fuggv: {
        isPretestModule: false
    },
    module_excel_3: {
        isPretestModule: false
    },
    module_excel_4: {
        isPretestModule: false
    },
    module_excel_5: {
        isPretestModule: false
    },
    module_excel_6: {
        isPretestModule: false
    },
    module_excel_7: {
        isPretestModule: false
    },
    module_excel_8: {
        isPretestModule: false
    },
    module_excel_9: {
        isPretestModule: false
    },
    module_excel_10: {
        isPretestModule: false
    },

    // word course pretest module
    module_word_pretest_1: {
        isPretestModule: true
    },
    module_word_1: {
        isPretestModule: false
    },
    module_word_2: {
        isPretestModule: false
    },
    module_word_3: {
        isPretestModule: false
    },
    module_word_4: {
        isPretestModule: false
    },
    module_word_5: {
        isPretestModule: false
    },
    module_word_6: {
        isPretestModule: false
    },
    module_word_7: {
        isPretestModule: false
    },
    module_word_8: {
        isPretestModule: false
    },

    // powerPoint course pretest module
    module_powerPoint_pretest_1: {
        isPretestModule: true
    },
    module_pp_1: {
        isPretestModule: false
    },
    module_pp_2: {
        isPretestModule: false
    },
    module_pp_3: {
        isPretestModule: false
    },
    module_pp_4: {
        isPretestModule: false
    },
    module_pp_5: {
        isPretestModule: false
    },
    module_pp_6: {
        isPretestModule: false
    },
    module_pp_7: {
        isPretestModule: false
    },
});

export type ModulesSeedDataType = ReturnType<typeof getModulesSeedData>;