import { ExamVersion } from '../../models/entity/exam/ExamVersion';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { ExamSeedDataType } from './seed_exams';
import { ExamDatasSeedDataType } from './seed_exam_datas';
import { ModulesVersionsSeedDataType } from './seed_module_versions';

export const getExamVersionsSeedData = (
    moduleVersions: ModulesVersionsSeedDataType,
    examDatas: ExamDatasSeedDataType,
    exams: ExamSeedDataType) => getSeedList<ExamVersion>()({
        
        signup_exam_version: {
            moduleVersionId: moduleVersions.module_version_2.id,
            examDataId: examDatas.signup_exam_data.id,
            examId: exams.signup_exam.id
        },

        exam_version_8: {
            moduleVersionId: moduleVersions.module_version_2.id,
            examDataId: examDatas.exam_data_8.id,
            examId: exams.exam_8.id
        },

        exam_version_9: {
            moduleVersionId: moduleVersions.module_version_2.id,
            examDataId: examDatas.exam_data_9.id,
            examId: exams.exam_9.id
        },

        exam_version_10: {
            moduleVersionId: moduleVersions.module_version_8.id,
            examDataId: examDatas.exam_data_10.id,
            examId: exams.exam_10.id
        },

        exam_version_15: {
            moduleVersionId: moduleVersions.module_version_38.id,
            examDataId: examDatas.exam_data_15.id,
            examId: exams.exam_15.id
        },

        exam_version_16: {
            moduleVersionId: moduleVersions.module_version_39.id,
            examDataId: examDatas.exam_data_16.id,
            examId: exams.exam_16.id
        },

        exam_version_17: {
            moduleVersionId: moduleVersions.module_version_41.id,
            examDataId: examDatas.exam_data_17.id,
            examId: exams.exam_17.id
        },

        exam_version_18: {
            moduleVersionId: moduleVersions.module_version_42.id,
            examDataId: examDatas.exam_data_18.id,
            examId: exams.exam_18.id
        },

        exam_version_20: {
            moduleVersionId: moduleVersions.module_version_44.id,
            examDataId: examDatas.exam_data_20.id,
            examId: exams.exam_20.id
        },

        exam_version_21: {
            moduleVersionId: moduleVersions.module_version_45.id,
            examDataId: examDatas.exam_data_21.id,
            examId: exams.exam_21.id
        },

        exam_version_12: {
            moduleVersionId: moduleVersions.module_version_35.id,
            examDataId: examDatas.exam_data_12.id,
            examId: exams.exam_12.id
        },

        exam_version_13: {
            moduleVersionId: moduleVersions.module_version_36.id,
            examDataId: examDatas.exam_data_13.id,
            examId: exams.exam_13.id
        },

        exam_version_14: {
            moduleVersionId: moduleVersions.module_version_37.id,
            examDataId: examDatas.exam_data_14.id,
            examId: exams.exam_14.id
        },

        exam_version_22: {
            moduleVersionId: moduleVersions.module_version_47.id,
            examDataId: examDatas.exam_data_22.id,
            examId: exams.exam_22.id
        },

        exam_version_23: {
            moduleVersionId: moduleVersions.module_version_48.id,
            examDataId: examDatas.exam_data_23.id,
            examId: exams.exam_23.id
        },

        exam_version_24: {
            moduleVersionId: moduleVersions.module_version_50.id,
            examDataId: examDatas.exam_data_24.id,
            examId: exams.exam_24.id
        },

        exam_version_25: {
            moduleVersionId: moduleVersions.module_version_51.id,
            examDataId: examDatas.exam_data_25.id,
            examId: exams.exam_25.id
        },

        exam_version_26: {
            moduleVersionId: moduleVersions.module_version_53.id,
            examDataId: examDatas.exam_data_26.id,
            examId: exams.exam_26.id
        },

        exam_version_27: {
            moduleVersionId: moduleVersions.module_version_54.id,
            examDataId: examDatas.exam_data_27.id,
            examId: exams.exam_27.id
        },

        exam_version_28: {
            moduleVersionId: moduleVersions.module_version_55.id,
            examDataId: examDatas.exam_data_28.id,
            examId: exams.exam_28.id
        },

        exam_version_29: {
            moduleVersionId: moduleVersions.module_version_56.id,
            examDataId: examDatas.exam_data_29.id,
            examId: exams.exam_29.id
        },

        exam_version_30: {
            moduleVersionId: moduleVersions.module_version_57.id,
            examDataId: examDatas.exam_data_30.id,
            examId: exams.exam_30.id
        },

        exam_version_31: {
            moduleVersionId: moduleVersions.module_version_58.id,
            examDataId: examDatas.exam_data_31.id,
            examId: exams.exam_31.id
        },

        exam_version_32: {
            moduleVersionId: moduleVersions.module_version_60.id,
            examDataId: examDatas.exam_data_32.id,
            examId: exams.exam_32.id
        },

        exam_version_pretest_33: {
            moduleVersionId: null,
            examDataId: examDatas.pretest_exam_data_33.id,
            examId: exams.pretest_exam_33.id
        },

        exam_version_pretest_34: {
            moduleVersionId: null,
            examDataId: examDatas.pretest_exam_data_34.id,
            examId: exams.pretest_exam_34.id
        },

        exam_version_pretest_35: {
            moduleVersionId: null,
            examDataId: examDatas.pretest_exam_data_35.id,
            examId: exams.pretest_exam_35.id
        },

        exam_version_pretest_36: {
            moduleVersionId: null,
            examDataId: examDatas.pretest_exam_data_36.id,
            examId: exams.pretest_exam_36.id
        },

        exam_version_pretest_37: {
            moduleVersionId: null,
            examDataId: examDatas.pretest_exam_data_37.id,
            examId: exams.pretest_exam_37.id
        },

        exam_version_pretest_38: {
            moduleVersionId: null,
            examDataId: examDatas.pretest_exam_data_38.id,
            examId: exams.pretest_exam_38.id
        },

        exam_version_pretest_39: {
            moduleVersionId: null,
            examDataId: examDatas.pretest_exam_data_39.id,
            examId: exams.pretest_exam_39.id
        },

        exam_version_pretest_40: {
            moduleVersionId: null,
            examDataId: examDatas.pretest_exam_data_40.id,
            examId: exams.pretest_exam_40.id
        },

        exam_version_pretest_41: {
            moduleVersionId: null,
            examDataId: examDatas.pretest_exam_data_41.id,
            examId: exams.pretest_exam_41.id
        },

        exam_version_pretest_42: {
            moduleVersionId: null,
            examDataId: examDatas.pretest_exam_data_42.id,
            examId: exams.pretest_exam_42.id
        },

        exam_version_pretest_43: {
            moduleVersionId: null,
            examDataId: examDatas.pretest_exam_data_43.id,
            examId: exams.pretest_exam_43.id
        },
    });

export type ExamVersionSeedDataType = ReturnType<typeof getExamVersionsSeedData>;