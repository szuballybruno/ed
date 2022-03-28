import { Typography } from "@mui/material";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { CSSProperties } from "react";
import { PagingType } from "../../static/frontendHelpers";
import { EpistoFont } from "./EpistoFont";

export const SegmentedButton = <T,>(props: {
    paging: PagingType<T>,
    getDisplayValue?: (item: T) => string,
    buttonStyle?: CSSProperties
}) => {

    const { paging, getDisplayValue, buttonStyle } = props;

    const disp = getDisplayValue ?? ((item: T) => item);

    return <>
        <ToggleButtonGroup style={{
            background: "var(--transparentWhite90)"
        }}>

            {paging
                .items
                .map((item, index) => {

                    const isActive = index === paging.currentIndex;

                    return (
                        <ToggleButton
                            selected={isActive}
                            style={{
                                border: "none",
                                padding: "15px 25px",
                                ...buttonStyle
                            }}
                            key={index}
                            value={index}
                            onClick={() => paging.setItem(index)}>

                            <EpistoFont fontSize="fontNormal14">
                                {disp(item)}
                            </EpistoFont>
                        </ToggleButton>
                    )
                })}
        </ToggleButtonGroup>
    </>
}