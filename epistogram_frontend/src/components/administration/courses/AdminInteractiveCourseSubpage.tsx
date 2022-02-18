import { Flex } from "@chakra-ui/react"
import { AdminSubpageHeader } from "../AdminSubpageHeader"

import ReactFlow, { Handle, Position } from 'react-flow-renderer';

const elements = [
    {
        id: '1',
        type: 'input', // input node
        data: { label: 'Input Node' },
        position: { x: 250, y: 25 },
    },
    // default node
    {
        id: '2',
        // you can also pass a React component as a label
        data: { label: <div>Default Node</div> },
        position: { x: 100, y: 125 },
    },
    {
        id: '3',
        type: 'special', // output node
        data: { label: 'Videó vagyok' },
        position: { x: 250, y: 250 },
    },
    // animated edge
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3' },
];

const CustomNodeComponent = ({ data }) => {
    return (
        <Flex
            align="center"
            justify="center"
            className="roundBorders"
            w="200px"
            h="120px"
            background="red">
            <Handle type="target" position={Position.Left} style={{ borderRadius: 0 }} />
            <div>{data.label}</div>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                style={{ top: '30%', borderRadius: 0 }}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="b"
                style={{ top: '70%', borderRadius: 0 }}
            />
        </Flex>
    );
};

export const AdminInteractiveCourseSubpage = () => {

    return <AdminSubpageHeader direction="row" flex="1" mb="50px">
        <Flex flex="1" mr="5px" background="var(--transparentWhite70)">
            <ReactFlow nodeTypes={{
                special: CustomNodeComponent
            }} elements={elements} />
        </Flex>
        <Flex flexBasis={"350px"} background="var(--transparentWhite70)">

        </Flex>
    </AdminSubpageHeader>
}