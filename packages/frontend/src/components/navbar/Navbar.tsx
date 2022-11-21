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
            id={Navbar.name}
            zIndex={3}
            justify="center"
            width="100%"
            boxShadow="none"
            borderRadius={0}
            bgColor="unset"
            padding={isLowHeight ? '10px 20px' : '20px 40px'}>

            <DesktopNavbar
                backgroundContent={backgroundContent}
                hideLinks1={!!hideLinks}
                isLowHeight={isLowHeight}
                isMinimalMode={isMinimalMode}
                showLogo={showLogo} />
        </FlexFloat>
    );
}, ObjectComparer.isEqual);

export default Navbar;
