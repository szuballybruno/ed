import classes from './css/ChipSmall.module.css';

export const ChipSmall = (props: {
    text: string,
    tooltip?: string,
    color?: string,
}) => {

    const { text, color, tooltip } = props;

    return (
        <p
            className={`roundBorders ${classes.pElement}`}
            title={tooltip}
            style={{
                color
            }}>

            {text}
        </p>
    );
};