import { FlexFloat } from "./FlexFloat"
import { Input } from "@chakra-ui/input";
import SearchIcon from '@mui/icons-material/Search';
import { FlexProps } from "@chakra-ui/layout";

export const FloatSearch = (props: {} & FlexProps) => {

    const { ...css } = props;

    return <FlexFloat
        id="floatSearchRoot"
        height="40px"
        borderRadius="20px"
        background="white"
        overflow="hidden"
        align="center"
        {...css}>

        <SearchIcon style={{ width: "40px", color: "var(--epistoTeal)" }}></SearchIcon>

        <Input
            outline="none"
            className="whall"
            placeholder="Seatch..." />
    </FlexFloat>
}