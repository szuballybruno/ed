import bcrypt from 'bcryptjs';
import { GlobalConfigurationService } from './GlobalConfigurationService';

export class HashService {

    private _config: GlobalConfigurationService;

    constructor(config: GlobalConfigurationService) {

        this._config = config;
    }

    hashPasswordAsync = (password: string) => {

        const hash = bcrypt
            .hash(password, 12);

        return hash;
    };

    comparePasswordAsync = (unhashed: string, hashed: string) => {

        return bcrypt.compare(unhashed, hashed);
    };
}