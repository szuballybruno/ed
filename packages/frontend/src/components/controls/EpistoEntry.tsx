import { InputAdornment, TextField } from '@mui/material';
import { Ref, useEffect, useState } from 'react';
import { ClassBuilder } from '../../helpers/classBuilder';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFlex2 } from './EpistoFlex';
import { EpistoFont } from './EpistoFont';

export type EpistoEntryPropsType<TValue extends number | string | null> = {
    value?: TValue,
    label?: string,
    setValue?: (value: TValue) => void,
    onFocusLost?: (value: TValue, event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    disabled?: boolean,
    isMultiline?: boolean,
    postfix?: string,
    placeholder?: string,
    labelVariant?: 'top' | 'normal' | 'hidden',
    height?: string,
    name?: string,
    marginTop?: string,
    flex?: string,
    type?: 'password' | 'number' | 'text',
    style?: React.CSSProperties,
    errorText?: string | null,
    setError?: (errorText: string | null) => void,
    isMandatory?: boolean,
    transparentBackground?: boolean,
    onInput?: () => void
}

export const EpistoEntry = <TValue extends number | string | null,>(props: EpistoEntryPropsType<TValue> & { inputRef?: Ref<HTMLInputElement> }) => {

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
        isMandatory,
        transparentBackground,
        inputRef: ref,
        onInput
    } = props;

    const [currentValue, setCurrentValue] = useState<TValue>(value ? value as any : '');

    // set value 
    const onChanged = (value: TValue) => {

        setCurrentValue(value);

        if (!setValue)
            return;

        setValue(value);
    };

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

    // set current value to input value 
    useEffect(() => {

        if (value === currentValue)
            return;

        if (value === undefined)
            return;

        setCurrentValue(value);
    }, [value]);

    const handleNewValue = (newVal: string): any => {

        if (type === 'number')
            return parseInt(newVal);

        return newVal;
    };

    return <EpistoFlex2
        direction="column"
        mt={marginTop ?? '10px'}
        flex={flex}
        style={style}
        justify="center">

        {labelVariant === 'top' && <EpistoFont
            isUppercase
            fontSize="fontExtraSmall"
            style={{
                margin: '5px 0',
                letterSpacing: '1.2px'
            }}>

            {label}
        </EpistoFont>
        }

        <TextField
            className={new ClassBuilder()
                .if(!transparentBackground, 'mildShadow')
                .custom('roundBorders')
                .custom('fontNormal14')
                .build()}
            inputRef={ref}
            onInput={onInput}
            disabled={disabled}
            size="small"
            label={labelVariant === 'normal' ? label : undefined}
            placeholder={placeholder}
            name={name}
            value={currentValue + ''}
            error={!!errorText}
            helperText={errorText}
            multiline={isMultiline}
            type={type}
            sx={{
                '& .MuiOutlinedInput-root': {
                    minHeight: (() => {

                        if (height)
                            return height;

                        if (isMultiline)
                            return undefined;

                        return 40;
                    })(),
                    alignItems: isMultiline ? 'flex-start' : undefined,
                    background: transparentBackground
                        ? undefined
                        : 'var(--transparentWhite90)'
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                }
            }}
            InputProps={{
                endAdornment: postfix
                    ? (
                        <InputAdornment
                            position="end">
                            {postfix}
                        </InputAdornment>
                    )
                    : undefined,
                style: {
                    fontSize: '14px',
                    padding: isMultiline ? '10px 15px' : '0 15px',
                },
                sx: {
                    '& .MuiInputBase-input': {
                        padding: 0
                    }
                }
            }}
            onBlur={onFocusLost ? (x) => onFocusLost(handleNewValue(x.currentTarget.value), x) : undefined}
            onChange={x => onChanged(handleNewValue(x.currentTarget.value))} />
    </EpistoFlex2 >;
};
