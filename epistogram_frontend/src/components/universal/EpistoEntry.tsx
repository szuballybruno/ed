import { TextField } from "@mui/material";

export const EpistoEntry = (props: {
    label: string,
    value: string,
    setValue?: (value: string) => void,
    disabled?: boolean,
    isMultiline?: boolean,
}) => {

    const { label, disabled, value, setValue, isMultiline } = props;

    return <TextField
        disabled={disabled}
        size="small"
        label={label}
        value={value}
        multiline={isMultiline}
        onChange={x => {

            if (!setValue)
                return;

            setValue(x.currentTarget.value);
        }}
        style={{
            margin: "10px 0px 10px 0px",
            padding: "2px"
        }} />
}