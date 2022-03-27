import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/react";
import { AccessTime, ThumbUpAlt, ThumbUpSharp, Timer } from "@mui/icons-material";
import { Avatar, Checkbox, Divider, Grid, Paper } from "@mui/material";
import React from 'react';
import { getAssetUrl } from "../../../static/frontendHelpers";
import { EpistoButton } from "../../controls/EpistoButton";
import { EpistoEntry } from "../../controls/EpistoEntry";
import { EpistoFont } from "../../controls/EpistoFont";

const Comments = () => {
    return (
        <Flex direction={"column"} minH={600} pb="100px">
            <Flex direction="column">
                <Flex p="10px" align="center">
                    <Flex mr="10px">
                        <Avatar alt="Remy Sharp" src={getAssetUrl("userAvatars/user_avatar_2.png")} />
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

                    <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                    <p style={{ textAlign: "left" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                        luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                        Suspendisse congue vulputate lobortis. Pellentesque at interdum
                        tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                        sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
                        metus, efficitur lobortis nisi quis, molestie porttitor metus.
                        Pellentesque et neque risus. Aliquam vulputate, mauris vitae
                        tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                        lectus vitae ex.{" "}
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
                    <Avatar alt="Remy Sharp" src={getAssetUrl("userAvatars/user_avatar_3.png")} />
                </Flex>
                <Flex direction="column">
                    <Flex justify="space-between" align="center">

                        <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                        luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                        Suspendisse congue vulputate lobortis. Pellentesque at interdum
                        tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                        sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
                        metus, efficitur lobortis nisi quis, molestie porttitor metus.
                        Pellentesque et neque risus. Aliquam vulputate, mauris vitae
                        tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                        lectus vitae ex.{" "}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        posted 1 minute ago
                    </p>
                </Flex>
            </Flex>

            <Flex pl="20px" mt="30px">
                <Divider variant="fullWidth" orientation="vertical" />
                <Flex p="20px">
                    <Avatar alt="Remy Sharp" src={getAssetUrl("userAvatars/user_avatar_3.png")} />
                </Flex>
                <Flex direction="column">
                    <Flex justify="space-between" align="center">

                        <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                        luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                        Suspendisse congue vulputate lobortis. Pellentesque at interdum
                        tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                        sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
                        metus, efficitur lobortis nisi quis, molestie porttitor metus.
                        Pellentesque et neque risus. Aliquam vulputate, mauris vitae
                        tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                        lectus vitae ex.{" "}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        posted 1 minute ago
                    </p>
                </Flex>
            </Flex>
            <Flex pl="20px" mt="30px">
                <Divider variant="fullWidth" orientation="vertical" />
                <Flex p="20px">
                    <Avatar alt="Remy Sharp" src={getAssetUrl("userAvatars/user_avatar_3.png")} />
                </Flex>
                <Flex direction="column">
                    <Flex justify="space-between" align="center">

                        <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                        luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                        Suspendisse congue vulputate lobortis. Pellentesque at interdum
                        tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                        sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
                        metus, efficitur lobortis nisi quis, molestie porttitor metus.
                        Pellentesque et neque risus. Aliquam vulputate, mauris vitae
                        tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                        lectus vitae ex.{" "}
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

                        <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                        luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                        Suspendisse congue vulputate lobortis. Pellentesque at interdum
                        tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                        sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
                        metus, efficitur lobortis nisi quis, molestie porttitor metus.
                        Pellentesque et neque risus. Aliquam vulputate, mauris vitae
                        tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                        lectus vitae ex.{" "}
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
