import { PropsWithChildren } from '../../static/frontendHelpers';
import { ThemeProvider } from '@mui/system';
import { MUI } from '../controls/MUIControls';

// mui theme
const muiTheme = MUI
    .createTheme({
        typography: {
            fontFamily: 'Poppins'
        },
        palette: {
            mode: 'light',
            primary: {
                light: '#CEDC00',
                main: '#CEDC00',
                dark: '#CEDC00',
                contrastText: '#00352F',
            },
            secondary: {
                light: '#00594F',
                main: '#00594F',//main: '#1d6784',
                dark: '#00594F',
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
