import { initJsExtensions } from '@episto/xcore';
import { LicenseInfo } from '@mui/x-license-pro';
import { FC } from 'react';
import { createRoot } from 'react-dom/client';
import { PageRootContainer } from './components/pageRootContainer/PageRootContainer';
import { FrameRendererRoot } from './components/system/FrameRendererRoot';
import { MainRouting } from './MainRouting';
import './styles/globalCssClasses.css';
import './styles/globalCssTypes';
import './styles/index.css';

initJsExtensions();

/**
 * Initialize app
 */
(() => {
    LicenseInfo.setLicenseKey('YOUR_LICENSE_KEY');
    // set MUI license key
    const LICENSE_KEY = '692967e82163b6d3d8887b2f05b06718Tz00OTM0OSxFPTE2OTI0NDQ2MDU1MzcsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=';
    LicenseInfo.setLicenseKey(LICENSE_KEY);
})();


const App: FC = () => {

    return (
        <FrameRendererRoot>
            <PageRootContainer>
                <MainRouting />
            </PageRootContainer>
        </FrameRendererRoot>
    );
};

const root = createRoot(document.getElementById('root')!);

root.render(<App></App>);
