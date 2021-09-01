import { StylesProvider } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import { theme } from "./configuration/defaultMUITheme";
import { DataManagerFrame } from "./HOC/data_manager_frame/DataManagerFrame";
import { DialogFrame } from "./HOC/DialogFrame";
import { NotificationsFrame } from "./HOC/popups_wrapper/NotificationsFrame";
import './index.css';
import { MainRouting } from "./routing/MainRouting";

const queryClient = new QueryClient();

ReactDOM.render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <StylesProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <DataManagerFrame>
                        <DialogFrame>
                            <NotificationsFrame>
                                <MainRouting />
                            </NotificationsFrame>
                        </DialogFrame>
                    </DataManagerFrame>
                </ThemeProvider>
            </StylesProvider>
        </QueryClientProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
