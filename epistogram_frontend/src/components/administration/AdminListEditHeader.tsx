import { Checkbox } from "@chakra-ui/checkbox"
import { Flex } from "@chakra-ui/layout"
import { Close } from "@mui/icons-material"
import { Typography } from "@mui/material"
import { EpistoSearch } from "../universal/EpistoSearch"
import { EpistoSelect } from "../universal/EpistoSelect"
import { BulkEditButtons, BulkEditButtonType } from "./BulkEditButtons"

export const AdminListEditHeader = (props: {
    isAllSelected: boolean,
    selectAllOrNone: (isAll: boolean) => void,
    selectedIds: number[],
    headerButtons: BulkEditButtonType[],
    itemLabel: string
}) => {

    const { isAllSelected, selectedIds, itemLabel, headerButtons, selectAllOrNone } = props;
    const isAnySelected = selectedIds.some(x => true);
    const isSingleSelected = selectedIds.length === 1;
    const selectionCount = selectedIds.length;

    return <Flex direction="row" justifyContent="space-between" alignItems="center" h={60}>
        <Flex direction="row" alignItems="center" justifyContent="center" minW={60} h="100%">
            <Checkbox checked={isAllSelected} onClick={() => selectAllOrNone(!isAllSelected)} />
        </Flex>

        {!isAllSelected && <Flex
            w={240}
            minW={165}
            h={"100%"}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            onClick={() => selectAllOrNone(!isAllSelected)}
            cursor="pointer">

            <Typography
                style={{ marginLeft: "20px" }}>

                Összes kijelölése
            </Typography>
        </Flex>}

        {/* selected users label */}
        {isAnySelected && <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            w={230}
            minW={230}
            h={"100%"}>
            <Flex
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                className="roundBorders"
                bg="var(--epistoTeal)"
                padding="0 12px 0 12px"
                color="white"
                height={30}
                ml={10}>
                <Typography>
                    {selectionCount} {itemLabel} kijelölve
                </Typography>
                <Close
                    onClick={() => selectAllOrNone(false)}
                    style={{
                        width: 18,
                        marginLeft: 5
                    }} />
            </Flex>
        </Flex>}

        {/* spacer */}
        <Flex flex={1}></Flex>

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
            <EpistoSearch w={140}></EpistoSearch>
        </Flex>

        {/* order by */}
        <Flex
            direction={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
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
    </Flex>
}