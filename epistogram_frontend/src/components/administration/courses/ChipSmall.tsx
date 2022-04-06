import classes from './css/ChipSmall.module.css';

export const ChipSmall = (props: {
    text: string,
    tooltip?: string,
    color?: string,
}) => {

    const { text, color, tooltip } = props;

    return (
        <p
            className={`roundBorders fontSmall ${classes.pElement}`}
            title={tooltip}
            style={{
                color,
                height: '22px',
                lineHeight: 0,
                display: 'flex',
                alignItems: 'center'
            }}>

            {text}
        </p>
    );
};