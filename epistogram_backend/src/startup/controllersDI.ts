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
import { TeacherInfoController } from './../api/TeacherInfoController';
import { TempomatController } from './../api/TempomatController';
import { UserController } from './../api/UserController';
import { UserProgressController } from './../api/UserProgressController';
import { UserStatsController } from './../api/UserStatsController';
import { VideoController } from './../api/VideoController';
import { VideoRatingController } from './../api/VideoRatingController';
import { ServiceProvider } from './servicesDI';

export const instatiateControllers = (serviceProvider: ServiceProvider) => {

    const controllers = {} as any;

    controllers.permissionController = new PermissionController(serviceProvider); // DONE
    controllers.userStatsController = new UserStatsController(serviceProvider); // DONE
    controllers.prequizController = new PrequizController(serviceProvider); // DONE
    controllers.pretestController = new PretestController(serviceProvider); // DONE
    controllers.courseRatingController = new CourseRatingController(serviceProvider); // DONE
    controllers.eventController = new EventController(serviceProvider); // DONE
    controllers.coinTransactionsController = new CoinTransactionsController(serviceProvider); // DONE
    controllers.registrationController = new RegistrationController(serviceProvider); // DONE
    controllers.miscController = new MiscController(serviceProvider); // DONE
    controllers.authenticationController = new ZAuthenticationController(serviceProvider); // DONE
    controllers.userController = new UserController(serviceProvider); // DONE
    controllers.fileController = new FileController(serviceProvider); // DONE
    controllers.signupController = new SignupController(serviceProvider); // DONE
    controllers.playerController = new PlayerController(serviceProvider); // DONE
    controllers.courseController = new CourseController(serviceProvider); // DONE
    controllers.moduleController = new ModuleController(serviceProvider); // DONE
    controllers.videoController = new VideoController(serviceProvider); // DONE
    controllers.questionController = new QuestionController(serviceProvider); // DONE
    controllers.examController = new ExamController(serviceProvider); // DONE
    controllers.shopController = new ShopController(serviceProvider); // DONE
    controllers.teacherInfoController = new TeacherInfoController(serviceProvider);
    controllers.passwordChangeController = new PasswordChangeController(serviceProvider);
    controllers.videoRatingController = new VideoRatingController(serviceProvider);
    controllers.personalityAssessmentController = new PersonalityAssessmentController(serviceProvider);
    controllers.dailyTipController = new DailyTipController(serviceProvider);
    controllers.userProgressController = new UserProgressController(serviceProvider);
    controllers.playbackController = new PlaybackController(serviceProvider);
    controllers.tempomatController = new TempomatController(serviceProvider);
    controllers.companyController = new CompanyController(serviceProvider);
    controllers.roleController = new RoleController(serviceProvider);
    controllers.commentController = new CommentController(serviceProvider);
    controllers.coruseItemController = new CourseItemController(serviceProvider);

    return controllers;
};