import { LicenseInfo } from '@mui/x-license-pro';
import { FC } from 'react';
import { createRoot } from 'react-dom/client';
import { FrameRendererRoot } from './components/system/FrameRendererRoot';
import { MainRouting } from './MainRouting';
import './shared/logic/jsExtensions.ts'; // extensions, important
import './styles/globalCssClasses.css';
import './styles/globalCssTypes';
import './styles/index.css';

/**
 * Initialize app
 */
(() => {
    LicenseInfo.setLicenseKey('YOUR_LICENSE_KEY');
    // set MUI license key
    const LICENSE_KEY = '692967e82163b6d3d8887b2f05b06718Tz00OTM0OSxFPTE2OTI0NDQ2MDU1MzcsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=';
    LicenseInfo.setLicenseKey(LICENSE_KEY);
})();

const testobj = {
    testprop: {
        testprop2: {
            testprop3: 'noice',
            asd: 1234
        }
    }
};

const App: FC = () => {

    console.log('rendering root');
    const asd = testobj['testprop'];
    window['fmama'] = asd;
    window['fmama'] = asd.testprop2;
    window['fmama'] = asd.testprop2.asd;
    window['fmama'] = asd.testprop2.testprop3;

    return (
        <FrameRendererRoot>
            <MainRouting />
        </FrameRendererRoot>
    );
};

const root = createRoot(document.getElementById('root')!);

root.render(<App></App>);
