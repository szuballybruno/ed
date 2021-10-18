import { Input, InputProps } from "@chakra-ui/input";
import React from "react";

export const EpistoSearch = (props: {} & InputProps) => {
    const { ...css } = props;

    return <Input
        outline="none"
        padding="10px"
        placeholder="Keresés..."
        border="1px solid var(--mildGrey)"
        borderRadius="5px"
        {...css}
    />
}
