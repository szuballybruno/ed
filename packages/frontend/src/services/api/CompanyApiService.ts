import { Id } from '@episto/commontypes';
import { apiRoutes, CompanyAssociatedCourseDTO, CompanyDTO, CompanyEditDataDTO, CompanyPublicDTO, RoleAssignCompanyDTO } from '@episto/communication';
import { useCallback } from 'react';
import { QueryService } from '../../static/XQuery/XQueryReact';
import { usePostDataUnsafe, usePostMultipartDataUnsafe } from '../core/httpClient';

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

        return postMultipartDataAsync({ data: dto, files: { logoFile, coverFile } });
    }, [postMultipartDataAsync]);

    return {
        saveCompanyAsync,
        saveCompanyState: state
    };
};

const useCompanies = () => {

    const qr = QueryService.useXQueryArray<CompanyDTO>(apiRoutes.companies.getCompanies);

    return {
        companies: qr.data,
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

const useCompanyDetailsByDomain = (isEnabled?: boolean) => {

    const domain = window.location.origin;
    const qr = QueryService
        .useXQuery<CompanyPublicDTO>(apiRoutes.companies.getCompanyDetailsByDomain, { domain }, isEnabled);

    return {
        companyDetails: qr.data,
        companyDetailsError: qr.error,
        companyDetailsState: qr.state
    };
};

const useCourseAssociations = (companyId: Id<'Company'>) => {

    const { data, state, error, refetch } = QueryService
        .useXQueryArray<CompanyAssociatedCourseDTO>(apiRoutes.companies.getCompanyCourseAssociations, { companyId });

    return {
        courseAssociations: data,
        courseAssociationsError: error,
        courseAssociationsState: state,
        refetchCourseAssociations: refetch
    };
};

const useSaveCourseAssociations = () => {

    const qr = usePostDataUnsafe(apiRoutes.companies.saveCompanyCourseAssociations);

    return {
        saveCourseAssociationsAsync: qr.postDataAsync,
        saveCourseAssociationsState: qr.state
    };
};

const useCreateCompanyActivationCodes = () => {

    const qr = usePostDataUnsafe<{ activationCodeCount: number, companyId: Id<'Company'> }, void>(apiRoutes.companies.createCompanyActivationCodes);

    return {
        createCompanyActivationCodesAsync: qr.postDataAsync,
        createCompanyActivationCodesState: qr.state
    };
};

const useUserInvitationCompanyData = () => {

    const { data, state, error, refetch } = QueryService
        .useXQuery<{ isSurveyRequired: boolean, companyId: Id<'Company'> }>(apiRoutes.companies.getUserInvitationCompanyData);

    return {
        userInvitationCompanyData: data,
        userInvitationCompanyDataError: error,
        userInvitationCompanyDataState: state,
        refetchUserInvitationCompanyData: refetch
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
    useCourseAssociations,
    useSaveCourseAssociations,
    useCreateCompanyActivationCodes,
    useUserInvitationCompanyData
};