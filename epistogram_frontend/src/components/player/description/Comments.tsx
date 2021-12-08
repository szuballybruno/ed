import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/react";
import { Avatar, Divider, Grid, Paper } from "@mui/material";
import React from 'react';
import { getAssetUrl } from "../../../static/frontendHelpers";
import { EpistoButton } from "../../universal/EpistoButton";

const Comments = () => {
    return (
        <Flex direction={"column"} minH={600}>
            <Flex w={"100%"} h={40} mt={5}>
                <Input
                    w={"100%"}

                    outline="none"
                    padding="10px"
                    placeholder="Hozzászólás írása"
                    border="1px solid var(--mildGrey)"
                    borderRadius="5px" />
                <EpistoButton style={{ marginLeft: 10 }} variant={"outlined"}>
                    Küldés
                </EpistoButton>
            </Flex>
            <Paper style={{ padding: "40px 20px" }}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar alt="Remy Sharp" src={getAssetUrl("userAvatars/user_avatar_2.png")} />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
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
                        <p style={{ textAlign: "left", color: "gray" }}>
                            posted 1 minute ago
                        </p>
                    </Grid>
                </Grid>
                <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar alt="Remy Sharp" src={getAssetUrl("userAvatars/user_avatar_3.png")} />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
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
                        <p style={{ textAlign: "left", color: "gray" }}>
                            posted 1 minute ago
                        </p>
                    </Grid>
                </Grid>
            </Paper>
        </Flex>
    )
};

export default Comments;
