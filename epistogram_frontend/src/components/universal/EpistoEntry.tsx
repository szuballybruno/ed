import { Flex } from "@chakra-ui/layout";
import { InputAdornment, TextField, Typography } from "@mui/material";

export const EpistoEntry = (props: {
    value: string,
    label?: string,
    setValue?: (value: string) => void,
    onFocusLost?: (value: string) => void,
    disabled?: boolean,
    isMultiline?: boolean,
    postfix?: string,
    isNumeric?: boolean,
    placeholder?: string,
    labelVariant?: "top" | "normal",
    height?: string,
    name?: string,
    marginTop?: string
}) => {

    const {
        label,
        height,
        labelVariant,
        placeholder,
        disabled,
        value,
        setValue,
        isMultiline,
        onFocusLost,
        name,
        postfix,
        isNumeric,
        marginTop
    } = props;

    const onChanged = (value: string) => {

        if (!setValue)
            return;

        setValue(value);
    }

    return <Flex direction="column" mt={marginTop ?? "10px"}>

        {labelVariant === "top" && <Typography
            variant={"overline"}>

            {label}
        </Typography>}

        <TextField
            disabled={disabled}
            size="small"
            label={labelVariant !== "top" ? label : undefined}
            placeholder={placeholder}
            name={name}
            value={value}
            multiline={isMultiline}
            type={isNumeric ? "number" : undefined}
            sx={{
                '& .MuiOutlinedInput-root': {
                    height: height
                }
            }}
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
                // margin: "10px 0px 10px 0px",
                // padding: "2px"
            }} />
    </Flex>
}