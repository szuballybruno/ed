import { Image } from '@chakra-ui/image';
import { Input } from '@chakra-ui/input';
import { Box, Flex } from '@chakra-ui/layout';
import { TextField, Typography } from '@mui/material';
import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { Route, Switch } from 'react-router';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { CurrentUserContext, RefetchUserFunctionContext } from "../HOC/AuthenticationFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from '../HOC/MainPanels';
import Navbar from '../navbar/Navbar';
import { NavigationLinkList } from '../NavigationLinkList';
import { EpistoButton } from '../universal/EpistoButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { uploadAvatarFileAsync, useUploadAvatarFile } from '../../services/fileService';
import { showNotification, useDialog, useShowErrorDialog } from '../../services/notifications';
import { reloadPage } from '../../frontendHelpers';
import { useRequestChangePassword, useSaveUserData } from '../../services/dataService';
import { LoadingFrame } from '../HOC/LoadingFrame';
import { EpistoDialog, useEpistoDialogLogic } from '../EpistoDialog';
import { ProfileImage } from '../ProfileImage';

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

const Preferences = () => {

    const user = useContext(CurrentUserContext)!;
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [avatarSrc, setAvatarSrc] = useState(user.avatarUrl!);

    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const fileBrowseInputRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const showErrorDialog = useShowErrorDialog();

    const { saveUserData, saveUserDataState } = useSaveUserData();
    const { postAvatarFileAsync, postAvatarFileState } = useUploadAvatarFile();
    const { requestChangePasswordAsync, requestChangePasswordState } = useRequestChangePassword();

    const refetchUser = useContext(RefetchUserFunctionContext);

    const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");

    const isChanged = [
        firstName !== user.firstName,
        lastName !== user.lastName,
        phoneNumber !== user.phoneNumber,
        avatarFile !== null
    ].some(x => x)

    const [isProfPicHovered, setIsProfPicHovered] = useState(true);

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

    return <>

        {/* hidden input */}
        <input
            ref={fileBrowseInputRef}
            type="file"
            id="imgupload"
            style={{ display: "none" }}
            onChange={x => {

                const input = x.currentTarget;
                if (!input)
                    return;

                if (!input.files)
                    return;

                const file = input.files[0] as File;
                input.value = "";

                var reader = new FileReader();

                reader.onloadend = () => {

                    if (!imageRef.current)
                        return;

                    const src = reader.result as any;

                    setAvatarSrc(src);
                    setAvatarFile(file);
                }

                reader.readAsDataURL(file);
            }} />

        <LoadingFrame
            direction="column"
            justify="flex-start"
            loadingState={[saveUserDataState, postAvatarFileState, requestChangePasswordState]}
            align="center">

            <Box
                position="relative"
                className="circle"
                overflow="hidden"
                width="200px"
                height="200px"
                cursor="pointer"
                onClick={() => fileBrowseInputRef.current?.click()}
                onMouseEnter={() => setIsProfPicHovered(true)}
                onMouseLeave={() => setIsProfPicHovered(false)}>

                <ProfileImage
                    ref={imageRef}
                    className="whall"
                    url={avatarSrc} />

                <Flex
                    position="absolute"
                    className="whall"
                    height="50%"
                    transition="0.4s"
                    top={0}
                    bg="#ffffffcc"
                    direction="column"
                    align="center"
                    justify="center"
                    transform={isProfPicHovered ? "translateY(100%)" : "translateY(125%)"}
                    opacity={isProfPicHovered ? 1 : 0}>

                    <Typography>
                        Új kép feltöltése
                    </Typography>

                    <PhotoCameraIcon className="square40"></PhotoCameraIcon>
                </Flex>
            </Box>

            <Flex
                direction="column"
                maxWidth="500px"
                width="100%"
                mt="50px"
                align="stretch">

                <EditField label="Vezeték név">
                    <Input
                        outline="none"
                        value={lastName}
                        onChange={x => setLastName(x.currentTarget.value)}></Input>
                </EditField>

                <EditField label="Kereszt név">
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

                            Jelszó visszaállítása
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
                variant="colored"
                onClick={saveChangesAsync}
                style={{
                    alignSelf: "center",
                    marginTop: "30px"
                }}>

                Változtatások mentése
            </EpistoButton>
        </LoadingFrame>
    </>
}

export const UserSettingsPage = () => {

    return <MainWrapper>

        <Navbar />

        <ContentWrapper>

            <LeftPanel p="20px">
                <NavigationLinkList items={[
                    applicationRoutes.settingsRoute.preferencesRoute
                ]}></NavigationLinkList>
            </LeftPanel>

            <RightPanel>

                <Switch>
                    <Route path={applicationRoutes.settingsRoute.preferencesRoute.route}>
                        <Preferences></Preferences>
                    </Route>
                </Switch>
            </RightPanel>
        </ContentWrapper>
    </MainWrapper>
}
