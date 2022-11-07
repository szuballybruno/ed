import { ChakraProvider } from '@chakra-ui/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { FC, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

export const LocalizationFrame: FC<PropsWithChildren> = ({ children }) => {

    return <LocalizationProvider dateAdapter={AdapterLuxon}>
        {children}
    </LocalizationProvider>;
};

export const QueryClienProviderFrame = ({ children }: PropsWithChildren) => {

    const queryClient = new QueryClient();

    return <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>;
};

export const RoutingFrame: FC<PropsWithChildren> = ({ children }) => {

    return <BrowserRouter>
        {children}
    </BrowserRouter>;
};

export const ChakraProviderFrame: FC<PropsWithChildren> = ({ children }) => {

    return <ChakraProvider>
        {children}
    </ChakraProvider>;
};