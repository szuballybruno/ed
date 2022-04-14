import { StorageFile } from '../models/entity/StorageFile';
import { Video } from '../models/entity/Video';
import { CourseItemQuestionEditView } from '../models/views/CourseItemQuestionEditView';
import { AnswerEditDTO } from '../shared/dtos/AnswerEditDTO';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { VideoQuestionEditDTO } from '../shared/dtos/VideoQuestionEditDTO';
import { FileService } from './FileService';
import { MapperService } from './MapperService';
import { toVideoQuestionEditDTO } from './misc/mappings';
import { QueryServiceBase } from './misc/ServiceBase';
import { getVideoLengthSecondsAsync } from './misc/videoDurationService';
import { QuestionAnswerService } from './QuestionAnswerService';
import { QuestionService } from './QuestionService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { UrlService } from './UrlService';
import { UserCourseBridgeService } from './UserCourseBridgeService';
import { QuestionEditDataDTO } from '../shared/dtos/QuestionEditDataDTO';
import { mapMutationToPartialObject } from './misc/xmutatorHelpers';
import { Question } from '../models/entity/Question';
import { withValue } from '../utilities/helpers';
import { Answer } from '../models/entity/Answer';
import { X509Certificate } from 'crypto';
import { CourseController } from '../api/CourseController';
import { Index } from 'typeorm';

export class VideoService extends QueryServiceBase<Video> {

    private _userCourseBridgeService: UserCourseBridgeService;
    private _questionAnswerService: QuestionAnswerService;
    private _fileService: FileService;
    private _questionsService: QuestionService;
    private _assetUrlService: UrlService;

    constructor(
        ormConnection: ORMConnectionService,
        userCourseBridgeService: UserCourseBridgeService,
        questionAnswerService: QuestionAnswerService,
        fileService: FileService,
        questionsService: QuestionService,
        assetUrlService: UrlService,
        mapperService: MapperService) {

        super(mapperService, ormConnection, Video);

        this._questionAnswerService = questionAnswerService;
        this._userCourseBridgeService = userCourseBridgeService;
        this._fileService = fileService;
        this._questionsService = questionsService;
        this._assetUrlService = assetUrlService;
    }

    answerVideoQuestionAsync = async (
        userId: number,
        answerSessionId: number,
        questionId: number,
        answerIds: number[],
        elapsedSeconds: number) => {

        // validation comes here

        return this._questionAnswerService
            .answerQuestionAsync(userId, answerSessionId, questionId, answerIds, false, elapsedSeconds);
    };

    insertVideoAsync = async (video: Video, filePath?: string) => {

        if (video.id)
            throw new Error('Cannot insert with id!');

        if (filePath) {
            const videoFileUrl = this._assetUrlService
                .getAssetUrl(filePath)!;

            video.videoFile = {
                filePath: filePath
            } as StorageFile;

            video.lengthSeconds = await getVideoLengthSecondsAsync(videoFileUrl);
        }
        else {

            video.lengthSeconds = 0;
        }

        await this._ormService
            .getRepository(Video)
            .save(video);
    };

    setVideoFileIdAsync = async (videoId: number, videoFileId: number) => {

        await this._ormService
            .getRepository(Video)
            .save({
                id: videoId,
                videoFileId: videoFileId
            });
    };

    async softDeleteVideosAsync(videoIds: number[], unsetCurrentCourseItem: boolean) {

        // if (videoIds.length === 0)
        //     return;

        // // delete questions
        // const questions = await this._ormService
        //     .getRepository(Question)
        //     .createQueryBuilder("q")
        //     .where('"video_id" IN (:...videoIds)', { videoIds })
        //     .getMany();

        // await this._questionsService
        //     .softDeleteQuesitonsAsync(questions.map(x => x.id));

        // // delete answer sessions
        // await this._ormService
        //     .getOrmConnection()
        //     .createQueryBuilder()
        //     .delete()
        //     .from(AnswerSession)
        //     .where('"video_id" IN (:...videoIds)', { videoIds })
        //     .execute();

        // // set current course item on users
        // if (unsetCurrentCourseItem) {
        //     for (let index = 0; index < videoIds.length; index++) {

        //         const videoId = videoIds[index];
        //         await this._userCourseBridgeService
        //             .unsetUsersCurrentCourseItemAsync(undefined, videoId);
        //     }
        // }

        // // delete playback samples 
        // await this._ormService
        //     .getOrmConnection()
        //     .createQueryBuilder()
        //     .delete()
        //     .from(VideoPlaybackSample)
        //     .where('"video_id" IN (:...videoIds)', { videoIds })
        //     .execute();

        // // delete ratings 
        // await this._ormService
        //     .getOrmConnection()
        //     .createQueryBuilder()
        //     .delete()
        //     .from(VideoRating)
        //     .where('video_id IN (:...videoIds)', { videoIds })
        //     .execute();

        // // delete playback samples 
        // await this._ormService
        //     .getOrmConnection()
        //     .createQueryBuilder()
        //     .delete()
        //     .from(UserVideoProgressBridge)
        //     .where('"video_id" IN (:...videoIds)', { videoIds })
        //     .execute();

        // delete video
        await this._ormService
            .softDelete(Video, videoIds);
    }

