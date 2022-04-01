import { Input, InputProps } from "@chakra-ui/input";
import React from "react";

export const EpistoSearch = (props: {} & InputProps) => {
    const { ...css } = props;

    return <Input
        className="largeSoftShadow"
        outline="none"
        padding="10px"
        placeholder="Keresés..."
        borderRadius="5px"
        background="var(--transparentWhite70)"
        {...css}
    />;
};
