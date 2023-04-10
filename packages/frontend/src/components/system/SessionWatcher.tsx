import { Refresh } from '@mui/icons-material';
import moment from 'moment';
import { createContext, FC, useContext, useMemo, useState } from 'react';
import { Environment } from '../../static/Environemnt';
import { PropsWithChildren, reloadPage } from '../../static/frontendHelpers';
import { GlobalEventManagerType, useEventManagerContext } from './EventManagerFrame';
import { Logger } from '../../static/Logger';
import { XEventManagerReact } from '../../static/XEventManager/XEventManagerReact';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { FullscreenOverlay } from '../universal/FullscreenOverlay';

class SessionWatcher {

    private _lastHandshakeDate: Date;

    constructor(private _globalEventManager: GlobalEventManagerType) {

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
        this._globalEventManager
            .subscribeEvent('onAuthHandshake', 'sessionWatcher', () => {

                const handshakeTime = new Date();

                Logger.logScoped('SESSION', 'Handshake... time: ' + handshakeTime);
                this._lastHandshakeDate = handshakeTime;
            });
    }

    private _notifyActivity() {

        const activityDate = new Date();
        Logger.logScoped('SESSION', 'Activity... time: ' + activityDate);

        const gapInAtivity = this._lastHandshakeDate < moment(activityDate)
            .subtract(Environment.sessionHangThresholdInMs, 'ms')
            .toDate();

        if (!gapInAtivity)
            return;

        Logger.logScoped('SESSION', 'Activity gap!');
        this._globalEventManager.fireEvent('onActivityGap', {});
    };
};

export const SessionWatcherContext = createContext<SessionWatcher>({} as any);

export const useSessionWatcherContext = () => useContext(SessionWatcherContext);

export const SessionWatcherFrame: FC<PropsWithChildren> = ({ children }) => {

    const globalEventManager = useEventManagerContext();
    const [showOverlay, setShowOverlay] = useState(false);

    const sessionWatcherInstance = useMemo(() => new SessionWatcher(globalEventManager), [globalEventManager]);

    XEventManagerReact
        .useSubscribeEvent(
            globalEventManager,
            'onActivityGap',
            'overlayOnActivityGap',
            () => {

                setShowOverlay(true);
            });

    return <SessionWatcherContext.Provider value={sessionWatcherInstance}>
        <FullscreenOverlay
            overlayContent={<EpistoFlex2
                pos="absolute"
                className="whall"
                align='center'
                justify="center">

                <EpistoFlex2
                    padding="30px"
                    borderRadius="10px"
                    bg="white"
                    direction="column"
                    align="center">

                    <EpistoFont>
                        Lejárt munkamenet, kérjük frissítsd az oldalt.
                    </EpistoFont>

                    <EpistoButton
                        margin={{
                            top: 'px10'
                        }}
                        variant="colored"
                        icon={<Refresh></Refresh>}
                        onClick={() => reloadPage()}>

                        Újratöltés
                    </EpistoButton>
                </EpistoFlex2>
            </EpistoFlex2>}
            visible={showOverlay}>

            {children}
        </FullscreenOverlay>
    </SessionWatcherContext.Provider>;
};
