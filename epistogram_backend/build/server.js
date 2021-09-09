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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
require("reflect-metadata"); // need to be imported for TypeORM
const adminCourses_1 = require("./api/adminCourses");
const authenticationActions_1 = require("./api/authenticationActions");
const dataActions_1 = require("./api/dataActions");
const fileActions_1 = require("./api/fileActions");
const playerActions_1 = require("./api/playerActions");
const userCourses_1 = require("./api/userCourses");
const userManagementActions_1 = require("./api/userManagementActions");
const database_1 = require("./database");
const authentication_1 = require("./services/authentication");
const environment_1 = require("./services/environment");
const logger_1 = require("./services/misc/logger");
const staticProvider_1 = require("./staticProvider");
const helpers_1 = require("./utilities/helpers");
require("./utilities/jsExtensions");
const courseManagementActions_1 = require("./api/courses/courseManagementActions");
// initialize env
// require is mandatory here, for some unknown reason
environment_1.initailizeDotEnvEnvironmentConfig();
const initializeAsync = () => __awaiter(void 0, void 0, void 0, function* () {
    const recreateDatabaseAtStart = staticProvider_1.staticProvider.globalConfig.database.recreateDatabaseAtStart;
    // init DB
    logger_1.log("Initializing DB...");
    yield database_1.initializeDBAsync(recreateDatabaseAtStart);
    logger_1.log("DB initialized.");
    // init express
    logger_1.log("Initializing express...");
    const expressServer = express_1.default();
    const authMiddleware = (req, res, next) => {
        logger_1.log("Authorizing request...");
        authentication_1.authorizeRequest(req)
            .then(tokenMeta => {
            logger_1.log("Authorization successful, userId: " + tokenMeta.userId);
            next();
        })
            .catch(() => {
            logger_1.log("Authorizing request failed.");
            helpers_1.respond(res, 403);
        });
    };
    const corsMiddleware = cors_1.default({
        origin: 'http://localhost:3000',
        credentials: true,
        allowedHeaders: [
            "Origin",
            "X-Requested-With",
            "Content-Type",
            "Accept",
            "Authorization"
        ],
        preflightContinue: false,
        methods: "DELETE, PATCH"
    });
    //
    // add middlewares
    //
    expressServer.use(corsMiddleware);
    expressServer.use(body_parser_1.default.json());
    expressServer.use(express_fileupload_1.default());
    expressServer.use((req, res, next) => {
        logger_1.log("Request arrived: " + req.path);
        next();
    });
    // unprotected routes
    expressServer.get('/renew-user-session', authenticationActions_1.renewUserSessionAction);
    expressServer.post('/log-out-user', authenticationActions_1.logOutUserAction);
    expressServer.post('/login-user', helpers_1.getAsyncActionHandler(authenticationActions_1.logInUserAction));
    expressServer.post('/get-signup-data', dataActions_1.getSignupDataAction);
    expressServer.post('/save-signup-questionnaire-answers', dataActions_1.saveSignupQuestionnaireAnswersAction);
    // misc
    expressServer.get('/get-current-user', authMiddleware, authenticationActions_1.getCurrentUserAction);
    // file
    expressServer.post('/file/upload-video', authMiddleware, fileActions_1.uploadVideoFileAction);
    expressServer.post('/file/upload-video-thumbnail', authMiddleware, fileActions_1.uploadVideoThumbnailFileAction);
    expressServer.post('/file/upload-avatar', authMiddleware, fileActions_1.uploadAvatarFileAction);
    expressServer.post('/file/upload-course-cover', authMiddleware, fileActions_1.uploadCourseCoverFileAction);
    // data
    expressServer.get("/data/get-overview-page-dto", authMiddleware, helpers_1.getAsyncActionHandler(dataActions_1.getOverviewPageDTOAction));
    // player
    expressServer.post('/player/get-player-data', authMiddleware, playerActions_1.getPlayerDataAction);
    // users
    expressServer.get("/users/get-user-administartion-user-list", authMiddleware, dataActions_1.getUsersAction);
    expressServer.post("/users/create-invited-user", authMiddleware, helpers_1.getAsyncActionHandler(userManagementActions_1.createInvitedUserAction));
    expressServer.post("/users/finalize-user-registration", authMiddleware, helpers_1.getAsyncActionHandler(userManagementActions_1.finalizeUserRegistrationAction));
    // courses 
    expressServer.post("/get-user-courses", authMiddleware, userCourses_1.getUserCoursesAction);
    expressServer.post("/get-admin-courses", authMiddleware, helpers_1.getAsyncActionHandler(adminCourses_1.getAdminCoursesAction));
    expressServer.post("/get-admin-edit-course", authMiddleware, helpers_1.getAsyncActionHandler(courseManagementActions_1.getEditedCourseAction));
    // organizations 
    expressServer.get("/organizations/get-organizations", authMiddleware, helpers_1.getAsyncActionHandler(dataActions_1.getOrganizationsAction));
    // 404 - no match
    expressServer.use((req, res) => {
        res.status(404).send(`Route did not match: ${req.url}`);
    });
    // error handler
    expressServer.use((error, req, res) => {
        logger_1.logError("Express error middleware.");
        logger_1.logError(error);
        return res.status(500).send(error.toString());
    });
    // listen
    expressServer.listen(staticProvider_1.staticProvider.globalConfig.misc.hostPort, () => logger_1.log(`Listening on port '${staticProvider_1.staticProvider.globalConfig.misc.hostPort}'!`));
});
initializeAsync();
//# sourceMappingURL=server.js.map