    uploadVideoFileAsync = async (videoId: number, videoFileBuffer: Buffer) => {

        // upload file
        const filePath = this._fileService
            .getFilePath('videos', 'video', videoId, 'mp4');

        await this._fileService
            .uploadAssigendFileAsync<Video>(
                filePath,
                () => this.getVideoByIdAsync(videoId),
                (fileId) => this.setVideoFileIdAsync(videoId, fileId),
                (entity) => entity.videoFileId,
                videoFileBuffer);

        // set video length
        const videoFileUrl = this._assetUrlService
            .getAssetUrl(filePath);

        const lengthSeconds = await getVideoLengthSecondsAsync(videoFileUrl);

        await this._ormService
            .getRepository(Video)
            .save({
                id: videoId,
                lengthSeconds: lengthSeconds
            });
    };

    setVideoThumbnailFileId = async (videoId: number, thumbnailFileId: number) => {

        await this._ormService
            .getRepository(Video)
            .save({
                id: videoId,
                thumbnailFileId: thumbnailFileId
            });
    };

    getVideoByIdAsync = async (videoId: number) => {

        const video = await this._ormService
            .getSingleById(Video, videoId);

        return video;
    };

    getVideoPlayerDataAsync = async (videoId: number) => {

        const video = await this._ormService
            .getRepository(Video)
            .createQueryBuilder('v')
            .where('v.id = :videoId', { videoId })
            .leftJoinAndSelect('v.videoFile', 'vf')
            .leftJoinAndSelect('v.questions', 'q')
            .leftJoinAndSelect('q.answers', 'a')
            .getOneOrFail();

        return video;
    };

    getVideoQuestionEditDataAsync = async (
        videoId?: number
    ) => {

        const questionEditView = await this._ormService
            .getRepository(CourseItemQuestionEditView)
            .createQueryBuilder('vq')
            .where('vq.videoId = :videoId', { videoId })
            .getMany();

        const videoQuestionEditDTO = toVideoQuestionEditDTO(questionEditView, this._assetUrlService.getAssetUrl);

        return videoQuestionEditDTO;
    };

    async saveVideoQuestionEditDataAsync(mutations: Mutation<QuestionEditDataDTO, 'questionId'>[]) {

        await this.saveNewQuestionsAndAnswers(mutations);
        await this.saveUpdatedQuestions(mutations);
        await this.saveUpdatedAnswers(mutations);
        await this.saveNewAnswers(mutations);
    }

    private async saveNewQuestionsAndAnswers(mutations: Mutation<QuestionEditDataDTO, 'questionId'>[]) {

        const addMuts = mutations
            .filter(x => x.action === 'add');

        const newQuestions = addMuts
            .filter(x => x.key < 0)
            .filter(x => mapMutationToPartialObject(x).questionText)
            .map(updateMut => {

                const updateDto = mapMutationToPartialObject(updateMut);

                const question: Partial<Question> = {
                    id: updateMut.key,
                    videoId: updateDto.videoId || undefined,
                    questionText: updateDto.questionText,
                    showUpTimeSeconds: updateDto.questionShowUpTimeSeconds || undefined
                };

                return { question, answers: updateDto.answers };
            });

        // insert new questions
        await this._ormService
            .getRepository(Question)
            .insert(newQuestions.map(x => x.question));

        // newly added questions new answers
        const newAnswers = newQuestions
            .filter(x => x.question.id! > 0 && x.answers)
            .flatMap(savedQuestion => {

                return savedQuestion.answers
                    ?.filter(x => x)
                    .map(x => ({
                        ...x,
                        questionId: savedQuestion.question.id
                    })) as Partial<Answer>[];
            });

        // insert new answers where the question was new
        await this._ormService
            .getRepository(Answer)
            .insert(newAnswers);
    }

    private async saveUpdatedQuestions(mutations: Mutation<QuestionEditDataDTO, 'questionId'>[]) {

        const updateMuts = mutations
            .filter(x => x.action === 'update');

        const questions = updateMuts
            .filter(x => x.key > 0)
            .map(updateMut => {

                const updateDto = mapMutationToPartialObject(updateMut);

                const question: Partial<Question> = {
                    id: updateMut.key,
                    questionText: updateDto.questionText,
                    showUpTimeSeconds: updateDto.questionShowUpTimeSeconds
                };

                return question;
            });

        await this._ormService
            .save(Question, questions);
    }

    private async saveUpdatedAnswers(mutations: Mutation<QuestionEditDataDTO, 'questionId'>[]) {

        const updateMuts = mutations
            .filter(x => x.action === 'update');

        // existing questions existing answers
        const existingAnswers = updateMuts
            .filter(x => x.key > 0)
            .flatMap(y => y.fieldMutators
                .flat()
                .filter(x => x.field === 'answers')
                .flatMap(x => x.value as Partial<Answer>)
                .flatMap(x => {
                    return {
                        ...x,
                        questionId: y.key
                    };
                })
            )
            .filter(x => x.id! > 0) as Partial<Answer>[];

        await this._ormService
            .save(Answer, existingAnswers);
    }

    private async saveNewAnswers(mutations: Mutation<QuestionEditDataDTO, 'questionId'>[]) {

        const updateMuts = mutations
            .filter(x => x.action === 'update');

        // existing questions new answers
        const newAnswers = updateMuts
            .filter(x => x.key > 0)
            .flatMap(y => y.fieldMutators
                .flat()
                .filter(x => x.field === 'answers')
                .flatMap(x => x.value as Partial<Answer>)
                .filter(x => x.text)
                .flatMap(x => {
                    return {
                        ...x,
                        questionId: y.key
                    };
                })
            )
            .filter(x => x.id! < 0) as Partial<Answer>[];

        await this._ormService
            .getRepository(Answer)
            .insert(newAnswers);
    }
}