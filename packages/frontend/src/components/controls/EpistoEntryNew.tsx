import { InputAdornment, TextField } from '@mui/material';
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { EpistoFlex2 } from './EpistoFlex';
import { EpistoFont } from './EpistoFont';

export const useEpistoEntryState = (options?: {
    isMandatory?: boolean,
    validateFunction?: (value: string) => string | null
}) => {

    // state 
    const [value, setValue] = useState('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const { isMandatory, validateFunction } = options ?? {};

    // funcs 
    const validate = useCallback(() => {

        const error = ((): string | null => {

            // is mandatory validation 
            if (isMandatory && !value)
                return 'Ez a mező nem lehet üres!';

            // external validation
            if (validateFunction)
                return validateFunction(value);

            // no error 
            return null;
        })();

        setErrorMsg(error);

        return !error;
    }, [isMandatory, validateFunction, value]);

    // effects 
    useEffect(() => {

        validate();
    }, [value, validate]);

    return useMemo(() => ({
        value,
        errorMsg,
        validate,
        setValue,
        setErrorMsg
    }), [
        value,
        errorMsg,
        validate,
        setValue,
        setErrorMsg
    ]);
};

export type EpistoEntryStateType = ReturnType<typeof useEpistoEntryState>;

export type EpistoEntryNewPropsType = {
    state: EpistoEntryStateType,
    label?: string,
    onFocusLost?: (value: string) => void,
    disabled?: boolean,
    isMultiline?: boolean,
    postfix?: string,
    placeholder?: string,
    labelVariant?: 'top' | 'normal',
    height?: string,
    name?: string,
    marginTop?: string,
    flex?: string,
    type?: 'password' | 'number' | 'text',
    style?: React.CSSProperties
}

export const EpistoEntryNew = forwardRef<HTMLInputElement, EpistoEntryNewPropsType>((props: EpistoEntryNewPropsType, ref) => {

    const {
        label,
        height,
        labelVariant,
        placeholder,
        disabled,
        isMultiline,
        onFocusLost,
        name,
        postfix,
        type,
        marginTop,
        flex,
        style,
        state
    } = props;

    const {
        errorMsg: error,
        setValue,
        value
    } = state;

    return <EpistoFlex2
        direction="column"
        mt={marginTop ?? '10px'}
        flex={flex}
        style={style}>

        {labelVariant === 'top' && <EpistoFont
            isUppercase
            fontSize="fontExtraSmall"
            style={{
                margin: '5px 0'
            }}>

            {label}
        </EpistoFont>}

        <TextField
            inputRef={ref}
            disabled={disabled}
            size="small"
            label={labelVariant !== 'top' ? label : undefined}
            placeholder={placeholder}
            name={name}
            value={value}
            error={!!error}
            helperText={error}
            multiline={isMultiline}
            type={type}
            sx={{
                '& .MuiOutlinedInput-root': {
                    height: height,
                    background: 'var(--transparentWhite90)',
                    boxShadow: '0 0 4px #0000001f'
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
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

                setValue(x.currentTarget.value);
            }}
            style={{
                border: 'none'
                // margin: "10px 0px 10px 0px",
                // padding: "2px"
            }} />
    </EpistoFlex2>;
});
