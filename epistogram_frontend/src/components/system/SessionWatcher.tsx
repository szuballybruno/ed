import { Flex } from '@chakra-ui/react';
import { Refresh } from '@mui/icons-material';
import moment from 'moment';
import { createContext, FC, useContext, useEffect, useState } from 'react';
import { Environment } from '../../static/Environemnt';
import { eventBus } from '../../static/EventBus';
import { PropsWithChildren, reloadPage } from '../../static/frontendHelpers';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFont } from '../controls/EpistoFont';
import { FullscreenOverlay } from '../universal/FullscreenOverlay';

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
            .subtract(Environment.sessionHangThresholdInMs, 'ms')
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

export const SessionWatcherFrame: FC<PropsWithChildren> = ({ children }) => {

    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {

        eventBus
            .scubscribeEvent('onActivityGap', 'overlayOnActivityGap', () => {

                setShowOverlay(true);
            });
    }, []);

    return <SessionWatcherContext.Provider value={sessionWatcherInstance}>
        <FullscreenOverlay
            overlayContent={<Flex
                pos="absolute"
                className="whall"
                align='center'
                justify="center">

                <Flex
                    p="30px"
                    borderRadius="10px"
                    bg="white"
                    direction="column"
                    align="center">

                    <EpistoFont>
                        Session expired, try refreshing the page!
                    </EpistoFont>

                    <EpistoButton
                        margin={{
                            top: 'px10'
                        }}
                        variant="colored"
                        icon={<Refresh></Refresh>}
                        onClick={() => reloadPage()}>
                        Refresh
                    </EpistoButton>
                </Flex>
            </Flex>}
            visible={showOverlay}>

            {children}
        </FullscreenOverlay>
    </SessionWatcherContext.Provider>;
};