import {Box, Flex} from '@chakra-ui/react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {useEffect, useState} from 'react';
import {useNavigation} from '../../services/core/navigatior';
import {PlaylistItemDTO} from '../../shared/dtos/PlaylistItemDTO';
import {PlaylistModuleDTO} from '../../shared/dtos/PlaylistModuleDTO';
import {Id} from '../../shared/types/versionId';
import {EpistoButton} from '../controls/EpistoButton';
import {EpistoFont} from '../controls/EpistoFont';
import {CollapseItem} from '../universal/CollapseItem';
import {FlexList} from '../universal/FlexList';
import {PlaylistItem} from './PlaylistItem';

export type NavigateToCourseItemActionType = (descriptorCode: string) => void;

export const Playlist = (props: {
    modules: PlaylistModuleDTO[]
}) => {

    // hooks
    const [expandedNodeIds, setExpandedNodeIds] = useState<Id<'Module'>[]>([]);
    const { navigateToPlayer } = useNavigation();

    // data
    const { modules } = props;

    const isBeginnerMode = modules
        .flatMap(x => x.items)
        .some(x => x.state === 'locked');

    const currentModule = modules
        .filter(module => module.moduleState === 'current')[0] as PlaylistModuleDTO | null;

    const currentItem = modules
        .flatMap(x => x.items)
        .filter(x => x.state === 'current')[0] as PlaylistItemDTO | null;

    const isCurrentExpanded = expandedNodeIds
        .some(x => x === currentModule?.moduleId);

    const isModuleSelected = !!modules
        .filter(x => x.moduleState === 'current' && !x
            .items
            .some(x => x.state === 'current'))[0];

    // funcs
    const handleToggle = (moduleId: Id<'Module'>) => {

        if (expandedNodeIds.some(x => x === moduleId)) {

            console.log('Set expanded nodes if');
            setExpandedNodeIds(expandedNodeIds.filter(x => x !== moduleId));
        }
        else {

            console.log('Set expanded nodes else');
            setExpandedNodeIds([...expandedNodeIds, moduleId]);
        }
    };

    const startModule = (code: string) => {

        navigateToPlayer(code);
    };

    // selection changed
    useEffect(() => {

        if (!currentModule)
            return;

        const expandedIds = isModuleSelected
            ? isBeginnerMode
                ? []
                : [currentModule.moduleId]
            : [currentModule.moduleId];

        //setExpandedNodeIds(expandedIds);
    }, [isModuleSelected, currentItem, currentModule]);

    return (
        <Flex
            id="courseItemListRoot"
            direction="column"
            zIndex='4'
            justifyContent={'flex-start'}>

            {modules
                .map((module, index) => {

                    const isLocked = module.moduleState === 'locked';
                    const isStartable = (module.moduleState === 'available' || module.moduleState === 'completed');
                    const hasCurrentItem = module.items.some(x => x.state === 'current');
                    const isSelected = module.moduleState === 'current' && !hasCurrentItem;
                    const unclickable = isSelected && isBeginnerMode;
                    const isOpen = expandedNodeIds.some(x => x === module.moduleId);
                    const headercolor = isSelected ? 'white' : undefined;

                    return <CollapseItem
                        key={index}
                        isOpen={true}
                        style={{
                            pointerEvents: isLocked || unclickable ? 'none' : 'all',
                            color: isLocked ? 'gray' : undefined
                        }}
                        header={() => <Flex
                            bg={isSelected ? 'var(--deepBlue)' : undefined}
                            color={headercolor}
                            justify="space-between"
                            borderBottom="1px solid var(--mildGrey)"
                            align="center"
                            height="50px"
                            minH={'50px'}
                            pl="5px">

                            {/* open/close */}
                            <Flex align="center">

                                <EpistoButton onClick={() => handleToggle(module.moduleId)}>

                                    {unclickable
                                        ? <FiberManualRecordIcon style={{ color: headercolor }} />
                                        : isOpen
                                            ? <ExpandMoreIcon style={{ color: headercolor }} />
                                            : <ChevronRightIcon style={{ color: headercolor }} />}
                                </EpistoButton>

                                {/* title */}
                                <EpistoFont>
                                    {module.moduleName}
                                </EpistoFont>
                            </Flex>

                            {/* play */}
                            <Box width="50px">

                                {isStartable && <EpistoButton
                                    padding="3px"
                                    onClick={() => startModule(module.moduleCode)}
                                    variant="outlined">

                                    <PlayArrowIcon style={{ color: 'var(--epistoTeal)' }} />
                                </EpistoButton>}
                            </Box>
                        </Flex>}>

                        <FlexList
                            id="courseItemListContainer"
                            p="10px">

                            {module
                                .items
                                .map((playlistItem, index) => <PlaylistItem
                                    key={index}
                                    playlistItem={playlistItem} />)}
                        </FlexList>
                    </CollapseItem>;
                })}
        </Flex>
    );
};
