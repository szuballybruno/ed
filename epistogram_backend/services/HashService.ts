import bcrypt from "bcryptjs";
import { GlobalConfiguration } from "./misc/GlobalConfiguration";

export class HashService {

    private _config: GlobalConfiguration;

    constructor(config: GlobalConfiguration) {

        this._config = config;
    }

    hashPasswordAsync = (password: string) => {

        const hash = bcrypt
            .hash(password, this._config.security.secrets.passwordSalt);

        return hash;
    }

    comparePasswordAsync = (unhashed: string, hashed: string) => {

        return bcrypt.compare(unhashed, hashed);
    }
}