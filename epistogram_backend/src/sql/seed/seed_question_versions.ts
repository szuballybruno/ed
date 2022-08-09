import { QuestionVersion } from '../../models/entity/question/QuestionVersion';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { ExamVersionSeedDataType } from './seed_exam_versions';
import { PersonalityTraitCategoriesSeedType } from './seed_personality_trait_categories';
import { QuestionSeedDataType } from './seed_questions';
import { QuestionDatasSeedType } from './seed_question_datas';
import { VideoVersionSeedDataType } from './seed_video_versions';

export const getQuestionVersionsSeedData = (
    questions: QuestionSeedDataType,
    questionDatas: QuestionDatasSeedType,
    examVersions: ExamVersionSeedDataType,
    videoVersions: VideoVersionSeedDataType,
    personalityTraitCategories: PersonalityTraitCategoriesSeedType
) => getSeedList<QuestionVersion>()({

    question_version_1: {
        questionId: questions.question_1.id,
        questionDataId: questionDatas.question_data_1.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_1.id,
    },

    question_version_2: {
        questionId: questions.question_2.id,
        questionDataId: questionDatas.question_data_2.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_1.id,
    },

    question_version_3: {
        questionId: questions.question_3.id,
        questionDataId: questionDatas.question_data_3.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_1.id,
    },

    question_version_4: {
        questionId: questions.question_4.id,
        questionDataId: questionDatas.question_data_4.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_1.id,
    },

    question_version_5: {
        questionId: questions.question_5.id,
        questionDataId: questionDatas.question_data_5.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_1.id,
    },

    question_version_6: {
        questionId: questions.question_6.id,
        questionDataId: questionDatas.question_data_6.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_1.id,
    },

    question_version_7: {
        questionId: questions.question_7.id,
        questionDataId: questionDatas.question_data_7.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_1.id,
    },

    question_version_8: {
        questionId: questions.question_8.id,
        questionDataId: questionDatas.question_data_8.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_2.id,
    },

    question_version_9: {
        questionId: questions.question_9.id,
        questionDataId: questionDatas.question_data_9.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_2.id,
    },

    question_version_10: {
        questionId: questions.question_10.id,
        questionDataId: questionDatas.question_data_10.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_2.id,
    },

    question_version_11: {
        questionId: questions.question_11.id,
        questionDataId: questionDatas.question_data_11.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_2.id,
    },

    question_version_12: {
        questionId: questions.question_12.id,
        questionDataId: questionDatas.question_data_12.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_2.id,
    },

    question_version_13: {
        questionId: questions.question_13.id,
        questionDataId: questionDatas.question_data_13.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_2.id,
    },

    question_version_14: {
        questionId: questions.question_14.id,
        questionDataId: questionDatas.question_data_14.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_2.id,
    },

    question_version_15: {
        questionId: questions.question_15.id,
        questionDataId: questionDatas.question_data_15.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_3.id,
    },

    question_version_16: {
        questionId: questions.question_16.id,
        questionDataId: questionDatas.question_data_16.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_3.id,
    },

    question_version_17: {
        questionId: questions.question_17.id,
        questionDataId: questionDatas.question_data_17.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_3.id,
    },

    question_version_18: {
        questionId: questions.question_18.id,
        questionDataId: questionDatas.question_data_18.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_3.id,
    },

    question_version_19: {
        questionId: questions.question_19.id,
        questionDataId: questionDatas.question_data_19.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_3.id,
    },

    question_version_20: {
        questionId: questions.question_20.id,
        questionDataId: questionDatas.question_data_20.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_3.id,
    },

    question_version_21: {
        questionId: questions.question_21.id,
        questionDataId: questionDatas.question_data_21.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_3.id,
    },

    question_version_22: {
        questionId: questions.question_22.id,
        questionDataId: questionDatas.question_data_22.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_4.id,
    },

    question_version_23: {
        questionId: questions.question_23.id,
        questionDataId: questionDatas.question_data_23.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_4.id,
    },

    question_version_24: {
        questionId: questions.question_24.id,
        questionDataId: questionDatas.question_data_24.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_4.id,
    },

    question_version_25: {
        questionId: questions.question_25.id,
        questionDataId: questionDatas.question_data_25.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_4.id,
    },

    question_version_26: {
        questionId: questions.question_26.id,
        questionDataId: questionDatas.question_data_26.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_4.id,
    },

    question_version_27: {
        questionId: questions.question_27.id,
        questionDataId: questionDatas.question_data_27.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_4.id,
    },

    question_version_28: {
        questionId: questions.question_28.id,
        questionDataId: questionDatas.question_data_28.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_4.id,
    },

    question_version_29: {
        questionId: questions.question_29.id,
        questionDataId: questionDatas.question_data_29.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_5.id,
    },

    question_version_30: {
        questionId: questions.question_30.id,
        questionDataId: questionDatas.question_data_30.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_5.id,
    },

    question_version_31: {
        questionId: questions.question_31.id,
        questionDataId: questionDatas.question_data_31.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_5.id,
    },

    question_version_32: {
        questionId: questions.question_32.id,
        questionDataId: questionDatas.question_data_32.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_5.id,
    },

    question_version_33: {
        questionId: questions.question_33.id,
        questionDataId: questionDatas.question_data_33.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_5.id,
    },

    question_version_34: {
        questionId: questions.question_34.id,
        questionDataId: questionDatas.question_data_34.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_5.id,
    },

    question_version_35: {
        questionId: questions.question_35.id,
        questionDataId: questionDatas.question_data_35.id,
        examVersionId: examVersions.signup_exam_version.id,
        videoVersionId: null,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_5.id,
    },

    // -------------------------------- NORMAL QUESTIONS 

    question_version_48: {
        questionId: questions.question_48.id,
        questionDataId: questionDatas.question_data_48.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_37.id,
        personalityTraitCategoryId: null,
    },

    question_version_47: {
        questionId: questions.question_47.id,
        questionDataId: questionDatas.question_data_47.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_31.id,
        personalityTraitCategoryId: null,
    },

    question_version_excel_exam_1: {
        questionId: questions.question_54.id,
        questionDataId: questionDatas.question_data_54.id,
        examVersionId: examVersions.exam_version_excel_elso_temazaro.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_excel_exam_2: {
        questionId: questions.question_53.id,
        questionDataId: questionDatas.question_data_53.id,
        examVersionId: examVersions.exam_version_excel_elso_temazaro.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_excel_exam_3: {
        questionId: questions.question_55.id,
        questionDataId: questionDatas.question_data_55.id,
        examVersionId: examVersions.exam_version_excel_elso_temazaro.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_excel_exam_4: {
        questionId: questions.question_56.id,
        questionDataId: questionDatas.question_data_56.id,
        examVersionId: examVersions.exam_version_excel_elso_temazaro.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_excel_exam_5: {
        questionId: questions.question_52.id,
        questionDataId: questionDatas.question_data_52.id,
        examVersionId: examVersions.exam_version_excel_elso_temazaro.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_excel_exam_6: {
        questionId: questions.question_199.id,
        questionDataId: questionDatas.question_data_199.id,
        examVersionId: examVersions.exam_version_excel_elso_temazaro.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_excel_exam_7: {
        questionId: questions.question_200.id,
        questionDataId: questionDatas.question_data_200.id,
        examVersionId: examVersions.exam_version_excel_elso_temazaro.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_excel_exam_8: {
        questionId: questions.question_201.id,
        questionDataId: questionDatas.question_data_201.id,
        examVersionId: examVersions.exam_version_excel_elso_temazaro.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_excel_exam_9: {
        questionId: questions.question_202.id,
        questionDataId: questionDatas.question_data_202.id,
        examVersionId: examVersions.exam_version_excel_elso_temazaro.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_excel_exam_10: {
        questionId: questions.question_203.id,
        questionDataId: questionDatas.question_data_203.id,
        examVersionId: examVersions.exam_version_excel_elso_temazaro.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_excel_exam_11: {
        questionId: questions.question_204.id,
        questionDataId: questionDatas.question_data_204.id,
        examVersionId: examVersions.exam_version_excel_elso_temazaro.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_excel_exam_12: {
        questionId: questions.question_205.id,
        questionDataId: questionDatas.question_data_205.id,
        examVersionId: examVersions.exam_version_excel_elso_temazaro.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_excel_exam_13: {
        questionId: questions.question_206.id,
        questionDataId: questionDatas.question_data_206.id,
        examVersionId: examVersions.exam_version_excel_elso_temazaro.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_49: {
        questionId: questions.question_49.id,
        questionDataId: questionDatas.question_data_49.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_38.id,
        personalityTraitCategoryId: null,
    },

    question_version_50: {
        questionId: questions.question_50.id,
        questionDataId: questionDatas.question_data_50.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_39.id,
        personalityTraitCategoryId: null,
    },

    question_version_51: {
        questionId: questions.question_51.id,
        questionDataId: questionDatas.question_data_51.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_40.id,
        personalityTraitCategoryId: null,
    },

    question_version_59: {
        questionId: questions.question_59.id,
        questionDataId: questionDatas.question_data_59.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_53.id,
        personalityTraitCategoryId: null,
    },

    question_version_58: {
        questionId: questions.question_58.id,
        questionDataId: questionDatas.question_data_58.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_52.id,
        personalityTraitCategoryId: null,
    },

    question_version_60: {
        questionId: questions.question_60.id,
        questionDataId: questionDatas.question_data_60.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_54.id,
        personalityTraitCategoryId: null,
    },

    question_version_61: {
        questionId: questions.question_61.id,
        questionDataId: questionDatas.question_data_61.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_56.id,
        personalityTraitCategoryId: null,
    },

    question_version_62: {
        questionId: questions.question_62.id,
        questionDataId: questionDatas.question_data_62.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_28.id,
        personalityTraitCategoryId: null,
    },

    question_version_63: {
        questionId: questions.question_63.id,
        questionDataId: questionDatas.question_data_63.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_29.id,
        personalityTraitCategoryId: null,
    },

    question_version_64: {
        questionId: questions.question_64.id,
        questionDataId: questionDatas.question_data_64.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_87.id,
        personalityTraitCategoryId: null,
    },

    question_version_65: {
        questionId: questions.question_65.id,
        questionDataId: questionDatas.question_data_65.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_88.id,
        personalityTraitCategoryId: null,
    },

    question_version_67: {
        questionId: questions.question_67.id,
        questionDataId: questionDatas.question_data_67.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_89.id,
        personalityTraitCategoryId: null,
    },

    question_version_68: {
        questionId: questions.question_68.id,
        questionDataId: questionDatas.question_data_68.id,
        examVersionId: examVersions.exam_version_10.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_69: {
        questionId: questions.question_69.id,
        questionDataId: questionDatas.question_data_69.id,
        examVersionId: examVersions.exam_version_10.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_70: {
        questionId: questions.question_70.id,
        questionDataId: questionDatas.question_data_70.id,
        examVersionId: examVersions.exam_version_10.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_71: {
        questionId: questions.question_71.id,
        questionDataId: questionDatas.question_data_71.id,
        examVersionId: examVersions.exam_version_10.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_72: {
        questionId: questions.question_72.id,
        questionDataId: questionDatas.question_data_72.id,
        examVersionId: examVersions.exam_version_10.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_73: {
        questionId: questions.question_73.id,
        questionDataId: questionDatas.question_data_73.id,
        examVersionId: examVersions.exam_version_10.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_80: {
        questionId: questions.question_80.id,
        questionDataId: questionDatas.question_data_80.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_30.id,
        personalityTraitCategoryId: null,
    },

    question_version_81: {
        questionId: questions.question_81.id,
        questionDataId: questionDatas.question_data_81.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_57.id,
        personalityTraitCategoryId: null,
    },

    question_version_82: {
        questionId: questions.question_82.id,
        questionDataId: questionDatas.question_data_82.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_58.id,
        personalityTraitCategoryId: null,
    },

    question_version_83: {
        questionId: questions.question_83.id,
        questionDataId: questionDatas.question_data_83.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_61.id,
        personalityTraitCategoryId: null,
    },

    question_version_84: {
        questionId: questions.question_84.id,
        questionDataId: questionDatas.question_data_84.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_62.id,
        personalityTraitCategoryId: null,
    },

    question_version_85: {
        questionId: questions.question_85.id,
        questionDataId: questionDatas.question_data_85.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_63.id,
        personalityTraitCategoryId: null,
    },

    question_version_86: {
        questionId: questions.question_86.id,
        questionDataId: questionDatas.question_data_86.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_67.id,
        personalityTraitCategoryId: null,
    },

    question_version_87: {
        questionId: questions.question_87.id,
        questionDataId: questionDatas.question_data_87.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_68.id,
        personalityTraitCategoryId: null,
    },

    question_version_88: {
        questionId: questions.question_88.id,
        questionDataId: questionDatas.question_data_88.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_69.id,
        personalityTraitCategoryId: null,
    },

    question_version_89: {
        questionId: questions.question_89.id,
        questionDataId: questionDatas.question_data_89.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_70.id,
        personalityTraitCategoryId: null,
    },

    question_version_90: {
        questionId: questions.question_90.id,
        questionDataId: questionDatas.question_data_90.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_71.id,
        personalityTraitCategoryId: null,
    },

    question_version_91: {
        questionId: questions.question_91.id,
        questionDataId: questionDatas.question_data_91.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_72.id,
        personalityTraitCategoryId: null,
    },

    question_version_92: {
        questionId: questions.question_92.id,
        questionDataId: questionDatas.question_data_92.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_73.id,
        personalityTraitCategoryId: null,
    },

    question_version_93: {
        questionId: questions.question_93.id,
        questionDataId: questionDatas.question_data_93.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_74.id,
        personalityTraitCategoryId: null,
    },

    question_version_94: {
        questionId: questions.question_94.id,
        questionDataId: questionDatas.question_data_94.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_75.id,
        personalityTraitCategoryId: null,
    },

    question_version_95: {
        questionId: questions.question_95.id,
        questionDataId: questionDatas.question_data_95.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_76.id,
        personalityTraitCategoryId: null,
    },

    question_version_96: {
        questionId: questions.question_96.id,
        questionDataId: questionDatas.question_data_96.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_77.id,
        personalityTraitCategoryId: null,
    },

    question_version_97: {
        questionId: questions.question_97.id,
        questionDataId: questionDatas.question_data_97.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_78.id,
        personalityTraitCategoryId: null,
    },

    question_version_98: {
        questionId: questions.question_98.id,
        questionDataId: questionDatas.question_data_98.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_79.id,
        personalityTraitCategoryId: null,
    },

    question_version_99: {
        questionId: questions.question_99.id,
        questionDataId: questionDatas.question_data_99.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_80.id,
        personalityTraitCategoryId: null,
    },

    question_version_100: {
        questionId: questions.question_100.id,
        questionDataId: questionDatas.question_data_100.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_81.id,
        personalityTraitCategoryId: null,
    },

    question_version_101: {
        questionId: questions.question_101.id,
        questionDataId: questionDatas.question_data_101.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_82.id,
        personalityTraitCategoryId: null,
    },

    question_version_102: {
        questionId: questions.question_102.id,
        questionDataId: questionDatas.question_data_102.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_83.id,
        personalityTraitCategoryId: null,
    },

    question_version_66: {
        questionId: questions.question_66.id,
        questionDataId: questionDatas.question_data_66.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_89.id,
        personalityTraitCategoryId: null,
    },

    /*     question_version_57: {
            questionId: questions.question_57.id,
            questionDataId: questionDatas.question_data_57.id,
            examVersionId: null,
            videoVersionId: videoVersions.video_version_27.id,
            personalityTraitCategoryId: null,
        }, */

    question_version_103: {
        questionId: questions.question_103.id,
        questionDataId: questionDatas.question_data_103.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_132.id,
        personalityTraitCategoryId: null,
    },

    question_version_104: {
        questionId: questions.question_104.id,
        questionDataId: questionDatas.question_data_104.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_133.id,
        personalityTraitCategoryId: null,
    },

    question_version_105: {
        questionId: questions.question_105.id,
        questionDataId: questionDatas.question_data_105.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_134.id,
        personalityTraitCategoryId: null,
    },

    question_version_106: {
        questionId: questions.question_106.id,
        questionDataId: questionDatas.question_data_106.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_135.id,
        personalityTraitCategoryId: null,
    },

    question_version_107: {
        questionId: questions.question_107.id,
        questionDataId: questionDatas.question_data_107.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_136.id,
        personalityTraitCategoryId: null,
    },

    question_version_108: {
        questionId: questions.question_108.id,
        questionDataId: questionDatas.question_data_108.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_138.id,
        personalityTraitCategoryId: null,
    },

    question_version_109: {
        questionId: questions.question_109.id,
        questionDataId: questionDatas.question_data_109.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_140.id,
        personalityTraitCategoryId: null,
    },

    question_version_110: {
        questionId: questions.question_110.id,
        questionDataId: questionDatas.question_data_110.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_141.id,
        personalityTraitCategoryId: null,
    },

    question_version_111: {
        questionId: questions.question_111.id,
        questionDataId: questionDatas.question_data_111.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_143.id,
        personalityTraitCategoryId: null,
    },

    question_version_112: {
        questionId: questions.question_112.id,
        questionDataId: questionDatas.question_data_112.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_144.id,
        personalityTraitCategoryId: null,
    },

    question_version_114: {
        questionId: questions.question_114.id,
        questionDataId: questionDatas.question_data_114.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_148.id,
        personalityTraitCategoryId: null,
    },

    question_version_115: {
        questionId: questions.question_115.id,
        questionDataId: questionDatas.question_data_115.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_149.id,
        personalityTraitCategoryId: null,
    },

    question_version_116: {
        questionId: questions.question_116.id,
        questionDataId: questionDatas.question_data_116.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_152.id,
        personalityTraitCategoryId: null,
    },

    question_version_172: {
        questionId: questions.question_172.id,
        questionDataId: questionDatas.question_data_172.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_139.id,
        personalityTraitCategoryId: null,
    },

    question_version_498: {
        questionId: questions.question_498.id,
        questionDataId: questionDatas.question_data_498.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_415.id,
        personalityTraitCategoryId: null,
    },

    question_version_499: {
        questionId: questions.question_499.id,
        questionDataId: questionDatas.question_data_499.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_417.id,
        personalityTraitCategoryId: null,
    },

    question_version_117: {
        questionId: questions.question_117.id,
        questionDataId: questionDatas.question_data_117.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_153.id,
        personalityTraitCategoryId: null,
    },

    question_version_118: {
        questionId: questions.question_118.id,
        questionDataId: questionDatas.question_data_118.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_154.id,
        personalityTraitCategoryId: null,
    },

    question_version_119: {
        questionId: questions.question_119.id,
        questionDataId: questionDatas.question_data_119.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_155.id,
        personalityTraitCategoryId: null,
    },

    question_version_134: {
        questionId: questions.question_134.id,
        questionDataId: questionDatas.question_data_134.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_174.id,
        personalityTraitCategoryId: null,
    },

    question_version_121: {
        questionId: questions.question_121.id,
        questionDataId: questionDatas.question_data_121.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_158.id,
        personalityTraitCategoryId: null,
    },

    question_version_122: {
        questionId: questions.question_122.id,
        questionDataId: questionDatas.question_data_122.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_160.id,
        personalityTraitCategoryId: null,
    },

    question_version_123: {
        questionId: questions.question_123.id,
        questionDataId: questionDatas.question_data_123.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_161.id,
        personalityTraitCategoryId: null,
    },

    question_version_124: {
        questionId: questions.question_124.id,
        questionDataId: questionDatas.question_data_124.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_163.id,
        personalityTraitCategoryId: null,
    },

    question_version_125: {
        questionId: questions.question_125.id,
        questionDataId: questionDatas.question_data_125.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_164.id,
        personalityTraitCategoryId: null,
    },

    question_version_126: {
        questionId: questions.question_126.id,
        questionDataId: questionDatas.question_data_126.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_165.id,
        personalityTraitCategoryId: null,
    },

    question_version_127: {
        questionId: questions.question_127.id,
        questionDataId: questionDatas.question_data_127.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_166.id,
        personalityTraitCategoryId: null,
    },

    question_version_128: {
        questionId: questions.question_128.id,
        questionDataId: questionDatas.question_data_128.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_167.id,
        personalityTraitCategoryId: null,
    },

    question_version_129: {
        questionId: questions.question_129.id,
        questionDataId: questionDatas.question_data_129.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_145.id,
        personalityTraitCategoryId: null,
    },

    question_version_130: {
        questionId: questions.question_130.id,
        questionDataId: questionDatas.question_data_130.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_169.id,
        personalityTraitCategoryId: null,
    },

    question_version_131: {
        questionId: questions.question_131.id,
        questionDataId: questionDatas.question_data_131.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_170.id,
        personalityTraitCategoryId: null,
    },

    question_version_132: {
        questionId: questions.question_132.id,
        questionDataId: questionDatas.question_data_132.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_171.id,
        personalityTraitCategoryId: null,
    },

    question_version_133: {
        questionId: questions.question_133.id,
        questionDataId: questionDatas.question_data_133.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_172.id,
        personalityTraitCategoryId: null,
    },

    question_version_136: {
        questionId: questions.question_136.id,
        questionDataId: questionDatas.question_data_136.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_176.id,
        personalityTraitCategoryId: null,
    },

    question_version_135: {
        questionId: questions.question_135.id,
        questionDataId: questionDatas.question_data_135.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_175.id,
        personalityTraitCategoryId: null,
    },

    question_version_145: {
        questionId: questions.question_145.id,
        questionDataId: questionDatas.question_data_145.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_188.id,
        personalityTraitCategoryId: null,
    },

    question_version_137: {
        questionId: questions.question_137.id,
        questionDataId: questionDatas.question_data_137.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_178.id,
        personalityTraitCategoryId: null,
    },

    question_version_138: {
        questionId: questions.question_138.id,
        questionDataId: questionDatas.question_data_138.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_179.id,
        personalityTraitCategoryId: null,
    },

    question_version_139: {
        questionId: questions.question_139.id,
        questionDataId: questionDatas.question_data_139.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_182.id,
        personalityTraitCategoryId: null,
    },

    question_version_140: {
        questionId: questions.question_140.id,
        questionDataId: questionDatas.question_data_140.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_183.id,
        personalityTraitCategoryId: null,
    },

    question_version_141: {
        questionId: questions.question_141.id,
        questionDataId: questionDatas.question_data_141.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_184.id,
        personalityTraitCategoryId: null,
    },

    question_version_142: {
        questionId: questions.question_142.id,
        questionDataId: questionDatas.question_data_142.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_185.id,
        personalityTraitCategoryId: null,
    },

    question_version_143: {
        questionId: questions.question_143.id,
        questionDataId: questionDatas.question_data_143.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_186.id,
        personalityTraitCategoryId: null,
    },

    question_version_144: {
        questionId: questions.question_144.id,
        questionDataId: questionDatas.question_data_144.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_187.id,
        personalityTraitCategoryId: null,
    },

    question_version_164: {
        questionId: questions.question_164.id,
        questionDataId: questionDatas.question_data_164.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_219.id,
        personalityTraitCategoryId: null,
    },

    question_version_160: {
        questionId: questions.question_160.id,
        questionDataId: questionDatas.question_data_160.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_211.id,
        personalityTraitCategoryId: null,
    },

    question_version_146: {
        questionId: questions.question_146.id,
        questionDataId: questionDatas.question_data_146.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_189.id,
        personalityTraitCategoryId: null,
    },

    question_version_147: {
        questionId: questions.question_147.id,
        questionDataId: questionDatas.question_data_147.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_191.id,
        personalityTraitCategoryId: null,
    },

    question_version_148: {
        questionId: questions.question_148.id,
        questionDataId: questionDatas.question_data_148.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_192.id,
        personalityTraitCategoryId: null,
    },

    question_version_149: {
        questionId: questions.question_149.id,
        questionDataId: questionDatas.question_data_149.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_193.id,
        personalityTraitCategoryId: null,
    },

    question_version_150: {
        questionId: questions.question_150.id,
        questionDataId: questionDatas.question_data_150.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_195.id,
        personalityTraitCategoryId: null,
    },

    question_version_151: {
        questionId: questions.question_151.id,
        questionDataId: questionDatas.question_data_151.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_197.id,
        personalityTraitCategoryId: null,
    },

    question_version_152: {
        questionId: questions.question_152.id,
        questionDataId: questionDatas.question_data_152.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_198.id,
        personalityTraitCategoryId: null,
    },

    question_version_153: {
        questionId: questions.question_153.id,
        questionDataId: questionDatas.question_data_153.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_199.id,
        personalityTraitCategoryId: null,
    },

    question_version_154: {
        questionId: questions.question_154.id,
        questionDataId: questionDatas.question_data_154.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_200.id,
        personalityTraitCategoryId: null,
    },

    question_version_155: {
        questionId: questions.question_155.id,
        questionDataId: questionDatas.question_data_155.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_204.id,
        personalityTraitCategoryId: null,
    },

    question_version_156: {
        questionId: questions.question_156.id,
        questionDataId: questionDatas.question_data_156.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_206.id,
        personalityTraitCategoryId: null,
    },

    question_version_157: {
        questionId: questions.question_157.id,
        questionDataId: questionDatas.question_data_157.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_207.id,
        personalityTraitCategoryId: null,
    },

    question_version_158: {
        questionId: questions.question_158.id,
        questionDataId: questionDatas.question_data_158.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_208.id,
        personalityTraitCategoryId: null,
    },

    question_version_159: {
        questionId: questions.question_159.id,
        questionDataId: questionDatas.question_data_159.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_210.id,
        personalityTraitCategoryId: null,
    },

    question_version_161: {
        questionId: questions.question_161.id,
        questionDataId: questionDatas.question_data_161.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_213.id,
        personalityTraitCategoryId: null,
    },

    question_version_162: {
        questionId: questions.question_162.id,
        questionDataId: questionDatas.question_data_162.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_216.id,
        personalityTraitCategoryId: null,
    },

    question_version_163: {
        questionId: questions.question_163.id,
        questionDataId: questionDatas.question_data_163.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_218.id,
        personalityTraitCategoryId: null,
    },

    question_version_165: {
        questionId: questions.question_165.id,
        questionDataId: questionDatas.question_data_165.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_220.id,
        personalityTraitCategoryId: null,
    },

    question_version_166: {
        questionId: questions.question_166.id,
        questionDataId: questionDatas.question_data_166.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_221.id,
        personalityTraitCategoryId: null,
    },

    question_version_167: {
        questionId: questions.question_167.id,
        questionDataId: questionDatas.question_data_167.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_222.id,
        personalityTraitCategoryId: null,
    },

    question_version_168: {
        questionId: questions.question_168.id,
        questionDataId: questionDatas.question_data_168.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_227.id,
        personalityTraitCategoryId: null,
    },

    question_version_169: {
        questionId: questions.question_169.id,
        questionDataId: questionDatas.question_data_169.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_228.id,
        personalityTraitCategoryId: null,
    },

    question_version_170: {
        questionId: questions.question_170.id,
        questionDataId: questionDatas.question_data_170.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_234.id,
        personalityTraitCategoryId: null,
    },

    question_version_171: {
        questionId: questions.question_171.id,
        questionDataId: questionDatas.question_data_171.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_236.id,
        personalityTraitCategoryId: null,
    },

    question_version_173: {
        questionId: questions.question_173.id,
        questionDataId: questionDatas.question_data_173.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_142.id,
        personalityTraitCategoryId: null,
    },

    question_version_113: {
        questionId: questions.question_113.id,
        questionDataId: questionDatas.question_data_113.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_147.id,
        personalityTraitCategoryId: null,
    },

    question_version_174: {
        questionId: questions.question_174.id,
        questionDataId: questionDatas.question_data_174.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_150.id,
        personalityTraitCategoryId: null,
    },

    question_version_120: {
        questionId: questions.question_120.id,
        questionDataId: questionDatas.question_data_120.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_156.id,
        personalityTraitCategoryId: null,
    },

    question_version_175: {
        questionId: questions.question_175.id,
        questionDataId: questionDatas.question_data_175.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_157.id,
        personalityTraitCategoryId: null,
    },

    question_version_176: {
        questionId: questions.question_176.id,
        questionDataId: questionDatas.question_data_176.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_159.id,
        personalityTraitCategoryId: null,
    },

    question_version_177: {
        questionId: questions.question_177.id,
        questionDataId: questionDatas.question_data_177.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_168.id,
        personalityTraitCategoryId: null,
    },

    question_version_178: {
        questionId: questions.question_178.id,
        questionDataId: questionDatas.question_data_178.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_173.id,
        personalityTraitCategoryId: null,
    },

    question_version_179: {
        questionId: questions.question_179.id,
        questionDataId: questionDatas.question_data_179.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_177.id,
        personalityTraitCategoryId: null,
    },

    question_version_180: {
        questionId: questions.question_180.id,
        questionDataId: questionDatas.question_data_180.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_180.id,
        personalityTraitCategoryId: null,
    },

    question_version_181: {
        questionId: questions.question_181.id,
        questionDataId: questionDatas.question_data_181.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_181.id,
        personalityTraitCategoryId: null,
    },

    question_version_182: {
        questionId: questions.question_182.id,
        questionDataId: questionDatas.question_data_182.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_196.id,
        personalityTraitCategoryId: null,
    },

    question_version_183: {
        questionId: questions.question_183.id,
        questionDataId: questionDatas.question_data_183.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_240.id,
        personalityTraitCategoryId: null,
    },

    question_version_184: {
        questionId: questions.question_184.id,
        questionDataId: questionDatas.question_data_184.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_241.id,
        personalityTraitCategoryId: null,
    },

    question_version_185: {
        questionId: questions.question_185.id,
        questionDataId: questionDatas.question_data_185.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_242.id,
        personalityTraitCategoryId: null,
    },

    question_version_186: {
        questionId: questions.question_186.id,
        questionDataId: questionDatas.question_data_186.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_245.id,
        personalityTraitCategoryId: null,
    },

    question_version_187: {
        questionId: questions.question_187.id,
        questionDataId: questionDatas.question_data_187.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_246.id,
        personalityTraitCategoryId: null,
    },

    question_version_188: {
        questionId: questions.question_188.id,
        questionDataId: questionDatas.question_data_188.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_247.id,
        personalityTraitCategoryId: null,
    },

    question_version_189: {
        questionId: questions.question_189.id,
        questionDataId: questionDatas.question_data_189.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_248.id,
        personalityTraitCategoryId: null,
    },

    question_version_190: {
        questionId: questions.question_190.id,
        questionDataId: questionDatas.question_data_190.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_249.id,
        personalityTraitCategoryId: null,
    },

    question_version_191: {
        questionId: questions.question_191.id,
        questionDataId: questionDatas.question_data_191.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_250.id,
        personalityTraitCategoryId: null,
    },

    question_version_192: {
        questionId: questions.question_192.id,
        questionDataId: questionDatas.question_data_192.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_251.id,
        personalityTraitCategoryId: null,
    },

    question_version_193: {
        questionId: questions.question_193.id,
        questionDataId: questionDatas.question_data_193.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_252.id,
        personalityTraitCategoryId: null,
    },

    question_version_194: {
        questionId: questions.question_194.id,
        questionDataId: questionDatas.question_data_194.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_253.id,
        personalityTraitCategoryId: null,
    },

    question_version_195: {
        questionId: questions.question_195.id,
        questionDataId: questionDatas.question_data_195.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_254.id,
        personalityTraitCategoryId: null,
    },

    question_version_196: {
        questionId: questions.question_196.id,
        questionDataId: questionDatas.question_data_196.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_255.id,
        personalityTraitCategoryId: null,
    },

    question_version_197: {
        questionId: questions.question_197.id,
        questionDataId: questionDatas.question_data_197.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_256.id,
        personalityTraitCategoryId: null,
    },

    question_version_198: {
        questionId: questions.question_198.id,
        questionDataId: questionDatas.question_data_198.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_257.id,
        personalityTraitCategoryId: null,
    },

    question_version_223: {
        questionId: questions.question_223.id,
        questionDataId: questionDatas.question_data_223.id,
        examVersionId: examVersions.exam_version_15.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_230: {
        questionId: questions.question_230.id,
        questionDataId: questionDatas.question_data_230.id,
        examVersionId: examVersions.exam_version_15.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_207: {
        questionId: questions.question_207.id,
        questionDataId: questionDatas.question_data_207.id,
        examVersionId: examVersions.exam_version_13.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_208: {
        questionId: questions.question_208.id,
        questionDataId: questionDatas.question_data_208.id,
        examVersionId: examVersions.exam_version_13.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_209: {
        questionId: questions.question_209.id,
        questionDataId: questionDatas.question_data_209.id,
        examVersionId: examVersions.exam_version_13.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_210: {
        questionId: questions.question_210.id,
        questionDataId: questionDatas.question_data_210.id,
        examVersionId: examVersions.exam_version_13.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_211: {
        questionId: questions.question_211.id,
        questionDataId: questionDatas.question_data_211.id,
        examVersionId: examVersions.exam_version_13.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_212: {
        questionId: questions.question_212.id,
        questionDataId: questionDatas.question_data_212.id,
        examVersionId: examVersions.exam_version_13.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_213: {
        questionId: questions.question_213.id,
        questionDataId: questionDatas.question_data_213.id,
        examVersionId: examVersions.exam_version_14.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_214: {
        questionId: questions.question_214.id,
        questionDataId: questionDatas.question_data_214.id,
        examVersionId: examVersions.exam_version_14.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_215: {
        questionId: questions.question_215.id,
        questionDataId: questionDatas.question_data_215.id,
        examVersionId: examVersions.exam_version_14.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_216: {
        questionId: questions.question_216.id,
        questionDataId: questionDatas.question_data_216.id,
        examVersionId: examVersions.exam_version_14.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_217: {
        questionId: questions.question_217.id,
        questionDataId: questionDatas.question_data_217.id,
        examVersionId: examVersions.exam_version_14.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_218: {
        questionId: questions.question_218.id,
        questionDataId: questionDatas.question_data_218.id,
        examVersionId: examVersions.exam_version_14.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_219: {
        questionId: questions.question_219.id,
        questionDataId: questionDatas.question_data_219.id,
        examVersionId: examVersions.exam_version_14.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_220: {
        questionId: questions.question_220.id,
        questionDataId: questionDatas.question_data_220.id,
        examVersionId: examVersions.exam_version_14.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_221: {
        questionId: questions.question_221.id,
        questionDataId: questionDatas.question_data_221.id,
        examVersionId: examVersions.exam_version_14.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_242: {
        questionId: questions.question_242.id,
        questionDataId: questionDatas.question_data_242.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_287.id,
        personalityTraitCategoryId: null,
    },

    question_version_234: {
        questionId: questions.question_234.id,
        questionDataId: questionDatas.question_data_234.id,
        examVersionId: examVersions.exam_version_16.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_235: {
        questionId: questions.question_235.id,
        questionDataId: questionDatas.question_data_235.id,
        examVersionId: examVersions.exam_version_16.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_236: {
        questionId: questions.question_236.id,
        questionDataId: questionDatas.question_data_236.id,
        examVersionId: examVersions.exam_version_16.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_237: {
        questionId: questions.question_237.id,
        questionDataId: questionDatas.question_data_237.id,
        examVersionId: examVersions.exam_version_16.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_238: {
        questionId: questions.question_238.id,
        questionDataId: questionDatas.question_data_238.id,
        examVersionId: examVersions.exam_version_16.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_239: {
        questionId: questions.question_239.id,
        questionDataId: questionDatas.question_data_239.id,
        examVersionId: examVersions.exam_version_16.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_240: {
        questionId: questions.question_240.id,
        questionDataId: questionDatas.question_data_240.id,
        examVersionId: examVersions.exam_version_16.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_241: {
        questionId: questions.question_241.id,
        questionDataId: questionDatas.question_data_241.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_286.id,
        personalityTraitCategoryId: null,
    },

    question_version_243: {
        questionId: questions.question_243.id,
        questionDataId: questionDatas.question_data_243.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_258.id,
        personalityTraitCategoryId: null,
    },

    question_version_244: {
        questionId: questions.question_244.id,
        questionDataId: questionDatas.question_data_244.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_366.id,
        personalityTraitCategoryId: null,
    },

    question_version_245: {
        questionId: questions.question_245.id,
        questionDataId: questionDatas.question_data_245.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_263.id,
        personalityTraitCategoryId: null,
    },

    question_version_246: {
        questionId: questions.question_246.id,
        questionDataId: questionDatas.question_data_246.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_264.id,
        personalityTraitCategoryId: null,
    },

    question_version_247: {
        questionId: questions.question_247.id,
        questionDataId: questionDatas.question_data_247.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_265.id,
        personalityTraitCategoryId: null,
    },

    question_version_248: {
        questionId: questions.question_248.id,
        questionDataId: questionDatas.question_data_248.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_266.id,
        personalityTraitCategoryId: null,
    },

    question_version_249: {
        questionId: questions.question_249.id,
        questionDataId: questionDatas.question_data_249.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_267.id,
        personalityTraitCategoryId: null,
    },

    question_version_250: {
        questionId: questions.question_250.id,
        questionDataId: questionDatas.question_data_250.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_268.id,
        personalityTraitCategoryId: null,
    },

    question_version_251: {
        questionId: questions.question_251.id,
        questionDataId: questionDatas.question_data_251.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_269.id,
        personalityTraitCategoryId: null,
    },

    question_version_252: {
        questionId: questions.question_252.id,
        questionDataId: questionDatas.question_data_252.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_270.id,
        personalityTraitCategoryId: null,
    },

    question_version_253: {
        questionId: questions.question_253.id,
        questionDataId: questionDatas.question_data_253.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_271.id,
        personalityTraitCategoryId: null,
    },

    question_version_254: {
        questionId: questions.question_254.id,
        questionDataId: questionDatas.question_data_254.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_272.id,
        personalityTraitCategoryId: null,
    },

    question_version_255: {
        questionId: questions.question_255.id,
        questionDataId: questionDatas.question_data_255.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_273.id,
        personalityTraitCategoryId: null,
    },

    question_version_256: {
        questionId: questions.question_256.id,
        questionDataId: questionDatas.question_data_256.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_274.id,
        personalityTraitCategoryId: null,
    },

    question_version_257: {
        questionId: questions.question_257.id,
        questionDataId: questionDatas.question_data_257.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_275.id,
        personalityTraitCategoryId: null,
    },

    question_version_258: {
        questionId: questions.question_258.id,
        questionDataId: questionDatas.question_data_258.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_276.id,
        personalityTraitCategoryId: null,
    },

    question_version_259: {
        questionId: questions.question_259.id,
        questionDataId: questionDatas.question_data_259.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_277.id,
        personalityTraitCategoryId: null,
    },

    question_version_260: {
        questionId: questions.question_260.id,
        questionDataId: questionDatas.question_data_260.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_278.id,
        personalityTraitCategoryId: null,
    },

    question_version_261: {
        questionId: questions.question_261.id,
        questionDataId: questionDatas.question_data_261.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_279.id,
        personalityTraitCategoryId: null,
    },

    question_version_262: {
        questionId: questions.question_262.id,
        questionDataId: questionDatas.question_data_262.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_280.id,
        personalityTraitCategoryId: null,
    },

    question_version_263: {
        questionId: questions.question_263.id,
        questionDataId: questionDatas.question_data_263.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_281.id,
        personalityTraitCategoryId: null,
    },

    question_version_264: {
        questionId: questions.question_264.id,
        questionDataId: questionDatas.question_data_264.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_282.id,
        personalityTraitCategoryId: null,
    },

    question_version_265: {
        questionId: questions.question_265.id,
        questionDataId: questionDatas.question_data_265.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_283.id,
        personalityTraitCategoryId: null,
    },

    question_version_266: {
        questionId: questions.question_266.id,
        questionDataId: questionDatas.question_data_266.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_284.id,
        personalityTraitCategoryId: null,
    },

    question_version_267: {
        questionId: questions.question_267.id,
        questionDataId: questionDatas.question_data_267.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_285.id,
        personalityTraitCategoryId: null,
    },

    question_version_268: {
        questionId: questions.question_268.id,
        questionDataId: questionDatas.question_data_268.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_288.id,
        personalityTraitCategoryId: null,
    },

    question_version_269: {
        questionId: questions.question_269.id,
        questionDataId: questionDatas.question_data_269.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_290.id,
        personalityTraitCategoryId: null,
    },

    question_version_270: {
        questionId: questions.question_270.id,
        questionDataId: questionDatas.question_data_270.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_291.id,
        personalityTraitCategoryId: null,
    },

    question_version_271: {
        questionId: questions.question_271.id,
        questionDataId: questionDatas.question_data_271.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_292.id,
        personalityTraitCategoryId: null,
    },

    question_version_272: {
        questionId: questions.question_272.id,
        questionDataId: questionDatas.question_data_272.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_293.id,
        personalityTraitCategoryId: null,
    },

    question_version_273: {
        questionId: questions.question_273.id,
        questionDataId: questionDatas.question_data_273.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_294.id,
        personalityTraitCategoryId: null,
    },

    question_version_274: {
        questionId: questions.question_274.id,
        questionDataId: questionDatas.question_data_274.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_295.id,
        personalityTraitCategoryId: null,
    },

    question_version_275: {
        questionId: questions.question_275.id,
        questionDataId: questionDatas.question_data_275.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_296.id,
        personalityTraitCategoryId: null,
    },

    question_version_276: {
        questionId: questions.question_276.id,
        questionDataId: questionDatas.question_data_276.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_297.id,
        personalityTraitCategoryId: null,
    },

    question_version_277: {
        questionId: questions.question_277.id,
        questionDataId: questionDatas.question_data_277.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_298.id,
        personalityTraitCategoryId: null,
    },

    question_version_278: {
        questionId: questions.question_278.id,
        questionDataId: questionDatas.question_data_278.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_299.id,
        personalityTraitCategoryId: null,
    },

    question_version_279: {
        questionId: questions.question_279.id,
        questionDataId: questionDatas.question_data_279.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_300.id,
        personalityTraitCategoryId: null,
    },

    question_version_280: {
        questionId: questions.question_280.id,
        questionDataId: questionDatas.question_data_280.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_301.id,
        personalityTraitCategoryId: null,
    },

    question_version_281: {
        questionId: questions.question_281.id,
        questionDataId: questionDatas.question_data_281.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_302.id,
        personalityTraitCategoryId: null,
    },

    question_version_282: {
        questionId: questions.question_282.id,
        questionDataId: questionDatas.question_data_282.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_303.id,
        personalityTraitCategoryId: null,
    },

    question_version_283: {
        questionId: questions.question_283.id,
        questionDataId: questionDatas.question_data_283.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_304.id,
        personalityTraitCategoryId: null,
    },

    question_version_284: {
        questionId: questions.question_284.id,
        questionDataId: questionDatas.question_data_284.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_305.id,
        personalityTraitCategoryId: null,
    },

    question_version_285: {
        questionId: questions.question_285.id,
        questionDataId: questionDatas.question_data_285.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_306.id,
        personalityTraitCategoryId: null,
    },

    question_version_286: {
        questionId: questions.question_286.id,
        questionDataId: questionDatas.question_data_286.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_307.id,
        personalityTraitCategoryId: null,
    },

    question_version_287: {
        questionId: questions.question_287.id,
        questionDataId: questionDatas.question_data_287.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_308.id,
        personalityTraitCategoryId: null,
    },

    question_version_288: {
        questionId: questions.question_288.id,
        questionDataId: questionDatas.question_data_288.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_309.id,
        personalityTraitCategoryId: null,
    },

    question_version_289: {
        questionId: questions.question_289.id,
        questionDataId: questionDatas.question_data_289.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_310.id,
        personalityTraitCategoryId: null,
    },

    question_version_290: {
        questionId: questions.question_290.id,
        questionDataId: questionDatas.question_data_290.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_311.id,
        personalityTraitCategoryId: null,
    },

    question_version_291: {
        questionId: questions.question_291.id,
        questionDataId: questionDatas.question_data_291.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_312.id,
        personalityTraitCategoryId: null,
    },

    question_version_292: {
        questionId: questions.question_292.id,
        questionDataId: questionDatas.question_data_292.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_313.id,
        personalityTraitCategoryId: null,
    },

    question_version_293: {
        questionId: questions.question_293.id,
        questionDataId: questionDatas.question_data_293.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_314.id,
        personalityTraitCategoryId: null,
    },

    question_version_294: {
        questionId: questions.question_294.id,
        questionDataId: questionDatas.question_data_294.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_315.id,
        personalityTraitCategoryId: null,
    },

    question_version_295: {
        questionId: questions.question_295.id,
        questionDataId: questionDatas.question_data_295.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_316.id,
        personalityTraitCategoryId: null,
    },

    question_version_296: {
        questionId: questions.question_296.id,
        questionDataId: questionDatas.question_data_296.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_317.id,
        personalityTraitCategoryId: null,
    },

    question_version_297: {
        questionId: questions.question_297.id,
        questionDataId: questionDatas.question_data_297.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_318.id,
        personalityTraitCategoryId: null,
    },

    question_version_298: {
        questionId: questions.question_298.id,
        questionDataId: questionDatas.question_data_298.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_319.id,
        personalityTraitCategoryId: null,
    },

    question_version_299: {
        questionId: questions.question_299.id,
        questionDataId: questionDatas.question_data_299.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_320.id,
        personalityTraitCategoryId: null,
    },

    question_version_300: {
        questionId: questions.question_300.id,
        questionDataId: questionDatas.question_data_300.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_321.id,
        personalityTraitCategoryId: null,
    },

    question_version_301: {
        questionId: questions.question_301.id,
        questionDataId: questionDatas.question_data_301.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_322.id,
        personalityTraitCategoryId: null,
    },

    question_version_302: {
        questionId: questions.question_302.id,
        questionDataId: questionDatas.question_data_302.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_323.id,
        personalityTraitCategoryId: null,
    },

    question_version_303: {
        questionId: questions.question_303.id,
        questionDataId: questionDatas.question_data_303.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_324.id,
        personalityTraitCategoryId: null,
    },

    question_version_304: {
        questionId: questions.question_304.id,
        questionDataId: questionDatas.question_data_304.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_325.id,
        personalityTraitCategoryId: null,
    },

    question_version_305: {
        questionId: questions.question_305.id,
        questionDataId: questionDatas.question_data_305.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_326.id,
        personalityTraitCategoryId: null,
    },

    question_version_306: {
        questionId: questions.question_306.id,
        questionDataId: questionDatas.question_data_306.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_327.id,
        personalityTraitCategoryId: null,
    },

    question_version_307: {
        questionId: questions.question_307.id,
        questionDataId: questionDatas.question_data_307.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_328.id,
        personalityTraitCategoryId: null,
    },

    question_version_308: {
        questionId: questions.question_308.id,
        questionDataId: questionDatas.question_data_308.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_329.id,
        personalityTraitCategoryId: null,
    },

    question_version_309: {
        questionId: questions.question_309.id,
        questionDataId: questionDatas.question_data_309.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_330.id,
        personalityTraitCategoryId: null,
    },

    question_version_310: {
        questionId: questions.question_310.id,
        questionDataId: questionDatas.question_data_310.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_331.id,
        personalityTraitCategoryId: null,
    },

    question_version_311: {
        questionId: questions.question_311.id,
        questionDataId: questionDatas.question_data_311.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_332.id,
        personalityTraitCategoryId: null,
    },

    question_version_312: {
        questionId: questions.question_312.id,
        questionDataId: questionDatas.question_data_312.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_333.id,
        personalityTraitCategoryId: null,
    },

    question_version_313: {
        questionId: questions.question_313.id,
        questionDataId: questionDatas.question_data_313.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_334.id,
        personalityTraitCategoryId: null,
    },

    question_version_314: {
        questionId: questions.question_314.id,
        questionDataId: questionDatas.question_data_314.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_335.id,
        personalityTraitCategoryId: null,
    },

    question_version_315: {
        questionId: questions.question_315.id,
        questionDataId: questionDatas.question_data_315.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_336.id,
        personalityTraitCategoryId: null,
    },

    question_version_316: {
        questionId: questions.question_316.id,
        questionDataId: questionDatas.question_data_316.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_337.id,
        personalityTraitCategoryId: null,
    },

    question_version_317: {
        questionId: questions.question_317.id,
        questionDataId: questionDatas.question_data_317.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_338.id,
        personalityTraitCategoryId: null,
    },

    question_version_318: {
        questionId: questions.question_318.id,
        questionDataId: questionDatas.question_data_318.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_340.id,
        personalityTraitCategoryId: null,
    },

    question_version_319: {
        questionId: questions.question_319.id,
        questionDataId: questionDatas.question_data_319.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_341.id,
        personalityTraitCategoryId: null,
    },

    question_version_320: {
        questionId: questions.question_320.id,
        questionDataId: questionDatas.question_data_320.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_342.id,
        personalityTraitCategoryId: null,
    },

    question_version_321: {
        questionId: questions.question_321.id,
        questionDataId: questionDatas.question_data_321.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_343.id,
        personalityTraitCategoryId: null,
    },

    question_version_322: {
        questionId: questions.question_322.id,
        questionDataId: questionDatas.question_data_322.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_344.id,
        personalityTraitCategoryId: null,
    },

    question_version_323: {
        questionId: questions.question_323.id,
        questionDataId: questionDatas.question_data_323.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_350.id,
        personalityTraitCategoryId: null,
    },

    question_version_324: {
        questionId: questions.question_324.id,
        questionDataId: questionDatas.question_data_324.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_345.id,
        personalityTraitCategoryId: null,
    },

    question_version_325: {
        questionId: questions.question_325.id,
        questionDataId: questionDatas.question_data_325.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_346.id,
        personalityTraitCategoryId: null,
    },

    question_version_326: {
        questionId: questions.question_326.id,
        questionDataId: questionDatas.question_data_326.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_347.id,
        personalityTraitCategoryId: null,
    },

    question_version_327: {
        questionId: questions.question_327.id,
        questionDataId: questionDatas.question_data_327.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_348.id,
        personalityTraitCategoryId: null,
    },

    question_version_328: {
        questionId: questions.question_328.id,
        questionDataId: questionDatas.question_data_328.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_349.id,
        personalityTraitCategoryId: null,
    },

    question_version_329: {
        questionId: questions.question_329.id,
        questionDataId: questionDatas.question_data_329.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_351.id,
        personalityTraitCategoryId: null,
    },

    question_version_330: {
        questionId: questions.question_330.id,
        questionDataId: questionDatas.question_data_330.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_352.id,
        personalityTraitCategoryId: null,
    },

    question_version_331: {
        questionId: questions.question_331.id,
        questionDataId: questionDatas.question_data_331.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_353.id,
        personalityTraitCategoryId: null,
    },

    question_version_332: {
        questionId: questions.question_332.id,
        questionDataId: questionDatas.question_data_332.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_354.id,
        personalityTraitCategoryId: null,
    },

    question_version_333: {
        questionId: questions.question_333.id,
        questionDataId: questionDatas.question_data_333.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_355.id,
        personalityTraitCategoryId: null,
    },

    question_version_334: {
        questionId: questions.question_334.id,
        questionDataId: questionDatas.question_data_334.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_357.id,
        personalityTraitCategoryId: null,
    },

    question_version_335: {
        questionId: questions.question_335.id,
        questionDataId: questionDatas.question_data_335.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_358.id,
        personalityTraitCategoryId: null,
    },

    question_version_336: {
        questionId: questions.question_336.id,
        questionDataId: questionDatas.question_data_336.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_359.id,
        personalityTraitCategoryId: null,
    },

    question_version_337: {
        questionId: questions.question_337.id,
        questionDataId: questionDatas.question_data_337.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_360.id,
        personalityTraitCategoryId: null,
    },

    question_version_338: {
        questionId: questions.question_338.id,
        questionDataId: questionDatas.question_data_338.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_361.id,
        personalityTraitCategoryId: null,
    },

    question_version_339: {
        questionId: questions.question_339.id,
        questionDataId: questionDatas.question_data_339.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_362.id,
        personalityTraitCategoryId: null,
    },

    question_version_340: {
        questionId: questions.question_340.id,
        questionDataId: questionDatas.question_data_340.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_363.id,
        personalityTraitCategoryId: null,
    },

    question_version_341: {
        questionId: questions.question_341.id,
        questionDataId: questionDatas.question_data_341.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_364.id,
        personalityTraitCategoryId: null,
    },

    question_version_342: {
        questionId: questions.question_342.id,
        questionDataId: questionDatas.question_data_342.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_365.id,
        personalityTraitCategoryId: null,
    },

    question_version_231: {
        questionId: questions.question_231.id,
        questionDataId: questionDatas.question_data_231.id,
        examVersionId: examVersions.exam_version_15.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_232: {
        questionId: questions.question_232.id,
        questionDataId: questionDatas.question_data_232.id,
        examVersionId: examVersions.exam_version_15.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_224: {
        questionId: questions.question_224.id,
        questionDataId: questionDatas.question_data_224.id,
        examVersionId: examVersions.exam_version_15.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_225: {
        questionId: questions.question_225.id,
        questionDataId: questionDatas.question_data_225.id,
        examVersionId: examVersions.exam_version_15.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_226: {
        questionId: questions.question_226.id,
        questionDataId: questionDatas.question_data_226.id,
        examVersionId: examVersions.exam_version_15.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_227: {
        questionId: questions.question_227.id,
        questionDataId: questionDatas.question_data_227.id,
        examVersionId: examVersions.exam_version_15.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_228: {
        questionId: questions.question_228.id,
        questionDataId: questionDatas.question_data_228.id,
        examVersionId: examVersions.exam_version_15.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_229: {
        questionId: questions.question_229.id,
        questionDataId: questionDatas.question_data_229.id,
        examVersionId: examVersions.exam_version_15.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_343: {
        questionId: questions.question_343.id,
        questionDataId: questionDatas.question_data_343.id,
        examVersionId: examVersions.exam_version_17.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_344: {
        questionId: questions.question_344.id,
        questionDataId: questionDatas.question_data_344.id,
        examVersionId: examVersions.exam_version_17.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_355: {
        questionId: questions.question_355.id,
        questionDataId: questionDatas.question_data_355.id,
        examVersionId: examVersions.exam_version_18.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_356: {
        questionId: questions.question_356.id,
        questionDataId: questionDatas.question_data_356.id,
        examVersionId: examVersions.exam_version_18.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_353: {
        questionId: questions.question_353.id,
        questionDataId: questionDatas.question_data_353.id,
        examVersionId: examVersions.exam_version_17.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_354: {
        questionId: questions.question_354.id,
        questionDataId: questionDatas.question_data_354.id,
        examVersionId: examVersions.exam_version_17.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_345: {
        questionId: questions.question_345.id,
        questionDataId: questionDatas.question_data_345.id,
        examVersionId: examVersions.exam_version_17.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_346: {
        questionId: questions.question_346.id,
        questionDataId: questionDatas.question_data_346.id,
        examVersionId: examVersions.exam_version_17.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_347: {
        questionId: questions.question_347.id,
        questionDataId: questionDatas.question_data_347.id,
        examVersionId: examVersions.exam_version_17.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_348: {
        questionId: questions.question_348.id,
        questionDataId: questionDatas.question_data_348.id,
        examVersionId: examVersions.exam_version_17.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_349: {
        questionId: questions.question_349.id,
        questionDataId: questionDatas.question_data_349.id,
        examVersionId: examVersions.exam_version_17.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_350: {
        questionId: questions.question_350.id,
        questionDataId: questionDatas.question_data_350.id,
        examVersionId: examVersions.exam_version_17.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_351: {
        questionId: questions.question_351.id,
        questionDataId: questionDatas.question_data_351.id,
        examVersionId: examVersions.exam_version_17.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_352: {
        questionId: questions.question_352.id,
        questionDataId: questionDatas.question_data_352.id,
        examVersionId: examVersions.exam_version_17.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_396: {
        questionId: questions.question_396.id,
        questionDataId: questionDatas.question_data_396.id,
        examVersionId: examVersions.exam_version_21.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_397: {
        questionId: questions.question_397.id,
        questionDataId: questionDatas.question_data_397.id,
        examVersionId: examVersions.exam_version_21.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_361: {
        questionId: questions.question_361.id,
        questionDataId: questionDatas.question_data_361.id,
        examVersionId: examVersions.exam_version_18.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_388: {
        questionId: questions.question_388.id,
        questionDataId: questionDatas.question_data_388.id,
        examVersionId: examVersions.exam_version_20.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_389: {
        questionId: questions.question_389.id,
        questionDataId: questionDatas.question_data_389.id,
        examVersionId: examVersions.exam_version_20.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_392: {
        questionId: questions.question_392.id,
        questionDataId: questionDatas.question_data_392.id,
        examVersionId: examVersions.exam_version_20.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_390: {
        questionId: questions.question_390.id,
        questionDataId: questionDatas.question_data_390.id,
        examVersionId: examVersions.exam_version_20.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_394: {
        questionId: questions.question_394.id,
        questionDataId: questionDatas.question_data_394.id,
        examVersionId: examVersions.exam_version_20.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_391: {
        questionId: questions.question_391.id,
        questionDataId: questionDatas.question_data_391.id,
        examVersionId: examVersions.exam_version_20.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_383: {
        questionId: questions.question_383.id,
        questionDataId: questionDatas.question_data_383.id,
        examVersionId: examVersions.exam_version_20.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_384: {
        questionId: questions.question_384.id,
        questionDataId: questionDatas.question_data_384.id,
        examVersionId: examVersions.exam_version_20.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_381: {
        questionId: questions.question_381.id,
        questionDataId: questionDatas.question_data_381.id,
        examVersionId: examVersions.exam_version_20.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_382: {
        questionId: questions.question_382.id,
        questionDataId: questionDatas.question_data_382.id,
        examVersionId: examVersions.exam_version_20.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_385: {
        questionId: questions.question_385.id,
        questionDataId: questionDatas.question_data_385.id,
        examVersionId: examVersions.exam_version_20.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_395: {
        questionId: questions.question_395.id,
        questionDataId: questionDatas.question_data_395.id,
        examVersionId: examVersions.exam_version_20.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_398: {
        questionId: questions.question_398.id,
        questionDataId: questionDatas.question_data_398.id,
        examVersionId: examVersions.exam_version_21.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_399: {
        questionId: questions.question_399.id,
        questionDataId: questionDatas.question_data_399.id,
        examVersionId: examVersions.exam_version_21.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_400: {
        questionId: questions.question_400.id,
        questionDataId: questionDatas.question_data_400.id,
        examVersionId: examVersions.exam_version_21.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_401: {
        questionId: questions.question_401.id,
        questionDataId: questionDatas.question_data_401.id,
        examVersionId: examVersions.exam_version_21.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_402: {
        questionId: questions.question_402.id,
        questionDataId: questionDatas.question_data_402.id,
        examVersionId: examVersions.exam_version_21.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_403: {
        questionId: questions.question_403.id,
        questionDataId: questionDatas.question_data_403.id,
        examVersionId: examVersions.exam_version_21.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_404: {
        questionId: questions.question_404.id,
        questionDataId: questionDatas.question_data_404.id,
        examVersionId: examVersions.exam_version_22.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_405: {
        questionId: questions.question_405.id,
        questionDataId: questionDatas.question_data_405.id,
        examVersionId: examVersions.exam_version_22.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_410: {
        questionId: questions.question_410.id,
        questionDataId: questionDatas.question_data_410.id,
        examVersionId: examVersions.exam_version_22.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_416: {
        questionId: questions.question_416.id,
        questionDataId: questionDatas.question_data_416.id,
        examVersionId: examVersions.exam_version_23.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_362: {
        questionId: questions.question_362.id,
        questionDataId: questionDatas.question_data_362.id,
        examVersionId: examVersions.exam_version_18.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_363: {
        questionId: questions.question_363.id,
        questionDataId: questionDatas.question_data_363.id,
        examVersionId: examVersions.exam_version_18.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_364: {
        questionId: questions.question_364.id,
        questionDataId: questionDatas.question_data_364.id,
        examVersionId: examVersions.exam_version_18.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_365: {
        questionId: questions.question_365.id,
        questionDataId: questionDatas.question_data_365.id,
        examVersionId: examVersions.exam_version_18.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_366: {
        questionId: questions.question_366.id,
        questionDataId: questionDatas.question_data_366.id,
        examVersionId: examVersions.exam_version_18.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_367: {
        questionId: questions.question_367.id,
        questionDataId: questionDatas.question_data_367.id,
        examVersionId: examVersions.exam_version_18.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_368: {
        questionId: questions.question_368.id,
        questionDataId: questionDatas.question_data_368.id,
        examVersionId: examVersions.exam_version_18.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_357: {
        questionId: questions.question_357.id,
        questionDataId: questionDatas.question_data_357.id,
        examVersionId: examVersions.exam_version_18.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_358: {
        questionId: questions.question_358.id,
        questionDataId: questionDatas.question_data_358.id,
        examVersionId: examVersions.exam_version_18.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_359: {
        questionId: questions.question_359.id,
        questionDataId: questionDatas.question_data_359.id,
        examVersionId: examVersions.exam_version_18.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_360: {
        questionId: questions.question_360.id,
        questionDataId: questionDatas.question_data_360.id,
        examVersionId: examVersions.exam_version_18.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_417: {
        questionId: questions.question_417.id,
        questionDataId: questionDatas.question_data_417.id,
        examVersionId: examVersions.exam_version_23.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_418: {
        questionId: questions.question_418.id,
        questionDataId: questionDatas.question_data_418.id,
        examVersionId: examVersions.exam_version_23.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_386: {
        questionId: questions.question_386.id,
        questionDataId: questionDatas.question_data_386.id,
        examVersionId: examVersions.exam_version_20.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_419: {
        questionId: questions.question_419.id,
        questionDataId: questionDatas.question_data_419.id,
        examVersionId: examVersions.exam_version_23.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_420: {
        questionId: questions.question_420.id,
        questionDataId: questionDatas.question_data_420.id,
        examVersionId: examVersions.exam_version_23.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_393: {
        questionId: questions.question_393.id,
        questionDataId: questionDatas.question_data_393.id,
        examVersionId: examVersions.exam_version_20.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_387: {
        questionId: questions.question_387.id,
        questionDataId: questionDatas.question_data_387.id,
        examVersionId: examVersions.exam_version_20.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_421: {
        questionId: questions.question_421.id,
        questionDataId: questionDatas.question_data_421.id,
        examVersionId: examVersions.exam_version_23.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_422: {
        questionId: questions.question_422.id,
        questionDataId: questionDatas.question_data_422.id,
        examVersionId: examVersions.exam_version_23.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_423: {
        questionId: questions.question_423.id,
        questionDataId: questionDatas.question_data_423.id,
        examVersionId: examVersions.exam_version_24.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_424: {
        questionId: questions.question_424.id,
        questionDataId: questionDatas.question_data_424.id,
        examVersionId: examVersions.exam_version_24.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_411: {
        questionId: questions.question_411.id,
        questionDataId: questionDatas.question_data_411.id,
        examVersionId: examVersions.exam_version_22.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_412: {
        questionId: questions.question_412.id,
        questionDataId: questionDatas.question_data_412.id,
        examVersionId: examVersions.exam_version_22.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_415: {
        questionId: questions.question_415.id,
        questionDataId: questionDatas.question_data_415.id,
        examVersionId: examVersions.exam_version_22.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_413: {
        questionId: questions.question_413.id,
        questionDataId: questionDatas.question_data_413.id,
        examVersionId: examVersions.exam_version_22.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_414: {
        questionId: questions.question_414.id,
        questionDataId: questionDatas.question_data_414.id,
        examVersionId: examVersions.exam_version_22.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_406: {
        questionId: questions.question_406.id,
        questionDataId: questionDatas.question_data_406.id,
        examVersionId: examVersions.exam_version_22.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_407: {
        questionId: questions.question_407.id,
        questionDataId: questionDatas.question_data_407.id,
        examVersionId: examVersions.exam_version_22.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_408: {
        questionId: questions.question_408.id,
        questionDataId: questionDatas.question_data_408.id,
        examVersionId: examVersions.exam_version_22.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_425: {
        questionId: questions.question_425.id,
        questionDataId: questionDatas.question_data_425.id,
        examVersionId: examVersions.exam_version_24.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_409: {
        questionId: questions.question_409.id,
        questionDataId: questionDatas.question_data_409.id,
        examVersionId: examVersions.exam_version_22.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_426: {
        questionId: questions.question_426.id,
        questionDataId: questionDatas.question_data_426.id,
        examVersionId: examVersions.exam_version_24.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_427: {
        questionId: questions.question_427.id,
        questionDataId: questionDatas.question_data_427.id,
        examVersionId: examVersions.exam_version_24.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_428: {
        questionId: questions.question_428.id,
        questionDataId: questionDatas.question_data_428.id,
        examVersionId: examVersions.exam_version_24.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_429: {
        questionId: questions.question_429.id,
        questionDataId: questionDatas.question_data_429.id,
        examVersionId: examVersions.exam_version_24.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_430: {
        questionId: questions.question_430.id,
        questionDataId: questionDatas.question_data_430.id,
        examVersionId: examVersions.exam_version_24.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_431: {
        questionId: questions.question_431.id,
        questionDataId: questionDatas.question_data_431.id,
        examVersionId: examVersions.exam_version_24.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_432: {
        questionId: questions.question_432.id,
        questionDataId: questionDatas.question_data_432.id,
        examVersionId: examVersions.exam_version_24.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_434: {
        questionId: questions.question_434.id,
        questionDataId: questionDatas.question_data_434.id,
        examVersionId: examVersions.exam_version_25.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_435: {
        questionId: questions.question_435.id,
        questionDataId: questionDatas.question_data_435.id,
        examVersionId: examVersions.exam_version_25.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_436: {
        questionId: questions.question_436.id,
        questionDataId: questionDatas.question_data_436.id,
        examVersionId: examVersions.exam_version_25.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_437: {
        questionId: questions.question_437.id,
        questionDataId: questionDatas.question_data_437.id,
        examVersionId: examVersions.exam_version_25.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_438: {
        questionId: questions.question_438.id,
        questionDataId: questionDatas.question_data_438.id,
        examVersionId: examVersions.exam_version_25.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_439: {
        questionId: questions.question_439.id,
        questionDataId: questionDatas.question_data_439.id,
        examVersionId: examVersions.exam_version_25.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_440: {
        questionId: questions.question_440.id,
        questionDataId: questionDatas.question_data_440.id,
        examVersionId: examVersions.exam_version_25.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_441: {
        questionId: questions.question_441.id,
        questionDataId: questionDatas.question_data_441.id,
        examVersionId: examVersions.exam_version_25.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_442: {
        questionId: questions.question_442.id,
        questionDataId: questionDatas.question_data_442.id,
        examVersionId: examVersions.exam_version_25.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_433: {
        questionId: questions.question_433.id,
        questionDataId: questionDatas.question_data_433.id,
        examVersionId: examVersions.exam_version_25.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_443: {
        questionId: questions.question_443.id,
        questionDataId: questionDatas.question_data_443.id,
        examVersionId: examVersions.exam_version_26.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_444: {
        questionId: questions.question_444.id,
        questionDataId: questionDatas.question_data_444.id,
        examVersionId: examVersions.exam_version_26.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_447: {
        questionId: questions.question_447.id,
        questionDataId: questionDatas.question_data_447.id,
        examVersionId: examVersions.exam_version_26.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_463: {
        questionId: questions.question_463.id,
        questionDataId: questionDatas.question_data_463.id,
        examVersionId: examVersions.exam_version_26.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_457: {
        questionId: questions.question_457.id,
        questionDataId: questionDatas.question_data_457.id,
        examVersionId: examVersions.exam_version_26.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_448: {
        questionId: questions.question_448.id,
        questionDataId: questionDatas.question_data_448.id,
        examVersionId: examVersions.exam_version_26.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_458: {
        questionId: questions.question_458.id,
        questionDataId: questionDatas.question_data_458.id,
        examVersionId: examVersions.exam_version_26.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_455: {
        questionId: questions.question_455.id,
        questionDataId: questionDatas.question_data_455.id,
        examVersionId: examVersions.exam_version_26.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_470: {
        questionId: questions.question_470.id,
        questionDataId: questionDatas.question_data_470.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_373.id,
        personalityTraitCategoryId: null,
    },

    question_version_471: {
        questionId: questions.question_471.id,
        questionDataId: questionDatas.question_data_471.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_375.id,
        personalityTraitCategoryId: null,
    },

    question_version_484: {
        questionId: questions.question_484.id,
        questionDataId: questionDatas.question_data_484.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_399.id,
        personalityTraitCategoryId: null,
    },

    question_version_496: {
        questionId: questions.question_496.id,
        questionDataId: questionDatas.question_data_496.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_412.id,
        personalityTraitCategoryId: null,
    },

    question_version_473: {
        questionId: questions.question_473.id,
        questionDataId: questionDatas.question_data_473.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_380.id,
        personalityTraitCategoryId: null,
    },

    question_version_474: {
        questionId: questions.question_474.id,
        questionDataId: questionDatas.question_data_474.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_381.id,
        personalityTraitCategoryId: null,
    },

    question_version_475: {
        questionId: questions.question_475.id,
        questionDataId: questionDatas.question_data_475.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_383.id,
        personalityTraitCategoryId: null,
    },

    question_version_476: {
        questionId: questions.question_476.id,
        questionDataId: questionDatas.question_data_476.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_384.id,
        personalityTraitCategoryId: null,
    },

    question_version_449: {
        questionId: questions.question_449.id,
        questionDataId: questionDatas.question_data_449.id,
        examVersionId: examVersions.exam_version_26.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_450: {
        questionId: questions.question_450.id,
        questionDataId: questionDatas.question_data_450.id,
        examVersionId: examVersions.exam_version_26.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_459: {
        questionId: questions.question_459.id,
        questionDataId: questionDatas.question_data_459.id,
        examVersionId: examVersions.exam_version_26.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_451: {
        questionId: questions.question_451.id,
        questionDataId: questionDatas.question_data_451.id,
        examVersionId: examVersions.exam_version_26.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_454: {
        questionId: questions.question_454.id,
        questionDataId: questionDatas.question_data_454.id,
        examVersionId: examVersions.exam_version_26.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_460: {
        questionId: questions.question_460.id,
        questionDataId: questionDatas.question_data_460.id,
        examVersionId: examVersions.exam_version_26.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_462: {
        questionId: questions.question_462.id,
        questionDataId: questionDatas.question_data_462.id,
        examVersionId: examVersions.exam_version_26.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_477: {
        questionId: questions.question_477.id,
        questionDataId: questionDatas.question_data_477.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_387.id,
        personalityTraitCategoryId: null,
    },

    question_version_461: {
        questionId: questions.question_461.id,
        questionDataId: questionDatas.question_data_461.id,
        examVersionId: examVersions.exam_version_26.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_465: {
        questionId: questions.question_465.id,
        questionDataId: questionDatas.question_data_465.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_367.id,
        personalityTraitCategoryId: null,
    },

    question_version_467: {
        questionId: questions.question_467.id,
        questionDataId: questionDatas.question_data_467.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_370.id,
        personalityTraitCategoryId: null,
    },

    question_version_468: {
        questionId: questions.question_468.id,
        questionDataId: questionDatas.question_data_468.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_371.id,
        personalityTraitCategoryId: null,
    },

    question_version_485: {
        questionId: questions.question_485.id,
        questionDataId: questionDatas.question_data_485.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_400.id,
        personalityTraitCategoryId: null,
    },

    question_version_490: {
        questionId: questions.question_490.id,
        questionDataId: questionDatas.question_data_490.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_405.id,
        personalityTraitCategoryId: null,
    },

    question_version_486: {
        questionId: questions.question_486.id,
        questionDataId: questionDatas.question_data_486.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_401.id,
        personalityTraitCategoryId: null,
    },

    question_version_478: {
        questionId: questions.question_478.id,
        questionDataId: questionDatas.question_data_478.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_388.id,
        personalityTraitCategoryId: null,
    },

    question_version_479: {
        questionId: questions.question_479.id,
        questionDataId: questionDatas.question_data_479.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_389.id,
        personalityTraitCategoryId: null,
    },

    question_version_452: {
        questionId: questions.question_452.id,
        questionDataId: questionDatas.question_data_452.id,
        examVersionId: examVersions.exam_version_26.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_456: {
        questionId: questions.question_456.id,
        questionDataId: questionDatas.question_data_456.id,
        examVersionId: examVersions.exam_version_26.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_445: {
        questionId: questions.question_445.id,
        questionDataId: questionDatas.question_data_445.id,
        examVersionId: examVersions.exam_version_26.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_453: {
        questionId: questions.question_453.id,
        questionDataId: questionDatas.question_data_453.id,
        examVersionId: examVersions.exam_version_26.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_464: {
        questionId: questions.question_464.id,
        questionDataId: questionDatas.question_data_464.id,
        examVersionId: examVersions.exam_version_26.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_480: {
        questionId: questions.question_480.id,
        questionDataId: questionDatas.question_data_480.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_390.id,
        personalityTraitCategoryId: null,
    },

    question_version_446: {
        questionId: questions.question_446.id,
        questionDataId: questionDatas.question_data_446.id,
        examVersionId: examVersions.exam_version_26.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_469: {
        questionId: questions.question_469.id,
        questionDataId: questionDatas.question_data_469.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_372.id,
        personalityTraitCategoryId: null,
    },

    question_version_482: {
        questionId: questions.question_482.id,
        questionDataId: questionDatas.question_data_482.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_396.id,
        personalityTraitCategoryId: null,
    },

    question_version_487: {
        questionId: questions.question_487.id,
        questionDataId: questionDatas.question_data_487.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_402.id,
        personalityTraitCategoryId: null,
    },

    question_version_488: {
        questionId: questions.question_488.id,
        questionDataId: questionDatas.question_data_488.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_403.id,
        personalityTraitCategoryId: null,
    },

    question_version_489: {
        questionId: questions.question_489.id,
        questionDataId: questionDatas.question_data_489.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_404.id,
        personalityTraitCategoryId: null,
    },

    question_version_492: {
        questionId: questions.question_492.id,
        questionDataId: questionDatas.question_data_492.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_407.id,
        personalityTraitCategoryId: null,
    },

    question_version_493: {
        questionId: questions.question_493.id,
        questionDataId: questionDatas.question_data_493.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_408.id,
        personalityTraitCategoryId: null,
    },

    question_version_494: {
        questionId: questions.question_494.id,
        questionDataId: questionDatas.question_data_494.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_409.id,
        personalityTraitCategoryId: null,
    },

    question_version_495: {
        questionId: questions.question_495.id,
        questionDataId: questionDatas.question_data_495.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_411.id,
        personalityTraitCategoryId: null,
    },

    question_version_472: {
        questionId: questions.question_472.id,
        questionDataId: questionDatas.question_data_472.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_378.id,
        personalityTraitCategoryId: null,
    },

    question_version_497: {
        questionId: questions.question_497.id,
        questionDataId: questionDatas.question_data_497.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_413.id,
        personalityTraitCategoryId: null,
    },

    question_version_500: {
        questionId: questions.question_500.id,
        questionDataId: questionDatas.question_data_500.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_464.id,
        personalityTraitCategoryId: null,
    },

    question_version_501: {
        questionId: questions.question_501.id,
        questionDataId: questionDatas.question_data_501.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_465.id,
        personalityTraitCategoryId: null,
    },

    question_version_502: {
        questionId: questions.question_502.id,
        questionDataId: questionDatas.question_data_502.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_420.id,
        personalityTraitCategoryId: null,
    },

    question_version_503: {
        questionId: questions.question_503.id,
        questionDataId: questionDatas.question_data_503.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_421.id,
        personalityTraitCategoryId: null,
    },

    question_version_504: {
        questionId: questions.question_504.id,
        questionDataId: questionDatas.question_data_504.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_422.id,
        personalityTraitCategoryId: null,
    },

    question_version_505: {
        questionId: questions.question_505.id,
        questionDataId: questionDatas.question_data_505.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_423.id,
        personalityTraitCategoryId: null,
    },

    question_version_506: {
        questionId: questions.question_506.id,
        questionDataId: questionDatas.question_data_506.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_424.id,
        personalityTraitCategoryId: null,
    },

    question_version_507: {
        questionId: questions.question_507.id,
        questionDataId: questionDatas.question_data_507.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_425.id,
        personalityTraitCategoryId: null,
    },

    question_version_508: {
        questionId: questions.question_508.id,
        questionDataId: questionDatas.question_data_508.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_431.id,
        personalityTraitCategoryId: null,
    },

    question_version_509: {
        questionId: questions.question_509.id,
        questionDataId: questionDatas.question_data_509.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_432.id,
        personalityTraitCategoryId: null,
    },

    question_version_510: {
        questionId: questions.question_510.id,
        questionDataId: questionDatas.question_data_510.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_433.id,
        personalityTraitCategoryId: null,
    },

    question_version_511: {
        questionId: questions.question_511.id,
        questionDataId: questionDatas.question_data_511.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_435.id,
        personalityTraitCategoryId: null,
    },

    question_version_512: {
        questionId: questions.question_512.id,
        questionDataId: questionDatas.question_data_512.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_437.id,
        personalityTraitCategoryId: null,
    },

    question_version_513: {
        questionId: questions.question_513.id,
        questionDataId: questionDatas.question_data_513.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_438.id,
        personalityTraitCategoryId: null,
    },

    question_version_514: {
        questionId: questions.question_514.id,
        questionDataId: questionDatas.question_data_514.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_439.id,
        personalityTraitCategoryId: null,
    },

    question_version_515: {
        questionId: questions.question_515.id,
        questionDataId: questionDatas.question_data_515.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_440.id,
        personalityTraitCategoryId: null,
    },

    question_version_516: {
        questionId: questions.question_516.id,
        questionDataId: questionDatas.question_data_516.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_442.id,
        personalityTraitCategoryId: null,
    },

    question_version_517: {
        questionId: questions.question_517.id,
        questionDataId: questionDatas.question_data_517.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_443.id,
        personalityTraitCategoryId: null,
    },

    question_version_518: {
        questionId: questions.question_518.id,
        questionDataId: questionDatas.question_data_518.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_444.id,
        personalityTraitCategoryId: null,
    },

    question_version_519: {
        questionId: questions.question_519.id,
        questionDataId: questionDatas.question_data_519.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_446.id,
        personalityTraitCategoryId: null,
    },

    question_version_520: {
        questionId: questions.question_520.id,
        questionDataId: questionDatas.question_data_520.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_447.id,
        personalityTraitCategoryId: null,
    },

    question_version_521: {
        questionId: questions.question_521.id,
        questionDataId: questionDatas.question_data_521.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_448.id,
        personalityTraitCategoryId: null,
    },

    question_version_522: {
        questionId: questions.question_522.id,
        questionDataId: questionDatas.question_data_522.id,
        examVersionId: examVersions.exam_version_27.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_523: {
        questionId: questions.question_523.id,
        questionDataId: questionDatas.question_data_523.id,
        examVersionId: examVersions.exam_version_27.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_524: {
        questionId: questions.question_524.id,
        questionDataId: questionDatas.question_data_524.id,
        examVersionId: examVersions.exam_version_27.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_525: {
        questionId: questions.question_525.id,
        questionDataId: questionDatas.question_data_525.id,
        examVersionId: examVersions.exam_version_27.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_526: {
        questionId: questions.question_526.id,
        questionDataId: questionDatas.question_data_526.id,
        examVersionId: examVersions.exam_version_27.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_527: {
        questionId: questions.question_527.id,
        questionDataId: questionDatas.question_data_527.id,
        examVersionId: examVersions.exam_version_27.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_528: {
        questionId: questions.question_528.id,
        questionDataId: questionDatas.question_data_528.id,
        examVersionId: examVersions.exam_version_27.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_529: {
        questionId: questions.question_529.id,
        questionDataId: questionDatas.question_data_529.id,
        examVersionId: examVersions.exam_version_28.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_530: {
        questionId: questions.question_530.id,
        questionDataId: questionDatas.question_data_530.id,
        examVersionId: examVersions.exam_version_28.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_531: {
        questionId: questions.question_531.id,
        questionDataId: questionDatas.question_data_531.id,
        examVersionId: examVersions.exam_version_28.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_532: {
        questionId: questions.question_532.id,
        questionDataId: questionDatas.question_data_532.id,
        examVersionId: examVersions.exam_version_28.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_533: {
        questionId: questions.question_533.id,
        questionDataId: questionDatas.question_data_533.id,
        examVersionId: examVersions.exam_version_28.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_534: {
        questionId: questions.question_534.id,
        questionDataId: questionDatas.question_data_534.id,
        examVersionId: examVersions.exam_version_28.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_535: {
        questionId: questions.question_535.id,
        questionDataId: questionDatas.question_data_535.id,
        examVersionId: examVersions.exam_version_28.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_537: {
        questionId: questions.question_537.id,
        questionDataId: questionDatas.question_data_537.id,
        examVersionId: examVersions.exam_version_29.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_538: {
        questionId: questions.question_538.id,
        questionDataId: questionDatas.question_data_538.id,
        examVersionId: examVersions.exam_version_29.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_539: {
        questionId: questions.question_539.id,
        questionDataId: questionDatas.question_data_539.id,
        examVersionId: examVersions.exam_version_29.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_540: {
        questionId: questions.question_540.id,
        questionDataId: questionDatas.question_data_540.id,
        examVersionId: examVersions.exam_version_29.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_541: {
        questionId: questions.question_541.id,
        questionDataId: questionDatas.question_data_541.id,
        examVersionId: examVersions.exam_version_29.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_542: {
        questionId: questions.question_542.id,
        questionDataId: questionDatas.question_data_542.id,
        examVersionId: examVersions.exam_version_29.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_543: {
        questionId: questions.question_543.id,
        questionDataId: questionDatas.question_data_543.id,
        examVersionId: examVersions.exam_version_29.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_544: {
        questionId: questions.question_544.id,
        questionDataId: questionDatas.question_data_544.id,
        examVersionId: examVersions.exam_version_29.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_545: {
        questionId: questions.question_545.id,
        questionDataId: questionDatas.question_data_545.id,
        examVersionId: examVersions.exam_version_29.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_546: {
        questionId: questions.question_546.id,
        questionDataId: questionDatas.question_data_546.id,
        examVersionId: examVersions.exam_version_29.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_547: {
        questionId: questions.question_547.id,
        questionDataId: questionDatas.question_data_547.id,
        examVersionId: examVersions.exam_version_30.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_548: {
        questionId: questions.question_548.id,
        questionDataId: questionDatas.question_data_548.id,
        examVersionId: examVersions.exam_version_30.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_549: {
        questionId: questions.question_549.id,
        questionDataId: questionDatas.question_data_549.id,
        examVersionId: examVersions.exam_version_30.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_550: {
        questionId: questions.question_550.id,
        questionDataId: questionDatas.question_data_550.id,
        examVersionId: examVersions.exam_version_30.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_551: {
        questionId: questions.question_551.id,
        questionDataId: questionDatas.question_data_551.id,
        examVersionId: examVersions.exam_version_31.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_552: {
        questionId: questions.question_552.id,
        questionDataId: questionDatas.question_data_552.id,
        examVersionId: examVersions.exam_version_31.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_553: {
        questionId: questions.question_553.id,
        questionDataId: questionDatas.question_data_553.id,
        examVersionId: examVersions.exam_version_31.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_554: {
        questionId: questions.question_554.id,
        questionDataId: questionDatas.question_data_554.id,
        examVersionId: examVersions.exam_version_31.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_555: {
        questionId: questions.question_555.id,
        questionDataId: questionDatas.question_data_555.id,
        examVersionId: examVersions.exam_version_31.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_556: {
        questionId: questions.question_556.id,
        questionDataId: questionDatas.question_data_556.id,
        examVersionId: examVersions.exam_version_31.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_557: {
        questionId: questions.question_557.id,
        questionDataId: questionDatas.question_data_557.id,
        examVersionId: examVersions.exam_version_31.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_558: {
        questionId: questions.question_558.id,
        questionDataId: questionDatas.question_data_558.id,
        examVersionId: examVersions.exam_version_32.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_559: {
        questionId: questions.question_559.id,
        questionDataId: questionDatas.question_data_559.id,
        examVersionId: examVersions.exam_version_32.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_568: {
        questionId: questions.question_568.id,
        questionDataId: questionDatas.question_data_568.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_453.id,
        personalityTraitCategoryId: null,
    },

    question_version_569: {
        questionId: questions.question_569.id,
        questionDataId: questionDatas.question_data_569.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_455.id,
        personalityTraitCategoryId: null,
    },

    question_version_560: {
        questionId: questions.question_560.id,
        questionDataId: questionDatas.question_data_560.id,
        examVersionId: examVersions.exam_version_32.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_561: {
        questionId: questions.question_561.id,
        questionDataId: questionDatas.question_data_561.id,
        examVersionId: examVersions.exam_version_32.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_562: {
        questionId: questions.question_562.id,
        questionDataId: questionDatas.question_data_562.id,
        examVersionId: examVersions.exam_version_32.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_574: {
        questionId: questions.question_574.id,
        questionDataId: questionDatas.question_data_574.id,
        examVersionId: examVersions.exam_version_32.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_563: {
        questionId: questions.question_563.id,
        questionDataId: questionDatas.question_data_563.id,
        examVersionId: examVersions.exam_version_32.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_572: {
        questionId: questions.question_572.id,
        questionDataId: questionDatas.question_data_572.id,
        examVersionId: examVersions.exam_version_32.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_564: {
        questionId: questions.question_564.id,
        questionDataId: questionDatas.question_data_564.id,
        examVersionId: examVersions.exam_version_32.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_575: {
        questionId: questions.question_575.id,
        questionDataId: questionDatas.question_data_575.id,
        examVersionId: examVersions.exam_version_32.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_565: {
        questionId: questions.question_565.id,
        questionDataId: questionDatas.question_data_565.id,
        examVersionId: examVersions.exam_version_32.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_566: {
        questionId: questions.question_566.id,
        questionDataId: questionDatas.question_data_566.id,
        examVersionId: examVersions.exam_version_32.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_576: {
        questionId: questions.question_576.id,
        questionDataId: questionDatas.question_data_576.id,
        examVersionId: null,
        videoVersionId: videoVersions.video_version_466.id,
        personalityTraitCategoryId: null,
    },

    question_version_571: {
        questionId: questions.question_571.id,
        questionDataId: questionDatas.question_data_571.id,
        examVersionId: examVersions.exam_version_32.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_567: {
        questionId: questions.question_567.id,
        questionDataId: questionDatas.question_data_567.id,
        examVersionId: examVersions.exam_version_32.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_573: {
        questionId: questions.question_573.id,
        questionDataId: questionDatas.question_data_573.id,
        examVersionId: examVersions.exam_version_32.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_570: {
        questionId: questions.question_570.id,
        questionDataId: questionDatas.question_data_570.id,
        examVersionId: examVersions.exam_version_32.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    // pretest questions
    question_version_pretest_excel_1: {
        questionId: questions.question_580.id,
        questionDataId: questionDatas.question_data_580.id,
        examVersionId: examVersions.exam_version_pretest_excel.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_pretest_excel_2: {
        questionId: questions.question_581.id,
        questionDataId: questionDatas.question_data_581.id,
        examVersionId: examVersions.exam_version_pretest_excel.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_pretest_excel_3: {
        questionId: questions.question_582.id,
        questionDataId: questionDatas.question_data_582.id,
        examVersionId: examVersions.exam_version_pretest_excel.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_pretest_excel_4: {
        questionId: questions.question_583.id,
        questionDataId: questionDatas.question_data_583.id,
        examVersionId: examVersions.exam_version_pretest_excel.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_pretest_excel_5: {
        questionId: questions.question_584.id,
        questionDataId: questionDatas.question_data_584.id,
        examVersionId: examVersions.exam_version_pretest_excel.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_585: {
        questionId: questions.question_585.id,
        questionDataId: questionDatas.question_data_585.id,
        examVersionId: examVersions.exam_version_pretest_39.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_586: {
        questionId: questions.question_586.id,
        questionDataId: questionDatas.question_data_586.id,
        examVersionId: examVersions.exam_version_pretest_40.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },

    question_version_587: {
        questionId: questions.question_587.id,
        questionDataId: questionDatas.question_data_587.id,
        examVersionId: examVersions.exam_version_pretest_41.id,
        videoVersionId: null,
        personalityTraitCategoryId: null,
    },
});

export type SeedQuestionVersionType = ReturnType<typeof getQuestionVersionsSeedData>;