import { CompanyEditDataDTO } from '../../shared/dtos/company/CompanyEditDataDTO';
import { CompanyDTO } from '../../shared/dtos/company/CompanyDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { useReactQuery2 } from '../../static/frontendHelpers';
import { usePostDataUnsafe } from '../core/httpClient';

export const useCompaniesAdmin = () => {

    const qr = useReactQuery2<CompanyDTO[]>(apiRoutes.companies.getCompaniesAdmin);

    return {
        companies: qr.data ?? [],
        companiesState: qr.state,
        companiesError: qr.error,
        refetchCompanies: qr.refetch
    };
};

export const useRoleManageCompanies = () => {

    const qr = useReactQuery2<CompanyDTO[]>(apiRoutes.companies.getRoleManageCompanies);

    return {
        roleManageCompanies: qr.data ?? [],
        roleManageCompaniesState: qr.state,
        roleManageCompaniesError: qr.error,
        refetchRoleManageCompanies: qr.refetch
    };
};

export const useCreateCompany = () => {

    const qr = usePostDataUnsafe(apiRoutes.companies.createCompany);

    return {
        createCompanyAsync: qr.postDataAsync,
        createCompanyState: qr.state
    };
};

export const useDeleteCompany = () => {

    const qr = usePostDataUnsafe<{ companyId: number }, void>(apiRoutes.companies.deleteCompany);

    return {
        deleteCompanyAsync: qr.postDataAsync,
        deleteCompanyState: qr.state
    };
};

export const useSaveCompany = () => {

    const qr = usePostDataUnsafe<CompanyEditDataDTO, void>(apiRoutes.companies.saveCompany);

    return {
        saveCompanyAsync: qr.postDataAsync,
        saveCompanyState: qr.state
    };
};

export const useCompanies = () => {

    const qr = useReactQuery2<CompanyDTO[]>(apiRoutes.companies.getCompanies);

    return {
        companies: qr.data ?? [],
        companiesState: qr.state
    };
};

export const useCompanyEditData = (companyId: number) => {

    const qr = useReactQuery2<CompanyEditDataDTO>(apiRoutes.companies.getCompanyEditData, { companyId });

    return {
        companyEditData: qr.data,
        companyEditDataState: qr.state
    };
};

export const useAvailableCompaniesForRoleCreation = () => {

    const qr = useReactQuery2<CompanyDTO[]>(apiRoutes.companies.getAvailableCompaniesForRoleCreation);

    return {
        companies: qr.data ?? [],
        companiesState: qr.state
    };
};
