import { PropsWithChildren } from '../../static/frontendHelpers';
import { ThemeProvider } from '@mui/system';
import { MUI } from '../controls/MUIControls';

// mui theme
const muiTheme = MUI
    .createTheme({
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
