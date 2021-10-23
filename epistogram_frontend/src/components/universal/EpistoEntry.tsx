import { InputAdornment, TextField } from "@mui/material";

export const EpistoEntry = (props: {
    value: string,
    label?: string,
    setValue?: (value: string) => void,
    onFocusLost?: (value: string) => void,
    disabled?: boolean,
    isMultiline?: boolean,
    postfix?: string,
    isNumeric?: boolean
}) => {

    const { label, disabled, value, setValue, isMultiline, onFocusLost, postfix, isNumeric } = props;

    const onChanged = (value: string) => {

        if (!setValue)
            return;

        setValue(value);
    }

    return <TextField
        disabled={disabled}
        size="small"
        label={label}
        value={value}
        multiline={isMultiline}
        type={isNumeric ? "number" : undefined}
        InputProps={postfix
            ? {
                endAdornment: <InputAdornment position="end">{postfix}</InputAdornment>
            }
            : undefined}
        onBlur={x => {

            if (onFocusLost)
                onFocusLost(x.currentTarget.value);
        }}
        onChange={x => {

            onChanged(x.currentTarget.value);
        }}
        style={{
            margin: "10px 0px 10px 0px",
            padding: "2px"
        }} />
}