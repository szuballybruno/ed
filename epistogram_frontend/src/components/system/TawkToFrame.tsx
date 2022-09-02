import {PropsWithChildren} from '../../static/frontendHelpers';
import {Logger} from '../../static/Logger';
import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

export const tawkToLoadScripts = async () => {

    await (() => {

        const s1 = document.createElement('script');
        const s0 = document.getElementsByTagName('script')[0];

        s1.async = true;
        //s1.src = `https://embed.tawk.to/${process.env.REACT_APP_TAWKTO_ID}`;
        s1.src = 'https://embed.tawk.to/61e2e69ab84f7301d32b2de8/1fpf59jfu';
        s1.setAttribute('crossorigin', '*');

        if (!s0.parentNode) {

            Logger.log('No parent node...');
            return;
        }

        s0.parentNode.insertBefore(s1, s0);
    })();
};

export const TawkToFrame = (props: PropsWithChildren) => {

    const location = useLocation();

   useEffect(() => {

       Logger.log('Initializing Tawk.to frame...');
       window.Tawk_API = window.Tawk_API || {};
       window.Tawk_LoadStart = new Date();

       tawkToLoadScripts()
           .catch((e) => {
               Logger.log('Failed to initialize Tawk.to ' + e);
           });

       window.Tawk_API.onLoad = () => {

           Logger.log('Chat loaded');
           Logger.log('Asd: ' + JSON.stringify(window.Tawk_API));

           window.Tawk_API.setAttributes(
               {
                   name : 'Mpengler Sanfréd',
                   email : 'endre.marosi@epistogram.com'
               },
               (error) => {
                   Logger.log('Cannot initiate Tawk.to ' + error);
               }
           );
       };

       window.Tawk_API.onChatMaximized = () => {

           Logger.log('Chat maximized');

           const page_path = location.pathname + location.search;
           window.Tawk_API.addEvent('current-path', {
               'path': page_path,
           }, (error) => {

               Logger.log('Cannot maximize Tawk.to ' + error);
           });
       };
   }, []);

    return (
        <>
            {props.children}
        </>
    );
};
