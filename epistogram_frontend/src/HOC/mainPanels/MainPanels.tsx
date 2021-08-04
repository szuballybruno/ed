import React, {ReactNode} from 'react';
import classes from './mainPanels.module.scss'

export const MainWrapper =  ({ children }: { children?: ReactNode }) => {
    return (
        <div className={classes.mainWrapper}>
            {children}
        </div>
    ) as unknown as JSX.Element;
};

export const ContentWrapper = ({ children }: { children?: ReactNode }) => {
    return (
        <div className={classes.contentWrapper}>
            {children}
        </div>
    ) as unknown as JSX.Element;
};

export const LeftPanel = ({ children }: { children?: ReactNode }) => {
    return (
        <div className={classes.leftPanelWrapper}>
            <div className={classes.leftPanel}>
                {children}
            </div>
        </div>
    ) as unknown as JSX.Element;
};

export const RightPanel = ({ children }: { children?: ReactNode }) => {
    return (
        <div className={classes.rightPanel}>
            {children}
        </div>
    ) as unknown as JSX.Element;
};
