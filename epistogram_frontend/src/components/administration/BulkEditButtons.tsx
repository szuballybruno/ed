import { Button } from "@mui/material";
import IntersectionObserverWrap from "../IntersectionObserverWrapper"

export type BulkEditButtonType = { name: string, text: string, onClick: () => void };

export const BulkEditButtons = (props: { buttons: BulkEditButtonType[] }) => {

    const { buttons } = props;

    return <IntersectionObserverWrap
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-start"}>

        {buttons
            .map(x => <Button
                size={"small"}
                name={x.name}
                key={x.name}
                style={{
                    marginRight: "20px",
                    minWidth: "fit-content",
                    borderRadius: 7,
                    borderColor: "var(--mildGrey)",
                    color: "black"
                }}
                onClick={x.onClick}
                variant={"outlined"}>
                {x.text}
            </Button>)}

    </IntersectionObserverWrap>
}