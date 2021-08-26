import { connect } from "mongodb";
import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { createDatabase, dropDatabase } from "typeorm-extension";
import { Course } from "./models/entity/Course";
import { Exam } from "./models/entity/Exam";
import { Organization } from "./models/entity/Organization";
import { User } from "./models/entity/User";
import { RoleType } from "./models/shared_models/types/sharedTypes";
import { getTypeORMConnection } from "./server";
import { log } from "./services/logger";

export type TypeORMConnection = Connection;

export const initializeDBAsync = async (freshStart: boolean) => {

    const postgresOptions = {
        type: "postgres",
        port: 7000,
        username: "postgres",
        password: "epistogram",
        database: "epistogramDB",
        synchronize: true,
        logging: false,
        entities: [
            "models/entity/**/*.ts"
        ],
    } as ConnectionOptions;

    // fresh start
    if (freshStart) {

        log("Dropping database...");
        await dropDatabase({ ifExist: true }, postgresOptions);

        log("Creating database...");
        await createDatabase({ ifNotExist: true, characterSet: "UTF8" }, postgresOptions);
    }

    log("Connecting to database with TypeORM...");
    const sqlConnection = await createConnection(postgresOptions);

    return sqlConnection as TypeORMConnection;
}

export const seedDB = async () => {

    const connection = getTypeORMConnection();

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
    const userInsertedIds = (await connection
        .getRepository(User)
        .insert([
            {
                firstName: "Edina",
                lastName: "Sandor",
                jobTitle: "IT manager",
                role: "admin" as RoleType,
                email: "edina.sandor@email.com",
                organizationId: insertedOrganizationIds[0],
                currentCourseId: courseInsertedIds[0],
                currentExamId: examInsertIds[0]
            },
            {
                firstName: "Bela",
                lastName: "Kovacs",
                jobTitle: "Takarito",
                role: "admin" as RoleType,
                email: "bela.kovacs@email.com",
                organizationId: insertedOrganizationIds[1]
            },
            {
                firstName: "Rebeka",
                lastName: "Kis",
                jobTitle: "Instructor",
                role: "admin" as RoleType,
                email: "rebeka.kis@email.com",
                organizationId: insertedOrganizationIds[1]
            }
        ]))
        .identifiers
        .map(x => x.id as number);
}