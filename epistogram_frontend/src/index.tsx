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
import { isUnderMaintenance } from "./Environemnt";
import './index.css';
import './jsExtensions.ts'; // extensions, important
import { MainRouting } from "./MainRouting";
import { extendTheme, ThemeConfig } from "@chakra-ui/react"
import { createTheme } from "@mui/system";

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
        primary: {
            light: '#c8e8ff',
            main: '#97c9cc',
            dark: '#c8e8ff',
            contrastText: '#000000',
        },
        secondary: {
            light: '#5495b4',
            main: "#1d6784",
            dark: '#5495b4',
            contrastText: '#fff',
        }

    }
})

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
