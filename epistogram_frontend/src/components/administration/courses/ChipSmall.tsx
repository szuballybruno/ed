import { CSSProperties } from 'react';
import { ClassBuilder } from '../../../helpers/classBuilder';
import classes from './css/ChipSmall.module.css';

export const ChipSmall = (props: {
    text: string,
    tooltip?: string,
    color?: string,
    style?: CSSProperties,
    size?: 'small' | 'normal'
}) => {

    const {
        text,
        color,
        tooltip,
        style,
        size
    } = props;

    return (
        <p
            className={new ClassBuilder()
                .if(size === 'small', 'fontExtraSmall')
                .if(size !== 'small', 'fontSmall')
                .custom('roundBorders')
                .custom(classes.pElement)
                .build()}
            title={tooltip}
            style={{
                color,
                height: size === 'small' ? '18px' : '22px',
                lineHeight: 0,
                display: 'flex',
                alignItems: 'center',
                ...style
            }}>

            {text}
        </p>
    );
};