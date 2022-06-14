
import { Module } from '../../models/entity/module/Module';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const getModulesSeedData = () => getSeedList<Module>()({

    module_SIGNUP_MODULE: {
	},
    module_4: {
	},
    module_2: {
	},
    module_3: {
	},
    module_7: {
	},
    module_8: {
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