import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';

export const EpistoDatePicker = ({
    value,
    setValue
}: {
    value: Date,
    setValue: (value: Date) => void
}) => {

    return (
        <DesktopDatePicker
            label='Date desktop'
            minDate={DateTime.now()}
            inputFormat='yyyy-MM-DD'
            disableMaskedInput
            value={value}
            onChange={(value: DateTime | null) => {

                if (!value)
                    return;

                const jsDate = value.toJSDate();
                setValue(jsDate);
            }}
            renderInput={(textFieldParams) => {

                const { inputProps, InputProps, inputRef } = textFieldParams;

                // if (inputProps && value)
                //     inputProps.value = params.value?.requiredCompletionDate ? params.value.requiredCompletionDate : 'Nincs határidő';

                return <TextField
                    inputProps={inputProps}
                    InputProps={InputProps}
                    inputRef={inputRef} />;
            }}
        />
    );
};