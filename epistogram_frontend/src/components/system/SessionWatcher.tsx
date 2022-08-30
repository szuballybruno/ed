import moment from 'moment';
import { createContext, FC, useContext } from 'react';
import { eventBus } from '../../static/EventBus';

class SessionWatcher {

    private _lastHandshakeDate: Date;

    constructor() {

        this._lastHandshakeDate = new Date();

        /**
         * notify on focus to detect users 
         * coming back from windows sleep mode
         */
        window.onfocus = () => this._notifyActivity();

        /**
         * Subscribe to query service 
         * to get latest auth handshake date
         */
        eventBus
            .scubscribeEvent('onAuthHandshake', 'sessionWatcher', () => {

                const handshakeTime = new Date();

                console.log('Handskae... time: ' + handshakeTime);
                this._lastHandshakeDate = handshakeTime;
            });
    }

    private _notifyActivity() {

        const activityDate = new Date();
        console.log('Activity... time: ' + activityDate);

        const gapInAtivity = this._lastHandshakeDate < moment(activityDate)
            .subtract(5, 's')
            .toDate();

        if (!gapInAtivity)
            return;

        console.log('Activity gap!');
        eventBus.fireEvent('onActivityGap', {});
    };
};

export const sessionWatcherInstance = new SessionWatcher();

export const SessionWatcherContext = createContext<SessionWatcher>(sessionWatcherInstance);

export const useSessionWatcherContext = () => useContext(SessionWatcherContext);

export const SessionWatcherFrame: FC = ({ children }) => {

    return <SessionWatcherContext.Provider value={sessionWatcherInstance}>
        {children}
    </SessionWatcherContext.Provider>;
};