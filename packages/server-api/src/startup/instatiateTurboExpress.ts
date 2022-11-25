
import { AuthenticationController } from '../controllers/AuthenticationController';
import { CourseProgressController } from '../controllers/CourseProgressController';
import { InvitationController } from '../controllers/InvitationController';
import { LeaderboardController } from '../controllers/LeaderboardController';
import { SurveyController } from '../controllers/SurveyController';
import { TeacherInfoController } from '../controllers/TeacherInfoController';
import { CoinTransactionsController } from '../controllers/CoinTransactionsController';
import { CommentController } from '../controllers/CommentController';
import { CompanyController } from '../controllers/CompanyController';
import { CourseController } from '../controllers/CourseController';
import { CourseItemController } from '../controllers/CourseItemController';
import { CourseRatingController } from '../controllers/CourseRatingController';
import { DailyTipController } from '../controllers/DailyTipController';
import { EventController } from '../controllers/EventController';
import { ExamController } from '../controllers/ExamController';
import { FileController } from '../controllers/FileController';
import { MiscController } from '../controllers/MiscController';
import { ModuleController } from '../controllers/ModuleController';
import { PasswordChangeController } from '../controllers/PasswordChangeController';
import { PermissionController } from '../controllers/PermissionController';
import { PersonalityAssessmentController } from '../controllers/PersonalityAssessmentController';
import { PlaybackController } from '../controllers/PlaybackController';
import { PlayerController } from '../controllers/PlayerController';
import { PrequizController } from '../controllers/PrequizController';
import { PretestController } from '../controllers/PretestController';
import { QuestionController } from '../controllers/QuestionController';
import { RegistrationController } from '../controllers/RegistrationController';
import { RoleController } from '../controllers/RoleController';
import { ShopController } from '../controllers/ShopController';
import { TempomatController } from '../controllers/TempomatController';
import { UserController } from '../controllers/UserController';
import { UserProgressController } from '../controllers/UserProgressController';
import { UserStatsController } from '../controllers/UserStatsController';
import { VideoController } from '../controllers/VideoController';
import { VideoRatingController } from '../controllers/VideoRatingController';
import { AuthenticationMiddleware } from '../turboImplementations/AuthenticationMiddleware';
import { AuthorizationMiddleware } from '../turboImplementations/AuthorizationMiddleware';
import { ActionParams } from '../XTurboExpress/ActionParams';
import { ActionWrapperFunctionType, ITurboRequest, ITurboResponse, IXTurboExpressListener } from '../XTurboExpress/XTurboExpressTypes';
import { TurboExpressBuilder } from '../XTurboExpress/TurboExpress';
import { ServiceProviderInitializator } from './initApp';
import { ServiceProvider } from './ServiceProvider';
import { ORMConnectionService, SQLConnectionService, LoggerService, GlobalConfigurationService } from '@episto/server-services';

export const actionWrapper: ActionWrapperFunctionType = async (serviceProvider: ServiceProvider, action: () => Promise<any>) => {

    const ormService = serviceProvider
        .getService(ORMConnectionService);

    const sqlService = serviceProvider
        .getService(SQLConnectionService);

    const loggerService = serviceProvider
        .getService(LoggerService);

    // BEGIN
    loggerService.logScoped('TRANSACTION', 'Begin transaction...');

    await ormService
        .beginTransactionAsync();

    try {

        loggerService.logScoped('TRANSACTION', 'Running action in transaction...');

        const rv = await action();

        // COMMIT
        loggerService.logScoped('TRANSACTION', 'Commit transaction...');

        await ormService
            .commitTransactionAsync();

        return rv;
    }
    catch (e: any) {

        loggerService.logScoped('TRANSACTION', 'An error occured during the action: ' + e.message ?? '');

        // ROLLBACK
        loggerService.logScoped('TRANSACTION', 'Rollback transaction...');

        await ormService
            .rollbackTransactionAsync();

        throw e;
    }
    finally {

        loggerService.logScoped('TRANSACTION', 'Release client...');

        sqlService
            .releaseConnectionClient();
    }
};

export const initTurboExpress = (
    initializator: ServiceProviderInitializator,
    listener: IXTurboExpressListener) => {

    const singletonProvider = initializator
        .getSingletonProvider();

    const globalConfig = singletonProvider.getService(GlobalConfigurationService);
    const loggerService = singletonProvider.getService(LoggerService);

    const turboExpress = new TurboExpressBuilder<ActionParams, ITurboRequest, ITurboResponse>(loggerService, listener)
        .setServicesCreationFunction(initializator.getInitializedTransientServices.bind(initializator))
        .addActionWrapperFunction(actionWrapper)
        .setPort(globalConfig.misc.hostPort)
        .setTurboMiddleware<void, ActionParams>(AuthenticationMiddleware)
        .setTurboMiddleware<ActionParams, ActionParams>(AuthorizationMiddleware)
        .addController(MiscController)
        .addController(UserController)
        .addController(CourseItemController)
        .addController(PermissionController)
        .addController(RoleController)
        .addController(CompanyController)
        .addController(CommentController)
        .addController(AuthenticationController)
        .addController(ExamController)
        .addController(InvitationController)
        .addController(RegistrationController)
        .addController(TempomatController)
        .addController(DailyTipController)
        .addController(PersonalityAssessmentController)
        .addController(ShopController)
        .addController(EventController)
        .addController(VideoRatingController)
        .addController(PasswordChangeController)
        .addController(CoinTransactionsController)
        .addController(PrequizController)
        .addController(PretestController)
        .addController(CourseRatingController)
        .addController(UserStatsController)
        .addController(UserProgressController)
        .addController(FileController)
        .addController(SurveyController)
        .addController(TeacherInfoController)
        .addController(PlayerController)
        .addController(PlaybackController)
        .addController(CourseController)
        .addController(CourseProgressController)
        .addController(ModuleController)
        .addController(VideoController)
        .addController(LeaderboardController)
        .addController(QuestionController)
        .build();

    return turboExpress;
};