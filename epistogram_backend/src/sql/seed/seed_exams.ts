import { Exam } from '../../models/entity/exam/Exam';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const getExamSeedData = () => getSeedList<Exam>()({
    signup_exam: {
        isPretest: false,
        isSignup: true,
    },
    exam_excel_elso_temazaro: {
        isPretest: false,
        isSignup: false,
    },
    exam_ism_fuggv_temazaro: {
        isPretest: false,
        isSignup: false,
    },
    exam_10: {
        isPretest: false,
        isSignup: false,
    },
    exam_15: {
        isPretest: false,
        isSignup: false,
    },
    exam_16: {
        isPretest: false,
        isSignup: false,
    },
    exam_17: {
        isPretest: false,
        isSignup: false,
    },
    exam_18: {
        isPretest: false,
        isSignup: false,
    },
    exam_20: {
        isPretest: false,
        isSignup: false,
    },
    exam_21: {
        isPretest: false,
        isSignup: false,
    },
    exam_12: {
        isPretest: false,
        isSignup: false,
    },
    exam_13: {
        isPretest: false,
        isSignup: false,
    },
    exam_14: {
        isPretest: false,
        isSignup: false,
    },
    exam_22: {
        isPretest: false,
        isSignup: false,
    },
    exam_23: {
        isPretest: false,
        isSignup: false,
    },
    exam_24: {
        isPretest: false,
        isSignup: false,
    },
    exam_25: {
        isPretest: false,
        isSignup: false,
    },
    exam_26: {
        isPretest: false,
        isSignup: false,
    },
    exam_27: {
        isPretest: false,
        isSignup: false,
    },
    exam_28: {
        isPretest: false,
        isSignup: false,
    },
    exam_29: {
        isPretest: false,
        isSignup: false,
    },
    exam_30: {
        isPretest: false,
        isSignup: false,
    },
    exam_31: {
        isPretest: false,
        isSignup: false,
    },
    exam_32: {
        isPretest: false,
        isSignup: false,
    },
    pretest_exam_33: {
        isPretest: true,
        isSignup: false,
    },
    pretest_exam_34: {
        isPretest: true,
        isSignup: false,
    },
    pretest_exam_35: {
        isPretest: true,
        isSignup: false,
    },
    pretest_exam_36: {
        isPretest: true,
        isSignup: false,
    },
    pretest_exam_37: {
        isPretest: true,
        isSignup: false,
    },
    pretest_exam_38: {
        isPretest: true,
        isSignup: false,
    },
    pretest_exam_39: {
        isPretest: true,
        isSignup: false,
    },
    pretest_exam_40: {
        isPretest: true,
        isSignup: false,
    },
    pretest_exam_41: {
        isPretest: true,
        isSignup: false,
    },
    pretest_exam_42: {
        isPretest: true,
        isSignup: false,
    },
    pretest_exam_43: {
        isPretest: true,
        isSignup: false,
    }
});

export type ExamSeedDataType = ReturnType<typeof getExamSeedData>;