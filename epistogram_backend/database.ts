import { readFileSync } from "fs";
import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { Activity } from "./models/entity/Activity";
import { Answer } from "./models/entity/Answer";
import { AnswerSession } from "./models/entity/AnswerSession";
import { Course } from "./models/entity/Course";
import { CourseGroup } from "./models/entity/CourseGroup";
import { CourseOrganization } from "./models/entity/CourseOrganization";
import { CourseTag } from "./models/entity/CourseTag";
import { Exam } from "./models/entity/Exam";
import { Group } from "./models/entity/Group";
import { Organization } from "./models/entity/Organization";
import { PersonalityCategoryDescription } from "./models/entity/PersonalityCategoryDescription";
import { Question } from "./models/entity/Question";
import { QuestionAnswer } from "./models/entity/QuestionAnswer";
import { QuestionCategory } from "./models/entity/QuestionCategory";
import { Role } from "./models/entity/Role";
import { RoleActivityBridge } from "./models/entity/RoleActivityBridge";
import { StorageFile } from "./models/entity/StorageFile";
import { Tag } from "./models/entity/Tag";
import { Task } from "./models/entity/Task";
import { TestChild } from "./models/entity/TestChild";
import { TestParent } from "./models/entity/TestParent";
import { TestSubChild } from "./models/entity/TestSubChild";
import { User } from "./models/entity/User";
import { UserCourseBridge } from "./models/entity/UserCourseBridge";
import { Video } from "./models/entity/Video";
import { VideoPlaybackData } from "./models/entity/VideoPlaybackData";
import { VideoPlaybackSample } from "./models/entity/VideoPlaybackSample";
import { CourseItemAllView } from "./models/views/CourseItemAllView";
import { CourseItemStateView } from "./models/views/CourseItemStateView";
import { CourseItemView } from "./models/views/CourseItemView";
import { CourseStateView } from "./models/views/CourseStateView";
import { CourseView } from "./models/views/CourseView";
import { ExamCompletedView } from "./models/views/ExamCompletedView";
import { SignupAnswersView } from "./models/views/SignupAnswersView";
import { UserActivityFlatView } from "./models/views/UserActivityFlatView";
import { UserExamAnswerSessionView } from "./models/views/UserExamAnswerSessionView";
import { VideoCompletedView } from "./models/views/VideoCompletedView";
import { VideoProgressView } from "./models/views/VideoProgressView";
import { seedDB } from "./services/dbSeedService";
import { getDatabaseConnectionParameters } from "./services/environment";
import { log, logObject } from "./services/misc/logger";
import { connectToDBAsync } from "./services/sqlServices/sqlConnection";
import { staticProvider } from "./staticProvider";
import { PractiseQuestionView } from "./models/views/PractiseQuestionView";
import { recreateViewsAsync } from "./services/sqlServices/sqlViewCreatorService";
import { recreateFunctionsAsync } from "./services/sqlServices/sqlFunctionCreatorService";
import { answerQuestionFn } from "./services/sqlServices/sqlFunctionsService";

export type TypeORMConnection = Connection;

