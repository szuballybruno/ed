import { ChakraProvider, ColorModeScript, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { XDialogHost } from "./components/lib/XDialog/XDialogHost";
import { AuthenticationFrame } from "./components/system/AuthenticationFrame";
import { ErrorDialogFrame } from "./components/system/DialogFrame";
import { EventListener } from "./components/system/EventListener";
import { NotificationsFrame } from "./components/system/NotificationsFrame";
import { PreventMobileFrame } from "./components/system/PreventMobileFrame";
import { UnderMaintanence } from "./components/UnderMaintanence";
import { EpistoRoutes, RenderRoute } from "./components/universal/EpistoRoutes";
import "./index.css";
import { MainRouting } from "./MainRouting";
import "./shared/logic/jsExtensions.ts"; // extensions, important
import { isUnderMaintenance } from "./static/Environemnt";
import { ArrayBuilder } from "./static/frontendHelpers";

// react query 
const queryClient = new QueryClient();

// chakra theme
const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
};
const chakraTheme = extendTheme({
    config,
    fonts: {
        heading: "Raleway",
        body: "Raleway",
    },
});

// mui theme
const muiTheme = createTheme({
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            "Raleway",
            "sans-serif"
        ].join(",")
    },

    palette: {
        mode: "light",
        primary: {
            light: "#c8e8ff",
            main: "#97c9cc",
            dark: "#c8e8ff",
            contrastText: "#000000",
        },
        secondary: {
            light: "#5495b4",
            main: "#1d6784",
            dark: "#5495b4",
            contrastText: "#fff",
        }
    }
});

const app = (
    <QueryClientProvider client={queryClient}>
        <>
            <ColorModeScript initialColorMode={"light"} />
            <ChakraProvider theme={chakraTheme}>
                <ThemeProvider theme={muiTheme}>
                    <XDialogHost>
                        <PreventMobileFrame>
                            <BrowserRouter>
                                <EpistoRoutes
                                    renderRoutes={new ArrayBuilder<RenderRoute>()

                                        // under maintanance 
                                        .addIf(isUnderMaintenance, {
                                            element: <UnderMaintanence/>,
                                            route: { route: "*", title: "Maintanance mode" }
                                        })
                                        .addIf(!isUnderMaintenance, {
                                            route: { route: "*", title: "" },
                                            element: <AuthenticationFrame>
                                                <ErrorDialogFrame>
                                                    <NotificationsFrame>
                                                        <EventListener>
                                                            <MainRouting />
                                                        </EventListener>
                                                    </NotificationsFrame>
                                                </ErrorDialogFrame>
                                            </AuthenticationFrame>
                                        })
                                        .getArray()} />
                            </BrowserRouter>
                        </PreventMobileFrame>
                    </XDialogHost>
                </ThemeProvider>
            </ChakraProvider>
        </>
    </QueryClientProvider >
);

ReactDOM.render(app, document.getElementById("root"));


