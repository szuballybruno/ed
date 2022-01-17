import { Flex } from "@chakra-ui/layout"
import { Close } from "@mui/icons-material"
import { ButtonType } from "../../models/types"
import { EpistoButton } from "../controls/EpistoButton"
import { EpistoCheckbox } from "../controls/EpistoCheckbox"
import { EpistoFont } from "../controls/EpistoFont"
import { EpistoSearch } from "../controls/EpistoSearch"
import { EpistoSelect } from "../controls/EpistoSelect"
import { BulkEditButtons, BulkEditButtonType } from "./BulkEditButtons"

export const AdminListEditHeader = (props: {
    isAllSelected: boolean,
    selectAllOrNone: (isAll: boolean) => void,
    selectedIds: number[],
    headerButtons: BulkEditButtonType[],
    itemLabel: string,
    onSearchChanged?: (value: string) => void,
    buttons?: ButtonType[]
}) => {

    const { isAllSelected, selectedIds, buttons, onSearchChanged, itemLabel, headerButtons, selectAllOrNone } = props;
    const isAnySelected = selectedIds.some(x => true);
    const isSingleSelected = selectedIds.length === 1;
    const selectionCount = selectedIds.length;

    return <Flex
        bg="var(--deepBlue)"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        height="60px">

        {/* all/none selection */}
        <Flex>

            {/* select all */}
            <EpistoButton
                onClick={() => selectAllOrNone(true)}>

                <div className="h-flex align-center fontLight">
                    <EpistoCheckbox
                        value={isAllSelected} />

                    <EpistoFont
                        style={{ marginLeft: "20px" }}>

                        Összes kijelölése
                    </EpistoFont>
                </div>
            </EpistoButton>

            {/* deselect all */}
            <EpistoButton
                onClick={() => selectAllOrNone(false)}>

                <div className="h-flex align-center fontLight">

                    <EpistoFont
                        style={{ marginLeft: "20px" }}>

                        {`${selectionCount} ${itemLabel} kijelölve`}
                    </EpistoFont>

                    <Close
                        onClick={() => selectAllOrNone(false)}
                        style={{
                            width: 18,
                            marginLeft: 5
                        }} />
                </div>
            </EpistoButton>
        </Flex >

        {/* spacer */}
        <Flex flex={1} />

        {/* bulk edit buttons */}
        {isSingleSelected && <BulkEditButtons buttons={headerButtons} />}

        {/* search */}
        <Flex
            h={"100%"}
            direction={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            w={140}
            mx={10}>
            <EpistoSearch
                w={140}
                onChange={(x) => {

                    if (onSearchChanged)
                        onSearchChanged(x.target.value)
                }} />
        </Flex>

        {/* order by */}
        <Flex
            className="align-center"
            h={"100%"}
            mx={10}>
            <EpistoSelect
                minW={"fit-content"}
                items={[]}
                onSelected={x => { }}
                selectedValue="1"
                getCompareKey={x => x}
                defaultValue="Rendezés...">

            </EpistoSelect>
        </Flex>

        {/* buttons */}
        {(buttons ?? [])
            .map(x => (
                <EpistoButton
                    variant="plain"
                    className="margin-right"
                    onClick={x.action}
                    style={{
                        background: "white"
                    }}>

                    {x.title}
                </EpistoButton>
            ))}
    </Flex >
}