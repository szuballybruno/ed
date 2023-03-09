import { TextField } from '@mui/material';
import React from 'react';
import { PagingType } from '../../../static/frontendHelpers';
import { EpistoFont } from '../../controls/EpistoFont';
import { UnderVideoInfoFrame } from '../watch/UnderVideoInfoFrame';

const PlayerDescription = (props: {
    description: string
    paging: PagingType<string>
}) => {

    const { description, paging } = props;

    return <UnderVideoInfoFrame
        title='Leírás'
        paging={paging}>

        <EpistoFont isMultiline>
            {props.description}
        </EpistoFont>
    </UnderVideoInfoFrame>;
};

export default PlayerDescription;
