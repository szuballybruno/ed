import { Flex } from "@chakra-ui/react";
import { ApartmentTwoTone, Close, Edit, Equalizer } from "@mui/icons-material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Checkbox, Typography } from "@mui/material";
import React, { ReactNode, useState } from 'react';
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useNavigation } from "../../../services/navigatior";
import { FloatAddButton } from "../../FloatAddButton";
import { LoadingFrame } from "../../HOC/LoadingFrame";
import IntersectionObserverWrap from "../../IntersectionObserverWrapper";
import { EpistoButton } from "../../universal/EpistoButton";
import { EpistoSearch } from "../../universal/EpistoSearch";
import { EpistoSelect } from "../../universal/EpistoSelect";
import { FlexList } from "../../universal/FlexList";
import { FlexListItem } from "../../universal/FlexListItem";
import { FlexListTitleSubtitle } from "../../universal/FlexListTitleSubtitle";
import { FloatChip } from "../../universal/FloatChip";
import { AdminSubpageHeader } from "../AdminSubpageHeader";

export const AdminGroupListSubpage = () => {

    const groups = [{
        groupId: 0,
        groupName: "Próba",
        numberOfUsers: 0,
        organizationName: ""
    }]

    const { navigate } = useNavigation();
    const navigateToAddGroup = () => navigate(applicationRoutes.administrationRoute.groupsRoute.addRoute.route);

    const administrationRoutes = applicationRoutes.administrationRoute;

    const [selectedGroupIds, setSelectedGroupIds] = useState<number[]>([]);

    const isAllGroupsSelected = !groups.some(group => !selectedGroupIds.some(uid => uid === group.groupId));
    // const isAnygroupSelected = selectedGroupIds.length > 0;


    const setSelectedGroup = (groupId: number, isSelected: boolean) => {

        if (isSelected) {

            setSelectedGroupIds([...selectedGroupIds, groupId]);
        }
        else {

            setSelectedGroupIds(selectedGroupIds.filter(x => x !== groupId));
        }
    }

    const selectAllOrNone = (isAll: boolean) => {

        if (isAll) {

            setSelectedGroupIds(groups.map(x => x.groupId));
        } else {

            setSelectedGroupIds([]);
        }
    }


    return (
        <Flex flex="1" direction="column" bgColor="white" maxW={"100%"}>
            {/* admin header */}
            <AdminSubpageHeader>
                <Flex direction="row" justifyContent="space-between" alignItems="center" h={60}>
                    <Flex direction="row" alignItems="center" justifyContent="center" minW={60} h="100%">
                        <Checkbox checked={isAllGroupsSelected} onClick={() => selectAllOrNone(!isAllGroupsSelected)} />
                    </Flex>

                    {!isAllGroupsSelected && <Flex
                        w={240}
                        minW={165}
                        h={"100%"}
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"flex-start"}
                        onClick={() => selectAllOrNone(!isAllGroupsSelected)}
                        cursor="pointer">

                        <Typography
                            style={{ marginLeft: "20px" }}>

                            Összes kijelölése
                        </Typography>
                    </Flex>}

                    {selectedGroupIds.length > 0 &&
                        <Flex
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
                                p="0 12px 0 12px"
                                color="white"
                                h={30}
                                ml={10}>
                                <Typography>
                                    {selectedGroupIds.length} csoport kijelölve
                                </Typography>
                                <Close onClick={() => {
                                    setSelectedGroupIds([])
                                }} style={{
                                    width: 18,
                                    marginLeft: 5
                                }} />
                            </Flex>
                        </Flex>}

                    {selectedGroupIds.length !== 1 && <Flex flex={1}></Flex>}

                    {(selectedGroupIds.length === 1) && <IntersectionObserverWrap direction={"row"} alignItems={"center"} justifyContent={"flex-start"}>
                        <Button
                            size={"small"}
                            variant={"outlined"}
                            name={"edit"}
                            style={{
                                marginRight: "20px",
                                minWidth: "fit-content",
                                borderRadius: 7,
                                borderColor: "var(--mildGrey)",
                                color: "black"
                            }}
                            onClick={() => {
                                navigate(administrationRoutes.groupsRoute.editRoute.route, { groupId: selectedGroupIds[0] })
                            }}>
                            Szerkesztés
                        </Button>
                        <Button
                            size={"small"}
                            name="remove"
                            style={{
                                marginRight: "20px",
                                minWidth: "fit-content",
                                borderRadius: 7,
                                borderColor: "var(--mildGrey)",
                                color: "black"
                            }}
                            variant={"outlined"}>
                            Törlés
                        </Button>
                        <Button
                            size={"small"}
                            name="stats"
                            style={{
                                marginRight: "20px",
                                minWidth: "fit-content",
                                borderRadius: 7,
                                borderColor: "var(--mildGrey)",
                                color: "black"
                            }}
                            variant={"outlined"}
                            onClick={() => {
                                navigate(administrationRoutes.groupsRoute.statisticsRoute.route, { groupId: selectedGroupIds[0] })
                            }}>
                            Statisztika megjelenítése
                        </Button>

                    </IntersectionObserverWrap>}

                    <Flex
                        h={"100%"}
                        direction={"row"}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        w={140}
                        mx={10}>
                        <EpistoSearch w={140}></EpistoSearch>
                    </Flex>


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
            </AdminSubpageHeader>

            <LoadingFrame loadingState={"success"} flex="1">

                {/* group list */}
                <FlexList className="whall">
                    {groups
                        .map((group, index) => {

                            const chips = [] as { name: string, icon: ReactNode }[];

                            chips.push(
                                {
                                    name: group.numberOfUsers.toString(),
                                    icon: <AlternateEmailIcon />
                                });

                            chips.push(
                                {
                                    name: group.organizationName,
                                    icon: <ApartmentTwoTone />
                                });

                            return <FlexListItem
                                key={index}
                                background="white"
                                setIsChecked={x => setSelectedGroup(group.groupId, x)}
                                isChecked={selectedGroupIds.some(x => x === group.groupId)}
                                midContent={<FlexListTitleSubtitle
                                    title={`${group.groupName}`}
                                    subTitle={<Flex wrap="wrap" my="10px">
                                        {chips
                                            .map((chip, index) => <FloatChip
                                                name={chip.name}
                                                icon={chip.icon}
                                                padding="5px" />)}
                                    </Flex>}
                                />}
                                endContent={<Flex
                                    align="center"
                                    justifyContent={"flex-end"}
                                    h={"100%"}
                                    width={165}
                                    px={10}>

                                    {/* go to edit */}
                                    <EpistoButton
                                        variant={"colored"}
                                        onClick={() => {
                                            navigate(administrationRoutes.groupsRoute.editRoute.route, { groupId: group.groupId })
                                        }}
                                        style={{ width: 20 }}>
                                        <Edit style={{ width: "20px", height: "20px" }} />
                                    </EpistoButton>

                                    {/* go to stats */}
                                    <EpistoButton
                                        variant="colored"
                                        onClick={() => {
                                            navigate(administrationRoutes.groupsRoute.statisticsRoute.route, { groupId: group.groupId })
                                        }}
                                        style={{ width: 20, marginLeft: 5 }}>
                                        <Equalizer style={{ width: "20px", height: "20px" }} />
                                    </EpistoButton>

                                    {/* delete group */}
                                    <EpistoButton
                                        variant="colored"
                                        onClick={() => { }}
                                        style={{ width: 20, marginLeft: 5 }}>
                                        <DeleteIcon style={{ width: "20px", height: "20px" }}></DeleteIcon>
                                    </EpistoButton>
                                </Flex>}
                            />
                        })}
                </FlexList>

                <FloatAddButton onClick={navigateToAddGroup} />

            </LoadingFrame>
        </Flex>
    );
};
