import { TypeORMConnection } from "../database";
import { ClassType } from "../models/Types";

export class DatabaseConnectionService {

    private _connection: TypeORMConnection;

    constructor() {

    }

    initialize(connection: TypeORMConnection) {

        this._connection = connection;
    }

    getRepository<T>(classType: ClassType<T>) {

        return this._connection.getRepository(classType);
    }


}