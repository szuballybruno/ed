import LogoutIcon from '@mui/icons-material/Logout';
import { MutableRefObject } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useLogout } from '../../services/api/authenticationApiService';
import { useNavigation } from '../../services/core/navigatior';
import { useShowErrorDialog } from '../../services/core/notifications';
import { ArrayBuilder } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoDivider } from '../controls/EpistoDivider';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoPopper } from '../controls/EpistoPopper';
import { EpistoConinInfo } from '../EpistoCoinInfo';
import { useAuthContextState } from '../system/AuthenticationFrame';
import { useAuthorizationContext } from '../system/AuthorizationContext';

export const UserContextMenu = (props: {
    isOpen: boolean,
    anchorRef: MutableRefObject<HTMLElement | null>,
    close: () => void
}) => {

    const { anchorRef, close, isOpen } = props;

    // context
    const { hasPermission } = useAuthorizationContext();
    const { refetchAuthHandshake } = useAuthContextState();

    // util 
    const { navigate2, openNewTab } = useNavigation();
    const { logoutUserAsync } = useLogout();
    const showError = useShowErrorDialog();

    const handleLogout = async () => {
        try {

            await logoutUserAsync();
            await refetchAuthHandshake();
        } catch (e) {

            showError(e);
        }
    };

    const userMenuItems = new ArrayBuilder<{ name: string, icon: any, color?: any, onClick: () => void }>()
        .add({
            name: applicationRoutes.settingsRoute.title,
            icon: applicationRoutes.settingsRoute.icon,
            onClick: () => navigate2(applicationRoutes.settingsRoute.preferencesRoute),
        })
        /* .add({
            name: applicationRoutes.settingsRoute.featurePreviewRoute.title,
            icon: applicationRoutes.settingsRoute.featurePreviewRoute.icon,
            onClick: () => openNewTab('https://epistogram.com/upcoming-features'),
        }) */
        .add({
            name: translatableTexts.navbar.signout,
            icon: <LogoutIcon></LogoutIcon>,
            color: 'var(--mildRed)',
            onClick: handleLogout,
        })
        .getArray();

    return (
        <EpistoPopper
            isOpen={isOpen}
            target={anchorRef.current}
            placementX="left"
            handleClose={close}>

            {/* episto coins */}
            <EpistoButton
                onClick={() => navigate2(applicationRoutes.settingsRoute.coinTransactionsRoute)}>

                <EpistoConinInfo height="45px" />
            </EpistoButton>

            <EpistoDivider
                height={1}
                width="100%"
                bgColor={'black'} />

            {/* menu items */}
            {userMenuItems
                .map((menuItem, index) => (
                    <EpistoButton
                        key={index}
                        variant={menuItem.color ? 'colored' : undefined}
                        style={{ background: menuItem.color }}
                        onClick={menuItem.onClick}>

                        <EpistoFlex2 className="whall"
                            margin="5px"
                            align="center">
                            {menuItem.icon}

                            <EpistoFont
                                isUppercase
                                style={{
                                    marginLeft: '14px',
                                    textAlign: 'left',
                                    fontWeight: 400,
                                }}
                            >
                                {menuItem.name}
                            </EpistoFont>
                        </EpistoFlex2>
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
                }}>

                {translatableTexts.navbar.version}
            </EpistoFont>
        </EpistoPopper >
    );
};