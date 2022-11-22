import { ReactNode } from 'react';
import { EpistoButtonPropsType } from '../../controls/EpistoButton';

export const AdminBreadcrumbsHeader = ({
    subRouteLabel,
    children,
    backButtonProps,
    headerComponent
}: {
    children?: ReactNode,
    subRouteLabel?: string,
    backButtonProps?: EpistoButtonPropsType,
    viewSwitchChecked?: boolean,
    viewSwitchFunction?: (checked: boolean) => void,
    headerComponent?: ReactNode
}) => {

    return (
        <>
            {children}
        </>
    );
};
