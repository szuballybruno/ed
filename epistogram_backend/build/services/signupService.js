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
exports.getSignupDataAsync = exports.saveSignupQuestionnaireAnswersAsync = void 0;
const QuestionAnswer_1 = require("../models/entity/QuestionAnswer");
const User_1 = require("../models/entity/User");
const staticProvider_1 = require("../staticProvider");
const helpers_1 = require("../utilities/helpers");
const jwtGen_1 = require("./misc/jwtGen");
const questionService_1 = require("./questionService");
const saveSignupQuestionnaireAnswersAsync = (invitationToken, answers) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield verifyInvitationTokenAsync(invitationToken);
    const repo = staticProvider_1.staticProvider
        .ormConnection
        .getRepository(QuestionAnswer_1.QuestionAnswer);
    // delete previous answers
    const questionIds = answers.map(x => x.questionId);
    const qas = yield repo
        .createQueryBuilder("qa")
        .where("qa.userId = :userId ", { userId })
        .andWhere("qa.questionId IN (:...questionIds)", { questionIds })
        .select("qa.id")
        .getMany();
    if (qas.length > 0)
        yield repo
            .createQueryBuilder()
            .delete()
            .from(QuestionAnswer_1.QuestionAnswer)
            .where("id IN (:...ids)", { ids: qas.map(x => x.id) })
            .execute();
    // insert new answers
    const questionAnswers = answers
        .map(x => ({
        answerId: x.answerId,
        questionId: x.questionId,
        userId: userId
    }));
    yield repo.save(questionAnswers);
});
exports.saveSignupQuestionnaireAnswersAsync = saveSignupQuestionnaireAnswersAsync;
const getSignupDataAsync = (invitationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield verifyInvitationTokenAsync(invitationToken);
    const questions = yield questionService_1.getStartupQuestionsAsync();
    const questionAnswers = yield questionService_1.getQuestionAnswersAsync(userId);
    const dataDTO = {
        questions: questions,
        questionAnswers: questionAnswers
    };
    return dataDTO;
});
exports.getSignupDataAsync = getSignupDataAsync;
const verifyInvitationTokenAsync = (invitationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const invitationTokenPayload = jwtGen_1.verifyJWTToken(invitationToken, staticProvider_1.staticProvider.globalConfig.mail.tokenMailSecret);
    const userId = invitationTokenPayload.userId;
    const user = yield staticProvider_1.staticProvider
        .ormConnection
        .getRepository(User_1.User)
        .createQueryBuilder("u")
        .where("u.id = :userId", { userId })
        .getOneOrFail();
    // check if token matches user's in the DB
    // this also protects agains modifying users data 
    // with the same token after the user is registerd,
    // since the token is removed from the DB after finalization
    if (user.invitationToken != invitationToken)
        throw new helpers_1.TypedError("Bad token.", "bad request");
    return userId;
});
//# sourceMappingURL=signupService.js.map