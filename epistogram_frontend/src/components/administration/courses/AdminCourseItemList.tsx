import { Flex } from "@chakra-ui/react";
import { TextField } from "@mui/material";
import { ModuleAdminShortDTO } from "../../../shared/dtos/ModuleAdminShortDTO";
import { EpistoFont } from "../../controls/EpistoFont";
import { LoadingFrame } from "../../system/LoadingFrame";
import { CollapseItem } from "../../universal/CollapseItem";
import { EpistoSearch } from "../../controls/EpistoSearch";
import { ChipSmall } from "./CourseEditItemView";
import { translatableTexts } from "../../../static/translatableTexts";
import { formatTime } from "../../../static/frontendHelpers";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { CourseItemType } from "../../../shared/types/sharedTypes";
import { FlexListTitleSubtitle } from "../../universal/FlexListTitleSubtitle";

export const TextOrInput = (props: { isEditable?: boolean, value: string }) => {
    return props.isEditable ? <TextField value={props.value} /> : <EpistoFont>{props.value}</EpistoFont>
}

export const AdminCourseItemList = (props: {
    modules: ModuleAdminShortDTO[]
    navigationFunction: (itemId: number, itemType: CourseItemType) => void
}) => {
    const { modules, navigationFunction } = props
    const params = useParams<{ moduleId: string, videoId: string, examId: string }>();
    const moduleId = parseInt(params.moduleId);
    const videoId = parseInt(params.videoId);
    const examId = parseInt(params.examId)

    const currentItemType = moduleId
        ? "module"
        : videoId
            ? "video"
            : examId
                ? "exam"
                : null

    const [openModuleIds, setOpenModuleIds] = useState<number[]>([]);

    // opens / closes a module 
    const setModuleOpenState = (isOpen: boolean, moduleId: number) => {

        if (isOpen) {

            setOpenModuleIds([...openModuleIds, moduleId]);
        }
        else {

            setOpenModuleIds(openModuleIds.filter(x => x !== moduleId));
        }
    }

    return <LoadingFrame
        direction="column"
        maxW="350px"
        flexBasis="350px">

        <EpistoSearch />

        {/* course items */}
        <Flex
            flex="1"
            mt="5px"
            direction={"column"}
            background="var(--transparentWhite70)">

            {modules
                .map((module, moduleIndex) => {

                    return <CollapseItem
                        handleToggle={(targetIsOpen) => setModuleOpenState(targetIsOpen, module.id)}
                        isOpen={openModuleIds.some(x => x === module.id)}
                        style={{
                            width: "100%",
                            overflow: "hidden"
                        }}
                        header={(ecButton) => <Flex
                            background="var(--mildGrey)"
                            p="2px">

                            {ecButton}

                            <Flex
                                width="100%"
                                align="center"
                                justify="space-between">
                                <EpistoFont>
                                    {module.name}
                                </EpistoFont>

                            </Flex>
                        </Flex>}>

                        {module
                            .items
                            .map((item, itemIndex) => {

                                return <Flex
                                    onClick={() => navigationFunction(item.id, item.type)}
                                    flexDir={"column"}
                                    flex={1}>

                                    <Flex
                                        flex="1"
                                        borderLeft={`5px solid var(--${item.type === "video" ? "deepBlue" : "intenseOrange"})`}
                                        pl="10px"
                                        justify="flex-start"
                                        m="3px">

                                        <Flex
                                            justify={"center"} >

                                            {/* index */}
                                            <Flex
                                                align={"center"}
                                                height="100%">

                                                <EpistoFont
                                                    style={{
                                                        marginRight: "10px"
                                                    }}>

                                                    {itemIndex + 1}.
                                                </EpistoFont>
                                            </Flex>

                                            <FlexListTitleSubtitle
                                                title={item.title}
                                                subTitle={item.subTitle}
                                                isSelected={(currentItemType === item.type) && (moduleId === item.id || videoId === item.id || examId === item.id)} />
                                        </Flex>
                                    </Flex>
                                </Flex>
                            })}
                    </CollapseItem>

                })}
        </Flex >

    </LoadingFrame >
};