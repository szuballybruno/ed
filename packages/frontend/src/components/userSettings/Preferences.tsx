import { useContext, useEffect, useRef, useState } from 'react';
import { Responsivity } from '../../helpers/responsivity';
import { useLogout } from '../../services/api/authenticationApiService';
import { useUploadAvatarFile } from '../../services/api/fileApiService';
import { useRequestPasswordChangeAuthenticated } from '../../services/api/passwordChangeApiService';
import { UserApiService } from '../../services/api/UserApiService1';
import { showNotification, useShowErrorDialog } from '../../services/core/notifications';
import { Environment } from '../../static/Environemnt';
import { reloadPage, useTryCatchWrapper } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoEntry } from '../controls/EpistoEntry';
import { EpistoEntryNew, useEpistoEntryState } from '../controls/EpistoEntryNew';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoLabel } from '../controls/EpistoLabel';
import { EpistoConinInfo } from '../EpistoCoinInfo';
import { ProfileImage } from '../ProfileImage';
import { CurrentUserContext, useRefetchUserAsync } from '../system/AuthenticationFrame';
import { DashboardSection } from '../universal/DashboardSection';
import { EpistoImageSelector } from '../universal/EpistoImageSelector';

const usePreferencesLogic = () => {

    const user = useContext(CurrentUserContext);

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    // const [username, setUsername] = useState(user.username);
    const usernameEntryState = useEpistoEntryState({ defaultValue: user.username });
    const [avatarSrc, setAvatarSrc] = useState(user.avatarUrl!);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const { isMobile } = Responsivity
        .useIsMobileView();

    const imageRef = useRef<HTMLImageElement>(null);

    const showErrorDialog = useShowErrorDialog();

    // http
    const { saveUserSimpleAsync, saveUserSimpleState } = UserApiService
        .useSaveUserSimple();

    const { postAvatarFileAsync, postAvatarFileState } = useUploadAvatarFile();
    const { requestChangePasswordAsync, requestChangePasswordState } = useRequestPasswordChangeAuthenticated();

    const { refetchAuthHandshake } = useRefetchUserAsync();

    const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');

    const { getWrappedAction, errorMessage } = useTryCatchWrapper((code, defaultMsg) => {

        if (code === 'username_invalid') {

            usernameEntryState
                .setErrorMsg(translatableTexts.misc.wrongUsername);
        }
        else {

            return defaultMsg;
        }
    });

    const isChanged = [
        firstName !== user.firstName,
        lastName !== user.lastName,
        phoneNumber !== user.phoneNumber,
        avatarFile !== null,
        usernameEntryState.value !== user.username
    ].some(x => x);

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

    const saveChangesAsync = getWrappedAction(async () => {

        if (avatarFile)
            await postAvatarFileAsync(avatarFile);

        await saveUserSimpleAsync({
            firstName,
            lastName,
            phoneNumber,
            username: usernameEntryState.value
        });

        // notification
        showNotification(translatableTexts.preferences.changesHasBeenSaved);

        // reload
        if (avatarFile) {

            reloadPage();
        }
        else {

            refetchAuthHandshake();
        }
    });

    const handleRequestChangePasswordAsync = async () => {

        try {

            await requestChangePasswordAsync(currentPassword);

            // ok
            setIsPasswordChangeOpen(false);
            showNotification(translatableTexts.preferences.resetPasswordSuccessful);
        }
        catch (e: any) {

            showErrorDialog(e);
        }
    };

    useEffect(() => {

        if (isPasswordChangeOpen)
            return;

        setCurrentPassword('');
    }, [isPasswordChangeOpen]);

    return {
        isMobile,
        setAvatarSrc,
        setAvatarFile,
        imageRef,
        user,
        firstName,
        lastName,
        handleRequestChangePasswordAsync,
        saveChangesAsync,
        handleLogout,
        isChanged,
        setFirstName,
        setLastName,
        setPhoneNumber,
        phoneNumber,
        isPasswordChangeOpen,
        currentPassword,
        setCurrentPassword,
        setIsPasswordChangeOpen,
        usernameEntryState,
        // username: usernameEntryState.value,
        // setUsername: usernameEntryState.setValue,
        errorMessage
    };
};

