import { Company } from '../models/entity/misc/Company';
import { User } from '../models/entity/misc/User';
import { Id } from '@episto/commontypes';
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

        return this.applyTemplate(company.productionDomainPrefix, company.domain);
    }

    async getAllDomainsAsync(): Promise<string[]> {

        const companies = await this
            ._ormService
            .query(Company)
            .getMany();

        const domains = companies
            .map(x => this.applyTemplate(x.productionDomainPrefix, x.domain));

        return domains;
    }

    applyTemplate(productionDomainPrefix: string, domain: string) {

        const domainToken = '[DOMAIN]';
        const { domainTemplate, isProd } = this._globalConfig.misc;

        if (!domainTemplate.includes(domainToken))
            throw new Error(`Invalid domain template: "${domainTemplate}"`);

        const withProductionPrefix = isProd
            ? `${productionDomainPrefix}${domain}`
            : domain;

        const res = domainTemplate
            .replace(domainToken, withProductionPrefix);

        return res;
    }
}