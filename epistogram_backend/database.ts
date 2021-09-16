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
import { UserExamAnswerSessionView } from "./models/views/UserExamAnswerSessionView";
import { VideoCompletedView } from "./models/views/VideoCompletedView";
import { VideoProgressView } from "./models/views/VideoProgressView";
import { recreateDB, seedDB } from "./services/dbSeedService";
import { log } from "./services/misc/logger";
import { recreateViewsAsync } from "./services/sqlViewCreator";
import { staticProvider } from "./staticProvider";

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

            // views,
            VideoCompletedView,
            ExamCompletedView,
            UserExamAnswerSessionView,
            VideoProgressView,
            CourseItemView,
            CourseItemStateView,
            CourseStateView,
            CourseItemAllView,
            CourseView
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
        "course_view"
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
