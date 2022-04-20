import { Company } from '../models/entity/Company';
import { CompanyEditDataDTO } from '../shared/dtos/company/CompanyEditDataDTO';
import { CompanyDTO } from '../shared/dtos/CompanyDTO';
import { MapperService } from './MapperService';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class CompanyService extends QueryServiceBase<Company> {

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService) {

        super(mapperService, ormService, Company);
    }

    async getCompaniesAsync(userId: number) {

        const companies = await this._ormService
            .query(Company)
            .getMany();

        return companies
            .map(company => this._mapperService.map(Company, CompanyDTO, company));
    }

    async getCompaniesAdminAsync(userId: number) {

        const companies = await this._ormService
            .query(Company)
            .getMany();

        return companies
            .map(company => this._mapperService.map(Company, CompanyDTO, company));
    }

    async getCompanyEditDataAsync(companyId: number) {

        const comp = await this._ormService
            .query(Company, { companyId })
            .where('id', '=', 'companyId')
            .getSingle();

        return this._mapperService
            .map(Company, CompanyEditDataDTO, comp);
    }

    async createCompanyAsync() {

        await this.createAsync({
            name: 'New company'
        });
    }

    async deleteCompanyAsync(companyId: number) {

        await this._ormService
            .softDelete(Company, [companyId]);
    }

    async saveCompanyAsync(dto: CompanyEditDataDTO) {

        await this._ormService
            .save(Company, [
                {
                    id: dto.id,
                    name: dto.name
                }
            ]);
    }
}