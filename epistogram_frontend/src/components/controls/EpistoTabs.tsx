import { FC } from 'react';
import { PropsWithChildren } from '../../static/frontendHelpers';

export const EpistoTab: FC<{
    label?: any,
    icon?: any,
    style?: any,
    value?: any
}> = ({ label }) => {

    return <>
    </>;
};

export const EpistoTabs: FC<PropsWithChildren & { value?: any, onChange?: (value: any) => void }> = ({ children }) => {

    return <>
        {children}
    </>;
};