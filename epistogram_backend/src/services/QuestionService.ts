import { Question } from '../models/entity/question/Question';
import { QuestionData } from '../models/entity/question/QuestionData';
import { QuestionVersion } from '../models/entity/question/QuestionVersion';
import { AnswerEditDTO } from '../shared/dtos/AnswerEditDTO';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { QuestionEditDataDTO } from '../shared/dtos/QuestionEditDataDTO';
import { InsertEntity, VersionMigrationHelpers, VersionMigrationResult } from '../utilities/misc';
import { OldData } from './misc/types';
import { XMutatorHelpers } from './misc/XMutatorHelpers_a';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { QuestionAnswerService } from './QuestionAnswerService';

type QuestionMutationType = Mutation<QuestionEditDataDTO, 'questionVersionId'>;
type AnswerMutationType = Mutation<AnswerEditDTO, 'answerVersionId'>;

export class QuestionService {

    constructor(
        private _ormService: ORMConnectionService,
        private _answerService: QuestionAnswerService) {

    }

    /**
     * Saves course item questions based on mutations  
     */
    async saveCourseItemQuestionsAsync(
        itemVersionIdMigrations: VersionMigrationResult[],
        questionMutations: QuestionMutationType[],
        answerMutations: AnswerMutationType[],
        isVideo: boolean) {

        // get old question versions 
        const oldQuestionVersions = await this
            ._getOldQuestionsAsync(itemVersionIdMigrations, isVideo);

        // get unmodified questions 
        const unmodifiedQuestions = oldQuestionVersions
            .filter(x => !XMutatorHelpers.hasMutationForKey(questionMutations)(x.id));

        // filter mutations 
        const nonDeleteMutaitons = questionMutations
            .filter(x => x.action !== 'delete');

        // increment unmodified
        await this
            ._incrementQuestionVersionsAsync(unmodifiedQuestions, itemVersionIdMigrations);

        // save question mutations
        await this
            ._saveQuestionMutations(nonDeleteMutaitons, itemVersionIdMigrations, isVideo);
    }

    /**
     * Saves questions by mutations  
     */
    private async _saveQuestionMutations(
        muts: QuestionMutationType[],
        itemVersionIdMigrations: VersionMigrationResult[],
        isVideo: boolean) {

        if (muts.length === 0)
            return;

        const mutationsOrdered = muts
            .orderBy(x => x.action === 'add' ? 1 : 2);

        const { oldData, oldVersionIds } = await this._getOldQuestionDataAsync(mutationsOrdered);
        const getOldData = (mutation: QuestionMutationType) => oldData.single(x => x.oldVersion.id === mutation.key);

        //
        // Save questions 
        const newQuesitons = mutationsOrdered
            .map(mut => {

                const defaultData: InsertEntity<Question> = mut.action === 'add'
                    ? {}
                    : getOldData(mut).oldEntity;

                return defaultData;
            });

        const newQuestionIds = await this._ormService
            .createManyAsync(Question, newQuesitons);

        //
        // Save question datas 
        const newQuestionDatas = mutationsOrdered
            .map(mut => {

                const defaultData: InsertEntity<QuestionData> = mut.action === 'add'
                    ? {
                        deletionDate: null,
                        imageUrl: null,
                        orderIndex: 0,
                        questionText: '',
                        showUpTimeSeconds: null,
                        typeId: 1
                    }
                    : getOldData(mut).oldData;

                const { questionShowUpTimeSeconds, questionText } = XMutatorHelpers
                    .mapMutationToPartialObject(mut);

                if (questionShowUpTimeSeconds)
                    defaultData.showUpTimeSeconds = questionShowUpTimeSeconds;

                if (questionText)
                    defaultData.questionText = questionText;

                return defaultData;
            });

        const newQuestionDataIds = await this._ormService
            .createManyAsync(QuestionData, newQuestionDatas);

        //
        // Save versions
        const getOldParentId = ((mutation: QuestionMutationType): number => {

            if (mutation.action === 'add' && isVideo)
                return XMutatorHelpers.getFieldValueOrFail(mutation)('videoVersionId');

            if (mutation.action === 'add' && !isVideo)
                return XMutatorHelpers.getFieldValueOrFail(mutation)('examVersionId');

            if (mutation.action === 'update' && isVideo)
                return getOldData(mutation).oldVersion.videoVersionId!;

            if (mutation.action === 'update' && !isVideo)
                return getOldData(mutation).oldVersion.examVersionId!;

            throw new Error('Misconfigured if clauses');
        });

        const newQuestionVersions = mutationsOrdered
            .map((mutation, i) => {

                const oldParentId = getOldParentId(mutation);

                const newParentId = VersionMigrationHelpers
                    .getNewVersionId(itemVersionIdMigrations, oldParentId);

                const newQuestionDataId = newQuestionDataIds[i];
                const newQuestionId = newQuestionIds[i];

                const newVersion: InsertEntity<QuestionVersion> = {
                    examVersionId: isVideo ? null : newParentId,
                    videoVersionId: !isVideo ? null : newParentId,
                    personalityTraitCategoryId: null,
                    questionDataId: newQuestionDataId,
                    questionId: newQuestionId
                }

                return newVersion;
            });

        const newVersionIds = await this._ormService
            .createManyAsync(QuestionVersion, newQuestionVersions);

        const versionMigrations = VersionMigrationHelpers
            .create(oldVersionIds, newVersionIds);

        //  
        // Save answers 
        const answerMuations = mutationsOrdered
            .filter(questionMut => XMutatorHelpers.hasFieldMutation(questionMut)('answers'))
            .flatMap(questionMut => XMutatorHelpers.getFieldValueOrFail(questionMut)('answers')
                .map(ans => {
                    ans.questionVersionId = questionMut.key;
                    return ans;
                }));

        await this._answerService
            .saveQuestionAnswers(versionMigrations, answerMuations);
    }

