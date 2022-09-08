import { FlexProps } from '@chakra-ui/react';
import { Add, Delete } from '@mui/icons-material';
import { ReactNode } from 'react';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoEntry } from '../controls/EpistoEntry';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoLabel } from '../controls/EpistoLabel';
import { FlexList } from '../universal/FlexList';

export const SimpleEditList = <T,>(props: {
    items: T[],
    title: string,
    initialValue: T,
    setItems: (items: T[]) => void,
    renderChild?: (item: T, onItemChanged: (modifiedItem: T) => void) => ReactNode
} & FlexProps) => {

    const { items, title, setItems, initialValue, renderChild, ...css } = props;

    return (
        <EpistoFlex2 direction="column"
            mt="30px"
            {...css}>

            <EpistoLabel isOverline
                text={title}>

                <FlexList pb="10px">
                    {items
                        .map((item, index) => <EpistoFlex2
                            key={index}
                            align="center"
                            py="5px">

                            {!renderChild && <EpistoEntry
                                isMultiline
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
                        </EpistoFlex2>)}
                </FlexList>

                <EpistoButton
                    variant={'colored'}
                    style={{ alignSelf: 'center', width: '100%' }}
                    onClick={() => {

                        const newItems = [...items];
                        newItems.push(initialValue);
                        setItems(newItems);
                    }}>

                    <Add />
                    Elem hozzáadása
                </EpistoButton>
            </EpistoLabel>


        </EpistoFlex2>
    );
};