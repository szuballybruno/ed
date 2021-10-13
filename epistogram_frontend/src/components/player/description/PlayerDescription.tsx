import { Typography } from "@mui/material";
import React from 'react';
import classes from './playerDescription.module.scss';
import {Flex} from "@chakra-ui/react";

const PlayerDescription = (props: { description: string }) => {

    // const breakText = (inputText: string) => {
    //     try {
    //         const text = inputText.split("<br />");
    //         return text.map((textike: string, index: number) => {
    //             return <p key={index}>{text[index]}<br /></p>;
    //         });
    //     } catch {
    //         return "";
    //     }
    // };

    return (
        <Flex w={"100%"} minH={600} p={20}>
                    {/* <Typography>{breakText(props.description)}</Typography> */}
            {props.description}
        </Flex>
    )
};

export default PlayerDescription
