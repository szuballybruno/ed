import { Input } from '@chakra-ui/input';
import { Flex } from '@chakra-ui/layout';
import { TextField, Typography } from '@mui/material';
import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { reloadPage } from '../../frontendHelpers';
import { useRequestChangePassword, useSaveUserData } from '../../services/dataService';
import { useUploadAvatarFile } from '../../services/fileService';
import { showNotification, useShowErrorDialog } from '../../services/notifications';
import { ProfileImage } from '../ProfileImage';
import { CurrentUserContext, RefetchUserAsyncContext } from "../system/AuthenticationFrame";
import { LoadingFrame } from '../system/LoadingFrame';
import { EpistoButton } from '../universal/EpistoButton';
import { SelectImage } from '../universal/SelectImage';

const EditField = (props: { children: ReactNode, label: string }) => {

    return <Flex
        className="dividerBorderBottom"
        justify="space-between"
        mb="20px"
        p="10px"
        align="flex-end">

        <Typography>
            {props.label}
        </Typography>
        {props.children}
    </Flex>
}

export const Preferences = () => {

    const user = useContext(CurrentUserContext)!;
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [avatarSrc, setAvatarSrc] = useState(user.avatarUrl!);

    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const imageRef = useRef<HTMLImageElement>(null);

    const showErrorDialog = useShowErrorDialog();

    const { saveUserData, saveUserDataState } = useSaveUserData();
    const { postAvatarFileAsync, postAvatarFileState } = useUploadAvatarFile();
    const { requestChangePasswordAsync, requestChangePasswordState } = useRequestChangePassword();

    const refetchUser = useContext(RefetchUserAsyncContext);

    const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");

    const isChanged = [
        firstName !== user.firstName,
        lastName !== user.lastName,
        phoneNumber !== user.phoneNumber,
        avatarFile !== null
    ].some(x => x)

    const saveChangesAsync = async () => {

        try {
            if (avatarFile)
                await postAvatarFileAsync(avatarFile);

            await saveUserData(firstName, lastName, phoneNumber);

            // notification
            showNotification("A változtatások sikeresen mentésre kerültek.");

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
    }

    const handleRequestChangePasswordAsync = async () => {

        try {

            await requestChangePasswordAsync(currentPassword);

            // ok
            setIsPasswordChangeOpen(false);
            showNotification("Sikeresen visszaállítottad a jelszavad, az új jelszó megadásához szükséges linket e-mail-ben elküldtük Neked.");
        }
        catch (e: any) {

            showErrorDialog(e);
        }
    }

    useEffect(() => {

        if (isPasswordChangeOpen)
            return;

        setCurrentPassword("");
    }, [isPasswordChangeOpen]);

    const setBrowsedImage = (src: string, file: File) => {

        if (!imageRef.current)
            return;

        setAvatarSrc(src);
        setAvatarFile(file);
    }

    return <>

        <LoadingFrame
            direction="column"
            justify="flex-start"
            loadingState={[saveUserDataState, postAvatarFileState, requestChangePasswordState]}
            align="center">

            <SelectImage
                width="200px"
                height="200px"
                className="circle"
                onImageSelected={setBrowsedImage}>
                <ProfileImage
                    url={avatarSrc ?? null}
                    ref={imageRef}
                    className="whall" />
            </SelectImage>

            <Flex
                direction="column"
                maxWidth="500px"
                width="100%"
                mt="50px"
                align="stretch">

                <EditField label="Vezetéknév">
                    <Input
                        outline="none"
                        value={lastName}
                        onChange={x => setLastName(x.currentTarget.value)}></Input>
                </EditField>

                <EditField label="Keresztnév">
                    <Input
                        outline="none"
                        value={firstName}
                        onChange={x => setFirstName(x.currentTarget.value)}></Input>
                </EditField>

                <EditField label="Telefonszám">
                    <Input
                        outline="none"
                        value={phoneNumber}
                        onChange={x => setPhoneNumber(x.currentTarget.value)}></Input>
                </EditField>

                <EditField label="Jelszó">
                    <Flex direction="column">
                        {!isPasswordChangeOpen && <EpistoButton
                            onClick={() => setIsPasswordChangeOpen(true)}
                            variant="outlined"
                            padding="1px 8px 1px 8px">

                            Jelszó megváltoztatása
                        </EpistoButton>}

                        {isPasswordChangeOpen && <>

                            <TextField
                                variant="standard"
                                value={currentPassword}
                                label="Mostani jelszó"
                                type="password"
                                onChange={x => setCurrentPassword(x.currentTarget.value)} />

                            <Flex mt="20px">
                                <EpistoButton onClick={() => setIsPasswordChangeOpen(false)}>
                                    Bezárás
                                </EpistoButton>

                                <EpistoButton
                                    variant="colored"
                                    onClick={handleRequestChangePasswordAsync}
                                    style={{ marginLeft: "20px" }}>

                                    Kérelem elküldése
                                </EpistoButton>
                            </Flex>
                        </>}
                    </Flex>
                </EditField>
            </Flex>

            <EpistoButton
                isDisabled={!isChanged}
                variant="outlined"
                onClick={saveChangesAsync}
                style={{
                    alignSelf: "center",
                    marginTop: "30px",
                    marginBottom: "10px"
                }}>

                Változtatások mentése
            </EpistoButton>
        </LoadingFrame>
    </>
}