const PasswordChangeSection = ({
    isPasswordChangeOpen,
    currentPassword,
    setIsPasswordChangeOpen,
    setCurrentPassword,
    handleRequestChangePasswordAsync
}: {
    isPasswordChangeOpen: boolean,
    currentPassword: string,
    setIsPasswordChangeOpen: (isPasswordChangeOpen: boolean) => void,
    setCurrentPassword: (currentPassword: string) => void,
    handleRequestChangePasswordAsync: () => void
}) => {

    return (
        <EpistoLabel
            isOverline
            text={translatableTexts.preferences.changePassword}>

            <EpistoFlex2
                direction="column"
                justify="flex-start"
                align="center"
                width="100%">

                {!isPasswordChangeOpen && <EpistoButton
                    style={{
                        background: 'var(--transparentWhite70)',
                        color: 'black',
                        width: '100%'
                    }}
                    onClick={() => setIsPasswordChangeOpen(true)}
                    variant="colored">

                    {translatableTexts.preferences.changePassword}
                </EpistoButton>}

                {isPasswordChangeOpen && <EpistoFlex2
                    width="100%"
                    direction="column"
                    flex="1">

                    <EpistoEntry
                        label={translatableTexts.preferences.currentPassword}
                        value={currentPassword}
                        type='password'
                        labelVariant='top'
                        setValue={setCurrentPassword} />

                    <EpistoFlex2 mt="20px"
                        width="100%">

                        <EpistoButton
                            variant="colored"
                            style={{
                                background: 'var(--transparentWhite70)',
                                color: 'black',
                                flex: '1'
                            }}
                            onClick={() => setIsPasswordChangeOpen(false)}>

                            {translatableTexts.preferences.close}
                        </EpistoButton>

                        <EpistoButton
                            variant="colored"
                            onClick={handleRequestChangePasswordAsync}
                            style={{
                                marginLeft: '20px',
                                background: 'var(--transparentWhite70)',
                                color: 'black',
                                flex: '1'
                            }}>

                            {translatableTexts.preferences.sendResetMail}
                        </EpistoButton>
                    </EpistoFlex2>
                </EpistoFlex2>}
            </EpistoFlex2>
        </EpistoLabel>
    );
};

export const Preferences = () => {

    const {
        isMobile,
        setAvatarSrc,
        imageRef,
        setAvatarFile,
        user,
        firstName,
        lastName,
        handleRequestChangePasswordAsync,
        saveChangesAsync,
        handleLogout,
        isChanged,
        setFirstName,
        setLastName,
        setPhoneNumber,
        phoneNumber,
        isPasswordChangeOpen,
        currentPassword,
        setCurrentPassword,
        setIsPasswordChangeOpen,
        // setUsername,
        // username,
        usernameEntryState,
        errorMessage
    } = usePreferencesLogic();

    return (
        <DashboardSection
            padding={isMobile ? 0 : undefined}
            title={isMobile ? '' : 'Beállítások'}
            showDivider={!isMobile}
            marginBottom={isMobile ? undefined : '20px'}
            flex='1'
            background="var(--transparentWhite70)"
            className="largeSoftShadow">

            <EpistoFlex2
                ml={isMobile ? undefined : '10px'}
                direction={'column'}
                justify={isMobile ? 'space-between' : undefined}
                align="center"
                flex="1">

                {/* profile image selector */}
                <EpistoFlex2
                    width={isMobile ? '100%' : undefined}
                    maxWidth={isMobile ? '500px' : undefined}
                    mt='20px'
                    pl='5px'>

                    <EpistoImageSelector
                        className='circle'
                        width="100px"
                        height="100px"
                        setImageSource={setAvatarSrc}
                        setImageFile={setAvatarFile}>

                        <ProfileImage
                            flex="1"
                            url={user.avatarUrl ? Environment.getAssetUrl(user.avatarUrl) : null}
                            ref={imageRef}
                            className="whall" />
                    </EpistoImageSelector>

                    {isMobile && <EpistoFlex2
                        pr='10px'
                        justify='flex-end'
                        align='flex-end'
                        flex='1'>

                        <EpistoConinInfo />
                    </EpistoFlex2>}
                </EpistoFlex2>

                {/* inputs container */}
                <EpistoFlex2
                    maxWidth="500px"
                    direction="column"
                    width="100%">

                    {/* last name */}
                    <EpistoEntry
                        label={translatableTexts.preferences.lastName}
                        value={lastName}
                        labelVariant='top'
                        setValue={setLastName} />

                    {/* first name */}
                    <EpistoEntry
                        label={translatableTexts.preferences.firstName}
                        value={firstName}
                        labelVariant='top'
                        setValue={setFirstName} />

                    {/* phone number */}
                    <EpistoEntry
                        label={translatableTexts.preferences.phoneNumber}
                        value={phoneNumber ? phoneNumber : ''}
                        labelVariant='top'
                        setValue={setPhoneNumber} />

                    {/* username */}
                    <EpistoEntryNew
                        state={usernameEntryState}
                        name="username"
                        label={translatableTexts.preferences.username}
                        labelVariant='top' />

                    {/* password change options */}
                    <PasswordChangeSection
                        currentPassword={currentPassword}
                        handleRequestChangePasswordAsync={handleRequestChangePasswordAsync}
                        isPasswordChangeOpen={isPasswordChangeOpen}
                        setCurrentPassword={setCurrentPassword}
                        setIsPasswordChangeOpen={setIsPasswordChangeOpen} />

                    {/* save button */}
                    <EpistoButton
                        isDisabled={!isChanged}
                        variant="colored"
                        style={{
                            marginTop: isMobile ? '20px' : '50px',
                        }}
                        onClick={saveChangesAsync}>

                        {translatableTexts.preferences.saveChanges}
                    </EpistoButton>

                    {/* error display */}
                    {errorMessage && <EpistoFont
                        color="mildRed">
                        {errorMessage}
                    </EpistoFont>}

                    {/* Logout */}
                    {isMobile && (
                        <EpistoButton
                            variant='colored'
                            onClick={handleLogout}
                            style={{
                                background: 'var(--mildRed)',
                                marginBottom: '20px',
                                marginTop: '20px'
                            }}>

                            Kijelentkezés
                        </EpistoButton>
                    )}
                </EpistoFlex2>
            </EpistoFlex2>
        </DashboardSection>
    );
};