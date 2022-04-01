import { Checkbox } from "@mui/material";

export const EpistoCheckbox = (props: {
    value: boolean,
    setValue?: (value: boolean) => void
}) => {

    const { value, setValue } = props;

    return (
        <Checkbox
            className="square40"
            checked={value}
            style={{
                background: "white"
            }}
            onClick={() => { if (setValue) setValue(!value); }} />
    );
};