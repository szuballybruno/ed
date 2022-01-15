import { Flex, useMediaQuery } from "@chakra-ui/react";
import { Typography, Checkbox } from "@mui/material";
import { prototype } from "events";
import { getAssetUrl } from "../../static/frontendHelpers";
import { EpistoButton } from "../universal/EpistoButton";
import { EpistoEntry } from "../universal/EpistoEntry";

export const PreventMobileFrame = (props) => {

    const [isNarrowerThan1024] = useMediaQuery('(max-width: 1124px)');
    const [isLowerThan600] = useMediaQuery('(max-height: 600px)')

    const isMobile = () => (isNarrowerThan1024 || isLowerThan600)

    return <>
        {isMobile() && <Flex
            background="var(--gradientBlueBackground)"
            align="center"
            justify="center"
            zIndex="100000"
            h="100vh"
            w="100vw">

            <Flex
                className="roundBorders"
                background="var(--transparentWhite70)"
                direction="column"
                align="center"
                p="20px"
                maxW="400px">

                {/* epistogram logo */}
                <img
                    src={getAssetUrl("/images/logo.svg")}
                    style={{
                        width: "250px",
                        maxHeight: "50px",
                        objectFit: "contain",
                        cursor: "pointer",
                        marginBottom: "20px"
                    }}
                    alt="" />

                {/* descriptions */}
                <Typography
                    style={{
                        width: "100%",
                        padding: "5px 0",
                        fontSize: "13px"
                    }}>

                    Kedves Látogató!
                </Typography>

                <Typography
                    style={{
                        width: "100%",
                        padding: "5px 0",
                        fontSize: "13px"
                    }}>

                    Az optimális felhasználási élmény érdekében az EpistoGram webalkalmazása jelenleg csak asztali számítógépeken, notebookokon, vagy olyan táblagépeken fut el, melyek felbontása minimum 1280 x 720 pixeles.
                </Typography>

                <Typography
                    style={{
                        width: "100%",
                        padding: "5px 0",
                        fontSize: "13px"
                    }}>

                    Egyéb okoseszközökön hamarosan debütáló mobilalkalmazásunkon keresztül érheted majd el platformunkat.
                </Typography>

                {/* signup for news 
                <EpistoEntry
                    label="E-mail"
                    labelVariant="top"
                    style={{
                        width: "100%"
                    }} />

                <Flex my="10">

                    <Checkbox />

                    <Typography
                        style={{
                            fontSize: 13,
                            userSelect: "none"
                        }}>

                        {"Elfogadom az "}
                        <a
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "#0055CC" }}
                            href={"https://epistogram.com/adatkezelesi-tajekoztato"}>

                            Adatkezelési Nyilatkozat
                        </a>
                        {"ban foglaltakat"}
                    </Typography>
                </Flex>

                <EpistoButton
                    variant="colored"
                    style={{
                        width: "100%"
                    }}>

                    Küldés
                </EpistoButton>*/}
            </Flex>
        </Flex>}

        {props.children}
    </>

}