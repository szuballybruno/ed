import { ReactNode, useEffect } from 'react';
import { hotjar } from 'react-hotjar';
import OneSignal from 'react-onesignal';
import setTheme from '../../services/core/setTheme';
import { Environment } from '../../static/Environemnt';

const initActions: (() => void)[] = [

    // init one signal
    () => {

        if (!Environment.oneSignalAppId)
            return;

        OneSignal
            .init({
                appId: Environment.oneSignalAppId
            });
    },

    // init hotjar
    () => {

        if (Environment.isLocalhost)
            return;

        hotjar.initialize(2675412, 6);
    },

    // init theme
    () => {

        setTheme('nextGenTheme');
    }
];

export const InitFrame = (props: { children: ReactNode }) => {

    useEffect(() => {

        initActions
            .forEach(x => x());
    }, []);

    return <>
        {props.children}
    </>;
};