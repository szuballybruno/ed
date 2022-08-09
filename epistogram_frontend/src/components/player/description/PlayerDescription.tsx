import React from 'react';
import { PagingType } from '../../../static/frontendHelpers';
import { UnderVideoInfoFrame } from '../watch/UnderVideoInfoFrame';

const PlayerDescription = (props: {
    description: string
    paging: PagingType<string>
}) => {

    const { description, paging } = props;

    return <UnderVideoInfoFrame
        title='Leírás'
        paging={paging}>

        {props.description}
    </UnderVideoInfoFrame>;
};

export default PlayerDescription;
