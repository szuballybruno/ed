import { TypeORMConnection } from "../database";
import { ClassType } from "../models/Types";
import { SQLConnectionType } from "./sqlServices/sqlConnection";

export class DbConnectionService {

    private _ormConnection: TypeORMConnection;
    private _sqlConnection: SQLConnectionType;

    constructor() {

    }

    initialize(ormConnection: TypeORMConnection, sqlConnection: SQLConnectionType) {

        this._ormConnection = ormConnection;
        this._sqlConnection = sqlConnection;
    }

    getRepository<T>(classType: ClassType<T>) {

        return this._ormConnection.getRepository(classType);
    }

    getSQLConnection() {

        return this._sqlConnection;
    }
}