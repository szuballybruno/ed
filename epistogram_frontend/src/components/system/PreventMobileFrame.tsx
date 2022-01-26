import { Flex, useMediaQuery } from "@chakra-ui/react";
import { isLocalhost } from "../../static/Environemnt";
import { getAssetUrl } from "../../static/frontendHelpers";
import { translatableTexts } from "../../static/translatableTexts";
import { EpistoFont } from "../controls/EpistoFont";

const MobileBlock = () => {

    return <Flex
        background="var(--gradientBlueBackground)"
        align="center"
        justify="center"
        zIndex="100000"
        height="100vh"
        width="100vw">

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
            <EpistoFont
                fontSize="fontSmall"
                style={{
                    width: "100%",
                    padding: "5px 0"
                }}>

                {translatableTexts.preventMobileFrame.descriptions[0]}
            </EpistoFont>

            <EpistoFont
                fontSize="fontSmall"
                style={{
                    width: "100%",
                    padding: "5px 0"
                }}>

                {translatableTexts.preventMobileFrame.descriptions[1]}
            </EpistoFont>

            <EpistoFont
                fontSize="fontSmall"
                style={{
                    width: "100%",
                    padding: "5px 0"
                }}>

                {translatableTexts.preventMobileFrame.descriptions[2]}
            </EpistoFont>

            {/* signup for news 
        <EpistoEntry
            label="E-mail"
            labelVariant="top"
            style={{
                width: "100%"
            }} />

        <Flex my="10">

            <Checkbox />

            <EpistoFont
                fontSize="fontSmall"
                style={{
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
            </EpistoFont>
        </Flex>

        <EpistoButton
            variant="colored"
            style={{
                width: "100%"
            }}>

            Küldés
        </EpistoButton>*/}
        </Flex>
    </Flex>
}

export const PreventMobileFrame = (props) => {

    const [isNarrowerThan1024] = useMediaQuery('(max-width: 1124px)');
    const [isLowerThan600] = useMediaQuery('(max-height: 600px)')

    const isScreenTooSmall = isNarrowerThan1024 || isLowerThan600;
    const showMobileBlock = isScreenTooSmall && !isLocalhost;

    return <>

        {/* block */}
        {showMobileBlock && <MobileBlock></MobileBlock>}

        {/* application content */}
        {props.children}
    </>
}