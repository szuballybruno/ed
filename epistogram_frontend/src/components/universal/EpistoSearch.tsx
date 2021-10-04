import { Input, InputProps } from "@chakra-ui/input";

export const EpistoSearch = (props: {} & InputProps) => {

    const { ...css } = props;

    return <Input
        outline="none"
        padding="10px"
        className="whall"
        placeholder="Seatch..."
        border="1px solid var(--mildGrey)"
        borderRadius="5px"
        {...css} />
}