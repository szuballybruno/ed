import { FC } from 'react';
import { PropsWithChildren } from '../../static/frontendHelpers';
import { EpistoFlex2 } from './EpistoFlex';

export const EpistoTab: FC<{
    label?: any,
    icon?: any,
    style?: any,
    value?: any
}> = ({ label }) => {

    return <EpistoFlex2>
        {label}
    </EpistoFlex2>;
};

export const EpistoTabs: FC<PropsWithChildren & { value?: any, onChange?: (value: any) => void }> = ({ children }) => {

    return <EpistoFlex2>
        {children}
    </EpistoFlex2>;
};