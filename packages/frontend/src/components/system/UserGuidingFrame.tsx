import { useEffect } from 'react';
import { Environment } from '../../static/Environemnt';
import { PropsWithChildren } from '../../static/frontendHelpers';

export const UserGuidingFrame = (props: PropsWithChildren) => {

    useEffect(() => {

        const script = document.createElement('script');
        script.src = './userGuiding.js';
        script.async = true;
        script.defer = true;
        if (!Environment.isLocalhost)
            return document.body.append(script);

    }, []);

    return (
        <>
            {/*Environment.isLocalhost && <script
                src="./userGuiding.js"
                async
    defer></script>*/}
            {props.children}
        </>
    );
};