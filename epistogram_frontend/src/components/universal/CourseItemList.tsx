import { Box, Flex } from '@chakra-ui/react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { getRandomInteger } from "../../static/frontendHelpers";
import { ChipSmall } from "../administration/courses/ChipSmall";
import { EpistoFont } from "../controls/EpistoFont";

export type NavigateToCourseItemActionType = (descriptorCode: string) => void;

export const CourseItemView = (props: { courseItem: CourseItemDTO }) => {

    const { title, subTitle, state, descriptorCode, type } = props.courseItem;
    const isLocked = state === 'locked';
    const { navigateToPlayer } = useNavigation();

    const navigate = () => navigateToPlayer(descriptorCode);

    const borderWidth = state === 'current'
        ? 5
        : type === 'video'
            ? 0
            : 3;

    const borderColor = type === 'exam'
        ? 'var(--intenseOrange)'
        : 'var(--epistoTeal)';

    const VideoListSausageIndicator = (props: {
        color: string
    }) => {

        const { color: sausageColor } = props;

        return <Flex
            alignSelf="stretch"
            className="roundBorders"
            boxShadow="inset -1px -1px 2px 1px rgba(0,0,0,0.10)"
            p="3px"
            m="7px 10px 7px 0px"
            bgColor={sausageColor} />;
    };

    return <FlexListItem
        isLocked={isLocked}
        onClick={navigate}
        midContent={<Flex align="center">

            {state === 'current' &&
                <VideoListSausageIndicator
                    color='var(--deepGreen)' />}

            {state === 'locked' &&
                <VideoListSausageIndicator
                    color='grey' />}

            {state === 'available' &&
                <VideoListSausageIndicator
                    color='var(--epistoTeal)' />}

            {state === 'completed' &&
                <VideoListSausageIndicator
                    color='var(--mildGreen)' />}

            <FlexListTitleSubtitle
                title={title}
                subTitle={subTitle} />
        </Flex>}
        endContent={getRandomInteger(0, 100) % 10 === 0 &&
            <ChipSmall
                //size='small'
                text='Ismétlés ajánlott'
                color='var(--intenseOrange)' />}>
    </FlexListItem >;
}

export const CourseItemList = (props: {
    modules: ModuleDTO[]
}) => {

    // hooks
    const [expandedNodeIds, setExpandedNodeIds] = useState<number[]>([]);
    const { navigateToPlayer } = useNavigation();

    // data
    const { modules } = props;

    const isBeginnerMode = modules
        .flatMap(x => x.items)
        .some(x => x.state === 'locked');

    const currentModule = modules
        .filter(module => module.state === 'current')[0] as ModuleDTO | null;

    const currentItem = modules
        .flatMap(x => x.items)
        .filter(x => x.state === 'current')[0] as CourseItemDTO | null;

    const isCurrentExpanded = expandedNodeIds
        .some(x => x === currentModule?.id);

    const isModuleSelected = !!modules
        .filter(x => x.state === 'current' && !x
            .items
            .some(x => x.state === 'current'))[0];

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
    };

    // selection changed
    useEffect(() => {

        if (!currentModule)
            return;

        const expandedIds = isModuleSelected
            ? isBeginnerMode
                ? []
                : [currentModule.id]
            : [currentModule.id];

        setExpandedNodeIds(expandedIds);
    }, [isModuleSelected, currentItem, currentModule]);

    return (
        <Flex
            id="courseItemListRoot"
            direction="column"
            justifyContent={'flex-start'}>

            {modules
                .map((module, index) => {

                    const isLocked = module.state === 'locked';
                    const isStartable = (module.state === 'available' || module.state === 'completed');
                    const hasCurrentItem = module.items.some(x => x.state === 'current');
                    const isSelected = module.state === 'current' && !hasCurrentItem;
                    const unclickable = isSelected && isBeginnerMode;
                    const isOpen = expandedNodeIds.some(x => x === module.id);
                    const headercolor = isSelected ? 'white' : undefined;

                    return <CollapseItem
                        key={index}
                        isOpen={isOpen}
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

                                <EpistoButton onClick={() => handleToggle(module.id)}>

                                    {unclickable
                                        ? <FiberManualRecordIcon style={{ color: headercolor }} />
                                        : isOpen
                                            ? <ExpandMoreIcon style={{ color: headercolor }} />
                                            : <ChevronRightIcon style={{ color: headercolor }} />}
                                </EpistoButton>

                                {/* title */}
                                <EpistoFont>
                                    {module.name}
                                </EpistoFont>
                            </Flex>

                            {/* play */}
                            <Box width="50px">

                                {isStartable && <EpistoButton
                                    padding="3px"
                                    onClick={() => startModule(module.code)}
                                    variant="outlined">

                                    <PlayArrowIcon style={{ color: 'var(--epistoTeal)' }} />
                                </EpistoButton>}
                            </Box>
                        </Flex>}>

                        <FlexList
                            id="courseItemListContainer"
                            p="10px"
                            height="100%">

                            {module
                                .items
                                .map((courseItem, index) => <CourseItemView
                                    key={index}
                                    courseItem={courseItem} />)}
                        </FlexList>
                    </CollapseItem>;
                })}
        </Flex>
    );
};
