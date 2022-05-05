import { Flex } from '@chakra-ui/layout';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useUploadAvatarFile } from '../../services/api/fileApiService';
import { useRequestPasswordChangeAuthenticated } from '../../services/api/passwordChangeApiService';
import { useSaveUserSimple } from '../../services/api/userApiService';
import { showNotification, useShowErrorDialog } from '../../services/core/notifications';
import { reloadPage } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoEntry } from '../controls/EpistoEntry';
import { EpistoFont } from '../controls/EpistoFont';
import { ProfileImage } from '../ProfileImage';
import { CurrentUserContext, RefetchUserAsyncContext } from '../system/AuthenticationFrame';
import { LoadingFrame } from '../system/LoadingFrame';
import { SelectImage } from '../universal/SelectImage';

export const Preferences = () => {

    const user = useContext(CurrentUserContext);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [avatarSrc, setAvatarSrc] = useState(user.avatarUrl!);

    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const imageRef = useRef<HTMLImageElement>(null);

    const showErrorDialog = useShowErrorDialog();

    const { saveUserSimpleAsync, saveUserSimpleState } = useSaveUserSimple();
    const { postAvatarFileAsync, postAvatarFileState } = useUploadAvatarFile();
    const { requestChangePasswordAsync, requestChangePasswordState } = useRequestPasswordChangeAuthenticated();

    const refetchUser = useContext(RefetchUserAsyncContext);

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

                refetchUser();
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
        flex="1"
        align="center"
        width="100%"
        loadingState={[saveUserSimpleState, postAvatarFileState, requestChangePasswordState]}>

        {/* profile image selector */}
        <Flex
            justify="center"
            width="100%"
            maxW="500px">

            <SelectImage
                className='circle'
                mx="20px"
                width="100px"
                height="100px"
                setImageSource={setAvatarSrc}
                setImageFile={setAvatarFile}>

                <ProfileImage
                    flex="1"
                    url={avatarSrc ?? null}
                    ref={imageRef}
                    className="whall" />
            </SelectImage>
        </Flex>

        {/* inputs container */}
        <Flex
            direction="column"
            justify="flex-start"
            flex="1"
width="100%"
            maxW="500px">

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
                value={phoneNumber}
                labelVariant='top'
                setValue={setPhoneNumber} />

            {/* open password change options */}
            {!isPasswordChangeOpen && <EpistoFont
                isUppercase
                fontSize="fontExtraSmall"
                style={{
                    margin: '10px 0 5px 0',
                }}>

                {translatableTexts.preferences.changePassword}
            </EpistoFont>}

            {/* password change options */}
            <Flex
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

                {isPasswordChangeOpen && <Flex
                    width="100%"
                    direction="column"
                    flex="1">

                    <EpistoEntry
                        label={translatableTexts.preferences.currentPassword}
                        value={currentPassword}
                        type='password'
                        labelVariant='top'
                        setValue={setCurrentPassword} />

                    <Flex mt="20px"
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
                    </Flex>
                </Flex>}
            </Flex>

            {!isPasswordChangeOpen && <EpistoButton
                isDisabled={!isChanged}
                variant="colored"
                onClick={saveChangesAsync}
                style={{
                    alignSelf: 'center',
                    marginTop: '60px',
                    marginBottom: '30px',
                    width: '100%',
                    background: 'var(--transparentWhite70)',
                    color: 'black',
                }}>

                {translatableTexts.preferences.saveChanges}
            </EpistoButton>}
        </Flex>
    </LoadingFrame>;
};