import { useEffect, useRef } from 'react';
import { PropsWithChildren } from '../../static/frontendHelpers';

type TawkAttributes = {
    name: string,
    email: string
};

class TawkAPI {

    private _underlyingApi: any;

    constructor(underlyingApi: any) {

        this._underlyingApi = underlyingApi;
    }

    /**
     * Load API 
     */
    static loadAsync(): Promise<TawkAPI> {

        const createScriptNode = (customize: (scriptElement: HTMLScriptElement) => void) => {

            const scriptNode1 = document.createElement('script');
            const scriptNode2 = document.getElementsByTagName('script')[0];

            customize(scriptNode1);

            if (!scriptNode2.parentNode)
                throw new Error('No parent node!');

            scriptNode2.parentNode.insertBefore(scriptNode1, scriptNode2);

            return scriptNode1;
        };

        return new Promise((res, rej) => {

            (window as any).Tawk_API = {
                onLoad: () => {

                    res(new TawkAPI((window as any).Tawk_API));
                }
            };

            createScriptNode(scriptElement => {

                scriptElement.async = true;
                scriptElement.src = 'https://embed.tawk.to/61e2e69ab84f7301d32b2de8/1fpf59jfu';
                scriptElement.setAttribute('crossorigin', '*');
            });
        });
    }

    /**
     * Set attributes 
     */
    setAttributesAsync(attributes: TawkAttributes): Promise<void> {
        return new Promise((res, rej) => {

            this._underlyingApi.setAttributes(attributes, rej);
            res();
        });
    }
};

export const TawkToFrame = (props: PropsWithChildren) => {

    const tawkApiRef = useRef<TawkAPI | null>(null);

    /**
     * Load api
     */
    useEffect(() => {

        TawkAPI
            .loadAsync()
            .then(api => tawkApiRef.current = api);
    }, []);

    /**
     * Set location
     */
    useEffect(() => {

        if (!tawkApiRef.current)
            return;

        tawkApiRef
            .current
            .setAttributesAsync({
                name: 'Mpengler Sanfréd',
                email: 'endre.marosi@epistogram.com'
            });
    }, [tawkApiRef]);

    return (
        <>
            {props.children}
        </>
    );
};
