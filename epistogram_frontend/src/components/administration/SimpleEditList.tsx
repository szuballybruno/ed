import { Flex, FlexProps } from "@chakra-ui/react"
import { Add, Delete } from "@mui/icons-material"
import { ReactNode } from "react"
import { EpistoButton } from "../controls/EpistoButton"
import { EpistoEntry } from "../controls/EpistoEntry"
import { FlexList } from "../universal/FlexList"

export const SimpleEditList = <T,>(props: {
    items: T[],
    initialValue: T,
    setItems: (items: T[]) => void,
    renderChild?: (item: T, onItemChanged: (modifiedItem: T) => void) => ReactNode
} & FlexProps) => {

    const { items, setItems, initialValue, renderChild, ...css } = props;

    return (
        <Flex direction="column" {...css}>
            <FlexList pb="10px">
                {items
                    .map((item, index) => <Flex
                        align="center"
                        px="10px"
                        py="5px">

                        {!renderChild && <EpistoEntry
                            marginTop="0"
                            value={item as any as string}
                            flex="1"
                            setValue={newval => {

                                const newItems = [...items];
                                newItems[index] = newval as any as T;
                                setItems(newItems);
                            }} />}

                        {renderChild && renderChild(item, (modifiedItem) => {

                            const newItems = [...items];
                            newItems[index] = modifiedItem;
                            setItems(newItems);
                        })}

                        <EpistoButton
                            onClick={() => {

                                setItems(items.filter(x => x !== item));
                            }}>
                            <Delete />
                        </EpistoButton>
                    </Flex>)}
            </FlexList>

            <EpistoButton
                variant={"outlined"}
                style={{ alignSelf: "center" }}
                onClick={() => {

                    const newItems = [...items];
                    newItems.push(initialValue);
                    setItems(newItems);
                }}>

                <Add />
            </EpistoButton>
        </Flex>
    )
}