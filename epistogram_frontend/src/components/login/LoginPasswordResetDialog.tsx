import { Box, Flex } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/react";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useRequestPasswordChange } from "../../services/api/passwordChangeApiService";
import { showNotification, useShowErrorDialog } from "../../services/core/notifications";
import { getEventValueCallback } from "../../static/frontendHelpers";
import { EpistoButton } from "../controls/EpistoButton";
import { EpistoFont } from "../controls/EpistoFont";
import { EpistoLabel } from "../controls/EpistoLabel";
import { FlexFloat } from "../controls/FlexFloat";
import { EpistoDialog, EpistoDialogLogicType } from "../EpistoDialog";
import { EpistoHeader } from "../EpistoHeader";

export const LoginPasswordResetDialog = (params: {
    passwordResetDialogLogic: EpistoDialogLogicType
}) => {

    const { passwordResetDialogLogic } = params;

    const [email, setEmail] = useState("");

    const showError = useShowErrorDialog();

    // http
    const { requestPasswordChangeAsync, requestPasswordChangeState } = useRequestPasswordChange();

    const handleResetPw = async () => {

        try {

            await requestPasswordChangeAsync({ email });

            showNotification("Kérelmed fogadtuk, az emailt nemsokára meg fogod kapni a visszaállító linkkel!");

            passwordResetDialogLogic.closeDialog();
        } catch (e) {

            showError(e);
        }
    };

    return (
        <EpistoDialog logic={passwordResetDialogLogic}>
            <Flex
                id="dialogFlex"
                width="500px"
                direction="column"
                align="center">

                {/* head */}
                <Flex
                    bg="var(--deepBlue)"
                    p="20px"
                    alignSelf="stretch"
                    overflow="hidden"
                    position="relative">

                    <EpistoHeader
                        className="fontLight"
                        text="Jelszó visszaállítása" />

                </Flex>

                {/* desc */}
                <EpistoFont
                    fontSize="fontSmall"
                    style={{
                        padding: "15px 15px 0px 15px"
                    }}>
                    Nem kell aggódnod, ha jelszavad most esetleg nem jut eszedbe, másodpercek alatt segítünk azt visszaállítani!
                    Nincs más dolgod, mint megadni azt az e-mail címet, mellyel korábban regisztráltál, mi pedig küldeni fogunk neked egy linket, ahol új jelszót állíthatsz be.
                </EpistoFont>

                {/* desc */}
                <EpistoFont
                    fontSize="fontSmall"
                    style={{
                        padding: "15px"
                    }}>
                    Biztonsági okokból ez a link csak 8 óráig él, és új visszaállítási linket 24 óránként csak egyszer kérhetsz, így érdemes még most befejezned a visszaállítási folyamatot!

                </EpistoFont>

                {/* email */}
                <EpistoLabel
                    width="90%"
                    text="Itt add meg az e-mail címed, mellyel regisztráltál: ">

                    <FlexFloat
                        align="center"
                        p="5px"
                        borderRadius="15px">

                        <AlternateEmailIcon
                            style={{
                                color: "var(--epistoTeal)",
                                margin: "10px"
                            }} />

                        <Input
                            flex="1"
                            name="email"
                            value={email}
                            outline="none"
                            onChange={getEventValueCallback(setEmail)} />
                    </FlexFloat>
                </EpistoLabel>

                {/* affirmation */}
                <EpistoFont
                    fontSize="fontSmall"
                    classes={["fontGrey"]}
                    style={{
                        marginTop: "20px",
                        padding: "15px",
                    }}>

                    Kattints a visszaállítás gombra, és küldjük is a linket! 
                </EpistoFont>

                {/* buttons */}
                <EpistoButton
                    style={{ margin: "10px" }}
                    onClick={handleResetPw}
                    variant="colored">

                    Mehet
                </EpistoButton>
            </Flex>
        </EpistoDialog>
    );
};