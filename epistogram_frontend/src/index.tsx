import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import { theme } from "./configuration/defaultMUITheme";
import { AuthenticationFrame } from "./HOC/AuthenticationFrame";
import { DialogFrame } from "./HOC/DialogFrame";
import { NotificationsFrame } from "./HOC/NotificationsFrame";
import './index.css';
import { MainRouting } from "./routing/MainRouting";

const queryClient = new QueryClient();

ReactDOM.render(
    <BrowserRouter getUserConfirmation={(msg, callback) => { console.log("What??") }}>
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                <ThemeProvider theme={theme}>
                    <AuthenticationFrame>
                        <DialogFrame>
                            <NotificationsFrame>
                                <MainRouting />
                            </NotificationsFrame>
                        </DialogFrame>
                    </AuthenticationFrame>
                </ThemeProvider>
            </ChakraProvider>
        </QueryClientProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
