import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { LoggerService } from '../services/LoggerService';
import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
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
import { getCORSMiddleware, getUnderMaintanenceMiddleware } from './../services/misc/middlewareService';
import { AuthenticationMiddleware } from './../turboMiddleware/AuthenticationMiddleware';
import { AuthorizationMiddleware } from './../turboMiddleware/AuthorizationMiddleware';
import { ActionParams } from './../utilities/ActionParams';
import { onActionError, onActionSuccess } from './../utilities/apiHelpers';
import { GetServiceProviderType, TurboExpressBuilder } from './../utilities/XTurboExpress/TurboExpress';
import { ServiceProvider } from './servicesDI';

export const initTurboExpress = (singletonProvider: ServiceProvider, getServiceProvider: GetServiceProviderType) => {

    const globalConfig = singletonProvider.getService(GlobalConfiguration);
    const loggerService = singletonProvider.getService(LoggerService);

    const turboExpress = new TurboExpressBuilder<ActionParams>(loggerService)
        .setServicesCreationFunction(getServiceProvider)
        .setPort(globalConfig.misc.hostPort)
        .setErrorHandler(onActionError)
        .setSuccessHandler(onActionSuccess)
        .setTurboMiddleware<void, ActionParams>(AuthenticationMiddleware)
        .setTurboMiddleware<ActionParams, ActionParams>(AuthorizationMiddleware)
        .setExpressMiddleware(getCORSMiddleware(globalConfig))
        .setExpressMiddleware(bodyParser.json({ limit: '32mb' }))
        .setExpressMiddleware(bodyParser.urlencoded({ limit: '32mb', extended: true }))
        .setExpressMiddleware(fileUpload())
        .setExpressMiddleware(getUnderMaintanenceMiddleware(globalConfig))
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
        .addController(ModuleController)
        .addController(VideoController)
        .addController(QuestionController)
        .build();

    return turboExpress;
};