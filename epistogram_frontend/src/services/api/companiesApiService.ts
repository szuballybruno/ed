import { CompanyDTO } from '../../shared/dtos/CompanyDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { useReactQuery2 } from '../../static/frontendHelpers';

export const useCompaniesAdmin = () => {

    const qr = useReactQuery2<CompanyDTO[]>(apiRoutes.companies.getCompaniesAdmin);

    return {
        companies: qr.data ?? [],
        companiesState: qr.state
    };
};

export const useCompanies = () => {

    const qr = useReactQuery2<CompanyDTO[]>(apiRoutes.companies.getCompanies);

    return {
        companies: qr.data ?? [],
        companiesState: qr.state
    };
};
