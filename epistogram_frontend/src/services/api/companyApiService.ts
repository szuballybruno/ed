import { CompanyEditDataDTO } from '../../shared/dtos/company/CompanyEditDataDTO';
import { CompanyDTO } from '../../shared/dtos/company/CompanyDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { QueryService } from '../../static/QueryService';
import { usePostDataUnsafe, usePostMultipartDataUnsafe } from '../core/httpClient';
import { RoleAssignCompanyDTO } from '../../shared/dtos/company/RoleAssignCompanyDTO';
import { Id } from '../../shared/types/versionId';
import { useCallback } from 'react';
import { CompanyPublicDTO } from '../../shared/dtos/company/CompanyPublicDTO';
import { CompanyAssociatedCourseDTO } from '../../shared/dtos/company/CompanyAssociatedCourseDTO';

const useCompaniesAdmin = () => {

    const qr = QueryService.useXQuery<CompanyDTO[]>(apiRoutes.companies.getCompaniesAdmin);

    return {
        companies: qr.data ?? [],
        companiesState: qr.state,
        companiesError: qr.error,
        refetchCompanies: qr.refetch
    };
};

const useRoleAssignCompanies = () => {

    const qr = QueryService.useXQuery<RoleAssignCompanyDTO[]>(apiRoutes.companies.getRoleAssignCompanies);

    return {
        roleAssignCompanies: qr.data ?? [],
        roleAssignCompaniesState: qr.state,
        roleAssignCompaniesError: qr.error,
        refetchRoleAssignCompanies: qr.refetch
    };
};

const useCreateCompany = () => {

    const qr = usePostDataUnsafe(apiRoutes.companies.createCompany);

    return {
        createCompanyAsync: qr.postDataAsync,
        createCompanyState: qr.state
    };
};

const useDeleteCompany = () => {

    const qr = usePostDataUnsafe<{ companyId: number }, void>(apiRoutes.companies.deleteCompany);

    return {
        deleteCompanyAsync: qr.postDataAsync,
        deleteCompanyState: qr.state
    };
};

const useSaveCompany = () => {

    const { postMultipartDataAsync, state } = usePostMultipartDataUnsafe<CompanyEditDataDTO>(apiRoutes.companies.saveCompany);
    const saveCompanyAsync = useCallback(({ logoFile, coverFile, ...dto }: CompanyEditDataDTO & { logoFile: File | null, coverFile: File | null }) => {

        return postMultipartDataAsync(dto, { logoFile, coverFile });
    }, [postMultipartDataAsync]);

    return {
        saveCompanyAsync,
        saveCompanyState: state
    };
};

const useCompanies = () => {

    const qr = QueryService.useXQuery<CompanyDTO[]>(apiRoutes.companies.getCompanies);

    return {
        companies: qr.data ?? [],
        companiesState: qr.state
    };
};

const useCompanyEditData = (companyId: Id<'Company'>) => {

    const qr = QueryService.useXQuery<CompanyEditDataDTO>(apiRoutes.companies.getCompanyEditData, { companyId });

    return {
        companyEditData: qr.data,
        companyEditDataState: qr.state
    };
};

const useAvailableCompaniesForRoleCreation = () => {

    const qr = QueryService.useXQuery<CompanyDTO[]>(apiRoutes.companies.getAvailableCompaniesForRoleCreation);

    return {
        companies: qr.data ?? [],
        companiesState: qr.state
    };
};

const useCompanyDetailsByDomain = (domain: string) => {

    const { data, state, error } = QueryService.useXQuery<CompanyPublicDTO>(apiRoutes.companies.getCompanyDetailsByDomain, { domain });
    return {
        companyDetails: data,
        companyDetailsError: error,
        companyDetailsState: state
    };
};

const useCourseAssociations = (companyId: Id<'Company'>) => {

    const { data, state, error } = QueryService
        .useXQueryArray<CompanyAssociatedCourseDTO>(apiRoutes.companies.getCompanyCourseAssociations, { companyId });

    return {
        courseAssociations: data,
        courseAssociationsError: error,
        courseAssociationsState: state
    };
};

export const CompanyApiService = {

    useCompaniesAdmin,
    useRoleAssignCompanies,
    useCreateCompany,
    useDeleteCompany,
    useSaveCompany,
    useCompanies,
    useCompanyEditData,
    useAvailableCompaniesForRoleCreation,
    useCompanyDetailsByDomain,
    useCourseAssociations
};