    /**
     * Get old quesiton datas
     */
    private async _getOldQuestionDataAsync(mutations: QuestionMutationType[]) {

        const updateMuts = mutations
            .filter(x => x.action === 'update');

        if (updateMuts.length === 0)
            return { oldData: [], oldVersionIds: [] };

        const oldVersionIds = updateMuts
            .map(x => x.key);

        const oldVersions = await this._ormService
            .query(QuestionVersion, { oldVersionIds })
            .where('id', '=', 'oldVersionIds')
            .getMany();

        const oldQuesitonDatas = await this._ormService
            .query(QuestionData, { oldDataIds: oldVersions.map(x => x.questionDataId) })
            .where('id', '=', 'oldDataIds')
            .getMany();

        const oldQuestions = await this._ormService
            .query(Question, { oldEntityIds: oldVersions.map(x => x.questionId) })
            .where('id', '=', 'oldEntityIds')
            .getMany();

        const oldData = oldVersions
            .map((x, i) => ({
                oldData: oldQuesitonDatas[i],
                oldEntity: oldQuestions[i],
                oldVersion: x
            } as OldData<QuestionVersion, QuestionData, Question>));

        return { oldData, oldVersionIds };
    }

    /**
     * Increment question version while 
     * keeping data reference  
     */
    private async _incrementQuestionVersionsAsync(
        oldQustionVersions: QuestionVersion[],
        itemVersionIdMigrations: VersionMigrationResult[]) {

        const newVersions = oldQustionVersions
            .map(oldQustionVersion => {

                const newVideoVersionId = oldQustionVersion.videoVersionId
                    ? VersionMigrationHelpers
                        .getNewVersionId(itemVersionIdMigrations, oldQustionVersion.videoVersionId)
                    : null;

                const newExamVersionId = oldQustionVersion.examVersionId
                    ? VersionMigrationHelpers
                        .getNewVersionId(itemVersionIdMigrations, oldQustionVersion.examVersionId)
                    : null;

                const newVersion: InsertEntity<QuestionVersion> = {
                    videoVersionId: newVideoVersionId,
                    examVersionId: newExamVersionId,
                    questionDataId: oldQustionVersion.questionDataId,
                    questionId: oldQustionVersion.questionId,
                    personalityTraitCategoryId: null
                };

                return newVersion;
            });

        const newVersionIds = await this._ormService
            .createManyAsync(QuestionVersion, newVersions);

        //
        // Save answers 
        const idMigrations = VersionMigrationHelpers
            .create(oldQustionVersions.map(x => x.id), newVersionIds); 

        await this._answerService
            .incrementAnswerVersions(idMigrations);
    }

    /**
     * Returns old question 
     * versions for video versions/exam versions  
     */
    private async _getOldQuestionsAsync(itemVersionIdMigrations: VersionMigrationResult[], isVideo: boolean) {

        if (isVideo) {

            const oldVideoVersionIds = itemVersionIdMigrations
                .map(x => x.oldVersionId);

            const oldQuestionVersions = await this._ormService
                .query(QuestionVersion, { oldVideoVersionIds })
                .where('videoVersionId', '=', 'oldVideoVersionIds')
                .getMany();

            return oldQuestionVersions;
        }
        else {

            const oldExamVersionIds = itemVersionIdMigrations
                .map(x => x.oldVersionId);

            const oldQuestionVersions = await this._ormService
                .query(QuestionVersion, { oldExamVersionIds })
                .where('examVersionId', '=', 'oldExamVersionIds')
                .getMany();

            return oldQuestionVersions;
        }
    }
}