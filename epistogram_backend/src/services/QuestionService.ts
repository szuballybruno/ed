import { QuestionVersion } from '../models/entity/question/QuestionVersion';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { QuestionEditDataDTO } from '../shared/dtos/QuestionEditDataDTO';
import { InsertEntity, VersionMigrationHelpers, VersionMigrationResult } from '../utilities/misc';
import { XMutatorHelpers } from './misc/XMutatorHelpers_a';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

type QuestionMutationType = Mutation<QuestionEditDataDTO, 'questionVersionId'>;

export class QuestionService {

    constructor(private _ormService: ORMConnectionService) {

    }

    /**
     * Saves course item questions based on mutations  
     */
    async saveCourseItemQuestionsAsync(
        itemVersionIdMigrations: VersionMigrationResult[],
        mutations: QuestionMutationType[],
        isVideo: boolean) {

        // get old question versions 
        const oldQuestionVersions = await this
            ._getOldQuestionsAsync(itemVersionIdMigrations, isVideo);

        // get unmodified questions 
        const unmodifiedQuestions = oldQuestionVersions
            .filter(x => !XMutatorHelpers.hasMutationForKey(mutations)(x.id));

        // increment unmodified
        await this._incrementQuestionVersionsAsync(unmodifiedQuestions, itemVersionIdMigrations);
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

        await this._ormService
            .createManyAsync(QuestionVersion, newVersions);
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