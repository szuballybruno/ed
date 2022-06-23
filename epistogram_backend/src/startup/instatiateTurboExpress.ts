import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
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
import { ScheduledJobTriggerController } from './../api/ScheduledJobTriggerController';
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
import { TurboExpressBuilder } from './../utilities/XTurboExpress/TurboExpress';

export const initTurboExpress = (globalConfig: GlobalConfiguration, services: any, controllers: any) => {

    const turboExpress = new TurboExpressBuilder<ActionParams>()
        .setPort(globalConfig.misc.hostPort)
        .setErrorHandler(onActionError)
        .setSuccessHandler(onActionSuccess)
        .setTurboMiddleware<void, ActionParams>(new AuthenticationMiddleware(services.authenticationService, services.loggerService))
        .setTurboMiddleware<ActionParams, ActionParams>(new AuthorizationMiddleware(services.authorizationService))
        .setExpressMiddleware(getCORSMiddleware(globalConfig))
        .setExpressMiddleware(bodyParser.json({ limit: '32mb' }))
        .setExpressMiddleware(bodyParser.urlencoded({ limit: '32mb', extended: true }))
        .setExpressMiddleware(fileUpload())
        .setExpressMiddleware(getUnderMaintanenceMiddleware(globalConfig))
        .addController(MiscController, controllers.miscController)
        .addController(UserController, controllers.userController)
        .addController(CourseItemController, controllers.coruseItemController)
        .addController(PermissionController, controllers.permissionController)
        .addController(RoleController, controllers.roleController)
        .addController(CompanyController, controllers.companyController)
        .addController(CommentController, controllers.commentController)
        .addController(ZAuthenticationController, controllers.authenticationController)
        .addController(ExamController, controllers.examController)
        .addController(RegistrationController, controllers.registrationController)
        .addController(ScheduledJobTriggerController, controllers.scheduledJobTriggerController)
        .addController(TempomatController, controllers.tempomatController)
        .addController(DailyTipController, controllers.dailyTipController)
        .addController(PersonalityAssessmentController, controllers.personalityAssessmentController)
        .addController(ShopController, controllers.shopController)
        .addController(EventController, controllers.eventController)
        .addController(VideoRatingController, controllers.videoRatingController)
        .addController(PasswordChangeController, controllers.passwordChangeController)
        .addController(CoinTransactionsController, controllers.coinTransactionsController)
        .addController(PrequizController, controllers.prequizController)
        .addController(PretestController, controllers.pretestController)
        .addController(CourseRatingController, controllers.courseRatingController)
        .addController(UserStatsController, controllers.userStatsController)
        .addController(UserProgressController, controllers.userProgressController)
        .addController(FileController, controllers.fileController)
        .addController(SignupController, controllers.signupController)
        .addController(PlayerController, controllers.playerController)
        .addController(PlaybackController, controllers.playbackController)
        .addController(CourseController, controllers.courseController)
        .addController(ModuleController, controllers.moduleController)
        .addController(VideoController, controllers.videoController)
        .addController(QuestionController, controllers.questionController)
        .build();

    return turboExpress;
};