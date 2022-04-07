import React from 'react';
import { typedMemo } from '../static/frontendHelpers';

export const MemoTest = typedMemo(<TProp,>(props: {
    prop1: TProp,
    prop2: TProp
}) => {

    console.log('------ Rendering Memo Test ----------');

    return <div>{props.prop1}</div>;
});

{/* <MemoTest
    prop1={1}
    prop2={'asd'} />; */}