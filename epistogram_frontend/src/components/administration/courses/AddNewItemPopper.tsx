import { CourseItemType } from "../../../shared/types/sharedTypes";
import { EpistoButton } from "../../controls/EpistoButton"
import { EpistoPopper } from "../../controls/EpistoPopper"

export const AddNewItemPopper = (props: {
    isOpen: boolean,
    ref: any,
    onClose: () => void,
    onAddItem: (type: CourseItemType) => void
}) => {

    const { isOpen, ref, onClose, onAddItem } = props;

    return (
        <EpistoPopper
            isOpen={isOpen}
            target={ref}
            placementX="left"
            style={{
                width: 200,
                alignItems: "flex-start"
            }}
            handleClose={onClose}>

            <EpistoButton>
                Modul
            </EpistoButton>

            <EpistoButton onClick={() => onAddItem("video")}>
                Videó
            </EpistoButton>

            <EpistoButton onClick={() => onAddItem("exam")}>
                Vizsga
            </EpistoButton>

        </EpistoPopper>
    )
}