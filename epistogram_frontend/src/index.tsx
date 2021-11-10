import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React from "react";
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthenticationFrame } from "./components/HOC/AuthenticationFrame";
import { ErrorDialogFrame } from "./components/HOC/DialogFrame";
import { NotificationsFrame } from "./components/HOC/NotificationsFrame";
import { UnderMaintanence } from "./components/UnderMaintanence";
import { applicationRoutes } from "./configuration/applicationRoutes";
import { isUnderMaintenance } from "./Environemnt";
import './index.css';
import './jsExtensions.ts'; // extensions, important
import { MainRouting } from "./MainRouting";

// react query 
const queryClient = new QueryClient();

// chakra theme
const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
}
const chakraTheme = extendTheme({ config })

// mui theme
const muiTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            light: '#c8e8ff',
            main: '#97c9cc',
            contrastText: '#000000',
        },
        secondary: {
            light: '#5495b4',
            main: "#1d6784",
            contrastText: '#fff',
        }
    }
});

ReactDOM.render(
    <BrowserRouter getUserConfirmation={(msg, callback) => { console.log("What??") }}>
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={chakraTheme}>
                <ThemeProvider theme={muiTheme}>
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
