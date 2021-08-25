import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { createDatabase, dropDatabase } from "typeorm-extension";
import { Organization } from "./models/entity/Organization";
import { User } from "./models/entity/User";
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
    const organizations = [
        {
            name: "New Organization"
        },
        {
            name: "New Organization"
        },
        {
            name: "New Organization"
        }
    ] as Organization[];

    const organizationInsertResult = await connection
        .getRepository(Organization)
        .insert(organizations);

    const insertedOrganizationIds = organizationInsertResult
        .identifiers
        .map(x => x.id as number);

    // seed users
    const users = [
        {
            email: "edina@email.com",
            organizationId: insertedOrganizationIds[0]
        },
        {
            email: "edina@email.com",
            organizationId: insertedOrganizationIds[0]
        }
    ] as User[];

    await connection
        .getRepository(User)
        .insert(users);

    // const res = await connection
    //     .getRepository(User)
    //     .createQueryBuilder("user")
    //     .leftJoinAndSelect("user.organization", "organization")
    //     .getMany();

    // log(res[0].organization.name);
}