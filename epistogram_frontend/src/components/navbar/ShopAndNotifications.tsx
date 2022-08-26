import { Box, Flex } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useNavigation } from '../../services/core/navigatior';
import { Environment } from '../../static/Environemnt';

import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFont } from '../controls/EpistoFont';
import { ProfileImage } from '../ProfileImage';
import { useAuthorizationContext } from '../system/AuthorizationContext';
import { NotificationsPopper } from './NotificationsPopper';
import { UserContextMenu } from './UserContextMenu';

export const ShopAndNotifications = (props: {
    isMinimalMode: boolean,
    isLowHeight: boolean,

}) => {

    const { isLowHeight, isMinimalMode } = props;

    const { navigate2 } = useNavigation();

    const { isAuthenticated } = useAuthorizationContext();

    // refs 
    const userSettingsRef = useRef<HTMLDivElement>(null);
    const userNotificationsRef = useRef<HTMLDivElement>(null);

    // state 
    const [settingsPopperOpen, setSettingsPopperOpen] = useState(false);
    const [notificationsPopperOpen, setNotificationsPopperOpen] = useState(false);

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

            <Flex
                paddingRight={isLowHeight ? 0 : '10px'}
                align="center"
                marginRight={isLowHeight ? 0 : '15px'}
                flexShrink="0">

                {/* shop button */}
                <EpistoButton
                    style={{
                        height: 40,
                        fontStyle: 'normal',
                    }}
                    onClick={() => navigate2(applicationRoutes.shopRoute)}
                    variant={'plain'}>

                    <EpistoFont
                        fontSize={'fontNormal14'}
                        isUppercase
                        style={{
                            margin: '0 7px',
                            fontWeight: 500,
                        }}>

                        {translatableTexts.navbar.shop}
                    </EpistoFont>

                    <img
                        className="square50"
                        src={Environment.getAssetUrl('/images/shop3D.png')}
                        alt=""
                        style={{
                            objectFit: 'contain',
                        }} />

                </EpistoButton>

                {/* vertical divider */}
                <Box
                    width="1px"
                    height="40px"
                    margin="0 10px 0 10px"
                    bg="var(--mildGrey)"></Box>

                {/* profile pic */}
                {isAuthenticated && (

                    <ProfileImage
                        onClick={() => setSettingsPopperOpen(true)}
                        cursor="pointer"
                        className="square50"
                        ref={userSettingsRef} />
                )}
            </Flex>
        </>}
    </>;
};