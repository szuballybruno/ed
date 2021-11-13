import { Box, Flex } from "@chakra-ui/layout";
import { BoxProps } from "@chakra-ui/react";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { ReactNode, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";


const defaultGroups = [
    {
        items: [
            {
                name: "Item 1"
            },
            {
                name: "Item 2"
            }
        ]
    },
    {
        items: [
            {
                name: "Item 3"
            },
            {
                name: "Item 4"
            },
            {
                name: "Item 5"
            }
        ]
    },
    {
        items: [
            {
                name: "Item 6"
            }
        ]
    },
]

export const DropZone = (params: { id: string, groupId: string } & BoxProps) => {

    const { id, children, groupId, ...css } = params;

    return <Droppable droppableId={id} type={groupId}>
        {(provided, _) => (
            <Box
                border="2px solid green"
                ref={provided.innerRef}
                {...provided.droppableProps}
                {...css}>

                {children}
                {provided.placeholder}
            </Box>
        )}
    </Droppable>
}

export const DragItem = (params: { id: string, index: number, children: ReactNode }) => {

    const { index, id, children } = params;

    return <Draggable
        key={id}
        draggableId={id}
        index={index}>
        {(provided, snapshot) => {

            return <Flex ref={provided.innerRef} {...provided.draggableProps} align="center">

                {/* drag handle */}
                <Box {...provided.dragHandleProps} >

                    <DragHandleIcon
                        className="square40"
                        style={{ color: "var(--mildGrey)" }}></DragHandleIcon>
                </Box>

                {children}
            </Flex>
        }}
    </Draggable>
}

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

            props.onDragEnd(srcId, destId ?? null, srcIndex, destIndex ?? null)
        }}>
        {props.children}
    </DragDropContext>
}

export const TestDnd = () => {

    const [groups, setGroups] = useState(defaultGroups);

    const onDragEnd = (srcId: string, destId: string | null, srcIndex: number, destIndex: number | null) => {

        console.log(`${srcId} - ${destId} - ${srcIndex} - ${destIndex}`);

        if (!destId || !destIndex)
            return;

        if (destId === "zone-root") {


        }

        // const newList = [...list];
        // newList.splice(destIndex, 0, newList.splice(srcIndex, 1)[0]);

        // setList(newList);
    }

    return <Box>
        <DragAndDropContext onDragEnd={onDragEnd}>
            <DropZone id="zone-root" groupId="root">
                {groups
                    .map((group, groupIndex) => {

                        return <DragItem id={"group-item-" + groupIndex} index={groupIndex}>
                            <DropZone id={"zone-" + groupIndex} groupId="child">
                                {group
                                    .items
                                    .map((item, itemIndex) => {

                                        const index = parseInt(`${groupIndex + 1}${itemIndex}`);
                                        const id = `item-${groupIndex}-${itemIndex}`

                                        return <DragItem
                                            id={id}
                                            index={index}>

                                            {`index: ${index} id: ${id}`}
                                        </DragItem>
                                    })}
                            </DropZone>
                        </DragItem>
                    })}
            </DropZone>
        </DragAndDropContext>
    </Box>
}