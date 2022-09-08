import { ChakraProvider } from '@chakra-ui/react';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { LicenseInfo } from '@mui/x-license-pro';
import { FC, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { XDialogHost } from './components/lib/XDialog/XDialogHost';
import { AuthenticationFrame } from './components/system/AuthenticationFrame';
import { AutoScrollFrame } from './components/system/AutoScrollContext';
import { ErrorDialogFrame } from './components/system/ErrorDialogFrame';
import { EventListener } from './components/system/EventListener';
import { InitFrame } from './components/system/InitFrame';
import { BusyBarFrame } from './components/system/LoadingFrame/BusyBarFrame';
import { MUISetupFrame } from './components/system/MUISetupFrame';
import { NotificationsFrame } from './components/system/NotificationsFrame';
import { PreventMobileFrame } from './components/system/PreventMobileFrame';
import { QuerySubscriptionFrame } from './components/system/QuerySubscriptionFrame';
import { SessionWatcherFrame } from './components/system/SessionWatcher';
import { TawkToFrame } from './components/system/TawkToFrame';
import { TitleSetterFrame } from './components/system/TitleSetterFrame';
import { UserGuidingFrame } from './components/system/UserGuidingFrame';
import { MainRouting } from './MainRouting';
import './shared/logic/jsExtensions.ts'; // extensions, important
import { PropsWithChildren } from './static/frontendHelpers';
import './styles/globalCssClasses.css';
import './styles/globalCssTypes';
import './styles/index.css';

type FrameType = FC<{ children: ReactNode }>;

LicenseInfo.setLicenseKey('YOUR_LICENSE_KEY');
// set MUI license key
const LICENSE_KEY = '692967e82163b6d3d8887b2f05b06718Tz00OTM0OSxFPTE2OTI0NDQ2MDU1MzcsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=';
LicenseInfo.setLicenseKey(LICENSE_KEY);

const LocalizationFrame: FC<PropsWithChildren> = ({ children }) => {

    return <LocalizationProvider dateAdapter={AdapterLuxon}>
        {children}
    </LocalizationProvider>;
};

const QueryClienProviderFrame = ({ children }: PropsWithChildren) => {

    const queryClient = new QueryClient();

    return <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>;
};

const RoutingFrame: FC<PropsWithChildren> = ({ children }) => {

    return <BrowserRouter>
        {children}
    </BrowserRouter>;
};

const ChakraProviderFrame: FC<PropsWithChildren> = ({ children }) => {

    return <ChakraProvider>
        {children}
    </ChakraProvider>;
};

const frames: FrameType[] = [
    MUISetupFrame,
    ChakraProviderFrame,
    InitFrame,
    UserGuidingFrame,
    LocalizationFrame,
    QueryClienProviderFrame,
    RoutingFrame,
    TawkToFrame,
    XDialogHost,
    PreventMobileFrame,
    TitleSetterFrame,
    QuerySubscriptionFrame,
    SessionWatcherFrame,
    AuthenticationFrame,
    ErrorDialogFrame,
    NotificationsFrame,
    BusyBarFrame,
    AutoScrollFrame,
    EventListener
];

const RenderFrames = ({ frames, children }: { frames: FrameType[] } & PropsWithChildren) => {

    const getNextFrame = (index: number, lastChild: ReactNode) => {

        if (index >= frames.length)
            return lastChild;

        const El = frames[index];

        return <El>
            {getNextFrame(index + 1, lastChild)}
        </El>;
    };

    return <>
        {getNextFrame(0, children)}
    </>;
};

const App: FC = () => {

    return (
        <RenderFrames frames={frames}>
            <MainRouting />
        </RenderFrames>
    );
};

const root = createRoot(document.getElementById('root')!);

root.render(<App></App>);
