import { Divider, Flex, Image } from "@chakra-ui/react"
import { useSetTempomatMode } from "../../../services/api/tempomatApiService"
import { useShowErrorDialog } from "../../../services/core/notifications"
import { TempomatModeType } from "../../../shared/types/sharedTypes"
import { getAssetUrl } from "../../../static/frontendHelpers"
import { translatableTexts } from "../../../static/translatableTexts"
import { EpistoFont } from "../../controls/EpistoFont"
import { EpistoDialog, EpistoDialogLogicType } from "../../EpistoDialog"
import { TempomatModeTile } from "./TempomatModeTile"

export const TempomatSettingsDialog = (props: {
    tempomatDialogLogic: EpistoDialogLogicType,
    courseId: number,
    onTempomatModeChanged: () => void,
    tempomatMode: TempomatModeType
}) => {

    const { tempomatDialogLogic, tempomatMode, courseId, onTempomatModeChanged } = props;

    const showError = useShowErrorDialog();

    const { setTempomatMode } = useSetTempomatMode();

    const handleSetTempomatMode = async (mode: TempomatModeType) => {

        try {

            await setTempomatMode({ mode, courseId });
            onTempomatModeChanged();
        }
        catch (e) {

            showError(e);
        }
    }

    return (
        <EpistoDialog
            fullScreenX
            sx={{
                "& .MuiDialog-container": {
                    justifyContent: "center",
                    alignItems: "center"
                },
                ".MuiPaper-root": {
                    width: "100%",
                    margin: "200px"

                }
            }}
            logic={tempomatDialogLogic}>

            <Flex direction="column" align="center" flex="1" >
                <Divider
                    h="1px"
                    w="calc(100% - 20px)"
                    background="grey" />

                <Flex
                    justify="space-between"
                    padding="5px">

                    <TempomatModeTile
                        tempomatMode="auto"
                        title="Automata üzemmód"
                        description={translatableTexts.tempomat.autoModeDescription}
                        isSelected={tempomatMode === "auto"}
                        onClick={() => handleSetTempomatMode("auto")} />

                    <TempomatModeTile
                        tempomatMode="light"
                        title="Megengedő üzemmód"
                        isSelected={tempomatMode === "light"}
                        description={translatableTexts.tempomat.lightModeDescription}
                        onClick={() => handleSetTempomatMode("light")} />

                    <TempomatModeTile
                        tempomatMode="balanced"
                        title="Kiegyensúlyozott üzemmód"
                        isSelected={tempomatMode === "balanced"}
                        description={translatableTexts.tempomat.balancedModeDescription}
                        onClick={() => handleSetTempomatMode("balanced")} />

                    <TempomatModeTile
                        tempomatMode="strict"
                        title="Szigorú üzemmód"
                        isSelected={tempomatMode === "strict"}
                        description={translatableTexts.tempomat.strictModeDescription}
                        onClick={() => handleSetTempomatMode("strict")} />
                </Flex>

                <Divider
                    h="1px"
                    w="calc(100% - 20px)"
                    background="grey" />

                <Flex
                    h="150px"
                    align="center"
                    justify="center"
                    my="20px"
                    flex="1">

                    <Flex
                        mx="10px"
                        align="center">

                        <EpistoFont>
                            Jelenlegi várható befejezés:
                        </EpistoFont>

                        <EpistoFont style={{
                            fontWeight: 600
                        }}>
                            2022.03.14.
                        </EpistoFont>
                    </Flex>

                    <Flex
                        mx="10px"
                        align="center">

                        <Image
                            h="30px"
                            w="30px"
                            mr="5px"
                            src={getAssetUrl("/images/tempomatdatechange.png")}
                        />

                        <EpistoFont>
                            Módosítom a kitűzött befejezési dátumot
                        </EpistoFont>
                    </Flex>
                </Flex>
            </Flex>
        </EpistoDialog>
    )
}