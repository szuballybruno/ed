import { PropsWithChildren } from '../../static/frontendHelpers';
import { ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material/styles';

// mui theme
const muiTheme = createTheme({
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: ['Raleway', 'sans-serif'].join(','),
    },

    palette: {
        mode: 'light',
        primary: {
            light: '#c8e8ff',
            main: '#97c9cc',
            dark: '#c8e8ff',
            contrastText: '#000000',
        },
        secondary: {
            light: '#5495b4',
            main: '#1d6784',
            dark: '#5495b4',
            contrastText: '#fff',
        },
    },
});

export const MUISetupFrame = (props: PropsWithChildren) => {

    return <>
        <ThemeProvider theme={muiTheme}>
            {props.children}
        </ThemeProvider>
    </>;
};