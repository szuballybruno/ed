import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthenticationFrame } from "./components/HOC/AuthenticationFrame";
import { ErrorDialogFrame } from "./components/HOC/DialogFrame";
import { NotificationsFrame } from "./components/HOC/NotificationsFrame";
import { UnderMaintanence } from "./components/UnderMaintanence";
import { applicationRoutes } from "./configuration/applicationRoutes";
import { theme } from "./configuration/defaultMUITheme";
import { isUnderMaintenance } from "./Environemnt";
import './index.css';
import './jsExtensions.ts'; // extensions, important
import { MainRouting } from "./MainRouting";

const queryClient = new QueryClient();

ReactDOM.render(
    <BrowserRouter getUserConfirmation={(msg, callback) => { console.log("What??") }}>
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                <ThemeProvider theme={theme}>
                    <Switch>

                        {/* under maintanence */}
                        {isUnderMaintenance && <Route path="/" component={UnderMaintanence} />}

                        {/* under maintanence */}
                        <Route path={applicationRoutes.underMaintanenceRoute.route} component={UnderMaintanence} />

                        {/* app */}
                        <Route path="/">
                            <AuthenticationFrame>
                                <ErrorDialogFrame>
                                    <NotificationsFrame>
                                        <MainRouting />
                                    </NotificationsFrame>
                                </ErrorDialogFrame>
                            </AuthenticationFrame>
                        </Route>
                    </Switch>
                </ThemeProvider>
            </ChakraProvider>
        </QueryClientProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
