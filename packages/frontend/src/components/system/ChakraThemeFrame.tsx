import {
    ChakraProvider,
    ColorModeScript,
    extendTheme,
    ThemeConfig
} from '@chakra-ui/react';
import React from 'react';
import { PropsWithChildren } from '../../static/frontendHelpers';

// chakra theme
const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};
const chakraTheme = extendTheme({
    config,
    fonts: {
        heading: 'Raleway',
        body: 'Raleway',
    },
});

export const ChakraThemeFrame = (props: PropsWithChildren) => {

    return <>
        <ColorModeScript initialColorMode={'light'} ></ColorModeScript>
        <ChakraProvider theme={chakraTheme}>
            {props.children}
        </ChakraProvider>
    </>;
};