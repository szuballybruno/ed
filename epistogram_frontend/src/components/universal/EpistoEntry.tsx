import { Flex } from "@chakra-ui/layout";
import { InputAdornment, TextField, Typography } from "@mui/material";
import { forwardRef } from "react";

export type EpistoEntryPropsType = {
    value?: string,
    label?: string,
    setValue?: (value: string) => void,
    onFocusLost?: (value: string) => void,
    disabled?: boolean,
    isMultiline?: boolean,
    postfix?: string,
    placeholder?: string,
    labelVariant?: "top" | "normal",
    height?: string,
    name?: string,
    marginTop?: string,
    flex?: string,
    type?: "password" | "number" | "text"
}

export const EpistoEntry = forwardRef<HTMLInputElement, EpistoEntryPropsType>((props: EpistoEntryPropsType, ref) => {

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
        type,
        marginTop,
        flex
    } = props;

    const onChanged = (value: string) => {

        if (!setValue)
            return;

        setValue(value);
    }

    return <Flex direction="column" mt={marginTop ?? "10px"} flex={flex}>

        {labelVariant === "top" && <Typography
            variant={"overline"}>

            {label}
        </Typography>}

        <TextField
            inputRef={ref}
            disabled={disabled}
            size="small"
            label={labelVariant !== "top" ? label : undefined}
            placeholder={placeholder}
            name={name}
            value={value}
            multiline={isMultiline}
            type={type}
            sx={{
                '& .MuiOutlinedInput-root': {
                    height: height,
                    background: "var(--transparentWhite90)"
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    border: "none"
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
                border: "none"
                // margin: "10px 0px 10px 0px",
                // padding: "2px"
            }} />
    </Flex>
});
