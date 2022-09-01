import { Company } from '../models/entity/Company';
import { User } from '../models/entity/User';
import { Id } from '../shared/types/versionId';
import { GlobalConfiguration } from './misc/GlobalConfiguration';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class DomainProviderService {

    constructor(
        private _ormService: ORMConnectionService,
        private _globalConfig: GlobalConfiguration) {
    }

    async getDomainAsync(userId: Id<'User'>): Promise<string> {

        const user = await this
            ._ormService
            .query(User, { userId })
            .where('id', '=', 'userId')
            .getSingle();

        return this.getDomainByCompanyAsync(user.companyId);
    }

    async getDomainByCompanyAsync(companyId: Id<'Company'>): Promise<string> {

        const company = await this
            ._ormService
            .query(Company, { companyId })
            .where('id', '=', 'companyId')
            .getSingle();

        if (this._globalConfig.misc.isLocalhost)
            return this._globalConfig.misc.localhostDomain;

        return company.domain;
    }

    async getAllDomainsAsync(): Promise<string[]> {

        const companies = await this
            ._ormService
            .query(Company)
            .getMany();

        const domains = companies
            .map(x => x.domain);

        if (this._globalConfig.misc.isLocalhost)
            return [...domains, this._globalConfig.misc.localhostDomain];

        return domains;
    }
}