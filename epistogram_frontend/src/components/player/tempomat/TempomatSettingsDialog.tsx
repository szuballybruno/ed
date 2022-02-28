import { Flex, Image, Divider } from "@chakra-ui/react"
import { getAssetUrl } from "../../../static/frontendHelpers"
import { EpistoFont } from "../../controls/EpistoFont"
import { EpistoDialog, EpistoDialogLogicType } from "../../EpistoDialog"
import { TempomatModeTile } from "./TempomatModeTile"

export const TempomatSettingsDialog = (props: {
    tempomatDialogLogic: EpistoDialogLogicType
}) => {

    const { tempomatDialogLogic } = props;

    return (
        <EpistoDialog
            fullScreenX
            sx={{
                "& .MuiDialog-container": {
                    justifyContent: "center",
                    alignItems: "center"
                },
                ".MuiPaper-root": {
                    background: "#efefef",
                    width: "100%",
                    margin: "200px"

                }
            }}
            logic={tempomatDialogLogic}>

            <Flex direction="column" align="center" flex="1" background="#efefef">
                <Divider
                    h="1px"
                    w="calc(100% - 20px)"
                    background="grey" />

                <Flex
                    justify="space-between"
                    p="20px">

                    <TempomatModeTile
                        thumbnailImage={getAssetUrl("/images/autopilot.png")}
                        title="Automata üzemmód"
                        description="Válaszd ezt ha Béla vagy és egy gomb gyárban dolgozol, de azt mondja a főnököd, te Béla, te Béla, nem dolgozol rendesen. Fogd azt a gombot a jobb kezeddel is te utolsó kis Bélakulom Hornyákin."
                        isSelected />

                    <TempomatModeTile
                        thumbnailImage={getAssetUrl("/images/lightmode.png")}
                        title="Automata üzemmód"
                        description="Válaszd ezt ha Béla vagy és egy gomb gyárban dolgozol, de azt mondja a főnököd, te Béla, te Béla, nem dolgozol rendesen. Fogd azt a gombot a jobb kezeddel is te utolsó kis Bélakulom Hornyákin." />

                    <TempomatModeTile
                        thumbnailImage={getAssetUrl("/images/balancedmode.png")}
                        title="Automata üzemmód"
                        description="Válaszd ezt ha Béla vagy és egy gomb gyárban dolgozol, de azt mondja a főnököd, te Béla, te Béla, nem dolgozol rendesen. Fogd azt a gombot a jobb kezeddel is te utolsó kis Bélakulom Hornyákin." />

                    <TempomatModeTile
                        thumbnailImage={getAssetUrl("/images/strictmode.png")}
                        title="Automata üzemmód"
                        description="Válaszd ezt ha Béla vagy és egy gomb gyárban dolgozol, de azt mondja a főnököd, te Béla, te Béla, nem dolgozol rendesen. Fogd azt a gombot a jobb kezeddel is te utolsó kis Bélakulom Hornyákin." />
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