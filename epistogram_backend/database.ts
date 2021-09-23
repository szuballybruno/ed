import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { Answer } from "./models/entity/Answer";
import { AnswerSession } from "./models/entity/AnswerSession";
import { Course } from "./models/entity/Course";
import { CourseGroup } from "./models/entity/CourseGroup";
import { CourseOrganization } from "./models/entity/CourseOrganization";
import { CourseTag } from "./models/entity/CourseTag";
import { Exam } from "./models/entity/Exam";
import { Group } from "./models/entity/Group";
import { Organization } from "./models/entity/Organization";
import { Question } from "./models/entity/Question";
import { QuestionAnswer } from "./models/entity/QuestionAnswer";
import { QuestionCategory } from "./models/entity/QuestionCategory";
import { StorageFile } from "./models/entity/StorageFile";
import { Tag } from "./models/entity/Tag";
import { Task } from "./models/entity/Task";
import { TestChild } from "./models/entity/TestChild";
import { TestParent } from "./models/entity/TestParent";
import { TestSubChild } from "./models/entity/TestSubChild";
import { User } from "./models/entity/User";
import { UserCourseBridge } from "./models/entity/UserCourseBridge";
import { Role } from "./models/entity/Role";
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
import { UserExamAnswerSessionView } from "./models/views/UserExamAnswerSessionView";
import { VideoCompletedView } from "./models/views/VideoCompletedView";
import { VideoProgressView } from "./models/views/VideoProgressView";
import { recreateDB, seedDB } from "./services/dbSeedService";
import { log } from "./services/misc/logger";
import { recreateViewsAsync } from "./services/rawSqlService";
import { staticProvider } from "./staticProvider";
import { Activity } from "./models/entity/Activity";
import { RoleActivityBridge } from "./models/entity/RoleActivityBridge";
import { UserActivityFlatView } from "./models/views/UserActivityFlatView";
import { PersonalityCategoryDescription } from "./models/entity/PersonalityCategoryDescription";

export type TypeORMConnection = Connection;

export const initializeDBAsync = async (isRecreateDB: boolean) => {

    const dbConfig = staticProvider.globalConfig.database;
    const host = dbConfig.hostAddress;
    const port = dbConfig.port;
    const username = dbConfig.serviceUserName;
    const password = dbConfig.serviceUserPassword;
    const databaseName = dbConfig.name;
    const isSyncEnabled = dbConfig.isOrmSyncEnabled;
    const isLoggingEnabled = dbConfig.isOrmLoggingEnabled;

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

    if (isRecreateDB) {

        log("Recreating DB...");
        await recreateDB(postgresOptions);
    }

    log("Connecting to database with TypeORM...");
    staticProvider.ormConnection = await createTypeORMConnection(postgresOptions);

    log("Creating SQL views...")
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
        "user_activity_flat_view"
    ]);

    const isFreshDB = await getIsFreshDB();
    if (isFreshDB) {

        log("Seeding DB...");
        await seedDB();
    }
}

const getIsFreshDB = async () => {

    const users = await staticProvider
        .ormConnection
        .getRepository(User)
        .find();

    return users.length == 0;
}

const createTypeORMConnection = (opt: ConnectionOptions) => {

    try {

        return createConnection(opt);
    }
    catch (e) {

        throw new Error("Type ORM connection error!" + e);
    }
}
