import { Divider, Flex } from '@chakra-ui/react';
import LogoutIcon from '@mui/icons-material/Logout';
import { MutableRefObject, useContext } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useLogout } from '../../services/api/authenticationApiService';
import { useNavigation } from '../../services/core/navigatior';
import { useShowErrorDialog } from '../../services/core/notifications';
import { Environment } from '../../static/Environemnt';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoPopper } from '../controls/EpistoPopper';
import { EpistoConinInfo } from '../EpistoCoinInfo';
import { AuthorizationContext, RefetchUserAsyncContext } from '../system/AuthFrame';

export const UserContextMenu = (props: {
    isOpen: boolean,
    anchorRef: MutableRefObject<HTMLElement | null>,
    close: () => void
}) => {

    const { anchorRef, close, isOpen } = props;

    // context
    const { hasPermission } = useContext(AuthorizationContext)!;
    const fetchUserAsync = useContext(RefetchUserAsyncContext);

    // util 
    const canAccessAdmin = hasPermission('ACCESS_ADMIN');
    const { navigate } = useNavigation();
    const { logoutUserAsync } = useLogout();
    const showError = useShowErrorDialog();

    const handleLogout = async () => {
        try {

            await logoutUserAsync();
            await fetchUserAsync();
        } catch (e) {

            showError(e);
        }
    };

    const userMenuItems = [
        {
            name: applicationRoutes.settingsRoute.title,
            icon: applicationRoutes.settingsRoute.icon,
            onClick: () => navigate(applicationRoutes.settingsRoute.preferencesRoute),
        },
        {
            name: applicationRoutes.settingsRoute.featurePreviewRoute.title,
            icon: applicationRoutes.settingsRoute.featurePreviewRoute.icon,
            onClick: () => navigate(applicationRoutes.settingsRoute.featurePreviewRoute),
        },
        {
            name: applicationRoutes.settingsRoute.developmentNotes.title,
            icon: applicationRoutes.settingsRoute.developmentNotes.icon,
            onClick: () => navigate(applicationRoutes.settingsRoute.developmentNotes),
        },
        {
            name: translatableTexts.navbar.signout,
            icon: <LogoutIcon></LogoutIcon>,
            color: 'var(--mildRed)',
            onClick: handleLogout,
        },
    ];

    return (
        <EpistoPopper
            isOpen={isOpen}
            target={anchorRef.current}
            placementX="left"
            handleClose={close}>

            {/* episto coins */}
            <EpistoButton
                onClick={() => navigate(applicationRoutes.settingsRoute.coinTransactionsRoute)}>

                <EpistoConinInfo height="45px" />
            </EpistoButton>

            <Divider height={1}
                width="100%"
                bgColor={'black'} />

            {/* admin menu item */}
            {canAccessAdmin && (
                <EpistoButton
                    onClick={() => navigate(applicationRoutes.administrationRoute.homeRoute.overviewRoute)}>

                    <Flex className="whall"
                        m="5px"
                        align="center">
                        {applicationRoutes.administrationRoute.icon}

                        <EpistoFont
                            fontSize="fontNormal14"
                            isUppercase
                            style={{
                                marginLeft: '14px',
                                textAlign: 'left',
                                fontWeight: 400,
                            }}>

                            {applicationRoutes.administrationRoute.title}
                        </EpistoFont>
                    </Flex>
                </EpistoButton>
            )}

            {/* menu items */}
            {userMenuItems
                .map((menuItem, index) => (
                    <EpistoButton
                        key={index}
                        variant={menuItem.color ? 'colored' : undefined}
                        style={{ background: menuItem.color }}
                        onClick={menuItem.onClick}>

                        <Flex className="whall"
                            m="5px"
                            align="center">
                            {menuItem.icon}

                            <EpistoFont
                                fontSize="fontNormal14"
                                isUppercase
                                style={{
                                    marginLeft: '14px',
                                    textAlign: 'left',
                                    fontWeight: 400,
                                }}
                            >
                                {menuItem.name}
                            </EpistoFont>
                        </Flex>
                    </EpistoButton>
                ))}

            {/* version */}
            <EpistoFont
                style={{
                    zIndex: 3,
                    color: 'gray',
                    background: 'white',
                    padding: '5px',
                    marginTop: '20px',
                }}
                fontSize="fontNormal14">

                {translatableTexts.navbar.version}
                {Environment.currentVersion ?? '1999.01.01.01:01'}
            </EpistoFont>
        </EpistoPopper >
    );
};