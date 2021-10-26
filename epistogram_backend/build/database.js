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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDB = exports.recreateDB = exports.initializeDBAsync = void 0;
const typeorm_1 = require("typeorm");
const typeorm_extension_1 = require("typeorm-extension");
const Answer_1 = require("./models/entity/Answer");
const Course_1 = require("./models/entity/Course");
const Exam_1 = require("./models/entity/Exam");
const Organization_1 = require("./models/entity/Organization");
const Question_1 = require("./models/entity/Question");
const QuestionAnswer_1 = require("./models/entity/QuestionAnswer");
const StorageFile_1 = require("./models/entity/StorageFile");
const Task_1 = require("./models/entity/Task");
const TestChild_1 = require("./models/entity/TestChild");
const TestParent_1 = require("./models/entity/TestParent");
const User_1 = require("./models/entity/User");
const Video_1 = require("./models/entity/Video");
const logger_1 = require("./services/misc/logger");
const userManagementService_1 = require("./services/userManagementService");
const staticProvider_1 = require("./staticProvider");
const initializeDBAsync = (recreate) => __awaiter(void 0, void 0, void 0, function* () {
    const host = staticProvider_1.staticProvider.globalConfig.database.hostAddress;
    const port = staticProvider_1.staticProvider.globalConfig.database.port;
    const username = staticProvider_1.staticProvider.globalConfig.database.serviceUserName;
    const password = staticProvider_1.staticProvider.globalConfig.database.serviceUserPassword;
    const databaseName = staticProvider_1.staticProvider.globalConfig.database.name;
    const isSyncEnabled = staticProvider_1.staticProvider.globalConfig.database.isOrmSyncEnabled;
    const isLoggingEnabled = staticProvider_1.staticProvider.globalConfig.database.isOrmLoggingEnabled;
    const postgresOptions = {
        type: "postgres",
        port: port,
        host: host,
        username: username,
        password: password,
        database: databaseName,
        synchronize: isSyncEnabled,
        logging: isLoggingEnabled,
        entities: [
            // "models/entity/**/*.ts"
            Course_1.Course,
            Exam_1.Exam,
            Organization_1.Organization,
            User_1.User,
            Video_1.Video,
            Task_1.Task,
            QuestionAnswer_1.QuestionAnswer,
            Question_1.Question,
            Answer_1.Answer,
            TestChild_1.TestChild,
            TestParent_1.TestParent,
            StorageFile_1.StorageFile
        ],
    };
    // const postgresOptions = {
    //     type: "postgres",
    //     port: 5432,
    //     host: "34.118.107.79",
    //     username: "bence",
    //     password: "epistogram",
    //     database: "epistogram_DEV",
    //     synchronize: true,
    //     logging: false,
    //     entities: [
    //         "models/entity/**/*.ts"
    //     ],
    // } as ConnectionOptions;
    logger_1.log("Database connection options:");
    logger_1.log(postgresOptions);
    if (recreate) {
        logger_1.log("Recreating DB...");
        yield exports.recreateDB(postgresOptions);
    }
    logger_1.log("Connecting to database with TypeORM...");
    staticProvider_1.staticProvider.ormConnection = yield typeorm_1.createConnection(postgresOptions);
    // seed DB if no users are found
    const users = yield staticProvider_1.staticProvider
        .ormConnection
        .getRepository(User_1.User)
        .find();
    if (users.length < 1) {
        logger_1.log("Seeding DB...");
        yield exports.seedDB();
    }
});
exports.initializeDBAsync = initializeDBAsync;
const recreateDB = (postgresOptions) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.log("Dropping database...");
    yield typeorm_extension_1.dropDatabase({ ifExist: true }, postgresOptions);
    logger_1.log("Creating database...");
    yield typeorm_extension_1.createDatabase({ ifNotExist: true, characterSet: "UTF8" }, postgresOptions);
});
exports.recreateDB = recreateDB;
const seedDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = staticProvider_1.staticProvider.ormConnection;
    // seed organizations
    const insertedOrganizationIds = (yield connection
        .getRepository(Organization_1.Organization)
        .insert([
        {
            name: "P029"
        },
        {
            name: "EpistoGram"
        }
    ]))
        .identifiers
        .map(x => x.id);
    // seed courses
    yield connection
        .getRepository(Course_1.Course)
        .save([
        {
            title: "Java Course",
            category: "Programming",
            courseGroup: "IT",
            permissionLevel: "public",
            organizationId: 1,
            colorOne: "#123456",
            colorTwo: "#ABCDEF",
            exams: [
                {
                    title: "New Exam 1",
                    subtitle: "Fantastic exam 1",
                    thumbnailUrl: "",
                    description: "",
                    orderIndex: 1
                },
                {
                    title: "New Exam 2",
                    subtitle: "Fantastic exam 2",
                    thumbnailUrl: "",
                    description: "",
                    orderIndex: 3
                },
                {
                    title: "New Exam 3",
                    subtitle: "Fantastic exam 3",
                    thumbnailUrl: "",
                    description: "",
                    orderIndex: 4
                }
            ],
            videos: [
                {
                    title: "Video 1",
                    subtitle: "Fantastic Video 1",
                    description: "Very very fantastic video 1 description",
                    orderIndex: 0
                },
                {
                    title: "Video 2",
                    subtitle: "Fantastic Video 2",
                    description: "Very very fantastic video 2 description",
                    orderIndex: 2
                }
            ]
        }
    ]);
    // seed users
    const { invitationToken, user } = yield userManagementService_1.createInvitedUserWithOrgAsync({
        firstName: "Edina",
        lastName: "Sandor",
        jobTitle: "Tesztelő",
        role: "admin",
        email: "edina.sandor@email.com",
    }, insertedOrganizationIds[0], false);
    yield userManagementService_1.finalizeUserRegistrationAsync({
        invitationToken: invitationToken,
        phoneNumber: "+36 202020202",
        password: "admin",
        controlPassword: "admin"
    });
    // seed signup questions
    const questions = [
        {
            isSignupQuestion: true,
            questionText: "Egy csapatban elvégzendő projekt esetén a következőt preferálom:",
            imageUrl: staticProvider_1.staticProvider.globalConfig.misc.assetStoreUrl + "/application/kerdes1.png",
            answers: [
                {
                    text: "Szoros együttműködés a többiekkel"
                },
                {
                    text: "Szívesebben oldok meg egyedül részfeladatokat"
                },
            ]
        },
        {
            isSignupQuestion: true,
            questionText: "Ha egy számomra ismeretlen irodát kellene megtalálnom egy komplexumban, erre kérném a portást: ",
            imageUrl: staticProvider_1.staticProvider.globalConfig.misc.assetStoreUrl + "/application/kerdes2.png",
            answers: [
                {
                    text: "Mutassa meg az épület alaprajzán/rajzolja le a helyes irányt",
                },
                {
                    text: "Mondja el/írja le, hogy mikor merre kell fordulnom",
                }
            ]
        },
        {
            isSignupQuestion: true,
            questionText: "Jobban preferálom azt a munkában, mikor:",
            imageUrl: staticProvider_1.staticProvider.globalConfig.misc.assetStoreUrl + "/application/kerdes3.png",
            answers: [
                {
                    text: "Előre definiált instrukciók alapján végzek el feladatokat",
                },
                {
                    text: "Kutatnom kell a megoldás után és analizálni különböző eseteket",
                }
            ]
        },
        {
            isSignupQuestion: true,
            questionText: "Egy előadás esetén hasznosabb számomra, ha:",
            imageUrl: staticProvider_1.staticProvider.globalConfig.misc.assetStoreUrl + "/application/kerdes4.png",
            answers: [
                {
                    text: "Az előadó magyaráz, és megválaszolja a felmerülő kérdéseket",
                },
                {
                    text: "kisfilmekkel, videókkal illusztrálja és egészíti ki a mondanivalóját",
                }
            ]
        },
        {
            isSignupQuestion: true,
            questionText: "Az érzéseimet, gondolataimat a következő módokon fejezem ki szívesebben:",
            imageUrl: staticProvider_1.staticProvider.globalConfig.misc.assetStoreUrl + "/application/kerdes5.png",
            answers: [
                {
                    text: "Zenéken, írásokon, a művészet által",
                },
                {
                    text: "Direkt, lényegre törő kommunikációval",
                }
            ]
        }
    ];
    yield connection
        .getRepository(Question_1.Question)
        .save(questions);
});
exports.seedDB = seedDB;
// const users = [
//     {
//         firstName: "Edina",
//         lastName: "Sandor",
//         jobTitle: "IT manager",
//         role: "admin" as RoleType,
//         email: "edina.sandor@email.com",
//         organizationId: insertedOrganizationIds[0],
//         currentCourseId: courseInsertedIds[0],
//         currentExamId: examInsertIds[0]
//     },
//     {
//         firstName: "Bela",
//         lastName: "Kovacs",
//         jobTitle: "Takarito",
//         role: "admin" as RoleType,
//         email: "bela.kovacs@email.com",
//         organizationId: insertedOrganizationIds[1]
//     },
//     {
//         firstName: "Rebeka",
//         lastName: "Kis",
//         jobTitle: "Instructor",
//         role: "admin" as RoleType,
//         email: "rebeka.kis@email.com",
//         organizationId: insertedOrganizationIds[1]
//     }
// ];
//# sourceMappingURL=database.js.map
