import { Box, Flex } from "@chakra-ui/react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DoneIcon from '@mui/icons-material/Done';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import React, { useEffect, useState } from 'react';
import { CourseItemDTO } from "../../models/shared_models/CourseItemDTO";
import { ModuleDTO } from "../../models/shared_models/ModuleDTO";
import { useNavigation } from "../../services/navigatior";
import { FlexList } from "./FlexList";
import { FlexListItem } from "./FlexListItem";
import { FlexListTitleSubtitle } from "./FlexListTitleSubtitle";

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

    const { modules } = props;
    const currentModuleId = modules
        .filter(module => module
            .items
            .some(item => item.state === "current"))[0]?.id;

    const [expandedNodeIds, setExpandedNodeIds] = useState<string[]>([]);

    const handleToggle = (nodeIds: string[]) => {

        setExpandedNodeIds(nodeIds);
    };

    useEffect(() => {

        if (currentModuleId && expandedNodeIds.length === 0)
            setExpandedNodeIds([currentModuleId + ""]);
    }, [!!currentModuleId]);

    const lockedModuleIds = modules
        .filter(x => x.state === "locked")
        .map(x => x.id)
        .join(", ");

    useEffect(() => {

        const lockedModules = modules
            .filter(x => x.state === "locked");

        setExpandedNodeIds(expandedNodeIds
            .filter(x => !lockedModules
                .some(y => y.id + "" === x)));
    }, [lockedModuleIds]);

    console.log(expandedNodeIds);

    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            disableSelection
            expanded={expandedNodeIds}
            onNodeToggle={(_, y) => handleToggle(y)}
            sx={{ background: "transparent" }}>

            {modules
                .map(module => {

                    const isLocked = module.state === "locked";

                    return <TreeItem
                        style={{
                            pointerEvents: isLocked ? "none" : "all",
                            color: isLocked ? "gray" : undefined
                        }}
                        className="forceTransparentBgOnChildren"
                        nodeId={module.id + ""}
                        label={module.name}>

                        {!isLocked && <FlexList id="courseItemListContainer" p="10px">
                            {module
                                .items
                                .map((courseItem, index) => <CourseItemView
                                    key={index}
                                    courseItem={courseItem} />)}
                        </FlexList>}

                        {isLocked && <Box></Box>}
                    </TreeItem>
                })}
        </TreeView>
    );
}