import { createContext, useContext } from 'react';
import { useStateObject } from '../../../static/frontendHelpers';

export type AdminBreadcrumbsStateType = {
    subRouteLabel?: string;
    backButtonProps?: any;
    headerComponent?: any;
};

export const useAdminBreadcrumbsState = () => {

    const [state, setState] = useStateObject<AdminBreadcrumbsStateType>({});

    // children?: ReactNode,
    // subRouteLabel?: string,
    // backButtonProps?: EpistoButtonPropsType,
    // viewSwitchChecked?: boolean,
    // viewSwitchFunction?: (checked: boolean) => void,
    // headerComponent?: ReactNode

    return {
        setState,
        ...state
    };
};

export type AdminBreadcrumbsContextType = ReturnType<typeof useAdminBreadcrumbsState>;

export const AdminBreadcrumbsContext = createContext<AdminBreadcrumbsContextType>({} as any);

export const useAdminBreadcrumbsContext = () => useContext(AdminBreadcrumbsContext);