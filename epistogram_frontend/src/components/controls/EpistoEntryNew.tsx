import { InputAdornment, TextField } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import { EpistoFlex2 } from './EpistoFlex';
import { EpistoFont } from './EpistoFont';

// state

export const useEpistoEntryState = (options?: {
    isMandatory?: boolean,
    validateFunction?: (value: string) => string | null
}) => {

    // state 

    const [value, setValue] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [initialState, setInitialState] = useState(true);

    // funcs 

    const validate = () => {

        const error = ((): string | null => {

            // is mandatory validation 
            if (options?.isMandatory && !value)
                return 'Ez a mező nem lehet üres!';

            // external validation
            if (options?.validateFunction) {

                const extError = options?.validateFunction(value);
                if (extError)
                    return extError;
            }

            // no error 
            return null;
        })();

        setError(error);

        return !error;
    };

    const setValue2 = (value: string) => {

        setValue(value);

        if (initialState)
            setInitialState(false);
    };

    // effects 

    useEffect(() => {

        if (initialState)
            return;

        validate();
    }, [value]);

    return {
        value,
        error,
        validate,
        setValue: setValue2,
        setError
    };
};

export type EpistoEntryStateType = ReturnType<typeof useEpistoEntryState>;

// component 

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
        error,
        setValue,
        value
    } = state;

    return <EpistoFlex2 direction="column"
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
                    background: 'var(--transparentWhite90)'
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
