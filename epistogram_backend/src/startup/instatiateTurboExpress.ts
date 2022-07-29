
import { CourseProgressController } from '../api/CourseProgressController';
import { PlaylistController } from '../api/PlaylistController';
import { LoggerService } from '../services/LoggerService';
import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { ORMConnectionService } from '../services/ORMConnectionService/ORMConnectionService';
import { SQLConnectionService } from '../services/sqlServices/SQLConnectionService';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { ActionWrapperFunctionType, GetServiceProviderType, ITurboRequest, ITurboResponse, IXTurboExpressListener } from '../utilities/XTurboExpress/XTurboExpressTypes';
import { ZAuthenticationController } from './../api/AuthenticationController2';
import { CoinTransactionsController } from './../api/CoinTransactionsController';
import { CommentController } from './../api/CommentController';
import { CompanyController } from './../api/CompanyController';
import { CourseController } from './../api/CourseController';
import { CourseItemController } from './../api/CourseItemController';
import { CourseRatingController } from './../api/CourseRatingController';
import { DailyTipController } from './../api/DailyTipController';
import { EventController } from './../api/EventController';
import { ExamController } from './../api/ExamController';
import { FileController } from './../api/FileController';
import { MiscController } from './../api/MiscController';
import { ModuleController } from './../api/ModuleController';
import { PasswordChangeController } from './../api/PasswordChangeController';
import { PermissionController } from './../api/PermissionController';
import { PersonalityAssessmentController } from './../api/PersonalityAssessmentController';
import { PlaybackController } from './../api/PlaybackController';
import { PlayerController } from './../api/PlayerController';
import { PrequizController } from './../api/PrequizController';
import { PretestController } from './../api/PretestController';
import { QuestionController } from './../api/QuestionController';
import { RegistrationController } from './../api/RegistrationController';
import { RoleController } from './../api/RoleController';
import { ShopController } from './../api/ShopController';
import { SignupController } from './../api/SignupController';
import { TempomatController } from './../api/TempomatController';
import { UserController } from './../api/UserController';
import { UserProgressController } from './../api/UserProgressController';
import { UserStatsController } from './../api/UserStatsController';
import { VideoController } from './../api/VideoController';
import { VideoRatingController } from './../api/VideoRatingController';
import { AuthenticationMiddleware } from './../turboMiddleware/AuthenticationMiddleware';
import { AuthorizationMiddleware } from './../turboMiddleware/AuthorizationMiddleware';
import { onActionError, onActionSuccess } from './../utilities/apiHelpers';
import { TurboExpressBuilder } from './../utilities/XTurboExpress/TurboExpress';
import { ServiceProvider } from './servicesDI';

export const actionWrapper: ActionWrapperFunctionType = async (serviceProvider: ServiceProvider, action: () => Promise<any>) => {

    const ormService = serviceProvider
        .getService(ORMConnectionService);

    const sqlService = serviceProvider
        .getService(SQLConnectionService);

    // BEGIN
    await ormService
        .beginTransactionAsync();

    try {

        const rv = await action();

        // COMMIT
        await ormService
            .commitTransactionAsync();

        return rv;
    }
    catch (e: any) {

        // ROLLBACK
        await ormService
            .rollbackTransactionAsync();

        throw e;
    }
    finally {

        sqlService
            .releaseConnectionClient();
    }
};

export const initTurboExpress = (
    singletonProvider: ServiceProvider, 
    getServiceProvider: GetServiceProviderType,
    listener: IXTurboExpressListener) => {

    const globalConfig = singletonProvider.getService(GlobalConfiguration);
    const loggerService = singletonProvider.getService(LoggerService);

    const turboExpress = new TurboExpressBuilder<ActionParams, ITurboRequest, ITurboResponse>(loggerService, listener)
        .setServicesCreationFunction(getServiceProvider)
        .addActionWrapperFunction(actionWrapper)
        .setPort(globalConfig.misc.hostPort)
        .setErrorHandler(onActionError)
        .setSuccessHandler(onActionSuccess)
        .setTurboMiddleware<void, ActionParams>(AuthenticationMiddleware)
        .setTurboMiddleware<ActionParams, ActionParams>(AuthorizationMiddleware)
        .addController(MiscController)
        .addController(UserController)
        .addController(CourseItemController)
        .addController(PermissionController)
        .addController(RoleController)
        .addController(CompanyController)
        .addController(CommentController)
        .addController(ZAuthenticationController)
        .addController(ExamController)
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
        .addController(SignupController)
        .addController(PlayerController)
        .addController(PlaybackController)
        .addController(CourseController)
        .addController(PlaylistController)
        .addController(CourseProgressController)
        .addController(ModuleController)
        .addController(VideoController)
        .addController(QuestionController)
        .build();

    return turboExpress;
};