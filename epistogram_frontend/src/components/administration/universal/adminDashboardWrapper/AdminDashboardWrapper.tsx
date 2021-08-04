import React, {ReactNode} from 'react';
import classes from './adminDashboardWrapper.module.scss'

export const AdminDashboardWrapper =  ({ children }: { children?: ReactNode }) => {
    return (
        <div className={classes.adminDashboardWrapper}>
            {children}
        </div>
    ) as unknown as JSX.Element;
};