import { Box, Flex } from "@chakra-ui/react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DoneIcon from '@mui/icons-material/Done';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { CourseItemDTO } from "../../models/shared_models/CourseItemDTO";
import { ModuleDTO } from "../../models/shared_models/ModuleDTO";
import { useNavigation } from "../../services/navigatior";
import { EpistoButton } from "./EpistoButton";
import { FlexList } from "./FlexList";
import { FlexListItem } from "./FlexListItem";
import { FlexListTitleSubtitle } from "./FlexListTitleSubtitle";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { CollapseItem } from "./CollapseItem";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export type NavigateToCourseItemActionType = (descriptorCode: string) => void;

export const CourseItemView = (props: { courseItem: CourseItemDTO }) => {

    const { title, subTitle, state, descriptorCode, type } = props.courseItem;
    const isLocked = state === "locked";
    const { navigateToPlayer } = useNavigation();

    const navigate = () => navigateToPlayer(descriptorCode);

    const borderWidth = state === "current"
        ? 5
        : type === "video"
            ? 0
            : 3

    const borderColor = type === "exam"
        ? "var(--intenseOrange)"
        : "var(--epistoTeal)"

    return <FlexListItem
        isLocked={isLocked}
        onClick={navigate}
        borderLeft={`${borderWidth}px solid ${borderColor}`}
        midContent={<FlexListTitleSubtitle title={title} subTitle={subTitle} />}
        endContent={<Flex align="center" justify="center" flexBasis="50px">
            {state === "current" && <VisibilityIcon style={{ color: "var(--epistoTeal)" }} />}
            {state === "locked" && <LockIcon style={{ color: "grey" }} />}
            {state === "available" && <LockOpenIcon style={{ color: "var(--mildGreen)" }} />}
            {state === "completed" && <DoneIcon style={{ color: "var(--mildGreen)" }} />}
        </Flex>}>
    </FlexListItem>
}

export const CourseItemList = (props: {
    modules: ModuleDTO[]
}) => {

    // hooks 
    const [expandedNodeIds, setExpandedNodeIds] = useState<number[]>([]);
    const { navigateToPlayer } = useNavigation();

    // data 
    const { modules } = props;

    const currentModule = modules
        .filter(module => module
            .items
            .some(item => item.state === "current"))[0] as ModuleDTO | null;

    const currentItem = modules
        .flatMap(x => x.items)
        .filter(x => x.state === "current")[0] as CourseItemDTO | null;

    const isCurrentExpanded = expandedNodeIds
        .some(x => x === currentModule?.id);

    const isModuleSelected = !!modules
        .filter(x => x.state === "current" && !x
            .items
            .some(x => x.state === "current"))[0];

    // funcs 
    const handleToggle = (moduleId: number) => {

        if (expandedNodeIds.some(x => x === moduleId)) {

            setExpandedNodeIds(expandedNodeIds.filter(x => x !== moduleId));
        }
        else {

            setExpandedNodeIds([...expandedNodeIds, moduleId]);
        }
    };

    const startModule = (code: string) => {

        navigateToPlayer(code);
    }

    // effects 
    useEffect(() => {

        if (isModuleSelected)
            return;

        if (isCurrentExpanded)
            return;

        setExpandedNodeIds([...expandedNodeIds, currentModule?.id!]);
    }, [isModuleSelected, currentItem]);

    useEffect(() => {

        if (!isModuleSelected)
            return;

        if (!isCurrentExpanded)
            return;

        setExpandedNodeIds(expandedNodeIds
            .filter(x => x !== currentModule?.id));
    }, [isModuleSelected]);

    return (
        <Flex id="courseItemListRoot" direction="column" flex="1" overflowY="scroll">
            {modules
                .map(module => {

                    const isLocked = module.state === "locked";
                    const isStartable = (module.state === "available" || module.state === "completed");
                    const hasCurrentItem = module.items.some(x => x.state === "current");
                    const isSelected = module.state === "current" && !hasCurrentItem;
                    const unclickable = isSelected;
                    const isOpen = !isSelected && !isLocked && expandedNodeIds.some(x => x === module.id);
                    const headercolor = isSelected ? "white" : undefined;

                    return <CollapseItem
                        isOpen={isOpen}
                        style={{
                            pointerEvents: isLocked || unclickable ? "none" : "all",
                            color: isLocked ? "gray" : undefined
                        }}
                        header={() => <Flex
                            bg={isSelected ? `var(--deepBlue)` : undefined}
                            color={headercolor}
                            justify="space-between"
                            borderBottom="1px solid var(--mildGrey)"
                            align="center"
                            height="50px"
                            pl="5px">

                            {/* open/close */}
                            <Flex align="center">
                                <EpistoButton onClick={() => handleToggle(module.id)}>

                                    {isSelected
                                        ? <FiberManualRecordIcon style={{ color: headercolor }} />
                                        : isOpen
                                            ? <ExpandMoreIcon style={{ color: headercolor }} />
                                            : <ChevronRightIcon style={{ color: headercolor }} />}
                                </EpistoButton>

                                {/* title */}
                                <Typography>
                                    {module.name}
                                </Typography>
                            </Flex>

                            {/* play */}
                            <Box width="50px">
                                {isStartable && <EpistoButton
                                    padding="3px"
                                    onClick={() => startModule(module.code)}
                                    variant="outlined">
                                    <PlayArrowIcon style={{ color: "var(--epistoTeal)" }} />
                                </EpistoButton>}
                            </Box>
                        </Flex>}>

                        <FlexList id="courseItemListContainer" p="10px">
                            {module
                                .items
                                .map((courseItem, index) => <CourseItemView
                                    key={index}
                                    courseItem={courseItem} />)}
                        </FlexList>
                    </CollapseItem>
                })}
        </Flex>
    );
}