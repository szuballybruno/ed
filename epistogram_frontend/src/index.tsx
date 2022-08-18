import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { XDialogHost } from './components/lib/XDialog/XDialogHost';
import { AuthenticationFrame } from './components/system/AuthenticationFrame';
import { ChakraThemeFrame } from './components/system/ChakraThemeFrame';
import { ErrorDialogFrame } from './components/system/ErrorDialogFrame';
import { EventListener } from './components/system/EventListener';
import { InitFrame } from './components/system/InitFrame';
import { BusyBarFrame } from './components/system/LoadingFrame/BusyBarFrame';
import { MUISetupFrame } from './components/system/MUISetupFrame';
import { NotificationsFrame } from './components/system/NotificationsFrame';
import { PreventMobileFrame } from './components/system/PreventMobileFrame';
import { TitleSetterFrame } from './components/system/TitleSetterFrame';
import { UserGuidingFrame } from './components/system/UserGuidingFrame';
import { UnderMaintanence } from './components/UnderMaintanence';
import { EpistoRoutes, RenderRoute } from './components/universal/EpistoRoutes';
import { applicationRoutes } from './configuration/applicationRoutes';
import { MainRouting } from './MainRouting';
import './shared/logic/jsExtensions.ts'; // extensions, important
import { Environment } from './static/Environemnt';
import { ArrayBuilder } from './static/frontendHelpers';
import './styles/globalCssClasses.css';
import './styles/globalCssTypes';
import './styles/index.css';
import { LicenseInfo } from '@mui/x-license-pro';

LicenseInfo.setLicenseKey('YOUR_LICENSE_KEY');
// set MUI license key
const LICENSE_KEY = '692967e82163b6d3d8887b2f05b06718Tz00OTM0OSxFPTE2OTI0NDQ2MDU1MzcsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=';
LicenseInfo.setLicenseKey(LICENSE_KEY);

// react query
const queryClient = new QueryClient();

const app = (
    <UserGuidingFrame>
        <InitFrame>
            <ChakraThemeFrame>
                <MUISetupFrame>
                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                        <XDialogHost>
                            <QueryClientProvider client={queryClient}>
                                <PreventMobileFrame>
                                    <BrowserRouter>
                                        <TitleSetterFrame>
                                            <EpistoRoutes
                                                renderRoutes={new ArrayBuilder<RenderRoute>()

                                                    // under maintanance
                                                    .addIf(Environment.isUnderMaintenance, {
                                                        element: <UnderMaintanence />,
                                                        route: applicationRoutes.matchAll,
                                                    })
                                                    .addIf(!Environment.isUnderMaintenance, {
                                                        route: applicationRoutes.matchAll,
                                                        element: (
                                                            <AuthenticationFrame>
                                                                <ErrorDialogFrame>
                                                                    <NotificationsFrame>
                                                                        <BusyBarFrame>
                                                                            <EventListener>
                                                                                <MainRouting />
                                                                            </EventListener>
                                                                        </BusyBarFrame>
                                                                    </NotificationsFrame>
                                                                </ErrorDialogFrame>
                                                            </AuthenticationFrame>
                                                        ),
                                                    })
                                                    .getArray()} />
                                        </TitleSetterFrame>
                                    </BrowserRouter>
                                </PreventMobileFrame>
                            </QueryClientProvider>
                        </XDialogHost>
                    </LocalizationProvider>
                </MUISetupFrame>
            </ChakraThemeFrame>
        </InitFrame>
    </UserGuidingFrame >
);

ReactDOM.render(app, document.getElementById('root'));
