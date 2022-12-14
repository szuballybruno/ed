import { Switch } from '@mui/material';
import { EpistoFlex2 } from './EpistoFlex';
import { EpistoFont } from './EpistoFont';

export const EpistoSwitch = ({
    checked,
    setChecked,
    label
}: {
    checked: boolean,
    setChecked: (checked: boolean) => void,
    label?: string
}) => {

    return (
        <EpistoFlex2
            align="center"
            mx="5px"
            pr="15px"
            borderRadius="30px">
            
            <Switch
                checked={checked}
                onChange={(e) => {

                    setChecked(e.currentTarget.checked);
                }} />

            {label && <EpistoFont>
                {label}
            </EpistoFont>}
        </EpistoFlex2>
    );
};