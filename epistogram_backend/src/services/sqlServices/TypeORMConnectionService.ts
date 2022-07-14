import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { GlobalConfiguration } from '../misc/GlobalConfiguration';
import { XDBMSchemaType } from '../XDBManager/XDBManagerTypes';

export class TypeORMConnectionService {

    constructor(
        private _config: GlobalConfiguration,
        private _schema: XDBMSchemaType) {
    }

    connectTypeORMAsync = async () => {

        const isLoggingEnabled = this._config.database.isOrmLoggingEnabled;
        const isSyncEnabled = true;
        const dbConnOpts = this._config.getDatabaseConnectionParameters();

        const views = this._schema
            .views
            .filter(x => !!x[2])
            .map(x => x[2]!);

        const entities = this._schema
            .entities;

        const options = {
            type: 'postgres',
            port: dbConnOpts.port,
            host: dbConnOpts.host,
            username: dbConnOpts.username,
            password: dbConnOpts.password,
            database: dbConnOpts.databaseName,
            synchronize: isSyncEnabled,
            logging: isLoggingEnabled,
            namingStrategy: new SnakeNamingStrategy(),
            extra: {
                socketPath: dbConnOpts.socketPath
            },
            entities: [
                ...entities,
                ...views
            ],
        } as DataSourceOptions;

        const initAsync = async (dataSourceOptions: DataSourceOptions): Promise<DataSource> => {

            return new Promise<DataSource>((res, rej) => {

                const dataSource = new DataSource(dataSourceOptions);

                dataSource
                    .initialize()
                    .then(() => {

                        res(dataSource);
                    })
                    .catch((err) => {

                        rej(err);
                    });
            });
        };

        try {

            const connection = await initAsync(options);

            if (!connection.manager)
                throw new Error('TypeORM manager is null or undefined!');

            await connection.destroy();
        }
        catch (e) {

            throw new Error('Type ORM connection error!' + e);
        }
    };
}