import { Button, ButtonProps } from '@mui/material';
import { CSSProperties, forwardRef, ReactNode } from 'react';
import { useCSSOptionClasses } from '../../static/frontendHelpers';
import { CSSOptionsType } from '../../styles/globalCssTypes';
import { CompanyPublicDTO } from '@episto/communication';

export type EpistoButtonPropsType = {
    children?: string | ReactNode,
    companyDetails?: CompanyPublicDTO,
    onClick?: () => void,
    onClickNoPropagation?: () => void,
    size?: string,
    isRound?: boolean,
    padding?: string,
    fontSize?: string,
    variant?: 'outlined' | 'plain' | 'colored' | 'light' | 'highlight' | 'action',
    sx?: {
        [key: string]: CSSProperties
    },

    dataTestid?: string,

    /**
     * @deprecated use globalCssTypes
     */
    style?: CSSProperties,
    className?: string,
    icon?: ReactNode,
    isDisabled?: boolean,
    buttonProps?: ButtonProps,
    name?: string
    type?: 'button' | 'submit' | 'reset' | undefined,
    tooltip?: string
} & CSSOptionsType;

export const EpistoButton = forwardRef<HTMLButtonElement, EpistoButtonPropsType>(({
    children,
    companyDetails,
    onClick,
    isRound,
    size,
    padding,
    fontSize,
    variant,
    style,
    className,
    icon,
    isDisabled,
    dataTestid,
    name,
    type,
    sx,
    onClickNoPropagation,
    tooltip,
    buttonProps: btp,
    ...cssOptions
}: EpistoButtonPropsType, ref) => {

    const { cssOptionClasses } = useCSSOptionClasses(cssOptions);

    const { variant: _, ...buttonProps } = btp ?? { variant: null };

    const getVariant = () => {

        if (variant === 'colored')
            return 'contained';

        if (variant === 'light')
            return 'contained';

        if (variant === 'outlined')
            return 'outlined';

        return 'text';
    };

    return <Button
        id={EpistoButton.name}
        data-test-id={dataTestid}
        title={tooltip}
        onClick={(e) => {

            if (onClick)
                onClick();

            if (onClickNoPropagation) {

                e.stopPropagation();
                onClickNoPropagation();
            }
        }}
        name={name}
        variant={getVariant()}
        color="primary"
        ref={ref}
        disabled={isDisabled}
        className={`${className} ${cssOptionClasses} ${variant === 'colored' && 'mildShadow'}`}
        type={type}
        sx={sx}
        style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            fontWeight: (() => {

                if (variant === 'action')
                    return 'bold';

                return 'normal';

            })(),
            minWidth: '0px',
            background: (() => {

                if (companyDetails?.primaryColor)
                    return companyDetails.primaryColor;

                if (variant === 'light')
                    return 'white';

                if (variant === 'action' || variant === 'highlight')
                    return 'var(--eduptiveYellowGreen)';

                return undefined;

            })(),
            color: (() => {

                if (isDisabled)
                    return 'white';

                if (variant === 'action' || variant === 'highlight')
                    return 'var(--eduptiveDeepDarkGreen)';

                return 'var(--eduptiveDeepDarkGreen)';

            })(),
            // background: isDisabled && variant === "colored" ? "var(--mildGrey)" : undefined,
            margin: '0px',
            borderRadius: isRound ? '50%' : '7px',
            width: size,
            filter: isDisabled ? 'contrast(0.01)' : undefined,
            height: size,
            padding: padding ? padding : undefined,
            fontSize: fontSize ? fontSize : undefined,
            borderColor: 'var(--mildGrey)',
            pointerEvents: tooltip
                ? 'all'
                : isDisabled
                    ? 'none'
                    : undefined,
            ...style
        }}
        {...buttonProps}>

        {icon && <div
            style={{
                marginRight: '5px',
                display: 'flex',
                alignItems: 'center'
            }}>
            {icon}
        </div>}

        {children}
    </Button>;
});
