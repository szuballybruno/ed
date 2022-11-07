import React from 'react';
import { PagingType } from '../../../static/frontendHelpers';
import { UnderVideoInfoFrame } from '../watch/UnderVideoInfoFrame';

const PlayerNotes = (props: {
    paging: PagingType<string>
}) => {

    const { paging } = props;

    return <UnderVideoInfoFrame
        title='Jegyzetek'
        paging={paging}>


    </UnderVideoInfoFrame>;
};

export default PlayerNotes;
