import { createContext, useContext, useRef } from 'react';
import { CompanyApiService } from '../../../services/api/CompanyApiService';
import { useStateObject } from '../../../static/frontendHelpers';
import { useCompanySelectorLogic } from '../companySelector/CompanySelectorDropdown';

type AdminBreadcrumbsStateType = {
    subRouteLabel?: string;
    backButtonProps?: any;
    disabled?: boolean;
};

export const useAdminBreadcrumbsState = () => {

    const [state, setState] = useStateObject<AdminBreadcrumbsStateType>({});
    const headerContentRef = useRef<HTMLDivElement>(null);

    const { companies } = CompanyApiService
        .useCompanies();

    const companySelectorLogic = useCompanySelectorLogic({ companies });
    const activeCompany = companySelectorLogic.activeCompany;
    const activeCompanyId = activeCompany?.id ?? null;

    return {
        setState,
        ...state,
        headerContentRef,
        activeCompany,
        companySelectorLogic,
        activeCompanyId
    };
};

type AdminBreadcrumbsContextType = ReturnType<typeof useAdminBreadcrumbsState>;

export const AdminBreadcrumbsContext = createContext<AdminBreadcrumbsContextType>({} as any);

export const useAdminBreadcrumbsContext = () => useContext(AdminBreadcrumbsContext);