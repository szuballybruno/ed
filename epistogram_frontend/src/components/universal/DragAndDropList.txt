import { Box, Flex, FlexProps } from '@chakra-ui/layout';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { ReactNode } from 'react';
import { DragDropContext, Draggable, DraggableStateSnapshot, Droppable } from 'react-beautiful-dnd';

export const DragAndDropList = <T,>(props: {
    list: T[],
    setList: (list: T[]) => void,
    getKey: (item: T) => string,
    renderListItem: (itme: T, snapshot: DraggableStateSnapshot, index: number) => ReactNode
} & FlexProps) => {

    const { list, setList, getKey, renderListItem, ...css } = props;

    return <Flex id="dragAndDropListRoot"
{...css}>
        <DragDropContext
            onDragEnd={x => {

                if (!x.destination)
                    return;

                const newList = [...list];

                const srcIndex = x.source.index;
                const destIndex = x.destination.index;

                newList.splice(destIndex, 0, newList.splice(srcIndex, 1)[0]);

                setList(newList);
            }}>

            {/* drop container */}
            <Droppable droppableId={'courseItemsDroppableContextId'}>
                {(provided, _) => (

                    <div
                        id="dndListRoot"
                        className="whall"
                        ref={provided.innerRef}
{...provided.droppableProps}>

                        {/* drag list container */}
                        {list
                            .map((listItem, listItemIndex) => {

                                const key = getKey(listItem);

                                // drag item
                                return <Draggable
                                    key={key}
                                    draggableId={'draggableId-' + key}
                                    index={listItemIndex}>
                                    {(provided, snapshot) => (
                                        <Flex ref={provided.innerRef}
{...provided.draggableProps}
align="center">

                                            {/* drag handle */}
                                            <Box
                                                {...provided.dragHandleProps} >

                                                <DragHandleIcon
                                                    className="square40"
                                                    style={{ color: 'var(--mildGrey)' }}></DragHandleIcon>
                                            </Box>

                                            {/* render list item */}
                                            {renderListItem(listItem, snapshot, listItemIndex)}
                                        </Flex>
                                    )}
                                </Draggable>;
                            })}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    </Flex>;
};