export const initializeDBAsync = async () => {

    const allowPurge = staticProvider.globalConfig.database.allowPurge;
    const forcePurge = staticProvider.globalConfig.database.forcePurge;

    // 
    // TEST DB CONNCETION 
    // 

    log("Making first database connection...", "strong");
    log("Connection properties: ")
    logObject(JSON.stringify(getDatabaseConnectionParameters()));

    const { executeSQL, terminateConnectionAsync } = await connectToDBAsync();
    staticProvider.sqlConnection = { executeSQL, terminateConnectionAsync };

    log("Connection successful!", "strong");

    // 
    // PURGE DB
    //
    if (allowPurge && forcePurge) {

        log("Purging DB...", "strong");
        await purgeDBAsync();
    }

    //
    // CONNECT TYPE ORM
    //
    try {

        log("Connecting to database with TypeORM...", "strong");
        const postgresOptions = getPorstgresOptions();
        staticProvider.ormConnection = await createTypeORMConnection(postgresOptions);
    } catch (e) {

        logObject(e);

        // 
        // PURGE DB
        //
        if (allowPurge && !forcePurge) {

            log("Purging DB...", "strong");
            await purgeDBAsync();

            //
            // CONNECT TYPE ORM AGAIN
            //
            log("(#2 attempt) Connecting to database with TypeORM...", "strong");
            const postgresOptions = getPorstgresOptions();
            staticProvider.ormConnection = await createTypeORMConnection(postgresOptions);
        }
    }

    log("TypeORM connected!", "strong");

    //
    // CREATE VIEWS
    //
    log("Creating SQL views...", "strong")

    await recreateViewsAsync([
        "video_completed_view",
        "exam_completed_view",
        "user_exam_answer_session_view",
        "video_progress_view",
        "course_item_view",
        "course_item_state_view",
        "course_state_view",
        "course_item_all_view",
        "course_view",
        "exam_session_answers_view",
        "signup_answers_view",
        "user_activity_view",
        "user_activity_flat_view",
        "practise_question_view"
    ]);

    log("SQL views created!", "strong");

    //
    // CREATE FUNCTIONS
    //
    log("Creating SQL functions...", "strong")

    await recreateFunctionsAsync([
        "answer_signup_question_fn",
        "answer_question_fn",
    ]);

    log("SQL functions created!", "strong");

    //
    // SEED DB
    //
    const isFreshDB = await getIsFreshDB();
    if (isFreshDB) {

        log("Seeding DB...", "strong");

        await seedDB();

        log("Seeding DB done!", "strong");
    }
}

const purgeDBAsync = async () => {

    const sql = readFileSync(`./sql/misc/dropDB.sql`, 'utf8');

    const { executeSQL, terminateConnectionAsync: terminateConnection } = await connectToDBAsync();

    const results = await executeSQL(sql);

    await terminateConnection();
}

const getIsFreshDB = async () => {

    const users = await staticProvider
        .ormConnection
        .getRepository(User)
        .find();

    return users.length == 0;
}

const createTypeORMConnection = async (opt: ConnectionOptions) => {

    try {

        log("Connecting to SQL trough TypeORM...");
        const connection = await createConnection(opt);

        if (!connection.manager)
            throw new Error("TypeORM manager is null or undefined!");

        return connection;
    }
    catch (e) {

        throw new Error("Type ORM connection error!" + e);
    }
}

const getPorstgresOptions = () => {

    const dbConfig = staticProvider.globalConfig.database;

    const isSyncEnabled = dbConfig.isOrmSyncEnabled;
    const isLoggingEnabled = dbConfig.isOrmLoggingEnabled;
    const dbConnOpts = getDatabaseConnectionParameters();

    return {
        type: "postgres",
        port: dbConnOpts.port,
        host: dbConnOpts.host,
        username: dbConnOpts.username,
        password: dbConnOpts.password,
        database: dbConnOpts.databaseName,
        synchronize: isSyncEnabled,
        logging: isLoggingEnabled,
        extra: {
            socketPath: dbConnOpts.socketPath
        },
        entities: [
            // "models/entity/**/*.ts"
            Course,
            CourseOrganization,
            CourseGroup,
            CourseTag,
            Exam,
            Group,
            Organization,
            User,
            Video,
            Task,
            QuestionAnswer,
            Question,
            Answer,
            Tag,
            TestChild,
            TestParent,
            TestSubChild,
            StorageFile,
            AnswerSession,
            VideoPlaybackSample,
            VideoPlaybackData,
            UserCourseBridge,
            QuestionCategory,
            Role,
            Activity,
            RoleActivityBridge,
            PersonalityCategoryDescription,
            PractiseQuestionView,

            // views,
            VideoCompletedView,
            ExamCompletedView,
            UserExamAnswerSessionView,
            VideoProgressView,
            CourseItemView,
            CourseItemStateView,
            CourseStateView,
            CourseItemAllView,
            CourseView,
            SignupAnswersView,
            UserActivityFlatView
        ],
    } as ConnectionOptions;
}