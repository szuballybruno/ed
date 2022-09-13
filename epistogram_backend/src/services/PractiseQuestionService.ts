import {AnswerSession} from '../models/entity/misc/AnswerSession';
import {PractiseQuestionInfoView} from '../models/views/PractiseQuestionInfoView';
import {AnswerQuestionDTO} from '../shared/dtos/AnswerQuestionDTO';
import {Id} from '../shared/types/versionId';
import {isXMinutesAgo} from '../utilities/helpers';
import {PrincipalId} from '../utilities/XTurboExpress/ActionParams';
import {AuthorizationService} from './AuthorizationService';
import {MapperService} from './MapperService';
import {GlobalConfiguration} from './misc/GlobalConfiguration';
import {ServiceBase} from './misc/ServiceBase';
import {ORMConnectionService} from './ORMConnectionService/ORMConnectionService';
import {QuestionAnswerService} from './QuestionAnswerService';
import {QuestionService} from './QuestionService';

export class PractiseQuestionService extends ServiceBase {

    private _questionAnswerService: QuestionAnswerService;
    private _authorizationService: AuthorizationService;

    constructor(
        ormConnection: ORMConnectionService,
        questionAnswerService: QuestionAnswerService,
        mapperService: MapperService,
        authorizationService: AuthorizationService,
        private _globalConfig: GlobalConfiguration,
        private _questionService: QuestionService) {

        super(mapperService, ormConnection);

        this._questionAnswerService = questionAnswerService;
        this._authorizationService = authorizationService;
    }

    /**
     * Get Principal's practise question,
     * or return null if there's none
     */
    getPractiseQuestionAsync = async (principalId: PrincipalId) => {

        const infoViews = await this
            ._ormService
            .query(PractiseQuestionInfoView, {principalId})
            .where('userId', '=', 'principalId')
            .getMany();

        const questionVersionIds = this
            ._getPractiseQuestionsVersionIdsAsync(infoViews);

        const questionVersionId = questionVersionIds
            .firstOrNull();

        if (!questionVersionId)
            return null;

        return await this
            ._questionService
            .getQuestionDataByVersionId(questionVersionId);
    };

    /**
     * Answer a Practise question
     * by the Principal account
     * returns AnswerResultDTO, with coin acquire data, and correct answers
     */
    async answerPractiseQuestionAsync(principalId: PrincipalId, qu: AnswerQuestionDTO) {

        const userId = principalId.getId();

        const practiseAnswerSession = await this
            ._getUserPractiseAnswerSession(userId);

        return await this
            ._questionAnswerService
            .saveGivenAnswersAsync({
                userId,
                answerSessionId: practiseAnswerSession.id,
                questionVersionId: qu.questionVersionId,
                answerVersionIds: qu.answerVersionIds,
                isExamQuestion: false,
                elapsedSeconds: 0,
                isPractiseAnswer: true
            });
    }

    // ------------- PRIVATE

    /**
     * Get practise answer session
     */
    private _getUserPractiseAnswerSession = async (userId: Id<'User'>) => {

        return this._ormService
            .query(AnswerSession, {userId})
            .where('isPractise', '=', 'true')
            .and('userId', '=', 'userId')
            .getSingle();
    };

    /**
     * Returns question ids that should be practised
     */
    private _getPractiseQuestionsVersionIdsAsync(dtos: PractiseQuestionInfoView[]): Id<'QuestionVersion'>[] {

        return dtos
            .filter(questionInfo => {

                const {
                    practiseAnswerCount,
                    givenAnswerDate: lastAnswerDate,
                    isCorrect: lastAnswerIsCorrect,
                    isPractise: lastAnswerIsPractise
                } = questionInfo;

                const {
                    correctQuestionDelayMinutes,
                    incorrectPractiseQuestionDelayMinutes,
                    incorrectQuestionDelayMinutes
                } = this._globalConfig.practiseQuestions;

                // if more than 2 practise answers
                // for the question, ignore it
                if (practiseAnswerCount > 2)
                    return false;

                // not practise AND not correct AND 5 minutes passed
                if (!lastAnswerIsPractise && !lastAnswerIsCorrect && isXMinutesAgo(lastAnswerDate, incorrectQuestionDelayMinutes))
                    return true;

                // not practise AND correct AND 20 minutes passed
                if (!lastAnswerIsPractise && lastAnswerIsCorrect && isXMinutesAgo(lastAnswerDate, correctQuestionDelayMinutes))
                    return true;

                // practise AND not correct AND 60 minutes passed
                if (lastAnswerIsPractise && !lastAnswerIsCorrect && isXMinutesAgo(lastAnswerDate, incorrectPractiseQuestionDelayMinutes))
                    return true;

                return false;
            })
            .map(x => x.questionVersionId);
    }
}
