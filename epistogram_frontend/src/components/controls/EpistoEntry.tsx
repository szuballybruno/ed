import { Flex } from "@chakra-ui/layout";
import { InputAdornment, TextField, Typography } from "@mui/material";
import { forwardRef, useEffect } from "react";
import { translatableTexts } from "../../static/translatableTexts";
import { EpistoFont } from "./EpistoFont";

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
    type?: "password" | "number" | "text",
    style?: React.CSSProperties,
    errorText?: string | null,
    setError?: (errorText: string | null) => void,
    isMandatory?: boolean
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
        flex,
        style,
        errorText,
        setError,
        isMandatory
    } = props;

    // set value 
    const onChanged = (value: string) => {

        if (!setValue)
            return;

        setValue(value);
    }

    // set error
    useEffect(() => {

        if (!setError)
            return;

        const error = ((): string | null => {

            if (isMandatory && !value)
                return translatableTexts.misc.epistoEntry.shouldntBeEmpty;

            return null;
        })();

        setError(error);
    }, [value]);

    return <Flex direction="column" mt={marginTop ?? "10px"} flex={flex} style={style}>

        {labelVariant === "top" && <EpistoFont
            isUppercase
            fontSize="fontExtraSmall"
            style={{
                margin: "5px 0"
            }}>

            {label}
        </EpistoFont>}

        <TextField
            inputRef={ref}
            disabled={disabled}
            size="small"
            label={labelVariant !== "top" ? label : undefined}
            placeholder={placeholder}
            name={name}
            value={value}
            error={!!errorText}
            helperText={errorText}
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
