import { Typography } from "@mui/material";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { PagingType } from "../../static/frontendHelpers";

export const SegmentedButton = (props: { paging: PagingType<string> }) => {

    const { paging } = props;

    return <>
        <ToggleButtonGroup style={{background: "var(--transparentWhite90)"}}>

            {paging
                .items
                .map((buttonText, index) => {

                    const isActive = index === paging.currentIndex;

                    return (
                        <ToggleButton
                            selected={isActive}
                            style={{
                                border: "none",
                                padding: "15px 25px"
                            }}
                            key={index}
                            value={index}
                            onClick={() => paging.setItem(index)}>
                            <Typography className="fontMid">
                                {buttonText}
                            </Typography>
                        </ToggleButton>
                    )
                })}
        </ToggleButtonGroup>
    </>
}