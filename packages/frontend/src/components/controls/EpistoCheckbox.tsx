import { Checkbox } from '@mui/material';

export const EpistoCheckbox = ({
    value,
    setValue,
    disabled,
    noBackground
}: {
    value: boolean,
    setValue?: (value: boolean) => void,
    disabled?: boolean,
    noBackground?: boolean
}) => {

    return (
        <Checkbox
            disabled={disabled}
            className="square40"
            checked={value}
            style={{
                background: noBackground ? undefined : 'white'
            }}
            onClick={() => { if (setValue) setValue(!value); }} />
    );
};