import { Checkbox } from '@mui/material';

export const EpistoCheckbox = (props: {
    value: boolean,
    setValue?: (value: boolean) => void,
    disabled?: boolean
}) => {

    const { value, setValue, disabled } = props;

    return (
        <Checkbox
            disabled={disabled}
            className="square40"
            checked={value}
            style={{
                background: 'white'
            }}
            onClick={() => { if (setValue) setValue(!value); }} />
    );
};