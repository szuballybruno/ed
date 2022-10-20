import { useContext, useEffect, useRef, useState } from 'react';
import { useUploadAvatarFile } from '../../services/api/fileApiService';
import { useRequestPasswordChangeAuthenticated } from '../../services/api/passwordChangeApiService';
import { UserApiService } from '../../services/api/UserApiService1';
import { showNotification, useShowErrorDialog } from '../../services/core/notifications';
import { Environment } from '../../static/Environemnt';
import { reloadPage, useIsMobileView } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoEntry } from '../controls/EpistoEntry';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoConinInfo } from '../EpistoCoinInfo';
import { ProfileImage } from '../ProfileImage';
import { CurrentUserContext, useRefetchUserAsync } from '../system/AuthenticationFrame';
import { LoadingFrame } from '../system/LoadingFrame';
import { DashboardSection } from '../universal/DashboardSection';
import { EpistoImageSelector } from '../universal/EpistoImageSelector';

export const Preferences = () => {

    const user = useContext(CurrentUserContext);

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [avatarSrc, setAvatarSrc] = useState(user.avatarUrl!);

    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const isMobile = useIsMobileView();

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

    const isChanged = [
        firstName !== user.firstName,
        lastName !== user.lastName,
        phoneNumber !== user.phoneNumber,
        avatarFile !== null
    ].some(x => x);

    const saveChangesAsync = async () => {

        try {
            if (avatarFile)
                await postAvatarFileAsync(avatarFile);

            await saveUserSimpleAsync({
                firstName,
                lastName,
                phoneNumber
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
        }
        catch (e: any) {

            showErrorDialog(e);
        }
    };

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

    return <LoadingFrame
        direction="column"
        justify="flex-start"
        maxH={isMobile ? 'calc(100vh - 80px)' : undefined}
        flex="1"
        align="center"
        loadingState={[saveUserSimpleState, postAvatarFileState, requestChangePasswordState]}>

        <DashboardSection
            p={isMobile ? 0 : undefined}
            flex='1'
            title={isMobile ? '' : 'Beállítások'}
            background="var(--transparentWhite70)"
            borderRadius="6px"
            showDivider={!isMobile}
            width='100%'
            className="largeSoftShadow"
            marginBottom={isMobile ? undefined : '10px'}>

            <EpistoFlex2
                width={isMobile ? '100%' : undefined}
                direction='column'
                ml={isMobile ? undefined : '10px'}
                maxW='500px'>

                {/* profile image selector */}
                <EpistoFlex2
                    justify="flex-start"
                    mt='20px'
                    pl='5px'
                    width="100%"
                    maxW="500px">

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
                    px='10px'
                    direction="column"
                    justify="flex-start"
                    flex="1">

                    <EpistoEntry
                        label={translatableTexts.preferences.lastName}
                        value={lastName}
                        labelVariant='top'
                        setValue={setLastName} />

                    <EpistoEntry
                        label={translatableTexts.preferences.firstName}
                        value={firstName}
                        labelVariant='top'
                        setValue={setFirstName} />

                    <EpistoEntry
                        label={translatableTexts.preferences.phoneNumber}
                        value={phoneNumber ? phoneNumber : ''}
                        labelVariant='top'
                        setValue={setPhoneNumber} />

                    {/* open password change options */}
                    {!isPasswordChangeOpen && <EpistoFont
                        isUppercase
                        fontSize="fontExtraSmall"
                        style={{
                            margin: '13px 0 5px 0',
                            letterSpacing: '1.2px'
                        }}>

                        {translatableTexts.preferences.changePassword}
                    </EpistoFont>}

                    {/* password change options */}
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

                </EpistoFlex2>

            </EpistoFlex2>

            {!isPasswordChangeOpen && <EpistoButton
                isDisabled={!isChanged}
                variant="colored"
                onClick={saveChangesAsync}
                style={{
                    alignSelf: 'center',
                    position: 'absolute',
                    bottom: '20px',
                    width: 'calc(100% - 20px)',
                    padding: '10px 0',
                    background: 'var(--transparentWhite70)',
                    color: 'black',
                }}>

                {translatableTexts.preferences.saveChanges}
            </EpistoButton>}

        </DashboardSection>
    </LoadingFrame>;
};