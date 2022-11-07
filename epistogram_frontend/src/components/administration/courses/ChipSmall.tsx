import { CSSProperties } from 'react';
import { ArrayBuilder } from '../../../static/frontendHelpers';
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
            className={new ArrayBuilder()
                .addIf(size === 'small', 'fontExtraSmall')
                .addIf(size !== 'small', 'fontSmall')
                .add('roundBorders')
                .add(classes.pElement)
                .getArray()
                .join(' ')}
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