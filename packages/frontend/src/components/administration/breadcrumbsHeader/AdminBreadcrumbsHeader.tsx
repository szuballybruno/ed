import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HelperHooks } from '../../../helpers/hooks';
import { EpistoButtonPropsType } from '../../controls/EpistoButton';
import { useAdminBreadcrumbsContext } from './AdminBreadcrumbsContext';

export const AdminBreadcrumbsHeader = ({ children, ...props }: {
    children?: ReactNode,
    subRouteLabel?: string,
    backButtonProps?: EpistoButtonPropsType,
    disabled?: boolean
}) => {
    const { setState, headerContentRef } = useAdminBreadcrumbsContext();

    const propsMemo = HelperHooks
        .useMemoize(props);

    useEffect(() => {

        setState(propsMemo);
    }, [setState, propsMemo]);

    return (
        <>
            {headerContentRef.current && createPortal(children, headerContentRef.current)}
        </>
    );
};
