import { useContext, useRef, useState } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useNavigation } from '../../services/core/navigatior';
import { Environment } from '../../static/Environemnt';

import { translatableTexts } from '../../static/translatableTexts';
import { ProfileImage } from '../ProfileImage';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoDiv } from '../controls/EpistoDiv';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { CurrentUserContext } from '../system/AuthenticationFrame';
import { useAuthorizationContext } from '../system/AuthorizationContext';
import { useCheckFeatureEnabled } from '../system/CheckFeatureFrame';
import { NotificationsPopper } from './NotificationsPopper';
import { UserContextMenu } from './UserContextMenu';

export const ShopAndNotifications = (props: {
    isMinimalMode: boolean,
    isLowHeight: boolean,

}) => {

    const { isLowHeight, isMinimalMode } = props;

    const { navigate2 } = useNavigation();

    const { isAuthenticated } = useAuthorizationContext();

    const user = useContext(CurrentUserContext);

    // refs 
    const userSettingsRef = useRef<HTMLDivElement>(null);
    const userNotificationsRef = useRef<HTMLDivElement>(null);

    // state 
    const [settingsPopperOpen, setSettingsPopperOpen] = useState(false);
    const [notificationsPopperOpen, setNotificationsPopperOpen] = useState(false);

    const { isFeatureEnabled: isShopPageEnabled } = useCheckFeatureEnabled({
        featureCode: 'SHOP_PAGE'
    });

    return <>
        {!isMinimalMode && <>

            {/* notifications menu */}
            <NotificationsPopper
                anchorRef={userNotificationsRef}
                close={() => setNotificationsPopperOpen(false)}
                isOpen={notificationsPopperOpen} />

            {/* user menu */}
            <UserContextMenu
                anchorRef={userSettingsRef}
                close={() => setSettingsPopperOpen(false)}
                isOpen={settingsPopperOpen} />

            <EpistoFlex2
                paddingRight={isLowHeight ? 0 : '10px'}
                align="center"
                //marginRight={isLowHeight ? 0 : '15px'}
                shrink={0}>

                {/* shop button */}
                {isShopPageEnabled && <EpistoButton
                    className='font14'
                    style={{
                        height: 40,
                        letterSpacing: 0.8,
                        textTransform: 'lowercase',
                    }}
                    onClick={() => navigate2(applicationRoutes.shopRoute)}
                    variant={'plain'}>

                    {translatableTexts.navbar.shop}

                    <img
                        className="square50"
                        src={Environment.getAssetUrl('/images/shop3D.png')}
                        alt=""
                        style={{
                            margin: '0 0 0 10px',
                            objectFit: 'contain'
                        }} />

                </EpistoButton>}

                {/* vertical divider */}
                {isShopPageEnabled && <EpistoDiv
                    width="1px"
                    height="40px"
                    margin="0 10px 0 10px"
                    bg="var(--mildGrey)"></EpistoDiv>}

                {/* profile pic */}
                {isAuthenticated && (

                    <ProfileImage
                        onClick={() => setSettingsPopperOpen(true)}
                        cursor="pointer"
                        className="square50"
                        url={user.avatarUrl ? Environment.getAssetUrl(user.avatarUrl) : null}
                        ref={userSettingsRef} />
                )}
            </EpistoFlex2>
        </>}
    </>;
};