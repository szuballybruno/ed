import { memo } from 'react';
import { Responsivity } from '../../helpers/responsivity';
import { ObjectComparer } from '../../static/objectComparer';
import { FlexFloat } from '../controls/FlexFloat';
import { useCurrentCourseItemCodeContext } from '../system/CurrentCourseItemFrame';
import { DesktopNavbar } from './DesktopNavbar';
import { MobileNavigation } from './MobileNavigation';

const Navbar = memo(({
    backgroundContent,
    hideLinks,
    isLowHeight,
    isMinimalMode,
    showLogo
}: {
    hideLinks?: boolean,
    showLogo?: boolean,
    isLowHeight?: boolean,
    isMinimalMode?: boolean,
    backgroundContent?: any
}) => {

    const { isMobile } = Responsivity
        .useIsMobileView();

    const cc = useCurrentCourseItemCodeContext();

    /**
     * Mobile navbar
     */
    if (isMobile)
        return (
            <MobileNavigation />
        );

    /**
     * Desktop navbar
     */
    return (
        <FlexFloat
            id="flexFloat-navbarRoot"
            zIndex={3}
            justify="center"
            width="100%"
            boxShadow="none"
            borderRadius={0}
            bgColor="unset"
            padding={isLowHeight ? '20px 0' : '20px'}>

            <DesktopNavbar
                backgroundContent={backgroundContent}
                currentCourseItemCode={cc.currentCourseItemCode}
                hideLinks1={!!hideLinks}
                isLowHeight={isLowHeight}
                isMinimalMode={isMinimalMode}
                showLogo={showLogo} />
        </FlexFloat>
    );
}, ObjectComparer.isEqual);

export default Navbar;
