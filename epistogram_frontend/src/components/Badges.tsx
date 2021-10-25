import React from 'react';
import { Flex } from "@chakra-ui/react";
import { getAssetUrl } from "../frontendHelpers";

export const Badges = () => {
    const badges = [
        getAssetUrl("/badges/001-badge.svg"),
        getAssetUrl("/badges/002-rating.svg"),
        getAssetUrl("/badges/003-flag.svg"),
        getAssetUrl("/badges/004-certificate.svg"),
        getAssetUrl("/badges/005-trophy.svg")
    ]
    return (
        <Flex direction={"row"}
            justifyContent={"flex-start"}
            padding={10}>
            {badges.map(badge => <Flex
                bgColor={"orange"}
                w={120}
                h={120}
                ml={10}
                justifyContent={"center"}
                alignItems={"center"}
                borderRadius={10}>
                <img style={{ width: 100 }} src={badge} alt={""} />
            </Flex>)}
        </Flex>
    );
};
