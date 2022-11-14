import { memo } from 'react';
import { useIsMobileView } from '../../static/frontendHelpers';
import { FlexFloat } from '../controls/FlexFloat';
import { useCurrentCourseItemCodeContext } from '../system/CurrentCourseItemFrame';
import { DesktopNavbar } from './DesktopNavbar';
import { MobileNavigation } from './MobileNavigation';

const Navbar = memo((props: {
    hideLinks?: boolean,
    showLogo?: boolean,
    isLowHeight?: boolean,
    isMinimalMode?: boolean,
    backgroundContent?: any
}) => {

    const { backgroundContent, hideLinks, isLowHeight, isMinimalMode, showLogo } = props;
    const isMobile = useIsMobileView();
    const cc = useCurrentCourseItemCodeContext();
    
    // render desktop
    const renderDesktopNavbar = () => <DesktopNavbar
        backgroundContent={backgroundContent}
        currentCourseItemCode={cc.currentCourseItemCode}
        hideLinks1={!!hideLinks}
        isLowHeight={isLowHeight}
        isMinimalMode={isMinimalMode}
        showLogo={showLogo} />;

    // render mobile
    const renderMobileNavbar = () => <MobileNavigation />;

    return isMobile
        ? renderMobileNavbar()
        : <FlexFloat
            id="flexFloat-navbarRoot"
            zIndex={3}
            justify="center"
            width="100%"
            boxShadow="none"
            borderRadius={0}
            bgColor="unset"
            padding={isLowHeight ? '20px 0' : '20px'}>

            {renderDesktopNavbar()}
        </FlexFloat>;
}, (p, n) => {

    return JSON.stringify(p) === JSON.stringify(n);
});

export default Navbar;
