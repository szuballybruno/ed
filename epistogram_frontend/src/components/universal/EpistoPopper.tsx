import { Popover } from "@mui/material";
import { ReactNode } from "react";
import { FlexFloat } from "./FlexFloat";

export const EpistoPopper = (props: {
    isOpen: boolean,
    target: any,
    placementX?: "left" | "center" | "right",
    handleClose: () => void,
    children?: ReactNode
}) => {

    const { target, children, isOpen, placementX, handleClose } = props;

    return <Popover
        open={isOpen && !!target}
        anchorEl={target}
        onClose={handleClose}
        // BackdropComponent={() => <Box></Box>}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: placementX ?? "center",
        }}
        elevation={0}
        className="normalizeChild">

        <FlexFloat borderRadius="10px" direction="column" p="20px">
            {children}
        </FlexFloat>
    </Popover>
}

{/* <Popper
        open={!!target}
        placement={`bottom${placementXSlug}` as any}
        anchorEl={target}
        disablePortal={true}
        modifiers={[
            {
                name: 'flip',
                enabled: true,
                options: {
                    altBoundary: false,
                    rootBoundary: 'document',
                    padding: 8,
                },
            },
            {
                name: 'preventOverflow',
                enabled: false,
                options: {
                    altAxis: false,
                    altBoundary: true,
                    tether: true,
                    rootBoundary: 'document',
                    padding: 8,
                },
            }
        ]}></Popper> */}