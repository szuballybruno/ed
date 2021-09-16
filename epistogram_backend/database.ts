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
import { CourseItemStateView } from "./models/entity/views/CourseItemStateView";
import { CourseItemView } from "./models/entity/views/CourseItemView";
import { ExamCompletedView } from "./models/entity/views/ExamCompletedView";
import { UserExamAnswerSessionView } from "./models/entity/views/UserExamAnswerSessionView";
import { VideoCompletedView } from "./models/entity/views/VideoCompletedView";
import { VideoProgressView } from "./models/entity/views/VideoProgressView";
import { recreateDB, seedDB } from "./services/dbSeedService";
import { log } from "./services/misc/logger";
import { recreateViewsAsync } from "./services/sqlViewCreator";
import { staticProvider } from "./staticProvider";

export type TypeORMConnection = Connection;

export const initializeDBAsync = async (isRecreateDB: boolean) => {

    const host = staticProvider.globalConfig.database.hostAddress;
    const port = staticProvider.globalConfig.database.port;
    const username = staticProvider.globalConfig.database.serviceUserName;
    const password = staticProvider.globalConfig.database.serviceUserPassword;
    const databaseName = staticProvider.globalConfig.database.name;
    const isSyncEnabled = staticProvider.globalConfig.database.isOrmSyncEnabled;
    const isLoggingEnabled = staticProvider.globalConfig.database.isOrmLoggingEnabled;

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
        "course_item_state_view"
    ]);

    //
    // TEST
    //

    // seed DB if no users are found
    const users = await staticProvider
        .ormConnection
        .getRepository(User)
        .find();

    if (users.length < 1) {

        log("Seeding DB...");
        await seedDB();
    }
}

const createTypeORMConnection = (opt: ConnectionOptions) => {

    try {

        return createConnection(opt);
    }
    catch (e) {

        throw new Error("Type ORM connection error!" + e);
    }
}
