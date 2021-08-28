import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { createDatabase, dropDatabase } from "typeorm-extension";
import { Answer } from "./models/entity/Answer";
import { Course } from "./models/entity/Course";
import { Exam } from "./models/entity/Exam";
import { Organization } from "./models/entity/Organization";
import { Question } from "./models/entity/Question";
import { QuestionAnswer } from "./models/entity/QuestionAnswer";
import { Task } from "./models/entity/Task";
import { User } from "./models/entity/User";
import { Video } from "./models/entity/Video";
import { RoleType } from "./models/shared_models/types/sharedTypes";
import { log } from "./services/misc/logger";
import { createInvitedUserWithOrgAsync, finalizeUserRegistrationAsync } from "./services/userManagementService";
import { staticProvider } from "./staticProvider";

export type TypeORMConnection = Connection;

export const initializeDBAsync = async (recreate: boolean) => {

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
            Exam,
            Organization,
            User,
            Video,
            Task,
            QuestionAnswer,
            Question,
            Answer
        ],
    } as ConnectionOptions;

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

    log("Database connection options:");
    log(postgresOptions);

    if (recreate) {

        log("Recreating DB...");
        await recreateDB(postgresOptions);
    }

    log("Connecting to database with TypeORM...");
    staticProvider.ormConnection = await createConnection(postgresOptions);

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

export const recreateDB = async (postgresOptions: ConnectionOptions) => {

    log("Dropping database...");
    await dropDatabase({ ifExist: true }, postgresOptions);

    log("Creating database...");
    await createDatabase({ ifNotExist: true, characterSet: "UTF8" }, postgresOptions);
}

export const seedDB = async () => {

    const connection = staticProvider.ormConnection;

    // seed organizations
    const insertedOrganizationIds = (await connection
        .getRepository(Organization)
        .insert([
            {
                name: "Farewell Kft."
            },
            {
                name: "Bruno Muvek"
            },
            {
                name: "Manfredisztan.org"
            }
        ]))
        .identifiers
        .map(x => x.id as number);

    // seed courses
    const courseInsertedIds = (await connection
        .getRepository(Course)
        .insert([
            {
                title: "Java Course",
                category: "Programming"
            }
        ]))
        .identifiers
        .map(x => x.id as number);

    // exams 
    const examInsertIds = (await connection
        .getRepository(Exam)
        .insert([
            {
                title: "New Exam 1",
                subtitle: "Fantastic exam 1",
                courseId: courseInsertedIds[0],
                thumbnailUrl: "",
                description: ""
            }
        ]))
        .identifiers
        .map(x => x.id as number);

    // seed users
    const { invitationToken, user } = await createInvitedUserWithOrgAsync(
        {
            firstName: "Edina",
            lastName: "Sandor",
            jobTitle: "IT manager",
            role: "admin" as RoleType,
            email: "edina.sandor@email.com",
        },
        insertedOrganizationIds[0],
        false);

    await finalizeUserRegistrationAsync({
        invitationToken: invitationToken,
        phoneNumber: "+36 202020202",
        password: "admin",
        controlPassword: "admin"
    });
}

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