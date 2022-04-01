import { Flex } from "@chakra-ui/react";
import { AccessTime, ThumbUpAlt } from "@mui/icons-material";
import { Avatar, Checkbox, Divider } from "@mui/material";
import React from 'react';
import { getAssetUrl } from "../../../static/frontendHelpers";
import { EpistoButton } from "../../controls/EpistoButton";
import { EpistoFont } from "../../controls/EpistoFont";

const Comments = () => {
    return (
        <Flex direction={"column"} minH={600} pb="100px">
            <EpistoFont
                style={{
                    margin: "50px 0 10px 0",
                    fontWeight: "500"
                }}
                fontSize={"fontHuge"}>

                {"Kommentek & Kérdések"}
            </EpistoFont>
            <Flex direction="column">
                <Flex p="10px" align="center">
                    <Flex mr="10px">
                        <Avatar alt="Szubally Brúnó" src={getAssetUrl("userAvatars/user_avatar_7.png")} />
                    </Flex>
                    <Flex flex="1" direction="column">
                        <EpistoFont>
                            Szubally Brúnó
                        </EpistoFont>
                        <Flex align="center">
                            <AccessTime style={{
                                height: 20,
                                width: 20,
                                margin: "0 10px 0 0"
                            }} />
                            <EpistoFont fontSize="fontSmall">
                                2022. 03. 28. 10:05
                            </EpistoFont>
                        </Flex>
                    </Flex>
                    <Flex>
                        <EpistoButton variant="outlined">
                            Visszavonás
                        </EpistoButton>
                    </Flex>
                </Flex>
                <EpistoFont
                    className="roundBorders mildShadow"
                    style={{
                        background: "var(--transparentWhite90)",
                        padding: "20px"
                    }}>

                    <p style={{ textAlign: "left", color: "lightgray" }}>
                        Ide írd a kommentedet/kérdésedet{" "}
                    </p>
                </EpistoFont>
                <Flex justify="space-between" align="center" m="10px 0">
                    <Flex direction="column">
                        <Flex align="center">
                            <Checkbox />
                            <EpistoFont>
                                Ez egy kérdés
                            </EpistoFont>
                        </Flex>
                        <Flex align="center">
                            <Checkbox />
                            <EpistoFont>
                                Anoním közzététel
                            </EpistoFont>
                        </Flex>
                    </Flex>
                    <Flex>
                        <EpistoButton variant="colored">
                            Közzététel
                        </EpistoButton>
                    </Flex>
                </Flex>
            </Flex>
            <Divider variant="fullWidth" style={{ margin: "10px 0 20px 0" }} />
            <Flex>
                <Flex p="20px">
                    <Avatar alt="Surányi Ildikó" src={getAssetUrl("userAvatars/user_avatar_1.png")} />
                </Flex>
                <Flex direction="column">
                    <Flex justify="space-between" align="center">

                        <h4 style={{ margin: 0, textAlign: "left" }}>Surányi Ildikó</h4>
                        <EpistoButton className="fontSmall">
                            <ThumbUpAlt style={{
                                height: 20,
                                width: 20,
                                marginRight: 5
                            }} />
                            Tetszik
                        </EpistoButton>
                    </Flex>
                    <p style={{ textAlign: "left" }}>
                        Nagyon hasznos videó volt! Egy olyan kérdésem lenne, hogy nincs esetleg valamilyen billentyűkombináció arra, hogy gyorsan lehessen oszlopokat elrejteni?
                        {" "}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        posted 1 minute ago
                    </p>
                </Flex>
            </Flex>

            <Flex pl="20px" mt="30px">
                <Divider variant="fullWidth" orientation="vertical" />
                <Flex p="20px">
                    <Avatar alt="Keresztúri Melinda" src={getAssetUrl("userAvatars/user_avatar_7.png")} />
                </Flex>
                <Flex direction="column">
                    <Flex justify="space-between" align="center">

                        <h4 style={{ margin: 0, textAlign: "left" }}>Keresztúri Melinda</h4>
                        <EpistoButton className="fontSmall">
                            <ThumbUpAlt style={{
                                height: 20,
                                width: 20,
                                marginRight: 5
                            }} />
                            Tetszik
                        </EpistoButton>
                    </Flex>
                    <p style={{ textAlign: "left" }}>
                        Én erre a CTRL + 0-t szoktam használni!
                        {" "}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        posted 1 minute ago
                    </p>
                </Flex>
            </Flex>
            <Flex pl="20px" mt="30px">
                <Divider variant="fullWidth" orientation="vertical" />
                <Flex p="20px">
                    <Avatar alt="Remy Sharp" src={getAssetUrl("userAvatars/user_avatar_5.png")} />
                </Flex>
                <Flex direction="column">
                    <Flex justify="space-between" align="center">

                        <h4 style={{ margin: 0, textAlign: "left" }}>
                            Oláh Mihály
                        </h4>
                        <EpistoButton className="fontSmall">
                            <ThumbUpAlt style={{
                                height: 20,
                                width: 20,
                                marginRight: 5
                            }} />
                            Tetszik
                        </EpistoButton>
                    </Flex>
                    <p style={{ textAlign: "left" }}>
                        Pontosan, ahogyan Melinda írja, ha pedig sorokat szeretnél elrejteni, úgy a CTRL + 9 kombinációt ajánlom.
                        {" "}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        posted 1 minute ago
                    </p>
                </Flex>
            </Flex>

            <Flex mt="30px">
                <Flex p="20px">
                    <Avatar alt="Remy Sharp" src={getAssetUrl("userAvatars/user_avatar_3.png")} />
                </Flex>
                <Flex direction="column">
                    <Flex justify="space-between" align="center">

                        <h4 style={{ margin: 0, textAlign: "left" }}>Kiss Andrea</h4>
                        <EpistoButton className="fontSmall">
                            <ThumbUpAlt style={{
                                height: 20,
                                width: 20,
                                marginRight: 5
                            }} />
                            Tetszik
                        </EpistoButton>
                    </Flex>
                    <p style={{ textAlign: "left" }}>
                        Sziasztok! Én használtam a fenti kombinációkat, viszont véletlenül olyan oszlopokat is elrejtettem, amiket nem szerettem volna. Hogyan tudom gyorsan visszahozni őket?
                        A CTRL + Z parancsot próbáltam, viszont közben dolgoztam máson is, így azokat is vissza akarja vonni :(
                        {" "}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        posted 1 minute ago
                    </p>
                </Flex>
            </Flex>

            <Flex pl="20px" mt="30px">
                <Divider variant="fullWidth" orientation="vertical" />
                <Flex p="20px">
                    <Avatar alt="Remy Sharp" src={getAssetUrl("userAvatars/user_avatar_4.png")} />
                </Flex>
                <Flex direction="column">
                    <Flex justify="space-between" align="center">

                        <h4 style={{ margin: 0, textAlign: "left" }}>
                            Radeczky Richárd
                        </h4>
                        <EpistoButton className="fontSmall">
                            <ThumbUpAlt style={{
                                height: 20,
                                width: 20,
                                marginRight: 5
                            }} />
                            Tetszik
                        </EpistoButton>
                    </Flex>
                    <p style={{ textAlign: "left" }}>

                        Visszahozni (Felfedés) úgy tudod az oszlopokat, hogy egyben (Shift nyíl) kijelölsz az előtte és utána lévő oszlopban is legalább 1-1 cellát, majd megnyomod a Ctrl Shift 8 kombinációt. (Ez Windowson biztosan működik, Mac-en érdemes utána nézni a megfelelő kombinációnak, de ha erre rákeresel, már segíteni fog)
                        {" "}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        posted 1 minute ago
                    </p>
                </Flex>
            </Flex>
        </Flex>
    )
};

export default Comments;
