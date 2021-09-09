"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReandomQuestion = exports.getQuestionAnswersAsync = exports.getStartupQuestionsAsync = void 0;
const Question_1 = require("../models/entity/Question");
const QuestionAnswer_1 = require("../models/entity/QuestionAnswer");
const staticProvider_1 = require("../staticProvider");
const mappings_1 = require("./mappings");
const getStartupQuestionsAsync = () => __awaiter(void 0, void 0, void 0, function* () {
    const questions = yield staticProvider_1.staticProvider
        .ormConnection
        .getRepository(Question_1.Question)
        .createQueryBuilder("q")
        .where("q.isSignupQuestion = true")
        .leftJoinAndSelect("q.answers", "a")
        .getMany();
    return questions
        .map(x => mappings_1.toQuestionDTO(x));
});
exports.getStartupQuestionsAsync = getStartupQuestionsAsync;
const getQuestionAnswersAsync = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const questionAnswers = yield staticProvider_1.staticProvider
        .ormConnection
        .getRepository(QuestionAnswer_1.QuestionAnswer)
        .createQueryBuilder("qa")
        .where("qa.userId = :userId", { userId })
        .leftJoinAndSelect("qa.question", "q")
        .where("q.isSignupQuestion = true")
        .getMany();
    return questionAnswers
        .map(qa => mappings_1.toQuestionAnswerDTO(qa));
});
exports.getQuestionAnswersAsync = getQuestionAnswersAsync;
const getReandomQuestion = () => {
    return {
        questionId: 1,
        questionText: "My fantastic question",
        answers: [
            {
                answerId: 1,
                answerText: "Answer 1"
            },
            {
                answerId: 2,
                answerText: "Answer 2"
            },
            {
                answerId: 3,
                answerText: "Answer 3"
            },
            {
                answerId: 3,
                answerText: "Answer 4"
            }
        ]
    };
};
exports.getReandomQuestion = getReandomQuestion;
//# sourceMappingURL=questionService.js.map