import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { XDialogHost } from './components/lib/XDialog/XDialogHost';
import { AuthenticationFrame } from './components/system/AuthenticationFrame';
import { ChakraThemeFrame } from './components/system/ChakraThemeFrame';
import { ErrorDialogFrame } from './components/system/DialogFrame';
import { EventListener } from './components/system/EventListener';
import { InitFrame } from './components/system/InitFrame';
import { MUIThemeFrame } from './components/system/MUIThemeFrame';
import { NotificationsFrame } from './components/system/NotificationsFrame';
import { PreventMobileFrame } from './components/system/PreventMobileFrame';
import { UnderMaintanence } from './components/UnderMaintanence';
import { EpistoRoutes, RenderRoute } from './components/universal/EpistoRoutes';
import { applicationRoutes } from './configuration/applicationRoutes';
import './index.css';
import { MainRouting } from './MainRouting';
import './shared/logic/jsExtensions.ts'; // extensions, important
import { Environment } from './static/Environemnt';
import { ArrayBuilder } from './static/frontendHelpers';

// react query
const queryClient = new QueryClient();

const app = (
    <InitFrame>
        <ChakraThemeFrame>
            <MUIThemeFrame>
                <XDialogHost>
                    <QueryClientProvider client={queryClient}>
                        <PreventMobileFrame>
                            <BrowserRouter>
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
                                                            <EventListener>
                                                                <MainRouting />
                                                            </EventListener>
                                                        </NotificationsFrame>
                                                    </ErrorDialogFrame>
                                                </AuthenticationFrame>
                                            ),
                                        })
                                        .getArray()}
                                />
                            </BrowserRouter>
                        </PreventMobileFrame>
                    </QueryClientProvider>
                </XDialogHost>
            </MUIThemeFrame>
        </ChakraThemeFrame>
    </InitFrame>
);

ReactDOM.render(app, document.getElementById('root'));
