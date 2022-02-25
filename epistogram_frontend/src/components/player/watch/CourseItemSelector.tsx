import { Divider, Flex } from '@chakra-ui/layout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { LinearProgress, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import { ModuleDTO } from '../../../shared/dtos/ModuleDTO';
import { CourseModeType } from "../../../shared/types/sharedTypes";
import { useSetCourseMode } from '../../../services/api/courseApiService';
import { httpPostAsync } from "../../../services/core/httpClient";
import { useShowErrorDialog } from "../../../services/core/notifications";
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoPopper } from '../../controls/EpistoPopper';
import { EpistoDialog, useEpistoDialogLogic } from '../../EpistoDialog';
import { CurrentUserContext } from '../../system/AuthenticationFrame';
import { CourseItemList } from "../../universal/CourseItemList";
import { Info, InfoOutlined, Settings } from '@mui/icons-material';
import { getAssetUrl } from '../../../static/frontendHelpers';
import { Image } from '@chakra-ui/react';

export const CourseItemSelector = (props: {
    mode: CourseModeType,
    modules: ModuleDTO[],
    courseId: number,
    refetchPlayerData: () => Promise<void>,
}) => {

    const { mode, refetchPlayerData, courseId, modules } = props;
    const showErrorDialog = useShowErrorDialog();
    const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    const user = useContext(CurrentUserContext)!;

    const { setCourseModeAsync } = useSetCourseMode();

    const setCourseMode = async (mode: CourseModeType) => {

        try {

            const payload = { courseId, mode };
            await setCourseModeAsync(payload);
            await refetchPlayerData();
        }
        catch (e: any) {

            showErrorDialog(translatableTexts.player.courseItemSelector.switchingCourseModeFailed);
        }
    }

    const dialogLogic = useEpistoDialogLogic({
        defaultCloseButtonType: "top"
    });

    const changeToAdvancedModePermanently = () => {

        dialogLogic
            .openDialog({
                buttons: [
                    {
                        action: () => setCourseMode("advanced"),
                        title: "Go ahead",
                    }
                ]
            });
    }

    const tempomatDialogLogic = useEpistoDialogLogic({
        title: "A tanfolyam tempójának beállítása",
        defaultCloseButtonType: "top"
    });

    const openDialog = () => tempomatDialogLogic.openDialog();



    const canChangeCourseMode = user.userActivity.canChangeCourseMode;

    const TempomatModeTile = (props: {
        thumbnailImage: string,
        title: string,
        description: string,
        isSelected?: boolean
    }) => {

        return <Flex
            flex="1"
            direction="column"
            p="10px"
            mx="10px"
            maxW="220px"
            align="center">

            <Image
                background={props.isSelected ? "#97c9cc50" : "#efefef"}
                border="none"
                className="roundBorders"
                cursor="pointer"
                transition=".2s ease-in-out"
                boxShadow="-6px -6px 14px rgba(255, 255, 255, .7), -6px -6px 10px rgba(255, 255, 255, .5), 6px 6px 8px rgba(255, 255, 255, .075), 6px 6px 10px rgba(0, 0, 0, .15)"
                _hover={{
                    boxShadow: "-2px -2px 6px rgba(255, 255, 255, .6), -2px -2px 4px rgba(255, 255, 255, .4), 2px 2px 2px rgba(255, 255, 255, .05), 2px 2px 4px rgba(0, 0, 0, .1)"
                }}
                _active={{
                    boxShadow: "inset -2px -2px 6px rgba(255, 255, 255, .7), inset -2px -2px 4px rgba(255, 255, 255, .5), inset 2px 2px 2px rgba(255, 255, 255, .075), inset 2px 2px 4px rgba(0, 0, 0, .15)"
                }}
                p="10px"
                objectFit="contain"
                src={props.thumbnailImage}
                alt=""
                w="140px"
                h="80px"
            />

            <EpistoFont
                fontSize="fontSmall"
                style={{
                    margin: "15px 0 0 0",
                    width: "100%",
                    textAlign: "center",
                    fontWeight: 600
                }}>

                {props.title}
            </EpistoFont>

            <EpistoFont
                fontSize="fontSmall"
                style={{
                    textAlign: "justify",
                    margin: "5px 0 0 0",
                }}>

                {props.description}
            </EpistoFont>
        </Flex >
    }

    return <>

        {/* warning dialog */}
        <EpistoDialog logic={dialogLogic}>
            Point of no return
        </EpistoDialog>

        {/* Tempomat */}

        <Flex
            align="center"
            p="20px"
            h="100px">

            <Flex
                flex="3"
                direction="column"
                h="100%">

                {/* Current speed title and info */}
                <Flex
                    align="center">

                    <EpistoFont fontSize="fontSmall">

                        A tanfolyam tempója
                    </EpistoFont>

                    <InfoOutlined
                        style={{
                            height: "15px"
                        }} />
                </Flex>

                {/* Tempomat info dialog */}
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


                {/* Current speed and settings button */}
                <Flex
                    align="center"
                    flex="1">

                    <img
                        src={getAssetUrl("/images/balancedmode.png")}
                        alt=""
                        style={{
                            height: "25px",
                            width: "25px",
                            marginRight: 5
                        }} />

                    <EpistoFont
                        fontSize="fontSmall"
                        style={{
                            margin: "0 5px",
                            fontWeight: 600
                        }}>

                        Kiegyensúlyozott
                    </EpistoFont>

                    <img
                        onClick={() => openDialog()}
                        src={getAssetUrl("/images/tempomatsettings.png")}
                        alt=""
                        style={{
                            height: "20px",
                            width: "20px",
                            marginRight: 5
                        }} />
                </Flex>
            </Flex>

            <Divider
                w="1px"
                h="calc(100% - 20px)"
                orientation="vertical"
                background="grey" />

            {/* Daily recommended video count */}
            <Flex
                flex="2"
                direction="column">

                <Flex
                    h="30px"
                    align="center"
                    p="5px 15px">

                    <EpistoFont fontSize="fontSmall">

                        Napi ajánlott videók
                    </EpistoFont>
                </Flex>
                <Flex
                    align="center"
                    p="5px 15px">

                    <img
                        src={getAssetUrl("/images/videos3D.png")}
                        alt=""
                        style={{
                            height: "25px",
                            width: "25px",
                            marginRight: 5
                        }} />

                    <Flex h="100%" align="flex-end">

                        <EpistoFont
                            fontSize={"fontLargePlus"}
                            style={{
                                fontWeight: 500,
                                marginRight: 2
                            }}>

                            8/13
                        </EpistoFont>

                        <EpistoFont
                            fontSize="fontSmall"
                            style={{
                                marginBottom: 2
                            }}>

                            videó
                        </EpistoFont>
                    </Flex>
                </Flex>

                <Flex w="100%" px="15px">

                    <LinearProgress
                        value={60}
                        variant="determinate"
                        style={{
                            width: "100%",
                            height: "5px"
                        }} />
                </Flex>
            </Flex>
        </Flex >

        {/* option to enable advanced mode
        IF STARTED COURSE  IN BEGINNER MODE */}
        {
            (mode === "beginner" && !canChangeCourseMode) && <>
                <EpistoButton
                    style={{
                        margin: "30px"
                    }}
                    variant="colored"
                    onClick={changeToAdvancedModePermanently}>

                    Change to advanced mode
                </EpistoButton>
            </>
        }

        {/* learning type selector FOR ADMINS ONLY */}
        {
            canChangeCourseMode && <RadioGroup
                value={mode}
                style={{
                    position: "relative"
                }}>

                <Flex height="100px" padding="20px" justify="center">

                    <EpistoButton
                        variant="outlined"
                        onClick={() => setCourseMode("beginner")}
                        style={{
                            margin: "5px",
                            padding: "0 0 0 10px",
                            border: mode === "beginner" ? "2px solid var(--epistoTeal)" : undefined
                        }}>

                        <EpistoFont
                            isUppercase
                            fontSize="fontSmallPlus">

                            {translatableTexts.player.courseItemSelector.beginner}
                        </EpistoFont>

                        <Radio size="small" value="beginner" />
                    </EpistoButton>

                    <EpistoButton
                        variant="outlined"
                        onClick={() => setCourseMode("advanced")}
                        style={{
                            margin: "5px",
                            padding: "0 0 0 10px",
                            border: mode === "advanced" ?
                                "2px solid var(--epistoTeal)" :
                                undefined
                        }}>

                        <EpistoFont
                            isUppercase
                            fontSize="fontSmallPlus">

                            {translatableTexts.player.courseItemSelector.advanced}
                        </EpistoFont>

                        <Radio size="small" value="advanced" />
                    </EpistoButton>
                </Flex>

                <EpistoButton
                    ref={ref}
                    style={{
                        padding: "0",
                        alignSelf: "flex-start",
                        color: "var(--epistoTeal)",
                        position: "absolute",
                        right: 10,
                        top: 10
                    }}
                    icon={<HelpOutlineIcon />}
                    onClick={() => setIsInfoDialogOpen(true)} />
            </RadioGroup>
        }

        <EpistoPopper
            isOpen={isInfoDialogOpen}
            target={ref?.current}
            style={{
                width: 400
            }}
            placementX="left"
            handleClose={() => setIsInfoDialogOpen(false)}>

            <EpistoFont>
                {translatableTexts.player.courseItemSelector.courseModeSwitchDescription}
            </EpistoFont>
        </EpistoPopper>

        <CourseItemList modules={modules}></CourseItemList>
    </>
}
