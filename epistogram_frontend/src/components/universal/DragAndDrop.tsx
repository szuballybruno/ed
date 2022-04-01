import { Box, Flex } from "@chakra-ui/layout";
import { BoxProps } from "@chakra-ui/react";
import { CSSProperties } from "@emotion/serialize";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { ReactNode } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export const DropZone = (params: {
    zoneId: string,
    groupId: string
} & BoxProps) => {

    const { zoneId, children, groupId, ...css } = params;

    return <Droppable droppableId={zoneId}
type={groupId}>
        {(provided, _) => (
            <Box
                id="asdasdasd"
                ref={provided.innerRef}
                {...provided.droppableProps}
                {...css}>

                {children}
                {provided.placeholder}
            </Box>
        )}
    </Droppable>;
};

export const DragItem = (params: {
    itemId: string,
    index: number,
    children: ReactNode,
    alignHandle?: "top" | "center" | "bottom"
}) => {

    const { index, itemId, children, alignHandle } = params;

    return <Draggable
        key={itemId}
        draggableId={itemId}
        index={index}>
        {(provided, snapshot) => {

            return <Flex
                ref={provided.innerRef}
                {...provided.draggableProps}>

                {/* drag handle */}
                <Box {...provided.dragHandleProps}
                    alignSelf={alignHandle === "top"
                        ? "flex-start"
                        : alignHandle === "bottom"
                            ? "flex-end"
                            : "center"}>

                    <DragHandleIcon
                        className="square40"
                        style={{ color: "var(--mildGrey)" }}></DragHandleIcon>
                </Box>

                {children}
            </Flex>;
        }}
    </Draggable>;
};

export const DragAndDropContext = (props: {
    children: ReactNode,
    onDragEnd: (srcId: string, destId: string | null, srcIndex: number, destIndex: number | null) => void
}) => {

    return <DragDropContext
        onDragEnd={x => {

            const srcIndex = x.source.index;
            const srcId = x.source.droppableId;
            const destIndex = x.destination?.index;
            const destId = x.destination?.droppableId;

            props.onDragEnd(srcId, destId ?? null, srcIndex, destIndex ?? null);
        }}>
        {props.children}
    </DragDropContext>;
};