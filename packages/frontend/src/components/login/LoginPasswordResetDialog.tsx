import { Input } from '@chakra-ui/react';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useState } from 'react';
import { useRequestPasswordChange } from '../../services/api/passwordChangeApiService';
import { showNotification } from '../../services/core/notifications';
import { getEventValueCallback, useTryCatchWrapper } from '../../static/frontendHelpers';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoLabel } from '../controls/EpistoLabel';
import { FlexFloat } from '../controls/FlexFloat';
import { EpistoHeader } from '../EpistoHeader';
import { EpistoDialog } from '../universal/epistoDialog/EpistoDialog';
import { EpistoDialogLogicType } from '../universal/epistoDialog/EpistoDialogTypes';

export const LoginPasswordResetDialog = (params: {
    passwordResetDialogLogic: EpistoDialogLogicType
}) => {

    const { passwordResetDialogLogic } = params;

    const [email, setEmail] = useState('');
    const { errorMessage, getWrappedAction } = useTryCatchWrapper(errorCode => {
        if (errorCode === 'corrupt_credentials')
            return 'A megadott email cim hibas!';
    });

    // http
    const { requestPasswordChangeAsync, requestPasswordChangeState } = useRequestPasswordChange();

    const handleResetPw = getWrappedAction(async () => {

        await requestPasswordChangeAsync({ email });
        showNotification('Kérelmed fogadtuk, az emailt nemsokára meg fogod kapni a visszaállító linkkel!');
        passwordResetDialogLogic.closeDialog();
    });

    return (
        <EpistoDialog
            closeButtonType="top"
            logic={passwordResetDialogLogic}>

            <EpistoFlex2
                id="dialogFlex"
                width="500px"
                direction="column"
                align="center">

                {/* head */}
                <EpistoFlex2
                    bg="var(--deepBlue)"
                    padding="20px"
                    alignSelf="stretch"
                    overflow="hidden"
                    position="relative">

                    <EpistoHeader
                        className="fontLight"
                        text="Jelszó visszaállítása" />

                </EpistoFlex2>

                {/* desc */}
                <EpistoFont
                    fontSize="fontSmall"
                    style={{
                        padding: '15px 15px 0px 15px'
                    }}>
                    Nem kell aggódnod, ha jelszavad most esetleg nem jut eszedbe, másodpercek alatt segítünk azt visszaállítani!
                    Nincs más dolgod, mint megadni azt az e-mail címet, mellyel korábban regisztráltál, mi pedig küldeni fogunk neked egy linket, ahol új jelszót állíthatsz be.
                </EpistoFont>

                {/* desc */}
                <EpistoFont
                    fontSize="fontSmall"
                    style={{
                        padding: '15px'
                    }}>
                    Biztonsági okokból ez a link csak 8 óráig él, és új visszaállítási linket 24 óránként csak egyszer kérhetsz, így érdemes még most befejezned a visszaállítási folyamatot!

                </EpistoFont>

                {/* email */}
                <EpistoLabel
                    width="90%"
                    text="Itt add meg az e-mail címed, mellyel regisztráltál: ">

                    <FlexFloat
                        align="center"
                        padding="5px"
                        borderRadius="15px">

                        <AlternateEmailIcon
                            style={{
                                color: 'var(--epistoTeal)',
                                margin: '10px'
                            }} />

                        <Input
                            flex="1"
                            name="email"
                            value={email}
                            outline="none"
                            onChange={getEventValueCallback(setEmail)} />
                    </FlexFloat>
                </EpistoLabel>

                {/* error */}
                {errorMessage && <EpistoFont
                    fontSize="fontSmall"
                    color="fontError"
                    style={{
                        padding: '5px',
                    }}>

                    {errorMessage}
                </EpistoFont>}

                {/* affirmation */}
                <EpistoFont
                    fontSize="fontSmall"
                    color="fontGray"
                    style={{
                        marginTop: '20px',
                        padding: '15px',
                    }}>

                    Kattints a visszaállítás gombra, és küldjük is a linket!
                </EpistoFont>

                {/* buttons */}
                <EpistoButton
                    style={{ margin: '10px' }}
                    onClick={handleResetPw}
                    variant="colored">

                    Mehet
                </EpistoButton>
            </EpistoFlex2>
        </EpistoDialog>
    );
};