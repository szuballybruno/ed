import { Flex, FlexProps } from "@chakra-ui/react"
import { Add, Delete } from "@mui/icons-material"
import { EpistoButton } from "../../universal/EpistoButton"
import { EpistoEntry } from "../../universal/EpistoEntry"
import { FlexList } from "../../universal/FlexList"

export const SimpleEditList = (props: {
    items: string[],
    setItems: (items: string[]) => void
} & FlexProps) => {

    const { items, setItems, ...css } = props;

    return (<Flex direction="column" {...css}>
        <FlexList pb="10px">
            {items
                .map((item, index) => <Flex
                    align="center"
                    justify="space-between"
                    px="10px"
                    py="5px">

                    <EpistoEntry
                        marginTop="0"
                        value={item}
                        flex="1"
                        setValue={newval => {

                            const newItems = [...items];
                            newItems[index] = newval;
                            setItems(newItems);
                        }} />

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
                newItems.push("");
                setItems(newItems);
            }}>

            <Add />
        </EpistoButton>
    </Flex>
    )
}