import pg from 'pg';

export type PgOptions = {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

export class PgService {

    constructor(
        private _options: PgOptions) {

    }

    async queryAsync(query: string) {

        const client = new pg.Client(this._options);

        try {

            await client
                .connect();
        }
        catch (e: any) {

            throw new Error(`PG connnection error: ${e.message}`);
        }

        try {

            return await client
                .query(query);
        }
        catch (e: any) {

            throw new Error(`PG query error: ${e.message}`);
        }
    }
}