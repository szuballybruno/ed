import { Exam } from '../../models/entity/exam/Exam';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const getExamSeedData = () => getSeedList<Exam>()({
    signup_exam: {
	},
    exam_8: {
	},
    exam_9: {
	},
    exam_10: {
	},
    exam_15: {
	},
    exam_16: {
	},
    exam_17: {
	},
    exam_18: {
	},
    exam_20: {
	},
    exam_21: {
	},
    exam_12: {
	},
    exam_13: {
	},
    exam_14: {
	},
    exam_22: {
	},
    exam_23: {
	},
    exam_24: {
	},
    exam_25: {
	},
    exam_26: {
	},
    exam_27: {
	},
    exam_28: {
	},
    exam_29: {
	},
    exam_30: {
	},
    exam_31: {
	},
    exam_32: {
	},
    pretest_exam_33: {
	},
    pretest_exam_34: {
	},
    pretest_exam_35: {
	},
    pretest_exam_36: {
	},
    pretest_exam_37: {
	},
    pretest_exam_38: {
	},
    pretest_exam_39: {
	},
    pretest_exam_40: {
	},
    pretest_exam_41: {
	},
    pretest_exam_42: {
	},
    pretest_exam_43: {
	}
});

export type ExamSeedDataType = ReturnType<typeof getExamSeedData>;