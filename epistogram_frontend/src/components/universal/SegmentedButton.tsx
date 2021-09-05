import { Typography } from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import { PagingType } from "../../frontendHelpers";

export const SegmentedButton = (props: { paging: PagingType<string> }) => {

    const { paging } = props;

    return <>
        <ToggleButtonGroup >
            {paging
                .items
                .map((buttonText, index) => {

                    const isActive = index == paging.currentIndex;

                    return (
                        <ToggleButton
                            selected={isActive}
                            key={index}
                            value={index}
                            onClick={() => paging.setItem(index)}>
                            <Typography>{buttonText}</Typography>
                        </ToggleButton>
                    )
                })}
        </ToggleButtonGroup>
    </>
}